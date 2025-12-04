import type { UseThemeReturn, Theme, Language } from '../types/theme';

/**
 * 验证主题值是否为有效的 Theme 类型
 */
const isValidTheme = (value: string): value is Theme => {
  return value === 'light' || value === 'dark';
};

/**
 * 主题管理 Composable
 * 提供主题切换、初始化和加载功能
 * @returns {UseThemeReturn} 主题管理相关的函数和响应式数据
 */
export const useTheme = (): UseThemeReturn => {
  const themeStore = useThemeStore();
  
  // 响应式的主题 ref
  const theme = computed(() => themeStore.theme);
  
  // 响应式的语言 ref
  const lang = computed(() => themeStore.lang);

  /**
   * 初始化主题
   * 从 sessionStorage 读取保存的主题并应用
   */
  const initializeTheme = () => {
    if (import.meta.client) {
      const savedTheme = sessionStorage.getItem('theme') || 'light';
      if (savedTheme && isValidTheme(savedTheme)) {
        themeStore.theme = savedTheme;
        document.documentElement.setAttribute('data-theme', savedTheme);
      }
    }
  };

  /**
   * 设置主题
   * @param theme - 主题名称 ('light' | 'dark')
   * @param lang - 可选的语言代码，如果不提供则从 localStorage 读取
   */
  const setTheme = (theme: Theme, lang?: Language): void => {
    if (!import.meta.client) return;
    
    const root = document.documentElement;
    const finalLang: Language = lang || (localStorage.getItem('language') as Language) || themeStore.lang || 'zh';
    
    themeStore.theme = theme;
    themeStore.lang = finalLang;
    
    root.style.setProperty(
      '--bg-pic1-url',
      `url(/img/${theme}/${finalLang}_dow_pic1.png)`,
    );

    // 保存主题到 sessionStorage
    sessionStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  /**
   * 加载主题
   * 从 sessionStorage 读取保存的主题并应用
   * @param lang - 可选的语言代码
   */
  const loadTheme = (lang?: Language): void => {
    if (!import.meta.client) return;
    
    const savedTheme = sessionStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setTheme('dark', lang);
    } else {
      setTheme('light', lang);
    }
  };

  return {
    theme,
    lang,
    initializeTheme,
    setTheme,
    loadTheme,
  };
};

