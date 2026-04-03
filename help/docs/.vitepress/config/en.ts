import { enSidebar } from "../sidebar";
import { enNav } from "../navbar";
import type { DefaultTheme, LocaleSpecificConfig } from "vitepress";

export const enConfig: LocaleSpecificConfig<DefaultTheme.Config> = {
  title: "DooTask Help Center",
  themeConfig: {
    // 主题设置
    nav: enNav,
    sidebar: enSidebar, // 侧边栏
    outline: {
      // 大纲显示 1-6 级标题
      level: [2, 6],
    },
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
  },
};
