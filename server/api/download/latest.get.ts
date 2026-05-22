import { VALID_PLATFORMS, VALID_ARCHS, r2Base } from '../../utils/storage'

interface ReleaseIndex {
  version: string
  files: Record<string, Record<string, string>>
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const platform = (query.platform as string) || ''
  const arch = query.arch as string | undefined

  if (!VALID_PLATFORMS.includes(platform as any)) {
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

  const base = r2Base(event)
  const index = await $fetch<ReleaseIndex>(`${base}/release/index.json`, {
    responseType: 'json',
  }).catch(() => null)

  if (!index?.files?.[platform]) {
    throw createError({ statusCode: 404, statusMessage: 'No package found for this platform' })
  }

  const archKey = platform === 'android' ? 'default' : (arch || 'default')
  const filename = index.files[platform][archKey]
  if (!filename) {
    throw createError({ statusCode: 404, statusMessage: 'No package found for this platform/arch' })
  }

  return sendRedirect(event, `${base}/release/${filename}`, 302)
})
