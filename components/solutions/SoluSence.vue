<!-- 解决方案-团队运营 -->
<template>
  <article class="team solutions">
    <div class="team-con">
      <h1 class="txt-5004455 team-tit">{{ $t('solution.team.title') }}</h1>
      <ul class="team-ul mt-80">
        <li
          v-for="(item, index) in teamOperations"
          v-show="item.icon && item.title && item.description"
          :key="item.title"
          ref="SolutionsAnimateBoxRef"
          class="solutions-animate-box"
          :class="['team-ul-item', `team-ul-item-${lang}`]"
          :style="{ '--delay': `${(index * 0.1).toFixed(1)}s` }"
        >
          <img class="team-icon mb-24" :src="item.icon" :alt="item.title" />
          <h4 class="txt-5002025 app-h4 mb-16">{{ item.title }}</h4>
          <h6 class="txt-4001624 app-h6">{{ item.description }}</h6>
        </li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import { toRefs, onMounted, ref, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { throttle } from '../utils/debounceThrottle';

//设置语言动态卡片高度
const themeStore = useThemeStore();
const { lang } = toRefs(themeStore);

const { t } = useI18n();

const SolutionsAnimateBoxRef = ref<NodeListOf<HTMLElement> | null>(null);

const teamOperations = computed(() => [
  {
    icon: '/img/solution_icon1.svg',
    title: t('solution.team.title_one'),
    description: t('solution.team.desc_one'),
  },
  {
    icon: '/img/solution_icon2.svg',
    title: t('solution.team.title_two'),
    description: t('solution.team.desc_two'),
  },
  {
    icon: '/img/solution_icon3.svg',
    title: t('solution.team.title_three'),
    description: t('solution.team.desc_three'),
  },
]);

const animateBoxes = () => {
  if (SolutionsAnimateBoxRef.value) {
    SolutionsAnimateBoxRef.value.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      const boxBottom = box.getBoundingClientRect().bottom;

      // 判断元素是否进入视口
      if (boxTop < window.innerHeight && boxBottom > 0) {
        box.classList.add('animate');
        setTimeout(() => {
          box.classList.remove('solutions-animate-box');
        }, 1200);
      }
    });
  }
};
const throttleAnimateBoxes = throttle(animateBoxes, 50);
onMounted(() => {
  window.addEventListener('scroll', throttleAnimateBoxes);
  animateBoxes(); //
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttleAnimateBoxes);
});
</script>
