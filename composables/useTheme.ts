/**
 * 主题管理 Composable
 * 提供主题切换、初始化和加载功能
 */
export const useTheme = () => {
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
      if (savedTheme) {
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
  const setTheme = (theme: string, lang?: string): void => {
    if (!import.meta.client) return;
    
    const root = document.documentElement;
    if (!lang) {
      lang = localStorage.getItem('language') || themeStore.lang || 'zh';
    }
    
    themeStore.theme = theme;
    themeStore.lang = lang;
    
    root.style.setProperty(
      '--bg-pic1-url',
      `url(/img/${theme}/${lang}_dow_pic1.png)`,
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
  const loadTheme = (lang?: string): void => {
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

