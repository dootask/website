<template>
  <article class="performance">
    <div class="performance-con">
      <h1 class="txt-5004455 performance-h1">
        {{ $t('produpage.digit.title') }}
      </h1>
      <div class="theme-images">
        <ClientDynamicImage
          class="pic mt-80"
          :src="`/img/${theme}/${locale}_product_pic11.png`"
          :default-src="`/img/light/${locale}_product_pic11.png`"
          :alt="$t('produpage.digit.title')"
        />
      </div>

      <ul class="performance-ul">
        <li
          v-for="(item, index) in performanceItems"
          :key="index"
          ref="ProductAnimateBox2Ref"
          class="performance-ul-item product-animate-box2"
          :style="{ '--delay': `${(index * 0.1).toFixed(1)}s` }"
        >
          <i class="icon mb-24"></i>
          <h5 class="txt-5002025 performance-h5 mb-4">
            {{ item.titleFirst }}
          </h5>
          <h5 class="txt-5002025 performance-h5 mb-16">
            {{ item.titleSecond }}
          </h5>
          <h6 class="txt-4001624 performance-h6">
            {{ item.description }}
          </h6>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import { toRefs, onMounted, ref, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { throttle } from '../utils/debounceThrottle';

const { t, locale } = useI18n();

const themeStore = useThemeStore();

const ProductAnimateBox2Ref = ref<NodeListOf<HTMLElement> | null>(null);

const { theme } = toRefs(themeStore);

const performanceItems = computed(() => [
  {
    titleFirst: t('produpage.digit.digtitle_fir_one'),
    titleSecond: t('produpage.digit.digtitle_sec_one'),
    description: t('produpage.digit.digdesc_one'),
  },
  {
    titleFirst: t('produpage.digit.digtitle_fir_two'),
    titleSecond: t('produpage.digit.digtitle_sec_two'),
    description: t('produpage.digit.digdesc_two'),
  },
  {
    titleFirst: t('produpage.digit.digtitle_fir_three'),
    titleSecond: t('produpage.digit.digtitle_sec_three'),
    description: t('produpage.digit.digdesc_three'),
  },
  {
    titleFirst: t('produpage.digit.digtitle_fir_four'),
    titleSecond: t('produpage.digit.digtitle_sec_four'),
    description: t('produpage.digit.digdesc_four'),
  },
]);

/* 滑动到可视区域执行动画 */
const animateBoxes = () => {
  const boxes = ProductAnimateBox2Ref.value;
  if (boxes) {
    boxes.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      const boxBottom = box.getBoundingClientRect().bottom;
      if (boxTop < window.innerHeight && boxBottom > 0) {
        box.classList.add('animate');
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
