import { resolve } from 'path'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  renameSync,
  rmSync,
  readdirSync,
  statSync,
  createReadStream,
} from 'fs'
import type { ReadStream } from 'fs'
import { timingSafeEqual } from 'crypto'

// 存储根目录
const STORAGE_ROOT = resolve(process.cwd(), 'storage/uploads')

// draft 和 release 目录
export const DRAFT_DIR = resolve(STORAGE_ROOT, 'draft')
export const RELEASE_DIR = resolve(STORAGE_ROOT, 'release')

// 更新日志文件路径
export const CHANGELOG_PATH = resolve(STORAGE_ROOT, 'changelog.md')

// 版本记录文件
export const MANIFEST_PATH = resolve(STORAGE_ROOT, 'manifest.json')

// 允许的平台和架构
export const VALID_PLATFORMS = ['win', 'mac', 'linux', 'android'] as const
export const VALID_ARCHS = ['x64', 'arm64'] as const

export type Platform = (typeof VALID_PLATFORMS)[number]
export type Arch = (typeof VALID_ARCHS)[number]

interface VersionInfo {
  draft: string | null
  release: string | null
}

// 安装包扩展名
const INSTALLER_EXTS = ['.dmg', '.exe', '.msi', '.appimage', '.deb', '.rpm', '.apk', '.pkg', '.zip']

// 清理文件名/版本号，防止路径遍历
function sanitizeName(name: string): string {
  const sanitized = name.replace(/[/\\]/g, '_').replace(/^\.+/, '_')
  if (!sanitized || sanitized === '.' || sanitized === '..') {
    throw new Error('Invalid name')
  }
  return sanitized
}

// 确保目录存在
export function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

// 读取版本信息
function readVersionInfo(): VersionInfo {
  if (!existsSync(MANIFEST_PATH)) {
    return { draft: null, release: null }
  }
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'))
  } catch {
    return { draft: null, release: null }
  }
}

// 写入版本信息
function writeVersionInfo(info: VersionInfo) {
  ensureDir(STORAGE_ROOT)
  writeFileSync(MANIFEST_PATH, JSON.stringify(info, null, 2), 'utf-8')
}

// 安全删除目录
function removeDir(dir: string) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true })
  }
}

// 从文件名解析 platform 和 arch
function parseFilename(filename: string): { platform: string; arch: string | null } | null {
  const lower = filename.toLowerCase()

  // Android APK
  if (lower.endsWith('.apk')) {
    return { platform: 'android', arch: null }
  }

  // 检查是否为安装包
  if (!INSTALLER_EXTS.some((ext) => lower.endsWith(ext))) {
    return null
  }

  // 解析 platform
  let platform: string | null = null
  if (/-mac-/i.test(filename) || lower.endsWith('.dmg') || lower.endsWith('.pkg')) {
    platform = 'mac'
  } else if (/-win-/i.test(filename) || /-win\./i.test(filename) || lower.endsWith('.msi')) {
    platform = 'win'
  } else if (/-linux-/i.test(filename) || lower.endsWith('.appimage') || lower.endsWith('.deb') || lower.endsWith('.rpm')) {
    platform = 'linux'
  }

  if (!platform) return null

  // 解析 arch
  let arch: string | null = null
  if (/-arm64[.-]/i.test(filename)) arch = 'arm64'
  else if (/-x64[.-]/i.test(filename)) arch = 'x64'

  return { platform, arch }
}

// 读取更新日志
export function readChangelog(): string {
  if (!existsSync(CHANGELOG_PATH)) {
    return ''
  }
  return readFileSync(CHANGELOG_PATH, 'utf-8')
}

// 写入更新日志
export function writeChangelog(content: string) {
  ensureDir(STORAGE_ROOT)
  writeFileSync(CHANGELOG_PATH, content, 'utf-8')
}

