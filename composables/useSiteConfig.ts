import type { UseAppSiteConfigReturn } from '../types/composable';

/**
 * 站点配置 Composable
 * 提供统一的站点配置访问接口
 * @returns {UseAppSiteConfigReturn} 站点配置相关的响应式数据
 */
export const useAppSiteConfig = (): UseAppSiteConfigReturn => {
  // 默认站点 URL
  const DEFAULT_SITE_URL = 'https://www.dootask.com';

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
    siteName,
    apiBaseUrl,
  };
};

