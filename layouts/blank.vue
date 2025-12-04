<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
const { loadTheme } = useTheme();
const { locale } = useI18n();

onMounted(() => {
  loadTheme(locale.value);
});
</script>

<style></style>
