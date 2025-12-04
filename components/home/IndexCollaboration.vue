<template>
  <article class="collaboration">
    <ClientDynamicImage
      id="home_pic7"
      class="home_pic7"
      :src="`/img/${theme}/home_pic7.svg`"
      :default-src="`/img/light/home_pic7.svg`"
      :alt="$t('homepage.coll.desc')"
    />
    <ClientDynamicImage
      id="home_pic7_768"
      class="home_pic7_768"
      :src="`/img/${theme}/home_pic7_768.svg`"
      :default-src="`/img/light/home_pic7_768.svg`"
      :alt="$t('homepage.coll.desc')"
    />
    <div class="collaboration-content collaboration-content-zh">
      <h1 class="collaboration-txt txt-5002835 mb-32">
        {{ $t('homepage.coll.desc') }}
      </h1>
      <div style="display: flex">
        <span class="mr-24 get-started">
          <NuxtLink :to="`/${locale}/price`">
            <button class="btn btn-gw mr-20">
              {{ $t('common.get_started') }}
            </button>
          </NuxtLink>
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const { locale } = useI18n();

const themeStore = useThemeStore();

const { theme } = toRefs(themeStore);
</script>
