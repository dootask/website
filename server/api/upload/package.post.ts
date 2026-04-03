import { resolve } from 'path'
import { writeFileSync } from 'fs'
import {
  verifyToken,
  getPackageDir,
  getManifestKey,
  readManifest,
  writeManifest,
  VALID_PLATFORMS,
  VALID_ARCHS,
} from '../../utils/storage'

export default defineEventHandler(async (event) => {
  // 验证 Token
  if (!verifyToken(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const formData = await readMultipartFormData(event)

  if (!formData || formData.length === 0) {
    throw createError({ statusCode: 400, statusMessage: 'No form data received' })
  }

  // 解析表单字段
  const fields: Record<string, string> = {}
  let fileData: { filename: string; data: Buffer } | null = null

  for (const part of formData) {
    if (part.filename) {
      fileData = { filename: part.filename, data: part.data }
    } else if (part.name) {
      fields[part.name] = part.data.toString('utf-8')
    }
  }

  const { platform, arch, version } = fields

  // 验证参数
  if (!platform || !VALID_PLATFORMS.includes(platform as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid platform. Must be one of: ${VALID_PLATFORMS.join(', ')}`,
    })
  }

  // android 不需要 arch，其他平台必须提供
  if (platform !== 'android') {
    if (!arch || !VALID_ARCHS.includes(arch as any)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid arch. Must be one of: ${VALID_ARCHS.join(', ')}`,
      })
    }
  }

  if (!version) {
    throw createError({ statusCode: 400, statusMessage: 'Missing "version" field' })
  }

  if (!fileData) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  // 保存文件
  const dir = getPackageDir(platform, platform !== 'android' ? arch : undefined)
  const filePath = resolve(dir, fileData.filename)
  writeFileSync(filePath, fileData.data)

  // 更新清单
  const manifest = readManifest()
  const key = getManifestKey(platform, platform !== 'android' ? arch : undefined)
  manifest[key] = {
    filename: fileData.filename,
    version,
    size: fileData.data.length,
    uploadedAt: new Date().toISOString(),
  }
  writeManifest(manifest)

  return {
    success: true,
    message: 'Package uploaded',
    data: {
      platform,
      arch: platform !== 'android' ? arch : undefined,
      version,
      filename: fileData.filename,
      size: fileData.data.length,
    },
  }
})
