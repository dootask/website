// 允许的平台和架构
export const VALID_PLATFORMS = ['win', 'mac', 'linux', 'android'] as const
export const VALID_ARCHS = ['x64', 'arm64'] as const

export type Platform = (typeof VALID_PLATFORMS)[number]
export type Arch = (typeof VALID_ARCHS)[number]

// 清理文件名，防止路径遍历（用于拼接 R2 公开地址）
export function sanitizeName(name: string): string {
  const sanitized = name.replace(/[/\\]/g, '_').replace(/^\.+/, '_')
  if (!sanitized || sanitized === '.' || sanitized === '..') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid name' })
  }
  return sanitized
}

// 取 R2 公开 base（去尾斜杠）
export function r2Base(event: any): string {
  const base = useRuntimeConfig(event).public.r2PublicUrl || ''
  if (!base) {
    throw createError({ statusCode: 500, statusMessage: 'R2_PUBLIC_URL not configured' })
  }
  return base.replace(/\/+$/, '')
}
