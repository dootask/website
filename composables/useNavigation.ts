import type { UseNavigationReturn, ThemeMenuItem, LanguageMenuItem } from '../types/navigation';

/**
 * 导航管理 Composable
 * 提供路由判断、菜单项生成等功能
 * @returns {UseNavigationReturn} 导航管理相关的函数
 */
export const useNavigation = (): UseNavigationReturn => {
  const route = useRoute();
  const { getLocalizedRoutes, t } = useLanguage();

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
      return [
        {
          text: t('navigation.download'),
          link: routes.download,
        },
        {
          text: t('navigation.help_center'),
          link: '/help/basic/quick-start',
          target: '_blank',
        },
        {
          text: t('navigation.privacy_policy'),
          link: routes.privacy,
          target: '_blank',
        },
        {
          text: t('navigation.api_docs'),
          link: 'https://demo.dootask.com/docs/index.html',
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
  const getThemeItems = (): ThemeMenuItem[] => {
    return [
      { text: t('theme.light'), value: 'light' as const },
      { text: t('theme.dark'), value: 'dark' as const },
    ];
  };

  /**
   * 生成语言菜单项
   * @returns 语言菜单项数组
   */
  const getLanguageItems = (): LanguageMenuItem[] => {
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

