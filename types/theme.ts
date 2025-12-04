/**
 * 主题相关类型定义
 * @module types/theme
 */

import type { ComputedRef } from 'vue';

/**
 * 主题类型
 * @typedef {'light' | 'dark'} Theme
 */
export type Theme = 'light' | 'dark';

/**
 * 语言类型
 * @typedef {'zh' | 'en'} Language
 */
export type Language = 'zh' | 'en';

/**
 * 主题 Store 状态接口
 */
export interface ThemeStoreState {
  /** 当前主题 */
  theme: Theme;
  /** 当前语言 */
  lang: Language;
}

/**
 * 主题 Composable 返回值类型
 */
export interface UseThemeReturn {
  /** 响应式的主题 ref */
  theme: ComputedRef<Theme>;
  /** 响应式的语言 ref */
  lang: ComputedRef<Language>;
  /** 初始化主题 */
  initializeTheme: () => void;
  /** 设置主题 */
  setTheme: (theme: Theme, lang?: Language) => void;
  /** 加载主题 */
  loadTheme: (lang?: Language) => void;
}

