<template>
  <div class="topics">
    <div class="topics-con">
      <div class="topics-layout">
        <div class="topics-tit mb-32">
          <span class="txt-6007290 topics-h1-green">
            DooTask
            <svg
              class="arcs"
              width="312"
              height="23"
              viewBox="0 0 312 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                id="arc"
                opacity="0.5"
                d="M3 20C47.4822 7.1714 170.957 -10.7886 309 20"
                stroke="#8BCF70"
                stroke-width="6"
                stroke-linecap="round"
                stroke-dasharray="600, 600"
                stroke-dashoffset="0"
              />
            </svg>
          </span>
          <span class="txt-6007290 topics-h1">
            {{ $t('homepage.hero.subtitle') }}
          </span>
        </div>
        <h4 class="txt-4001830 topics-h4 mb-32" style="width: auto !important">
          {{ $t('homepage.hero.description') }}
        </h4>
        <div class="flex-cc topics-btn">
          <span class="mr-24 get-started">
            <NuxtLink :to="`/${locale}/price`">
              <button class="btn btn-primary mr-20">
                {{ $t('common.get_started') }}
              </button>
            </NuxtLink>
          </span>
          <a href="https://github.com/kuaifan/dootask/tree/pro" target="_blank">
            <button class="btn btn-default">
              {{ $t('homepage.hero.deployment') }}
            </button>
          </a>
        </div>
      </div>
      <div class="ten_img">
        <ClientDynamicImage
          id="home_pic"
          class="home-pic"
          :src="`/img/${theme}/${locale}_home_pic1.png`"
          :default-src="`/img/light/${locale}_home_pic1.png`"
          :alt="$t('homepage.hero.description')"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const { locale } = useI18n();

const themeStore = useThemeStore();

const { theme } = toRefs(themeStore);
</script>

<style scoped>

</style>
