import Busboy from 'busboy'
import { createWriteStream } from 'fs'
import { resolve } from 'path'
import { verifyToken, getDraftDir, ensureDraftVersion } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  if (!verifyToken(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const headers = getHeaders(event)
  const nodeReq = event.node.req

  return new Promise((resolvePromise, rejectPromise) => {
    const fields: Record<string, string> = {}
    let filePromise: Promise<{ filename: string; size: number }> | null = null

    const busboy = Busboy({ headers })

    busboy.on('field', (name: string, value: string) => {
      fields[name] = value
    })

    busboy.on('file', (_name: string, stream: NodeJS.ReadableStream, info: { filename: string }) => {
      // 将文件写入包装为 Promise，在 finish 时等待
      filePromise = new Promise((resolveFile, rejectFile) => {
        const version = fields.version
        if (!version) {
          stream.resume()
          rejectFile(new Error('version field must appear before file in form data'))
          return
        }

        ensureDraftVersion(version)
        const dir = getDraftDir(version)
        const filePath = resolve(dir, info.filename)
        const writeStream = createWriteStream(filePath)

        let size = 0
        stream.on('data', (chunk: Buffer) => {
          size += chunk.length
        })

        stream.pipe(writeStream)

        writeStream.on('finish', () => {
          resolveFile({ filename: info.filename, size })
        })

        writeStream.on('error', (err: Error) => {
          rejectFile(err)
        })
      })
    })

    busboy.on('finish', async () => {
      try {
        if (!fields.version) {
          rejectPromise(createError({ statusCode: 400, statusMessage: 'Missing "version" field' }))
          return
        }
        if (!filePromise) {
          rejectPromise(createError({ statusCode: 400, statusMessage: 'No file uploaded' }))
          return
        }

        const savedFile = await filePromise

        resolvePromise({
          success: true,
          message: 'Package uploaded',
          data: {
            filename: savedFile.filename,
            size: savedFile.size,
            version: fields.version,
          },
        })
      } catch (err: any) {
        rejectPromise(createError({ statusCode: 500, statusMessage: err.message || 'Upload failed' }))
      }
    })

    busboy.on('error', (err: Error) => {
      rejectPromise(createError({ statusCode: 500, statusMessage: 'Upload failed: ' + err.message }))
    })

    nodeReq.pipe(busboy)
  })
})
