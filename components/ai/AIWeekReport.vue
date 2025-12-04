<!-- 修改成图片形式326  -->
<template>
    <div class="aiweek-center-container">
        <h1 class="txt-5004455 app-h1 mb-16">{{ $t('ai.weekly.title') }}</h1>
        <h6 class="txt-4001830 app-h6">{{ $t('ai.weekly.desc') }}</h6>

        <div class="aiweek-grid-container">
            <div class="app-week">
                <ul class="app-ul mt-80">
                    <li
                    v-for="(item, index) in sceneApplications"
                    :key="index"
                    class="app-ul-item"
                    :class="{ '': index < sceneApplications.length - 1 }"
                    >
                    <div class="app-bg-box">
                        <ClientDynamicImage
                          class="app-bg"
                          :src="item.picSrc"
                          :default-src="item.defaultPicSrc"
                          :alt="item.title"
                        />
                    </div>
                    <h4 class="txt-5002025 serial-number txt-num app-h4 mb-16">{{ item.title }}</h4>
                    <h6 class="txt-4001624 app-h5">{{ item.description }}</h6>
                    </li>
                </ul>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

// 场景应用列表
const sceneApplications = computed(() => [
  {
    picSrc: `/img/${theme.value}/${locale.value}_ai_pic4.png`,
    defaultPicSrc: `/img/light/${locale.value}_ai_pic4.png`,
    title: '01',
    description:t('ai.weekly.subdesc01'),
  },
  {
    picSrc: `/img/${theme.value}/${locale.value}_ai_pic5.png`,
    defaultPicSrc: `/img/light/${locale.value}_ai_pic5.png`,
    title: '02',
    description: t('ai.weekly.subdesc02'),
  },
  {
    picSrc: `/img/${theme.value}/${locale.value}_ai_pic6.png`,
    defaultPicSrc: `/img/light/${locale.value}_ai_pic6.png`,
    title: '03',
    description: t('ai.weekly.subdesc03'),
  },
  {
    picSrc: `/img/${theme.value}/${locale.value}_ai_pic6-1.png`,
    defaultPicSrc: `/img/light/${locale.value}_ai_pic6-1.png`,
    title: '04',
    description: t('ai.weekly.subdesc04'),
  },
]);
</script>

