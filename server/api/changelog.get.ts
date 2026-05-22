import { r2Base } from '../utils/storage'

export default defineEventHandler(async (event) => {
  const base = r2Base(event)
  const updateLog = await $fetch<string>(`${base}/changelog.md`, {
    responseType: 'text',
  }).catch(() => '')

  // 保持与原外部 API 相同的响应格式
  return {
    data: {
      updateLog,
    },
  }
})
