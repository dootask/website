import { defineStore } from 'pinia';

interface ThemeStore {
  theme: string;
  lang: string;
}

/**
 * 主题 Store
 * 仅用于存储主题和语言状态
 * 所有业务逻辑请使用 useTheme 和 useLanguage composables
 * 
 * 注意：这个 Store 只负责状态存储，不包含任何业务逻辑
 */
export const useThemeStore = defineStore('themeStore', {
  state: (): ThemeStore => ({
    theme: 'light',
    lang: 'zh',
  }),
  // 移除了所有 actions，业务逻辑已迁移到 composables
});
