import { defineConfig } from "vitepress";

export const sharedConfig = defineConfig({
  base: "/help/",
  rewrites: {
    "zh/:rest*": ":rest*",
  },
  metaChunk: true,
  lang: "zh-CN", // 语言
  title: "DooTask 帮助文档", // 站点名称
  description: "DooTask 帮助文档", // 站点描述
  cleanUrls: true,
  head: [
    // favicon.ico 图标等
    ["link", { rel: "shortcut icon", href: `/help/logo.svg` }],
    // 网站 favicon.ico 图标
    ["link", { rel: "icon", href: `/help//logo.svg`, type: "image/svg+xml" }],
    [
      "meta",
      {
        name: "viewport",
        content:
          "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,shrink-to-fit=no",
      },
    ],
    // 关键词和描述
    ["meta", { name: "keywords", content: "DooTask,帮助" }],
  ],
  appearance: true, // 主题模式，默认浅色且开启切换
  lastUpdated: false, // 上次更新
  vite: {
    build: {
      chunkSizeWarningLimit: 1600,
    },
    plugins: [],
    server: {
      port: 5173,
    },
  },
  //   markdown: { // markdown 配置
  //     math: true,
  //     lineNumbers: true, // 行号显示
  //     image: {
  //       // 开启图片懒加载
  //       lazyLoading: true
  //     },
  //   },
  themeConfig: {
    // 主题设置
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "Search",
                buttonAriaLabel: "Search",
              },
              modal: {
                displayDetails: "Display detailed list",
                resetButtonTitle: "Reset search",
                backButtonTitle: "Close search",
                noResultsText: "No results for",
                footer: {
                  selectText: "to select",
                  selectKeyAriaLabel: "enter",
                  navigateText: "to navigate",
                  navigateUpKeyAriaLabel: "up arrow",
                  navigateDownKeyAriaLabel: "down arrow",
                  closeText: "to close",
                  closeKeyAriaLabel: "escape",
                },
              },
            },
          },
        },
      },
    },
    logo: "/logo.svg", // 左上角logo,
    socialLinks: [
      { icon: "github", link: "https://github.com/kuaifan/dootask" },
    ],
  },
});
