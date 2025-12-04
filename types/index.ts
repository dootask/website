/**
 * 类型定义统一导出
 * @module types
 */

// 主题相关类型
export type { Theme, Language, ThemeStoreState, UseThemeReturn } from './theme';

// 导航相关类型
export type {
  MenuItem,
  ThemeMenuItem,
  LanguageMenuItem,
  LocalizedRoutes,
  UseNavigationReturn,
} from './navigation';

// 组件 Props 类型
export type {
  BaseImageProps,
  ThemeImageProps,
  ClientDynamicImageProps,
  CommonModalProps,
  CommonModalEmits,
  ChooseItem,
  PricePlan,
} from './component';

// Composable 返回值类型
export type {
  UseLanguageReturn,
  UseAppSiteConfigReturn,
} from './composable';

// 广告相关类型
export type {
  Meta,
  ApiResponse,
  ImageFormat,
  ImageFormats,
  MediaAttributes,
  MediaData,
  IntroCard,
  PriceInfo,
  Button,
  Feature,
  Plan,
  TitlePart,
  ThemedButton,
  WhyChooseDooTask,
  PricingPlans,
  BannerDescription,
  BannerBaseAttributes,
  LocalizationBaseAttributes,
  LocalizationData,
  BannerBarAttributes,
  BannerLocalization,
  AdBanner,
  BannerBar,
  WhyChooseDooTaskResponse,
  PricingPlansResponse,
  AdBannerResponse,
  BannerBarResponse,
} from './ad';

// Strapi 相关类型
export type {
  StrapiResponse,
  StrapiResponseList,
  StrapiBaseAttributes,
  TextProps,
  LinkProps,
  ImageProps,
  AdBannerProps,
  BannerBarProps,
  IntroCardProps,
  WhyChooseProps,
  FeatureProps,
  PlanProps,
  PricingPlansProps,
} from './strapi';

