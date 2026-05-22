import type { H3Event } from 'h3'

// 根据浏览器 Accept-Language 选择下载页语言并 302 跳转
// 能明确判断为中文 → /zh/download，其余一律 → /en/download
export function redirectToLocalizedDownload(event: H3Event) {
  const acceptLanguage = getRequestHeader(event, 'accept-language') || ''
  const target = isChinesePreferred(acceptLanguage) ? '/zh/download' : '/en/download'
  return sendRedirect(event, target, 302)
}

// 解析 Accept-Language，按 q 值取最优先的语言，判断是否为中文
function isChinesePreferred(acceptLanguage: string): boolean {
  const top = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';')
      const qParam = params.map((p) => p.trim()).find((p) => p.startsWith('q='))
      const quality = qParam ? parseFloat(qParam.slice(2)) : 1
      return { tag: tag.toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality }
    })
    .filter((item) => item.tag)
    .sort((a, b) => b.quality - a.quality)[0]

  return !!top && top.tag.startsWith('zh')
}
