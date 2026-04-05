import { serveReleaseFile } from '../../../utils/storage'

export default defineEventHandler((event) => {
  const filename = getRouterParam(event, 'filename')
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: 'Missing filename' })
  }
  return serveReleaseFile(event, filename)
})
