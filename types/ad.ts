/**
 * 广告相关类型定义
 * @module types/ad
 */

/**
 * 通用 Meta 接口
 * 用于存储 API 响应的元数据
 */
export interface Meta {
  [key: string]: string | object;
}

/**
 * 通用 API 响应接口
 * @template T 响应数据的类型
 */
export interface ApiResponse<T> {
  /** 响应数据 */
  data: T;
  /** 元数据 */
  meta: Meta;
}

/**
 * 图片格式接口
 * 描述图片的格式信息
 */
export interface ImageFormat {
  /** 文件扩展名 */
  ext: string;
  /** 图片 URL */
  url: string;
  /** 文件哈希值 */
  hash: string;
  /** MIME 类型 */
  mime: string;
  /** 文件名 */
  name: string;
  /** 文件路径（通常为 null） */
  path: null;
  /** 文件大小 */
  size: number;
  /** 图片宽度 */
  width: number;
  /** 图片高度 */
  height: number;
  /** 文件大小（字节，可选） */
  sizeInBytes?: number;
}

/**
 * 图片格式集合
 * 包含不同尺寸的图片格式
 */
export interface ImageFormats {
  /** 大尺寸图片 */
  large?: ImageFormat;
  /** 小尺寸图片 */
  small?: ImageFormat;
  /** 中等尺寸图片 */
  medium?: ImageFormat;
  /** 缩略图 */
  thumbnail?: ImageFormat;
}

/**
 * 媒体属性接口
 * 描述媒体文件的所有属性
 */
export interface MediaAttributes {
  /** 媒体名称 */
  name: string;
  /** 替代文本 */
  alternativeText: null;
  /** 标题说明 */
  caption: null;
  /** 媒体宽度 */
  width: number;
  /** 媒体高度 */
  height: number;
  /** 图片格式集合 */
  formats: ImageFormats | null;
  /** 文件哈希值 */
  hash: string;
  /** 文件扩展名 */
  ext: string;
  /** MIME 类型 */
  mime: string;
  /** 文件大小 */
  size: number;
  /** 媒体 URL */
  url: string;
  /** 预览 URL */
  previewUrl: null;
  /** 存储提供商 */
  provider: string;
  /** 提供商元数据 */
  provider_metadata: null;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 相关媒体（可选） */
  related?: Array<{
    __type: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  }>;
}

/**
 * 媒体数据接口
 * 包含媒体 ID 和属性
 */
export interface MediaData {
  /** 媒体 ID */
  id: number;
  /** 媒体属性 */
  attributes: MediaAttributes;
}

/**
 * 介绍卡片接口
 * 用于展示产品介绍信息
 */
export interface IntroCard {
  /** 卡片 ID */
  id: number;
  /** 卡片标题 */
  title: string;
  /** 卡片描述 */
  description: string;
  /** 优先级（用于排序） */
  priority: number;
  /** 栏图片 */
  bar: {
    data: MediaData;
  };
  /** 封面图片 */
  cover: {
    data: MediaData;
  };
}

/**
 * 价格信息接口
 * 描述价格相关信息
 */
export interface PriceInfo {
  /** 价格 ID */
  id: number;
  /** 当前价格 */
  current: string;
  /** 原价 */
  original: string;
  /** 支付方式 */
  payment: string | null;
  /** 是否为价格（布尔值） */
  isPrice: boolean;
}

/**
 * 按钮接口
 * 描述按钮的配置信息
 */
export interface Button {
  /** 按钮 ID */
  id: number;
  /** 按钮标签文本 */
  label: string;
  /** 按钮链接地址 */
  href: string;
  /** 链接打开方式 */
  target: string | null;
}

/**
 * 功能特性接口
 * 描述产品的功能特性
 */
export interface Feature {
  /** 特性 ID */
  id: number;
  /** 特性文本 */
  text: string;
  /** 特性标题（可选） */
  title?: string;
  /** 是否激活 */
  activated: boolean;
  /** 特性图标 */
  icon: {
    data: MediaData | null;
  };
}

/**
 * 套餐计划接口
 * 描述价格套餐计划
 */
export interface Plan {
  /** 计划 ID */
  id: number;
  /** 计划标题 */
  title: string;
  /** 是否激活 */
  activated: boolean;
  /** 优先级（用于排序） */
  priority: number;
  /** 标签 */
  tag: string | null;
  /** 价格信息 */
  price: PriceInfo;
  /** 按钮配置 */
  button: Button;
  /** 功能特性列表 */
  features: Feature[];
}

/**
 * 标题部分接口
 * 描述标题的各个部分及其样式
 */
