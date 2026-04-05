import {
  findReleasePackage,
  getReleaseFilePath,
  getFileStream,
  VALID_PLATFORMS,
  VALID_ARCHS,
} from '../../utils/storage'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const platform = query.platform as string
  const arch = query.arch as string | undefined

  if (!platform || !VALID_PLATFORMS.includes(platform as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid platform. Must be one of: ${VALID_PLATFORMS.join(', ')}`,
    })
  }

  if (platform !== 'android' && arch && !VALID_ARCHS.includes(arch as any)) {
    throw createError({
      statusCode: 400,
      statusMessage: `Invalid arch. Must be one of: ${VALID_ARCHS.join(', ')}`,
    })
  }

  // 查找匹配的安装包
  const filename = findReleasePackage(platform, platform !== 'android' ? arch : undefined)
  if (!filename) {
    throw createError({ statusCode: 404, statusMessage: 'No package found for this platform/arch' })
  }

  // 获取文件路径
  const filePath = getReleaseFilePath(filename)
  if (!filePath) {
    throw createError({ statusCode: 404, statusMessage: 'Package file not found' })
  }

  const { stream, size } = getFileStream(filePath)

  setHeaders(event, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
    'Content-Length': String(size),
  })

  return sendStream(event, stream)
})
