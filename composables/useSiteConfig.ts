import type { UseAppSiteConfigReturn } from '../types/composable';

/**
 * 站点配置 Composable
 * 提供统一的站点配置访问接口
 * @returns {UseAppSiteConfigReturn} 站点配置相关的响应式数据
 */
export const useAppSiteConfig = (): UseAppSiteConfigReturn => {
  // 默认站点 URL
  const DEFAULT_SITE_URL = 'https://www.dootask.com';
  // 默认 Demo（在线体验）URL
  const DEFAULT_DEMO_URL = 'https://demo.dootask.com';

  /**
   * 站点 URL
   */
  const siteUrl = computed(() => {
    try {
      // 在 SSR 和客户端环境下，useRuntimeConfig 都应该可用
      const config = useRuntimeConfig();
      const url = config?.public?.siteUrl;
      
      // 确保返回有效的 URL 字符串
      if (url && typeof url === 'string' && url.trim() !== '') {
        return url;
      }
      
      return DEFAULT_SITE_URL;
    } catch (error) {
      // 如果 useRuntimeConfig 不可用或出错，返回默认值
      console.warn('Failed to get siteUrl from runtime config, using default:', error);
      return DEFAULT_SITE_URL;
    }
  });

  /**
   * Demo（在线体验）URL
   * 来自环境变量 DEMO_URL，默认 https://demo.dootask.com，已去除结尾斜杠便于拼接路径
   */
  const demoUrl = computed(() => {
    try {
      const config = useRuntimeConfig();
      const url = config?.public?.demoUrl;

      const value = url && typeof url === 'string' && url.trim() !== '' ? url : DEFAULT_DEMO_URL;
      return value.replace(/\/+$/, '');
    } catch (error) {
      console.warn('Failed to get demoUrl from runtime config, using default:', error);
      return DEFAULT_DEMO_URL;
    }
  });

  /**
   * SaaS 服务 URL
   * 仅来自环境变量 SAAS_URL，未配置时返回空字符串（用于决定是否显示 SaaS 相关菜单）
   */
  const saasUrl = computed(() => {
    try {
      const config = useRuntimeConfig();
      const url = config?.public?.saasUrl;

      if (url && typeof url === 'string' && url.trim() !== '') {
        return url;
      }

      return '';
    } catch (error) {
      console.warn('Failed to get saasUrl from runtime config:', error);
      return '';
    }
  });

  /**
   * 站点名称
   */
  const siteName = computed(() => {
    return 'DooTask';
  });

  /**
   * API 基础 URL
   */
  const apiBaseUrl = computed(() => {
    return process.env.API_BASE_URL || '';
  });

  return {
    siteUrl,
    demoUrl,
    saasUrl,
    siteName,
    apiBaseUrl,
  };
};

