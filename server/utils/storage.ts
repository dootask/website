import { resolve } from 'path'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  renameSync,
  rmSync,
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

// 包清单文件路径
export const MANIFEST_PATH = resolve(STORAGE_ROOT, 'manifest.json')

// 允许的平台和架构
export const VALID_PLATFORMS = ['win', 'mac', 'linux', 'android'] as const
export const VALID_ARCHS = ['x64', 'arm64'] as const

export type Platform = (typeof VALID_PLATFORMS)[number]
export type Arch = (typeof VALID_ARCHS)[number]

export interface FileInfo {
  platform?: string
  arch?: string
  size: number
  uploadedAt: string
}

export interface VersionEntry {
  version: string
  files: Record<string, FileInfo>
}

export interface Manifest {
  draft: VersionEntry | null
  release: VersionEntry | null
}

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

// 读取 manifest
export function readManifest(): Manifest {
  if (!existsSync(MANIFEST_PATH)) {
    return { draft: null, release: null }
  }
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'))
  } catch {
    console.warn('Failed to parse manifest.json, returning default')
    return { draft: null, release: null }
  }
}

// 写入 manifest
export function writeManifest(manifest: Manifest) {
  ensureDir(STORAGE_ROOT)
  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8')
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

// 获取 draft 版本的存储目录
export function getDraftDir(version: string): string {
  const dir = resolve(DRAFT_DIR, sanitizeName(version))
  ensureDir(dir)
  return dir
}

// 获取 release 版本的存储目录
export function getReleaseDir(version: string): string {
  return resolve(RELEASE_DIR, sanitizeName(version))
}

// 安全删除目录
function removeDir(dir: string) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true })
  }
}

// 保存文件到 draft 并更新 manifest
export function saveDraftFile(
  version: string,
  filename: string,
  data: Buffer,
  meta: { platform?: string; arch?: string }
): void {
  const manifest = readManifest()

  // 如果 draft 版本不同，清除旧 draft
  if (manifest.draft && manifest.draft.version !== version) {
    removeDir(resolve(DRAFT_DIR, manifest.draft.version))
    manifest.draft = null
  }

  // 初始化 draft entry
  if (!manifest.draft) {
    manifest.draft = { version, files: {} }
  }

  // 保存文件
  const dir = getDraftDir(version)
  const safeFilename = sanitizeName(filename)
  const filePath = resolve(dir, safeFilename)
  writeFileSync(filePath, data)

  // 更新 manifest
  const fileInfo: FileInfo = {
    size: data.length,
    uploadedAt: new Date().toISOString(),
  }
  if (meta.platform) {
    fileInfo.platform = meta.platform
    if (meta.arch) {
      fileInfo.arch = meta.arch
    }
  }
  manifest.draft.files[safeFilename] = fileInfo
  writeManifest(manifest)
}

// 将 draft 发布为 release
export function publishRelease(version: string): { success: boolean; message: string } {
  const safeVersion = sanitizeName(version)
  const manifest = readManifest()

  if (!manifest.draft) {
    return { success: false, message: 'No draft version found' }
  }
  if (manifest.draft.version !== safeVersion) {
    return {
      success: false,
      message: `Draft version is ${manifest.draft.version}, not ${safeVersion}`,
    }
  }

  const draftPath = resolve(DRAFT_DIR, safeVersion)
  if (!existsSync(draftPath)) {
    return { success: false, message: 'Draft directory not found' }
  }

  // 清除旧 release
  if (manifest.release) {
    removeDir(resolve(RELEASE_DIR, manifest.release.version))
  }

  // 移动 draft → release
  const releasePath = resolve(RELEASE_DIR, safeVersion)
  ensureDir(RELEASE_DIR)
  renameSync(draftPath, releasePath)

  // 更新 manifest
  manifest.release = manifest.draft
  manifest.draft = null
  writeManifest(manifest)

  return { success: true, message: 'Release published' }
}

// 查找 release 中匹配的安装包文件名
export function findReleasePackage(platform: string, arch?: string): string | null {
  const manifest = readManifest()
  if (!manifest.release) return null

  for (const [filename, info] of Object.entries(manifest.release.files)) {
    if (info.platform === platform) {
      if (platform === 'android' || info.arch === arch) {
        return filename
      }
    }
  }
  return null
}

// 获取 release 中的文件路径（按文件名查找）
export function getReleaseFilePath(filename: string): string | null {
  const safeFilename = sanitizeName(filename)
  const manifest = readManifest()
  if (!manifest.release) return null

  if (!manifest.release.files[safeFilename]) return null

  const filePath = resolve(RELEASE_DIR, manifest.release.version, safeFilename)
  if (!existsSync(filePath)) return null

  return filePath
}

// 获取文件流和元信息
export function getFileStream(filePath: string): {
  stream: ReadStream
  size: number
  filename: string
} {
  const stat = statSync(filePath)
  return {
    stream: createReadStream(filePath),
    size: stat.size,
    filename: filePath.split('/').pop()!,
  }
}

// 根据扩展名获取 Content-Type
export function getContentType(filename: string): string {
  if (/\.ya?ml$/i.test(filename)) return 'text/yaml'
  if (/\.json$/i.test(filename)) return 'application/json'
  if (/\.blockmap$/i.test(filename)) return 'application/octet-stream'
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