export interface TitlePart {
  /** 部分 ID */
  id: number;
  /** 文本内容 */
  text: string;
  /** 键值 */
  key: string;
  /** 样式对象 */
  style: Record<string, string>;
}

/**
 * 主题按钮接口
 * 描述带主题样式的按钮
 */
export interface ThemedButton {
  /** 按钮 ID */
  id: number;
  /** 主题名称 */
  theme: string;
  /** 样式对象 */
  style: Record<string, string>;
  /** 链接配置 */
  link: {
    id: number;
    label: string;
    href: string;
    target: string | null;
  };
}

/**
 * 为何选择 DooTask 接口
 * 主接口，包含所有介绍卡片
 */
export interface WhyChooseDooTask {
  /** 数据 ID */
  id: number;
  /** 数据属性 */
  attributes: {
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 发布时间 */
    publishedAt: string;
    /** 语言代码 */
    locale: string;
    /** 介绍卡片列表 */
    intros: IntroCard[];
  };
}

/**
 * 价格计划接口
 * 主接口，包含所有价格计划
 */
export interface PricingPlans {
  /** 数据 ID */
  id: number;
  /** 数据属性 */
  attributes: {
    /** 标题 */
    title: string;
    /** 描述 */
    description: string;
    /** 创建时间 */
    createdAt: string;
    /** 更新时间 */
    updatedAt: string;
    /** 发布时间 */
    publishedAt: string;
    /** 语言代码 */
    locale: string;
    /** 计划列表 */
    plans: Plan[];
  };
}

/**
 * Banner 描述接口
 * 描述 Banner 的描述文本及其样式
 */
export interface BannerDescription {
  /** 描述 ID */
  id: number;
  /** 描述文本 */
  text: string;
  /** 键值 */
  key: string;
  /** 样式对象 */
  style: Record<string, string>;
}

/**
 * Banner 基础属性接口
 * 描述 Banner 的基本属性
 */
export interface BannerBaseAttributes {
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 发布时间 */
  publishedAt: string;
  /** 语言代码 */
  locale: string;
  /** 标题部分列表 */
  title: TitlePart[];
  /** 描述 */
  description: BannerDescription;
  /** 背景图片 */
  background: {
    data: MediaData;
  };
  /** 下划线图片 */
  underline: {
    data: MediaData;
  };
  /** 注册按钮 */
  signUpButton: ThemedButton;
  /** 自托管按钮 */
  selfHostButton: ThemedButton;
}

/**
 * 本地化数据基础属性接口
 * 描述本地化数据的基本属性
 */
export interface LocalizationBaseAttributes {
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 发布时间 */
  publishedAt: string;
  /** 语言代码 */
  locale: string;
}

/**
 * 本地化数据接口
 * 包含本地化数据的 ID 和属性
 */
export interface LocalizationData {
  /** 数据 ID */
  id: number;
  /** 数据属性 */
  attributes: LocalizationBaseAttributes;
}

/**
 * 展示栏属性接口
 * 描述广告展示栏的属性
 */
export interface BannerBarAttributes {
  /** 展示文本 */
  text: string;
  /** 按钮文本 */
  buttonText: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 发布时间 */
  publishedAt: string;
  /** 语言代码 */
  locale: string;
  /** 背景图片 */
  background: {
    data: MediaData;
  };
}

/**
 * Banner 本地化属性接口
 * 包含 Banner 的本地化信息
 */
export interface BannerLocalization {
  /** 数据 ID */
  id: number;
  /** 数据属性 */
  attributes: BannerBaseAttributes & {
    /** 本地化数据列表 */
    localizations: {
      data: LocalizationData[];
    };
  };
}

/**
 * 主 Banner 接口
 * 包含 Banner 的所有信息，包括本地化数据
 */
export interface AdBanner {
  /** 数据 ID */
  id: number;
  /** 数据属性 */
  attributes: BannerBaseAttributes & {
    /** 本地化数据列表 */
    localizations: {
      data: BannerLocalization[];
    };
  };
}

/**
 * 展示栏接口
 * 包含展示栏的所有信息
 */
export interface BannerBar {
  /** 数据 ID */
  id: number;
  /** 数据属性 */
  attributes: BannerBarAttributes;
}

/**
 * 为何选择 DooTask API 响应类型
 */
export type WhyChooseDooTaskResponse = ApiResponse<WhyChooseDooTask>;

/**
 * 价格计划 API 响应类型
 */
export type PricingPlansResponse = ApiResponse<PricingPlans>;

/**
 * 广告 Banner API 响应类型
 */
export type AdBannerResponse = ApiResponse<AdBanner>;

/**
 * 展示栏 API 响应类型
 */
export type BannerBarResponse = ApiResponse<BannerBar>;