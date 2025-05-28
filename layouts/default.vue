<template>
  <div :class="layoutClass">
    <HeaderBar :class="headerClass">
      <template #ad>
        <AdBar />
      </template>
      <!-- <component :is="headerContent" v-if="headerContent" /> -->
      <template #default>
        <IndexMain v-if="topicsName === 'index'" />
        <PriceWay v-else-if="topicsName === 'price'" />
        <ProChoose v-else-if="topicsName === 'product'" />
        <SuloTopics v-else-if="topicsName === 'solution'" />
        <DownloadPart v-else-if="topicsName === 'download'" />
        <AboutIntro v-else-if="topicsName === 'about'" />
        <AITopics v-else-if="topicsName === 'ai'" />
      </template>
    </HeaderBar>
    <!-- <ClientOnly> -->
    <NuxtPage />
    <FooterBar v-if="isFooterReady" />
    <SideNav />
    <!-- </ClientOnly> -->
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, computed } from 'vue';
import '@/assets/scss/common.scss';
import '@/assets/scss/rem.scss';


defineOgImageComponent('NuxtSeo');

const route = useRoute();
const layoutClass = computed(() => {
  return route.meta.layoutClass || '';
});
const headerClass = computed(() => {
  return route.meta.headerClass || '';
});
const topicsName = computed(() => {
  return route.meta.topicsName || '';
});

const themeStore = useThemeStore();
const { locale } = useI18n();
// 控制脚部是否渲染
const isFooterReady = ref(false);
onBeforeMount(() => {
  themeStore.loadTheme(locale.value);
  nextTick(() => {
    isFooterReady.value = true;
  });
});
</script>

<style></style>
