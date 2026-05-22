import { sanitizeName, r2Base } from '../../../utils/storage'

export default defineEventHandler((event) => {
  const filename = getRouterParam(event, 'filename')
  if (!filename) {
    throw createError({ statusCode: 400, statusMessage: 'Missing filename' })
  }
  return sendRedirect(event, `${r2Base(event)}/release/${sanitizeName(filename)}`, 302)
})
