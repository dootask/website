import { readChangelog } from '../utils/storage'

export default defineEventHandler(() => {
  const changelog = readChangelog()

  // 保持与原外部 API 相同的响应格式
  return {
    data: {
      updateLog: changelog
    }
  }
})
