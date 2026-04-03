import { readFileSync, existsSync, statSync } from 'node:fs'
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

let _helpDir: string | null = null

function getHelpDir() {
  if (_helpDir) return _helpDir
  const candidates = [
    join(process.cwd(), '.output', 'public', 'help'),
    join(process.cwd(), 'public', 'help'),
  ]
  for (const dir of candidates) {
    if (existsSync(dir) && statSync(dir).isDirectory()) {
      _helpDir = dir
      return dir
    }
  }
  _helpDir = candidates[0]
  return _helpDir
}

function serveFile(event: any, filePath: string) {
  const ext = extname(filePath)
  const contentType = mimeTypes[ext] || 'application/octet-stream'
  setHeader(event, 'Content-Type', contentType)
  if (ext !== '.html') {
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable')
  }
  return readFileSync(filePath)
}

export default defineEventHandler((event) => {
  const path = event.context.params?.path || ''
  const helpDir = getHelpDir()

  const candidates = [
    join(helpDir, path),
    join(helpDir, path + '.html'),
    join(helpDir, path, 'index.html'),
  ]

  for (const filePath of candidates) {
    if (existsSync(filePath) && statSync(filePath).isFile()) {
      return serveFile(event, filePath)
    }
  }

  const notFoundPage = join(helpDir, '404.html')
  if (existsSync(notFoundPage)) {
    setResponseStatus(event, 404)
    setHeader(event, 'Content-Type', 'text/html; charset=utf-8')
    return readFileSync(notFoundPage)
  }

  setResponseStatus(event, 404)
  return 'Not Found'
})
