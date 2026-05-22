import { redirectToLocalizedDownload } from '../../utils/locale'

// /api/download/update → 按浏览器语言 302 到下载页
export default defineEventHandler((event) => redirectToLocalizedDownload(event))
