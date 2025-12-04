<template>
  <img
    v-show="theme === 'dark'"
    :id="id"
    :class="imageClass"
    :alt="alt"
    :src="imgDarkSrc"
  />
  <img
    v-show="theme === 'light'"
    :id="id"
    :class="imageClass"
    :alt="alt"
    :src="imgLightSrc"
  />
</template>

<script lang="ts" setup>
import type { ThemeImageProps } from '../../types/component';

const props = defineProps<ThemeImageProps>();

const { theme } = useTheme();

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
