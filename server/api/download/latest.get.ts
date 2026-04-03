import { resolve } from 'path'
import { existsSync, createReadStream, statSync } from 'fs'
import {
  readManifest,
  getManifestKey,
  PACKAGES_DIR,
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

  const manifest = readManifest()
  const key = getManifestKey(platform, platform !== 'android' ? arch : undefined)
  const pkg = manifest[key]

  if (!pkg) {
    throw createError({ statusCode: 404, statusMessage: 'No package found for this platform/arch' })
  }

  // 构建文件路径
  const dir = platform !== 'android' && arch ? resolve(PACKAGES_DIR, platform, arch) : resolve(PACKAGES_DIR, platform)
  const filePath = resolve(dir, pkg.filename)

  if (!existsSync(filePath)) {
    throw createError({ statusCode: 404, statusMessage: 'Package file not found' })
  }

  const stat = statSync(filePath)

  // 设置下载响应头
  setHeaders(event, {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': `attachment; filename="${encodeURIComponent(pkg.filename)}"`,
    'Content-Length': String(stat.size),
  })

  return sendStream(event, createReadStream(filePath))
})
