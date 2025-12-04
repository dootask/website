/**
 * 导航管理 Composable
 * 提供路由判断、菜单项生成等功能
 */
export const useNavigation = () => {
  const route = useRoute();
  const { getLocalizedRoutes, t } = useLanguage();
  const { siteUrl } = useAppSiteConfig();

  /**
   * 判断当前路由是否激活
   * @param path - 要检查的路径
   * @returns 如果当前路由包含该路径则返回 true
   */
  const isActiveRoute = (path: string): boolean => {
    return route.path.includes(path);
  };

  /**
   * 生成主菜单项
   * @returns 主菜单项数组
   */
  const getMainMenuItems = () => {
    const routes = getLocalizedRoutes();
    return [
      { text: t('navigation.product'), link: routes.product },
      { text: 'AI', link: routes.ai },
      { text: t('navigation.solution'), link: routes.solutions },
      { text: t('navigation.pricing'), link: routes.pricing },
      { text: t('navigation.appstore'), link: routes.appstore },
    ];
  };

  /**
   * 生成支持菜单项
   * @returns 支持菜单项数组
   */
  const getSupportItems = () => {
    try {
      const routes = getLocalizedRoutes();
      // 安全获取 siteUrl，确保在 SSR 环境下也能正常工作
      const siteUrlValue = siteUrl && typeof siteUrl.value !== 'undefined' 
        ? siteUrl.value 
        : 'https://www.dootask.com';
      
      return [
        {
          text: t('navigation.download'),
          link: routes.download,
        },
        {
          text: t('navigation.help_center'),
          link: `${siteUrlValue}/help/basic/quick-start`,
          target: '_blank',
        },
        {
          text: t('navigation.privacy_policy'),
          link: routes.privacy,
          target: '_blank',
        },
        {
          text: t('navigation.api_docs'),
          link: `${siteUrlValue}/docs/index.html`,
          target: '_blank',
        },
        {
          text: t('navigation.about_us'),
          link: routes.about,
        },
      ];
    } catch {
      // 如果出错，返回基本的菜单项（不包含外部链接）
      const routes = getLocalizedRoutes();
      return [
        {
          text: t('navigation.download'),
          link: routes.download,
        },
        {
          text: t('navigation.privacy_policy'),
          link: routes.privacy,
          target: '_blank',
        },
        {
          text: t('navigation.about_us'),
          link: routes.about,
        },
      ];
    }
  };

  /**
   * 生成主题菜单项
   * @returns 主题菜单项数组
   */
  const getThemeItems = () => {
    return [
      { text: t('theme.light'), value: 'light' },
      { text: t('theme.dark'), value: 'dark' },
    ];
  };

  /**
   * 生成语言菜单项
   * @returns 语言菜单项数组
   */
  const getLanguageItems = () => {
    return [
      { text: t('common.lang_zh'), value: 'zh' as const },
      { text: t('common.lang_en'), value: 'en' as const },
    ];
  };

  return {
    isActiveRoute,
    getMainMenuItems,
    getSupportItems,
    getThemeItems,
    getLanguageItems,
  };
};

