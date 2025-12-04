<template>
  <article class="scenario-app">
    <div class="scenario-app-con">
      <div class="scenario-app-layout">
        <h1 class="txt-5004455 scenario-app-h1 mb-16">
          {{ $t('about.scenapply.title') }}
        </h1>
        <h6
          class="txt-4001824 scenario-app-h6 mb-80"
          style="text-align: center"
        >
          {{ $t('about.scenapply.desc') }}
        </h6>
        <ul class="scenario-app-ul">
          <li
            v-for="(scenario, index) in scenarios"
            :key="index"
            ref="AboutAnimateBoxRef"
            class="scenario-app-ul-item mb-32 about-animate-box"
            :style="`--delay: ${index * 0.1}s`"
          >
            <i class="scenario-app-icon-bg mb-24">
              <img
                :src="scenario.icon"
                :alt="scenario.title"
                class="scenario-app-icon"
              />
            </i>
            <h5 class="txt-5002025 scenario-app-h5 mb-16">
              {{ scenario.title }}
            </h5>
            <h6 class="txt-4001624 scenario-app-h6">
              {{ scenario.description }}
            </h6>
            <img
              :src="scenario.svg"
              :alt="scenario.description"
              class="scenario-app-ul-item-svg"
            />
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { onMounted, ref, onBeforeUnmount } from 'vue';
import { throttle } from '../../utils/debounceThrottle';

const AboutAnimateBoxRef = ref<NodeListOf<HTMLElement> | null>(null);
const { t } = useI18n();

const scenarios = computed(() => [
  {
    title: t('about.scenapply.cardtitle_one'),
    icon: '/img/about_icon7.svg',
    description: t('about.scenapply.cardesc_one'),
    svg: '/img/01.svg',
  },
  {
    title: t('about.scenapply.cardtitle_two'),
    icon: '/img/about_icon8.svg',
    description: t('about.scenapply.cardesc_two'),
    svg: '/img/02.svg',
  },
  {
    title: t('about.scenapply.cardtitle_three'),
    icon: '/img/about_icon9.svg',
    description: t('about.scenapply.cardesc_three'),
    svg: '/img/03.svg',
  },
  {
    title: t('about.scenapply.cardtitle_four'),
    icon: '/img/about_icon10.svg',
    description: t('about.scenapply.cardesc_four'),
    svg: '/img/04.svg',
  },
]);

/* 滑动到可视区域执行动画 */
const animateBoxes = () => {
  const boxes = AboutAnimateBoxRef.value;
  if (boxes) {
    boxes.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      const boxBottom = box.getBoundingClientRect().bottom;
      if (boxTop < window.innerHeight && boxBottom > 0) {
        box.classList.add('animate');
        setTimeout(() => {
          box.classList.remove("about-animate-box");
        }, 1200);
      }
    });
  }
};
const throttleAnimateBoxes = throttle(animateBoxes, 50);
onMounted(() => {
  window.addEventListener('scroll', throttleAnimateBoxes);
  animateBoxes();
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttleAnimateBoxes);
});
</script>
