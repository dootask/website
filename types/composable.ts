/**
 * Composable 返回值类型定义
 * @module types/composable
 */

import type { LocalizedRoutes } from './navigation';
import type { Language } from './theme';
import type { ComputedRef } from 'vue';

/**
 * 语言管理 Composable 返回值类型
 */
export interface UseLanguageReturn {
  /** 响应式的语言 ref */
  locale: ComputedRef<string>;
  /** 切换语言 */
  switchLanguage: (lang: Language) => Promise<void>;
  /** 生成带语言前缀的路由路径 */
  getLocalizedRoute: (path: string) => string;
  /** 生成所有主要路由的本地化路径 */
  getLocalizedRoutes: () => LocalizedRoutes;
  /** 翻译函数 */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string, ...args: any[]) => string;
}

/**
 * 站点配置 Composable 返回值类型
 */
export interface UseAppSiteConfigReturn {
  /** 站点 URL */
  siteUrl: ComputedRef<string>;
  /** 站点名称 */
  siteName: ComputedRef<string>;
  /** API 基础 URL */
  apiBaseUrl: ComputedRef<string>;
}

