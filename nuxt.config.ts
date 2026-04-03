//nuxt.config.ts
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
  nitro: {
    plugins: ['~/server/plugins/playwright.server.ts'],
  },
  css: ['~/assets/scss/theme.scss'],
  app: {
    head: {
      title: 'DooTask - 协作项目管理工具',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content:
            'DooTask是一款轻量级的开源在线项目任务管理工具，提供各类文档协作工具、在线思维导图、在线流程图、项目管理、任务分发、即时IM，文件管理等工具。助力团队高效推进项目，让工作更简单。',
        },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'keywords',
          content:
            '中国 DooTask 开源在线项目 任务管理工具 任务管理 轻量级 海豚有海 团队协作',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/favicon.ico' }],
    },
  },
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxtjs/seo',
    'nuxt-gtag',
  ],
  // SEO配置
  seo: {},
  site: {
    url: 'https://www.dootask.com',
    name: 'DooTask',
    defaultLocale: 'zh',
    cacheMaxAgeSeconds: 1 * 3600, // 缓存时间设置为1小时
    autoLastmod: true,
  },
  runtimeConfig: {
    uploadToken: process.env.UPLOAD_TOKEN || '',
    public: {
      siteUrl: 'https://www.dootask.com'
    }
  },
  robots: {
    disallow: ['/cookie', '/privacy', '/ad'],
  },
  sitemap: {
    cacheMaxAgeSeconds: 3600, // 缓存时间设置为1小时
  },
  ogImage: {
    defaults: {
      renderer: 'chromium',
    },
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'zh', iso: 'zh-CN', name: '简体中文' },
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_and_default', // 语言前缀策略
    vueI18n: './i18n.config.ts',
  },
  gtag: {
    enabled: true,
    tags: [
      {
        id: 'G-PE77P6491J', // Google Analytics ID
        config: {
          anonymize_ip: true, // 例如：匿名化 IP 地址
        },
      },
      {
        id: 'AW-16660800396', // Google Ads ID
        config: {
          // 可以添加 Google Ads 相关的配置
        },
      },
    ],
  },
  router: {
    options: {
      strict: false, // 允许更灵活的路由匹配
    },
  },
  generate: {
    // routes: ['/zh', '/en'], // 生成的语言版本页面
  },
  eslint: {},
});
