/**
 * 组件 Props 类型定义
 * @module types/component
 */

/**
 * 图片组件 Props 基础接口
 */
export interface BaseImageProps {
  /** 元素 ID */
  id?: string;
  /** 自定义 CSS 类名 */
  class?: string;
  /** 图片描述（alt 文本） */
  alt: string;
}

/**
 * ThemeImage 组件 Props
 */
export interface ThemeImageProps extends BaseImageProps {
  /** 图片路径（支持 @@@ 占位符，会被替换为 dark/light） */
  src: string;
}

/**
 * ClientDynamicImage 组件 Props
 */
export interface ClientDynamicImageProps extends BaseImageProps {
  /** 客户端渲染的图片路径 */
  src: string;
  /** SSR 默认图片路径 */
  defaultSrc: string;
}

/**
 * CommonModal 组件 Props
 */
export interface CommonModalProps {
  /** 是否显示模态框（v-model） */
  modelValue: boolean;
  /** 模态框标题 */
  title?: string;
  /** 模态框宽度（支持字符串或数字） */
  width?: string | number;
  /** 是否显示关闭按钮 */
  showClose?: boolean;
  /** 点击遮罩层是否关闭 */
  closeOnOverlay?: boolean;
}

/**
 * CommonModal 组件 Emits
 */
export interface CommonModalEmits {
  /** 更新 modelValue */
  (e: 'update:modelValue', value: boolean): void;
  /** 关闭事件 */
  (e: 'close'): void;
}

/**
 * 选择项接口（用于 WhyChoose 等组件）
 */
export interface ChooseItem {
  /** 序号 */
  number: string;
  /** 标题 */
  title: string;
  /** 描述 */
  description: string;
}

/**
 * 价格计划接口
 */
export interface PricePlan {
  /** 计划名称 */
  name: string;
  /** 价格 */
  price: string;
  /** 价格单位 */
  priceUnit?: string;
  /** 用户限制 */
  userLimit: string;
  /** 按钮文本 */
  buttonText: string;
  /** 按钮链接 */
  buttonLink?: string;
  /** 功能特性列表 */
  features: {
    /** 图标 */
    icon: string;
    /** 文本 */
    text: string;
  }[];
  /** 是否为推荐计划 */
  recommended?: boolean;
}

