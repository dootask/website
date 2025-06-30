<template>
    <main>
      <section>
        <!-- <PriceWay></PriceWay> -->
        <PriceWelfare></PriceWelfare>
        <PriceCompare></PriceCompare>
        
      </section>
    </main>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
// import PriceWay from '../components/PriceWay.vue'
import '@/assets/scss/price.scss';

definePageMeta({
  layoutClass: 'price-page',
  topicsName: 'price'
});

const { t, locale } = useI18n();
useHead({
  title: t('pricing.headtitle'),
  htmlAttrs: {
    lang: locale.value,
  },
  meta: [
    {
      name: 'description',
      content: t('pricing.desc'),
    },
    {
      name: 'keywords',
      content: t('seo.keywords'),
    },
  ],
});

</script>
