<!-- 主页 -->
<template>
  <!-- 功能卡片区域 -->
  <article class="card">
    <div class="card-con">
      <h1 class="txt-5004455 card-h1 mb-80">
        {{ $t('homepage.scenarios.title') }}
      </h1>
      <div class="card-con-layout">
        <ul class="card-ul">
          <li
            v-for="(item, index) in scenarioItems"
            :key="index"
            :class="['card-ul-item', { active: activeCardIndex === index }]"
            @click="toggleCard(index)"
          >
            <img class="icon" :src="item.icon" :alt="item.title" />
            <div class="card-ul-item-unfolded">
              <h3 class="txt-5002025 card-ul-item-h3">{{ item.title }}</h3>
              <img class="arrows" src="/img/vector.svg" :alt="item.title" />
            </div>
            <div class="card-ul-item-expand">
              <div class="card-ul-item-expand-tit">
                <h3 class="txt-5002025 card-ul-item-h3">{{ item.title }}</h3>
                <img
                  class="arrows"
                  src="/img/vector.svg"
                  :alt="item.description"
                />
              </div>
              <i
                class="txt-4001624 card-ul-item-txt"
                :style="{ '--delay': '0.3s' }"
              >
                {{ item.description }}
              </i>
            </div>
          </li>
        </ul>
        <ClientDynamicImage
          id="home_pic2"
          class="card-pic"
          :src="currentPicSrc"
          :default-src="currentDefaultPicSrc"
          :alt="currentPicAlt"
        />
      </div>
    </div>

    <!-- 移动端版本 -->
    <div class="card-con-768">
      <h1 class="txt-5002228 card-h1 mb-32">
        {{ $t('homepage.scenarios.title') }}
      </h1>
      <div class="card-con-layout">
        <ul class="card-768-ul">
          <li
            v-for="(item, index) in mobileScenarioItems"
            :key="index"
            style="width: 100%"
          >
            <img class="icon" :src="item.icon" :alt="item.title" />
            <h3 class="txt-5001822 card-ul-item-h3 mb-12">{{ item.title }}</h3>
            <i class="txt-4001524 card-ul-item-txt mb-16">{{
              item.description
            }}</i>
            <ClientDynamicImage class="card-pic mb-40" :src="item.picSrc" :default-src="item.defaultPicSrc" :alt="item.picAlt" />
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

const activeCardIndex = ref(0);

// 修改计算属性，添加默认值处理
const currentPicSrc = computed(() => {
  // 如果 activeCardIndex 为 -1，默认使用第一个图片
  const index = activeCardIndex.value === -1 ? 0 : activeCardIndex.value;
  return scenarioItems.value[index].picSrc;
});

const currentDefaultPicSrc = computed(() => {
  // 如果 activeCardIndex 为 -1，默认使用第一个图片
  const index = activeCardIndex.value === -1 ? 0 : activeCardIndex.value;
  return scenarioItems.value[index].defaultPicSrc;
});

const currentPicAlt = computed(() => {
  // 如果 activeCardIndex 为 -1，默认使用第一个图片的 alt
  const index = activeCardIndex.value === -1 ? 0 : activeCardIndex.value;
  return scenarioItems.value[index].picAlt;
});

const toggleCard = (index: number) => {
  activeCardIndex.value = activeCardIndex.value === index ? -1 : index;
};

const scenarioItems = computed(() => [
  {
    icon: '/img/home_icon1.svg',
    title: t('homepage.scenarios.scen_promana_ti'),
    description: t('homepage.scenarios.scen_promana_desc'),
    picAlt: t('homepage.scenarios.scen_promana_desc'),
    picSrc: `/img/${theme.value}/${locale.value}_home_pic2.png`,
    defaultPicSrc: `/img/light/${locale.value}_home_pic2.png`,
  },
  {
    icon: '/img/home_icon2.svg',
    title: t('homepage.scenarios.scen_team_ti'),
    description: t('homepage.scenarios.scen_team_desc'),
    picAlt: t('homepage.scenarios.scen_team_desc'),
    picSrc: `/img/${theme.value}/${locale.value}_home_pic3.png`,
    defaultPicSrc: `/img/light/${locale.value}_home_pic3.png`,
  },
  {
    icon: '/img/home_icon3.svg',
    title: t('homepage.scenarios.scen_task_ti'),
    description: t('homepage.scenarios.scen_task_desc'),
    picAlt: t('homepage.scenarios.scen_task_desc'),
    picSrc: `/img/${theme.value}/${locale.value}_home_pic4.png`,
    defaultPicSrc: `/img/light/${locale.value}_home_pic4.png`,
  },
  {
    icon: '/img/home_icon4.svg',
    title: t('homepage.scenarios.scen_okr_ti'),
    description: t('homepage.scenarios.scen_okr_desc'),
    picAlt: t('homepage.scenarios.scen_okr_desc'),
    picSrc: `/img/${theme.value}/${locale.value}_home_pic5.png`,
    defaultPicSrc: `/img/light/${locale.value}_home_pic5.png`,
  },
  {
    icon: '/img/home_icon5.svg',
    title: t('homepage.scenarios.scen_communit_ti'),
    description: t('homepage.scenarios.scen_communit_desc'),
    picAlt: t('homepage.scenarios.scen_communit_desc'),
    picSrc: `/img/${theme.value}/${locale.value}_home_pic6.png`,
    defaultPicSrc: `/img/light/${locale.value}_home_pic6.png`,
  },
]);

const mobileScenarioItems = computed(() => scenarioItems.value);
</script>
