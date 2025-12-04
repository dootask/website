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
import type { ClientDynamicImageProps } from '../../types/component';

const props = defineProps<ClientDynamicImageProps>();

// 合并自定义类名
const imageClass = computed(() => {
  return [props.class].filter(Boolean).join(' ');
});
</script>

<style></style>
