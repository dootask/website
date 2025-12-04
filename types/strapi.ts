/**
 * Strapi 相关类型定义
 * @module types/strapi
 */

/**
 * Strapi 通用响应接口（单个对象）
 * @template T 响应数据的属性类型，必须继承 StrapiBaseAttributes
 */
export interface StrapiResponse<T extends StrapiBaseAttributes> {
  /** 响应数据 */
  data: {
    /** 数据 ID（可选） */
    id?: number;
    /** 数据属性 */
    attributes: T;
  };
  /** 元数据（可选） */
  meta?: {
    /** 分页信息（可选） */
    pagination?: {
      /** 当前页码 */
      page: number;
      /** 每页大小 */
      pageSize: number;
      /** 总页数 */
      pageCount: number;
      /** 总记录数 */
      total: number;
    };
  };
}

/**
 * Strapi 通用响应接口（列表）
 * @template T 响应数据的属性类型，必须继承 StrapiBaseAttributes
 */
export interface StrapiResponseList<T extends StrapiBaseAttributes> {
  /** 响应数据列表 */
  data: {
    /** 数据 ID（可选） */
    id?: number;
    /** 数据属性 */
    attributes: T;
  }[];
  /** 元数据（可选） */
  meta?: {
    /** 分页信息（可选） */
    pagination?: {
      /** 当前页码 */
      page: number;
      /** 每页大小 */
      pageSize: number;
      /** 总页数 */
      pageCount: number;
      /** 总记录数 */
      total: number;
    };
  };
}

/**
 * Strapi 基础属性接口
 * 所有 Strapi 数据属性都应继承此接口
 */
export interface StrapiBaseAttributes {
  /** 语言代码（可选） */
  locale?: string;
  /** 创建时间（可选） */
  createdAt?: string;
  /** 更新时间（可选） */
  updatedAt?: string;
  /** 发布时间（可选） */
  publishedAt?: string;
}

/**
 * 文本属性接口
 * 用于描述带样式和键值的文本
 */
export interface TextProps {
  /** 文本内容 */
  text: string;
  /** 键值（可选） */
  key?: string;
  /** 样式对象（可选） */
  style?: Record<string, string>;
}

/**
 * 链接属性接口
 * 用于描述链接的配置信息
 */
export interface LinkProps {
  /** 链接标签文本 */
  label: string;
  /** 链接地址 */
  href: string;
  /** 链接打开方式（可选） */
  target?: string | null;
  /** 链接 ID（可选） */
  id?: number;
}

/**
 * 图片属性接口
 * 用于描述图片数据
 */
export interface ImageProps {
  /** 图片数据 */
  data: {
    /** 图片 ID（可选） */
    id?: number;
    /** 图片属性 */
    attributes: {
      /** 图片 URL */
      url: string;
      /** 图片宽度 */
      width: number;
      /** 图片高度 */
      height: number;
      /** 文件哈希值 */
      hash: string;
      /** MIME 类型 */
      mime: string;
      /** 文件名 */
      name: string;
      /** 存储提供商 */
      provider: string;
      /** 图片格式集合（可选） */
      formats: {
        /** 缩略图 */
        thumbnail?: {
          url: string;
        };
        /** 小尺寸 */
        small?: {
          url: string;
        };
        /** 中等尺寸 */
        medium?: {
          url: string;
        };
        /** 大尺寸 */
        large?: {
          url: string;
        };
      } | null;
    };
  } | null;
}

/**
 * 推广页 Banner 属性接口
 * 继承 StrapiBaseAttributes，包含 Banner 的所有属性
 */
export interface AdBannerProps extends StrapiBaseAttributes {
  /** 标题部分列表 */
  title: TextProps[];
  /** 描述 */
  description: TextProps;
  /** 背景图片 */
  background: ImageProps;
  /** 下划线图片 */
  underline: ImageProps;
  /** 注册按钮配置 */
  signUpButton: {
    id: number;
    theme: string;
    style: Record<string, string>;
    link: LinkProps;
  };
  /** 自托管按钮配置 */
  selfHostButton: {
    id: number;
    theme: string;
    style: Record<string, string>;
    link: LinkProps;
  };
  /** 本地化数据（可选） */
  localizations?: {
    data: Array<{
      id: number;
      attributes: StrapiBaseAttributes;
    }>;
  };
}

/**
 * 推广页展示栏属性接口
 * 继承 StrapiBaseAttributes，包含展示栏的所有属性
 */
export interface BannerBarProps extends StrapiBaseAttributes {
  /** 展示文本 */
  text: string;
  /** 按钮文本 */
  buttonText: string;
  /** 背景图片 */
  background: ImageProps;
}

/**
 * 推广页介绍卡片属性接口
 * 描述介绍卡片的属性
 */
export interface IntroCardProps {
  /** 卡片 ID */
  id: number;
  /** 卡片标题 */
  title: string;
  /** 卡片描述 */
  description: string;
  /** 优先级（用于排序） */
  priority: number;
  /** 栏图片 */
  bar: ImageProps;
  /** 封面图片 */
  cover: ImageProps;
}

/**
 * 推广页"为何选择"属性接口
 * 继承 StrapiBaseAttributes，包含"为何选择"部分的所有属性
 */
export interface WhyChooseProps extends StrapiBaseAttributes {
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 介绍卡片列表 */
  intros: IntroCardProps[];
}

/**
 * 推广页价格特性属性接口
 * 描述价格特性的属性
 */
export interface FeatureProps {
  /** 特性 ID */
  id: number;
  /** 特性文本 */
  text: string;
  /** 特性标题（可选） */
  title?: string;
  /** 是否激活 */
  activated: boolean;
  /** 特性图标 */
  icon: ImageProps;
}

/**
 * 推广页价格计划属性接口
 * 描述价格计划的属性
 */
export interface PlanProps {
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
  price: {
    id: number;
    current: string;
    original: string;
    payment: string | null;
    isPrice: boolean;
  };
  /** 按钮配置 */
  button: LinkProps;
  /** 功能特性列表 */
  features: FeatureProps[];
}

/**
 * 推广页定价方案属性接口
 * 继承 StrapiBaseAttributes，包含定价方案的所有属性
 */
export interface PricingPlansProps extends StrapiBaseAttributes {
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
  /** 计划列表 */
  plans: PlanProps[];
}

/**
 * 广告 Banner API 响应类型
 */
export type AdBannerResponse = StrapiResponse<AdBannerProps>;

/**
 * 展示栏 API 响应类型
 */
export type BannerBarResponse = StrapiResponse<BannerBarProps>;

/**
 * 为何选择 API 响应类型
 */
export type WhyChooseResponse = StrapiResponse<WhyChooseProps>;

/**
 * 定价方案 API 响应类型
 */
export type PricingPlansResponse = StrapiResponse<PricingPlansProps>;