// 保存文件到 draft
export function saveDraftFile(version: string, filename: string, data: Buffer): void {
  const info = readVersionInfo()

  // 如果 draft 版本不同，清除旧 draft
  if (info.draft && info.draft !== version) {
    removeDir(resolve(DRAFT_DIR, info.draft))
  }

  // 更新版本号
  info.draft = version
  writeVersionInfo(info)

  // 保存文件
  const dir = resolve(DRAFT_DIR, sanitizeName(version))
  ensureDir(dir)
  const filePath = resolve(dir, sanitizeName(filename))
  writeFileSync(filePath, data)
}

// 将 draft 发布为 release
export function publishRelease(version: string): { success: boolean; message: string } {
  const safeVersion = sanitizeName(version)
  const info = readVersionInfo()

  if (!info.draft) {
    return { success: false, message: 'No draft version found' }
  }
  if (info.draft !== safeVersion) {
    return { success: false, message: `Draft version is ${info.draft}, not ${safeVersion}` }
  }

  const draftPath = resolve(DRAFT_DIR, safeVersion)
  if (!existsSync(draftPath)) {
    return { success: false, message: 'Draft directory not found' }
  }

  // 清除旧 release
  if (info.release) {
    removeDir(resolve(RELEASE_DIR, info.release))
  }

  // 移动 draft → release
  const releasePath = resolve(RELEASE_DIR, safeVersion)
  ensureDir(RELEASE_DIR)
  renameSync(draftPath, releasePath)

  // 更新版本号
  info.release = safeVersion
  info.draft = null
  writeVersionInfo(info)

  return { success: true, message: 'Release published' }
}

// 获取当前 release 版本的目录路径
function getReleaseVersionDir(): string | null {
  const info = readVersionInfo()
  if (!info.release) return null
  const dir = resolve(RELEASE_DIR, info.release)
  if (!existsSync(dir)) return null
  return dir
}

// 扫描 release 目录查找匹配的安装包
export function findReleasePackage(platform: string, arch?: string): string | null {
  const dir = getReleaseVersionDir()
  if (!dir) return null

  const files = readdirSync(dir)
  for (const filename of files) {
    const parsed = parseFilename(filename)
    if (!parsed) continue
    if (parsed.platform === platform) {
      if (platform === 'android' || parsed.arch === arch) {
        return filename
      }
    }
  }
  return null
}

// 获取 release 中的文件路径（按文件名查找）
export function getReleaseFilePath(filename: string): string | null {
  const dir = getReleaseVersionDir()
  if (!dir) return null

  const safeFilename = sanitizeName(filename)
  const filePath = resolve(dir, safeFilename)
  if (!existsSync(filePath)) return null

  return filePath
}

// 获取文件流和元信息
export function getFileStream(filePath: string): {
  stream: ReadStream
  size: number
} {
  const stat = statSync(filePath)
  return {
    stream: createReadStream(filePath),
    size: stat.size,
  }
}

// 根据扩展名获取 Content-Type
export function getContentType(filename: string): string {
  if (/\.ya?ml$/i.test(filename)) return 'text/yaml'
  if (/\.json$/i.test(filename)) return 'application/json'
  return 'application/octet-stream'
}

// 验证上传 Token
export function verifyToken(event: any): boolean {
  const config = useRuntimeConfig(event)
  const uploadToken = config.uploadToken

  if (!uploadToken) {
    return false
  }

  const authorization = getHeader(event, 'authorization') || ''
  const token = authorization.replace(/^Bearer\s+/i, '')

  const tokenBuf = Buffer.from(token)
  const expectedBuf = Buffer.from(uploadToken)
  if (tokenBuf.length !== expectedBuf.length) {
    return false
  }
  return timingSafeEqual(tokenBuf, expectedBuf)
}

// 从 release 目录提供文件下载
export function serveReleaseFile(event: any, filename: string) {
  const safeName = sanitizeName(filename)
  const filePath = getReleaseFilePath(safeName)
  if (!filePath) {
    throw createError({ statusCode: 404, statusMessage: 'File not found' })
  }

  const { stream, size } = getFileStream(filePath)
  const contentType = getContentType(safeName)

  setHeaders(event, {
    'Content-Type': contentType,
    'Content-Disposition': `attachment; filename="${encodeURIComponent(safeName)}"`,
    'Content-Length': String(size),
  })

  return sendStream(event, stream)
}
