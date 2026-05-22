import { redirectToLocalizedDownload } from '../../../utils/locale'

// /api/download/update/latest → 按浏览器语言 302 到下载页
// 静态路由优先级高于同级动态路由 [filename]，因此 latest 字面量不会再走文件下载
export default defineEventHandler((event) => redirectToLocalizedDownload(event))
