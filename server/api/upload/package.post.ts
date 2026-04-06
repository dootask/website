import { verifyToken, saveDraftFile, VALID_PLATFORMS, VALID_ARCHS } from '../../utils/storage'

export default defineEventHandler(async (event) => {
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

  // version 必填
  if (!version) {
    throw createError({ statusCode: 400, statusMessage: 'Missing "version" field' })
  }

  if (!fileData) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  // 有 platform 时校验（安装包），无 platform 时为辅助文件
  const meta: { platform?: string; arch?: string } = {}

  if (platform) {
    if (!VALID_PLATFORMS.includes(platform as any)) {
      throw createError({
        statusCode: 400,
        statusMessage: `Invalid platform. Must be one of: ${VALID_PLATFORMS.join(', ')}`,
      })
    }
    meta.platform = platform

    // android 不需要 arch，其他平台必须提供
    if (platform !== 'android') {
      if (!arch || !VALID_ARCHS.includes(arch as any)) {
        throw createError({
          statusCode: 400,
          statusMessage: `Invalid arch. Must be one of: ${VALID_ARCHS.join(', ')}`,
        })
      }
      meta.arch = arch
    }
  }

  // 保存到 draft
  await saveDraftFile(version, fileData.filename, fileData.data, meta)

  return {
    success: true,
    message: 'Package uploaded',
    data: {
      filename: fileData.filename,
      size: fileData.data.length,
      platform: meta.platform,
      arch: meta.arch,
      version,
    },
  }
})
