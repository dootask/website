// Strapi 通用响应接口
export interface StrapiResponse<T extends StrapiBaseAttributes> {
  data: {
    id?: number
    attributes: T
  }
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiResponseList<T extends StrapiBaseAttributes> {
  data: {
    id?: number
    attributes: T
  }[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiBaseAttributes {
  locale?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string
}

// 通用组件类型
export interface TextProps {
  text: string
  key?: string
  style?: Record<string, string>
}

export interface LinkProps {
  label: string
  href: string
  target?: string | null
  id?: number
}

export interface ImageProps {
  data: {
    id?: number
    attributes: {
      url: string
      width: number
      height: number
      hash: string
      mime: string
      name: string
      provider: string
      formats: {
        thumbnail?: {
          url: string
        }
        small?: {
          url: string
        }
        medium?: {
          url: string
        }
        large?: {
          url: string
        }
      } | null
    }
  } | null
}

// 推广页 Banner 相关类型
export interface AdBannerProps extends StrapiBaseAttributes {
  title: TextProps[]
  description: TextProps
  background: ImageProps
  underline: ImageProps
  signUpButton: {
    id: number
    theme: string
    style: Record<string, string>
    link: LinkProps
  }
  selfHostButton: {
    id: number
    theme: string
    style: Record<string, string>
    link: LinkProps
  }
  localizations?: {
    data: Array<{
      id: number
      attributes: StrapiBaseAttributes
    }>
  }
}

// 推广页展示栏类型
export interface BannerBarProps extends StrapiBaseAttributes {
  text: string
  buttonText: string
  background: ImageProps
}

// 推广页介绍卡片类型
export interface IntroCardProps {
  id: number
  title: string
  description: string
  priority: number
  bar: ImageProps
  cover: ImageProps
}

// 推广页"为何选择"类型
export interface WhyChooseProps extends StrapiBaseAttributes {
  title: string
  description: string
  intros: IntroCardProps[]
}

// 推广页价格特性类型
export interface FeatureProps {
  id: number
  text: string
  title?: string
  activated: boolean
  icon: ImageProps
}

// 推广页价格计划类型
export interface PlanProps {
  id: number
  title: string
  activated: boolean
  priority: number
  tag: string | null
  price: {
    id: number
    current: string
    original: string
    payment: string | null
    isPrice: boolean
  }
  button: LinkProps
  features: FeatureProps[]
}

// 推广页定价方案类型
export interface PricingPlansProps extends StrapiBaseAttributes {
  title: string
  description: string
  plans: PlanProps[]
}

// API 响应类型别名
export type AdBannerResponse = StrapiResponse<AdBannerProps>
export type BannerBarResponse = StrapiResponse<BannerBarProps>
export type WhyChooseResponse = StrapiResponse<WhyChooseProps>
export type PricingPlansResponse = StrapiResponse<PricingPlansProps>


