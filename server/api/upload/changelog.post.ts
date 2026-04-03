import { verifyToken, writeChangelog } from '../../utils/storage'

export default defineEventHandler(async (event) => {
  // 验证 Token
  if (!verifyToken(event)) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const body = await readBody(event)

  if (!body?.content || typeof body.content !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing or invalid "content" field' })
  }

  writeChangelog(body.content)

  return { success: true, message: 'Changelog updated' }
})
