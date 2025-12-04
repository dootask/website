<template>
  <img
    v-show="themeStore.theme === 'dark'"
    :id="id"
    :class="imageClass"
    :alt="alt"
    :src="imgDarkSrc"
  />
  <img
    v-show="themeStore.theme === 'light'"
    :id="id"
    :class="imageClass"
    :alt="alt"
    :src="imgLightSrc"
  />
</template>

<script lang="ts" setup>
interface Props {
  // id
  id?: string;
  // 自定义 class
  class?: string;
  // 图片描述
  alt: string;
  // 客户端渲染的图片路径
  src: string;
}

const props = defineProps<Props>();

const themeStore = useThemeStore();

// 合并自定义类名
const imageClass = computed(() => {
  return [props.class].filter(Boolean).join(' ');
});

const imgDarkSrc = computed(() => {
  return props.src.replaceAll('@@@', 'dark');
});
const imgLightSrc = computed(() => {
  return props.src.replaceAll('@@@', 'light');
});
</script>

<style></style>
