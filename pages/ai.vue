<template>
    <main>
      <section>
        <!-- <AITopics /> -->
        <AITask />
        <AIFile />
        <AIWeekReport />
        <AIMultiSession />
        <AIRich />
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import '@/assets/scss/ai.scss';
  
  const { t, locale } = useI18n();
  
  definePageMeta({
    layoutClass: 'ai-page',
    topicsName: 'ai',
  });
  
  useHead({
    // title: t('about.headtitle'),
    title: 'AI-DooTask',

    htmlAttrs: {
      lang: locale.value,
    },
    meta: [
      {
        name: 'description',
        content: t('about.desc'),
      },
      {
        name: 'keywords',
        content: t('seo.keywords'),
      },
    ],
  });
  
  </script>
  