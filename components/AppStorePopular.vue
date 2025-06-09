<template>
  <div class="app-store-section-popular">
    <div class="popular-bg">
      <div class="popular-pading">
      <h2 class="app-store-title">{{ $t('appstore.popular.title') }}</h2>
    <ClientOnly>
      <div class="app-store-stack-list">
        <div v-for="(app, idx) in apps" :key="idx" class="app-store-stack-card">
          <div class="app-store-stack-icon-outer">
            <div class="app-store-stack-icon-inner">
              <img 
                :src="app.icon" 
                :alt="app.name"
                loading="lazy"
                width="48"
                height="48"
              />
            </div>
          </div>
          <div class="app-store-stack-title">{{ app.name }}</div>
          <div class="app-store-stack-desc">{{ app.desc }}</div>

          <div class="app-store-stack-meta">
            <span class="meta-item favs"><i class="i-heroicons-star"></i><strong>{{ app.favs.split('+')[0] }}</strong><span class="meta-unit">k+ {{ $t('appstore.popular.load') }}</span></span>
            <span class="meta-item users"><i class="i-heroicons-user-group"></i><strong>{{ app.users.split('k')[0] }}</strong><span class="meta-unit">k {{ $t('appstore.popular.usr') }}</span></span>
            <span class="meta-item rating"><i class="i-heroicons-heart"></i><strong>{{ app.rating }}</strong><span class="meta-unit">{{ $t('appstore.popular.rate') }}</span></span>
          </div>
          <a :href="app.downloadUrl" target="_blank" class="app-store-stack-btn">
            <img :src="`/img/${theme}/store_icon7.svg`" class="btn-icon desktop-only" alt="download" />
            <span class="btn-text">{{ $t('appstore.popular.install') }}</span>
          </a>
        </div>
        </div>
        <div class="view-more-container">
          <a href="https://appstore.dootask.com/" target="_blank" class="view-more-link">
            <span>{{ $t('appstore.popular.viewmore') }}</span>
            <!-- <i class="i-heroicons-arrow-right"></i> -->
          </a>
        </div>
      </ClientOnly>
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


const apps = computed(() => [
  {
    icon: `/img/${theme.value}/store_icon8.svg`,
    name:  t('appstore.popular.minder.name'),
    desc:  t('appstore.popular.minder.desc'),
    rating: '5.0',
    users: '4.1k',
    favs: '94+',
    downloadUrl: 'https://appstore.dootask.com/'
  },
  {
    icon: `/img/${theme.value}/store_icon9.svg`,
    name: t('appstore.popular.airobot.name'),
    desc:  t('appstore.popular.airobot.desc'),
    rating: '4.8',
    users: '8.5k',
    favs: '86+',
    downloadUrl: 'https://appstore.dootask.com/'
  },
  {
    icon: `/img/${theme.value}/store_icon10.svg`,
    name:  t('appstore.popular.zinc.name'),
    desc:  t('appstore.popular.zinc.desc'),
    rating: '4.8',
    users: '9.5k',
    favs: '55+',
    downloadUrl: 'https://appstore.dootask.com/'
  },
  {
    icon: `/img/${theme.value}/store_icon11.svg`,
    name:  t('appstore.popular.okr.name'),
    desc:  t('appstore.popular.okr.desc'),
    rating: '5.0',
    users: '7.4k',
    favs: '53+',
    downloadUrl: 'https://appstore.dootask.com/'
  },
]);
</script>
