/**
 * 语言管理 Composable
 * 提供语言切换和本地化路由生成功能
 */
export const useLanguage = () => {
  const { locale, setLocale, t } = useI18n();
  const themeStore = useThemeStore();

  /**
   * 切换语言
   * @param lang - 语言代码 ('zh' | 'en')
   */
  const switchLanguage = async (lang: 'zh' | 'en') => {
    await setLocale(lang);
    // 更新 themeStore 中的语言
    themeStore.lang = lang;
    // 保存到 localStorage
    localStorage.setItem('language', lang);
    // 重新加载主题以更新背景图片
    const { loadTheme } = useTheme();
    loadTheme(lang);
  };

  /**
   * 生成带语言前缀的路由路径
   * @param path - 路由路径（不包含语言前缀）
   * @returns 带语言前缀的完整路径
   */
  const getLocalizedRoute = (path: string): string => {
    // 移除开头的斜杠（如果有）
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    return `/${locale.value}/${cleanPath}`;
  };

  /**
   * 生成所有主要路由的本地化路径
   * @returns 包含所有主要路由的对象
   */
  const getLocalizedRoutes = () => {
    return {
      home: getLocalizedRoute(''),
      product: getLocalizedRoute('product'),
      solutions: getLocalizedRoute('solutions'),
      ai: getLocalizedRoute('ai'),
      pricing: getLocalizedRoute('price'),
      about: getLocalizedRoute('about'),
      download: getLocalizedRoute('download'),
      privacy: getLocalizedRoute('privacy'),
      appstore: getLocalizedRoute('appstore'),
    };
  };

  return {
    locale: computed(() => locale.value),
    switchLanguage,
    getLocalizedRoute,
    getLocalizedRoutes,
    t,
  };
};

