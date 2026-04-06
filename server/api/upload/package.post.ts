import Busboy from 'busboy'
import { createWriteStream, renameSync, unlinkSync } from 'fs'
import { resolve } from 'path'
import { verifyToken, getDraftDir, ensureDraftVersion, DRAFT_DIR, ensureDir } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  if (!verifyToken(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const headers = getHeaders(event)
  const nodeReq = event.node.req

  return new Promise((resolvePromise, rejectPromise) => {
    const fields: Record<string, string> = {}
    let fileInfo: { tmpPath: string; filename: string; size: number } | null = null
    let filePromise: Promise<void> | null = null

    const busboy = Busboy({ headers })

    busboy.on('field', (name: string, value: string) => {
      fields[name] = value
    })

    busboy.on('file', (_name: string, stream: NodeJS.ReadableStream, info: { filename: string }) => {
      // 先写到 draft 目录下的临时文件（同文件系统，避免 EXDEV）
      ensureDir(DRAFT_DIR)
      const tmpPath = resolve(DRAFT_DIR, `.tmp-${Date.now()}-${info.filename}`)
      const writeStream = createWriteStream(tmpPath)

      let size = 0
      stream.on('data', (chunk: Buffer) => {
        size += chunk.length
      })

      stream.pipe(writeStream)

      filePromise = new Promise((resolveFile, rejectFile) => {
        writeStream.on('finish', () => {
          fileInfo = { tmpPath, filename: info.filename, size }
          resolveFile()
        })
        writeStream.on('error', rejectFile)
      })
    })

    busboy.on('finish', async () => {
      try {
        // 等待文件写入完成
        if (filePromise) {
          await filePromise
        }

        if (!fields.version) {
          if (fileInfo) unlinkSync(fileInfo.tmpPath)
          rejectPromise(createError({ statusCode: 400, statusMessage: 'Missing "version" field' }))
          return
        }
        if (!fileInfo) {
          rejectPromise(createError({ statusCode: 400, statusMessage: 'No file uploaded' }))
          return
        }

        // 所有字段和文件都已收到，移动到正确目录
        const version = fields.version
        ensureDraftVersion(version)
        const dir = getDraftDir(version)
        const destPath = resolve(dir, fileInfo.filename)
        renameSync(fileInfo.tmpPath, destPath)

        resolvePromise({
          success: true,
          message: 'Package uploaded',
          data: {
            filename: fileInfo.filename,
            size: fileInfo.size,
            version,
          },
        })
      } catch (err: any) {
        if (fileInfo) {
          try { unlinkSync(fileInfo.tmpPath) } catch {}
        }
        rejectPromise(createError({ statusCode: 500, statusMessage: err.message || 'Upload failed' }))
      }
    })

    busboy.on('error', (err: Error) => {
      rejectPromise(createError({ statusCode: 500, statusMessage: 'Upload failed: ' + err.message }))
    })

    nodeReq.pipe(busboy)
  })
})
