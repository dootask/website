<template>
  <main>
    <section>
      <!-- <AppStoreFeatures /> -->
      <AppStoreInstallation />
      <AppStorePopular />
      <AppStoreDevelopment />
    </section>
  </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import '@/assets/scss/appstore.scss';

const { t, locale } = useI18n();

definePageMeta({
  layoutClass: 'app-store-page',
  topicsName: 'appstore',
});

useHead({
  title: t('appstore.headtitle'),
  htmlAttrs: {
    lang: locale.value,
  },
  meta: [
    {
      name: 'description',
      content: t('appstore.description'),
    },
    {
      name: 'keywords',
      content: t('seo.keywords'),
    },
  ],
});
</script> 