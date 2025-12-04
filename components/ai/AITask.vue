<template>
  <article class="scenario-app">
    <div class="txt-con">
      <div class="txt-layout">
        <div style="text-align: center">
          <h1 class="txt-5004455 app-h1 mb-16">{{ $t('ai.task.title') }}</h1>
          <div style="text-align: center">
            <h6 class="txt-4001830 app-h6">
              {{ $t('ai.task.desc_one') }}"@"{{ $t('ai.task.desc_two') }}
            </h6>
          </div>
        </div>
        <article class="card">
          <div class="card-con">
            <div class="card-con-layout">
              <ul class="card-ul">
                <li v-for="(item, index) in scenarioItems" :key="index" :class="[
                  'card-ul-item',
                  { active: activeCardIndex === index },
                ]" @click="toggleCard(index)">
                  <!-- <img class="icon" :src="item.icon" :alt="item.title" /> -->
                  <p class=" serial-number txt-num">{{ item.num }}</p>
                  <div class="card-ul-item-unfolded">
                    <h3 class="txt-5002025 card-ul-item-h3">
                      {{ item.title }}
                    </h3>
                    <img class="arrows" src="/img/vector.svg" :alt="item.title" />
                  </div>
                  <div class="card-ul-item-expand">
                    <div class="card-ul-item-expand-tit">
                      <h3 class="txt-5002025 card-ul-item-h3">
                        {{ item.title }}
                      </h3>
                      <img class="arrows" src="/img/vector.svg" :alt="item.description" />
                    </div>
                    <i class="txt-4001624 card-ul-item-txt" :style="{ '--delay': '0.3s' }">
                      {{ item.description }}
                    </i>
                  </div>
                </li>
              </ul>
              <div class="card-pic-container">
                <img v-if="currentPicSrc" :key="currentPicSrc" :src="currentPicSrc" :alt="currentPicAlt"
                  class="card-pic" />
              </div>
            </div>
          </div>

          <!-- 移动端版本 -->
          <div class="card-con-768">
            <div class="card-con-layout">
              <ul class="card-768-ul">
                <li v-for="(item, index) in mobileScenarioItems" :key="index" style="width: 100%">
                  <p class=" serial-number txt-num">{{ item.num }}</p>
                  <h3 class="txt-5001822 card-ul-item-h3 mb-12">
                    {{ item.title }}
                  </h3>
                  <i class="txt-4001524 card-ul-item-txt mb-16">{{
                    item.description
                  }}</i>
                  <ClientDynamicImage class="card-pic mb-40" :src="item.picSrc" :default-src="item.defaultPicSrc"
                    :alt="item.picAlt" />
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, computed, toRefs, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

const activeCardIndex = ref(0);
const isClient = ref(false);
const imageCache = ref(new Map());

// 预加载图片
const preloadImage = (src: string) => {
  if (imageCache.value.has(src)) return;

  const img = new Image();
  img.src = src;
  imageCache.value.set(src, img);
};

// 预加载所有图片
const preloadAllImages = () => {
  scenarioItems.value.forEach(item => {
    preloadImage(item.picSrc);
    preloadImage(item.defaultPicSrc);
  });
};

// 监听主题变化，预加载新主题的图片
watch(theme, () => {
  if (isClient.value) {
    preloadAllImages();
  }
});

onMounted(() => {
  isClient.value = true;
  preloadAllImages();
});

const currentPicSrc = computed(() => {
  const index = activeCardIndex.value === -1 ? 0 : activeCardIndex.value;
  return isClient.value
    ? scenarioItems.value[index].picSrc
    : scenarioItems.value[index].defaultPicSrc;
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
    num: '01',
    title: t('ai.task.title01'),
    description: t('ai.task.desc01') + '@' + t('ai.task.desc011'),
    picAlt: t('ai.task.desc01') + '@' + t('ai.task.desc011'),
    picSrc: `/img/${theme.value}/${locale.value}_ai_pic1.png`,
    defaultPicSrc: `/img/light/${locale.value}_ai_pic1.png`,
  },
  {
    num: '02',
    title: t('ai.task.title02'),
    description: t('ai.task.desc02'),
    picAlt: t('ai.task.desc02'),
    picSrc: `/img/${theme.value}/${locale.value}_ai_pic2.png`,
    defaultPicSrc: `/img/light/${locale.value}_ai_pic2.png`,
  },
  {
    num: '03',
    title: t('ai.task.title03'),
    description: t('ai.task.desc03'),
    picAlt: t('ai.task.desc03'),
    picSrc: `/img/${theme.value}/${locale.value}_ai_pic3.png`,
    defaultPicSrc: `/img/light/${locale.value}_ai_pic3.png`,
  },
]);

const mobileScenarioItems = computed(() => scenarioItems.value);
</script>

