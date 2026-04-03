import { resolve } from 'path'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'

// 存储根目录
const STORAGE_ROOT = resolve(process.cwd(), 'storage/uploads')

// 包文件目录
export const PACKAGES_DIR = resolve(STORAGE_ROOT, 'packages')

// 更新日志文件路径
export const CHANGELOG_PATH = resolve(STORAGE_ROOT, 'changelog.md')

// 包清单文件路径
export const MANIFEST_PATH = resolve(STORAGE_ROOT, 'packages.json')

// 允许的平台和架构
export const VALID_PLATFORMS = ['win', 'mac', 'linux', 'android'] as const
export const VALID_ARCHS = ['x64', 'arm64'] as const

export type Platform = typeof VALID_PLATFORMS[number]
export type Arch = typeof VALID_ARCHS[number]

export interface PackageInfo {
  filename: string
  version: string
  size: number
  uploadedAt: string
}

export interface PackageManifest {
  [key: string]: PackageInfo // key: "platform" or "platform-arch"
}

// 确保目录存在
export function ensureDir(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
}

// 读取包清单
export function readManifest(): PackageManifest {
  if (!existsSync(MANIFEST_PATH)) {
    return {}
  }
  return JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'))
}

// 写入包清单
export function writeManifest(manifest: PackageManifest) {
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

// 获取包的存储目录
export function getPackageDir(platform: string, arch?: string): string {
  const dir = arch ? resolve(PACKAGES_DIR, platform, arch) : resolve(PACKAGES_DIR, platform)
  ensureDir(dir)
  return dir
}

// 获取包清单的 key
export function getManifestKey(platform: string, arch?: string): string {
  return arch ? `${platform}-${arch}` : platform
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

  return token === uploadToken
}
