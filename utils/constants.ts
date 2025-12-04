/**
 * 项目常量定义
 * 包含 API 基础 URL、路由常量、配置常量等
 */

// API 基础 URL
export const API_BASE_URL = process.env.API_BASE_URL || ''

// 路由常量
export const ROUTES = {
  HOME: '/',
  PRODUCT: '/product',
  PRICE: '/price',
  SOLUTIONS: '/solutions',
  AI: '/ai',
  DOWNLOAD: '/download',
  ABOUT: '/about',
  APPSTORE: '/appstore',
  AD: '/ad',
  LOG: '/log',
  PRIVACY: '/privacy',
  COOKIE: '/cookie',
} as const

// 其他配置常量
export const SITE_CONFIG = {
  SITE_URL: process.env.SITE_URL || '',
  SITE_NAME: 'DooTask',
} as const

