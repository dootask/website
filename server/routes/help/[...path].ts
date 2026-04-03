import { readFileSync, existsSync } from 'node:fs'
import { join, extname } from 'node:path'

const mimeTypes: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

export default defineEventHandler((event) => {
  const path = event.context.params?.path || ''
  const helpDir = join(process.cwd(), 'public', 'help')

  // Try exact file first, then with .html extension, then as directory index
  const candidates = [
    join(helpDir, path),
    join(helpDir, path + '.html'),
    join(helpDir, path, 'index.html'),
  ]

  for (const filePath of candidates) {
    if (existsSync(filePath)) {
      const ext = extname(filePath)
      const contentType = mimeTypes[ext] || 'application/octet-stream'
      setHeader(event, 'Content-Type', contentType)
      return readFileSync(filePath)
    }
  }

  // Fallback to VitePress 404 page
  const notFoundPage = join(helpDir, '404.html')
  if (existsSync(notFoundPage)) {
    setResponseStatus(event, 404)
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    return readFileSync(notFoundPage)
  }

  setResponseStatus(event, 404)
  return 'Not Found'
})
