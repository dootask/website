<template>
  <div class="topics-store">
    <div class="head">
      <div class="app-store-section">
        <div class="topics">
          <div class="topics-con-store">
            <div class="topics-layout">
              <div class="topics-tit mb-32">
                <span class="txt-6007290 topics-h1">
                  {{ $t('appstore.headtitle') }}
                </span>
              </div>
              <h4 class="txt-4001830 topics-h4 mb-32">
                {{ $t('appstore.description') }}
              </h4>
            </div>
          </div>
        </div>
        <div class="flex-cc topics-btn">
          <span class="mr-24 get-started">
            <a href="https://appstore.dootask.com/" target="_blank">
              <button class="btn btn-primary mr-20">
                {{ $t('appstore.btn') }}
              </button>
            </a>
          </span>
        </div>
      </div>
      <div class="app">
      <div class="app-store-card-grid">
        <div class="app-store-card" v-for="(feature, idx) in features" :key="idx">
          <div class="app-store-icon">
            <img v-if="feature.icon.startsWith('/')" :src="feature.icon" :alt="feature.title" />
            <i v-else :class="feature.icon"></i>
          </div>
          <h3 class="app-store-card-title">{{ feature.title }}</h3>
          <p class="app-store-card-desc">{{ feature.desc }}</p>
        </div>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import {  computed } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();


const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);


const features  = computed(() => [
  {
    icon: `/img/${theme.value}/store_icon1.svg`,
    title: t('appstore.features.title01'),
    desc: t('appstore.features.desc01'),
  },
  {
    icon: `/img/${theme.value}/store_icon2.svg`,
    title: t('appstore.features.title02'),
    desc: t('appstore.features.desc02'),
  },
  {
    icon: `/img/${theme.value}/store_icon3.svg`,
    title: t('appstore.features.title03'),
    desc: t('appstore.features.desc03'),
  },
  {
    icon: `/img/${theme.value}/store_icon4.svg`,
    title: t('appstore.features.title04'),
    desc: t('appstore.features.desc04'),
  },
  {
    icon: `/img/${theme.value}/store_icon5.svg`,
    title: t('appstore.features.title05'),
    desc: t('appstore.features.desc05'),
  },
  {
    icon: `/img/${theme.value}/store_icon6.svg`,
    title: t('appstore.features.title06'),
    desc: t('appstore.features.desc06'),
  }
]);
</script>
