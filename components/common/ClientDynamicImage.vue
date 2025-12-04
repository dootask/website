<!-- components/ClientDynamicImage.vue -->
<template>
  <ClientOnly>
    <!-- 客户端渲染的图片 -->
    <img :id="id" :class="imageClass" :src="src" :alt="alt" />

    <!-- SSR 渲染时的默认图片 -->
    <template #fallback>
      <img :id="id" :class="imageClass" :src="defaultSrc" :alt="alt" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
import { computed } from 'vue';
interface Props {
  // id
  id?: string;
  // 自定义 class
  class?: string;
  // 图片描述
  alt: string;
  // 客户端渲染的图片路径
  src: string;
  // SSR 默认图片路径
  defaultSrc: string;
}

const props = defineProps<Props>();

// 合并自定义类名
const imageClass = computed(() => {
  return [props.class].filter(Boolean).join(' ');
});
</script>

<style></style>
