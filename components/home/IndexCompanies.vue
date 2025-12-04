<template>
  <!-- 合作公司区域 -->
  <article class="companies">
    <div class="companies-con">
      <h1 class="companies-h1 txt-4003645">
        {{ $t('homepage.hero.trusted') }}
      </h1>
      <ul class="companies-ul">
        <li class="companies-ul-item">
          <ClientDynamicImage
            id="home_icon1"
            :src="`/img/${theme}/home_icon1.png`"
            :default-src="`/img/light/home_icon1.png`"
            alt="陕建集团"
          />
        </li>
        <li class="companies-ul-item">
          <ClientDynamicImage
            id="home_icon2"
            :src="`/img/${theme}/home_icon2.png`"
            :default-src="`/img/light/home_icon2.png`"
            alt="艾特科"
          />
        </li>
        <li class="companies-ul-item">
          <ClientDynamicImage
            id="home_icon3"
            :src="`/img/${theme}/home_icon3.png`"
            :default-src="`/img/light/home_icon3.png`"
            alt="中国联通"
          />
        </li>
        <li class="companies-ul-item">
          <ClientDynamicImage
            id="home_icon4"
            :src="`/img/${theme}/home_icon4.png`"
            :default-src="`/img/light/home_icon4.png`"
            alt="旗雲科技"
          />
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

const themeStore = useThemeStore();

const { theme } = toRefs(themeStore);
</script>
