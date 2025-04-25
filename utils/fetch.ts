import type { MediaData } from '../types/ad'

// 通用数据获取函数
export const fetchData = <T>(url: string): Promise<T> => {
  return fetch(url).then((response) => response.json() as T);
};

// 错误处理函数
export const handleError = (error: Error) => {
  console.error('获取数据时出错:', error);
};


export const getStyle = (style: Record<string, string>) => {
  if (!style) return null;
  const styleObject: Record<string, string> = {};
  Object.keys(style).forEach((key) => {
    styleObject[key] = style[key];
  });
  return styleObject;
};

export const getMediaUrl = (media: { data: MediaData | null }) => {
  if (!media?.data?.attributes?.url) {
    return '';
  }
  return `https://cms.hitosea.com${media.data.attributes.url}`;
};
