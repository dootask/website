/**
 * 导航相关类型定义
 * @module types/navigation
 */

/**
 * 菜单项接口
 */
export interface MenuItem {
  /** 菜单文本 */
  text: string;
  /** 菜单链接 */
  link: string;
  /** 链接目标（可选） */
  target?: string;
}

/**
 * 主题菜单项接口
 */
export interface ThemeMenuItem {
  /** 菜单文本 */
  text: string;
  /** 主题值 */
  value: 'light' | 'dark';
}

/**
 * 语言菜单项接口
 */
export interface LanguageMenuItem {
  /** 菜单文本 */
  text: string;
  /** 语言值 */
  value: 'zh' | 'en';
}

/**
 * 本地化路由对象接口
 */
export interface LocalizedRoutes {
  /** 首页路由 */
  home: string;
  /** 产品页路由 */
  product: string;
  /** 解决方案页路由 */
  solutions: string;
  /** AI 页路由 */
  ai: string;
  /** 价格页路由 */
  pricing: string;
  /** 关于页路由 */
  about: string;
  /** 下载页路由 */
  download: string;
  /** 隐私政策页路由 */
  privacy: string;
  /** 应用商店页路由 */
  appstore: string;
}

/**
 * 导航 Composable 返回值类型
 */
export interface UseNavigationReturn {
  /** 判断当前路由是否激活 */
  isActiveRoute: (path: string) => boolean;
  /** 生成主菜单项 */
  getMainMenuItems: () => MenuItem[];
  /** 生成支持菜单项 */
  getSupportItems: () => MenuItem[];
  /** 生成主题菜单项 */
  getThemeItems: () => ThemeMenuItem[];
  /** 生成语言菜单项 */
  getLanguageItems: () => LanguageMenuItem[];
}

