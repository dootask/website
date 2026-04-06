import { verifyToken, saveDraftFile } from '../../utils/storage'

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

  const { version } = fields

  if (!version) {
    throw createError({ statusCode: 400, statusMessage: 'Missing "version" field' })
  }

  if (!fileData) {
    throw createError({ statusCode: 400, statusMessage: 'No file uploaded' })
  }

  // 保存到 draft
  saveDraftFile(version, fileData.filename, fileData.data)

  return {
    success: true,
    message: 'Package uploaded',
    data: {
      filename: fileData.filename,
      size: fileData.data.length,
      version,
    },
  }
})
