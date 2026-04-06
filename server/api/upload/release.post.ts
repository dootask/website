import { verifyToken, publishRelease } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  if (!verifyToken(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)

  if (!body?.version || typeof body.version !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid "version" field' })
  }

  const result = publishRelease(body.version)

  if (!result.success) {
    throw createError({ statusCode: 400, statusMessage: result.message })
  }

  return { success: true, message: result.message }
})
