<template>
  <article class="choose">
    <!-- 大屏幕版本 -->
    <div class="choose-con">
      <ul class="choose-con-ul mb-32">
        <li class="choose-con-item">
          <h1 class="txt-5004455 choose-con-tit">
            {{ $t('homepage.whychoose.title') }}
            <svg
              class="arcs2"
              width="312"
              height="23"
              viewBox="0 0 312 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                ref="HomeArcsRef"
                class="home_arc"
                opacity="0.5"
                d="M3 20C47.4822 7.1714 170.957 -10.7886 309 20"
                stroke="#8BCF70"
                stroke-width="6"
                stroke-linecap="round"
                stroke-dasharray="600, 600"
                stroke-dashoffset="0"
              />
            </svg>
          </h1>
        </li>

        <li
          v-for="(item, index) in chooseItems.slice(0, 2)"
          :key="index"
          ref="BoxesRef"
          class="choose-con-item hover home-animate-box"
          :style="{ '--delay': `${(index * 0.1).toFixed(1)}s` }"
        >
          <h1 class="txt-7003645 serial-number mb-24">{{ item.number }}</h1>
          <h5 class="txt-5002025 mb-16 choose-con-item-h5">
            {{ item.title }}
          </h5>
          <h6 class="txt-4001624 choose-con-item-h6">
            {{ item.description }}
          </h6>
        </li>
      </ul>
      <ul class="choose-con-ul mb-32">
        <li
          v-for="(item, index) in chooseItems.slice(2)"
          :key="index"
          ref="BoxesRef"
          class="choose-con-item hover home-animate-box"
          :style="{ '--delay': `${(index + 2) * 0.1}s` }"
        >
          <h1 class="txt-7003645 serial-number mb-24">{{ item.number }}</h1>
          <h5 class="txt-5002025 mb-16 choose-con-item-h5">
            {{ item.title }}
          </h5>
          <h6 class="txt-4001624 choose-con-item-h6">
            {{ item.description }}
          </h6>
        </li>
      </ul>
    </div>
    <!-- 移动端版本 -->
    <div class="choose-con-768">
      <h1 class="txt-5004455 choose-con-tit">
        {{ $t('homepage.whychoose.title') }}
        <img
          class="arcs2"
          src="/img/arcs.svg"
          alt=" $t('homepage.whychoose.title') "
        />
      </h1>
      <div 
        class="choose-con-768-box"
        @touchstart="handleTouchStart" 
        @touchmove="handleTouchMove" 
        @touchend="handleTouchEnd"
      >
        <ul
          class="choose-con-768-ul"
          :style="{
            display: 'flex',
            width: `${chooseItems.length * 100}%`,
            transform: `translateX(-${activeIndex * (100 / chooseItems.length)}%)`,
            transition: isTransitioning ? 'transform 0.5s ease' : 'none',
            willChange: 'transform',
          }"
        >
          <li
            v-for="(item, index) in chooseItems"
            :key="index"
            class="choose-con-768-item"
            :class="{ active: activeIndex === index }"
          >
            <h1 class="txt-7003240 serial-number mb-24">{{ item.number }}</h1>
            <h5 class="txt-5002025 mb-16 choose-con-item-h5">
              {{ item.title }}
            </h5>
            <h6 class="txt-4001524 choose-con-item-h6">
              {{ item.description }}
            </h6>
          </li>
        </ul>
      </div>
      <ul id="card-indicators">
        <li
          v-for="(_, index) in chooseItems"
          :key="index"
          class="card-indicators-item"
          :class="{ active: activeIndex === index }"
          @click="changeActiveItem(index)"
        ></li>
      </ul>
    </div>
  </article>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const BoxesRef = ref<NodeListOf<HTMLElement> | null>(null);
const HomeArcsRef = ref<HTMLElement | null>(null);


const touchStartX = ref(0);
const touchMoveX = ref(0);


interface ChooseItem {
  number: string;
  title: string;
  description: string;
}

const activeIndex = ref(0);
const isMobile = ref(false);
const isTransitioning = ref(true);

const chooseItems = computed<ChooseItem[]>(() => [
  {
    number: '01',
    title: t('homepage.whychoose.reason_one_ti'),
    description: t('homepage.whychoose.reason_one_desc'),
  },
  {
    number: '02',
    title: t('homepage.whychoose.reason_two_ti'),
    description: t('homepage.whychoose.reason_two_desc'),
  },
  {
    number: '03',
    title: t('homepage.whychoose.reason_three_ti'),
    description: t('homepage.whychoose.reason_three_desc'),
  },
  {
    number: '04',
    title: t('homepage.whychoose.reason_four_ti'),
    description: t('homepage.whychoose.reason_four_desc'),
  },
  {
    number: '05',
    title: t('homepage.whychoose.reason_five_ti'),
    description: t('homepage.whychoose.reason_five_desc'),
  },
]);

// 检查屏幕尺寸
const checkMobileView = () => {
  isMobile.value = window.innerWidth <= 768;
};

// 自动轮播功能
let autoPlayTimer: number | null = null;
const startAutoPlay = () => {
  if (isMobile.value) {
    stopAutoPlay(); // 清除任何现有的定时器
    autoPlayTimer = window.setInterval(() => {
      // 当到达最后一张时，瞬间跳转到第一张
      if (activeIndex.value === chooseItems.value.length - 1) {
        // 禁用过渡
        isTransitioning.value = false;

        // 立即跳转到第一张
        activeIndex.value = 0;

        // 使用 setTimeout 模拟微任务
        setTimeout(() => {
          // 重新启用过渡
          isTransitioning.value = true;
        }, 50);
      } else {
        activeIndex.value++;
      }
    }, 3000);
  }
};

const changeActiveItem = (index: number) => {
  activeIndex.value = index;
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};


//手动滑动卡片功能
const handleTouchStart = (event: TouchEvent) => {
  if (!isMobile.value) return;
  touchStartX.value = event.touches[0].clientX;
  stopAutoPlay(); // 用户开始触摸时停止自动播放
};

const handleTouchMove = (event: TouchEvent) => {
  if (!isMobile.value) return;
  touchMoveX.value = event.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (!isMobile.value) return;
  
  const touchDiff = touchStartX.value - touchMoveX.value;
  const threshold = 50; // 触发滑动的最小距离

  if (Math.abs(touchDiff) > threshold) {
    if (touchDiff > 0 && activeIndex.value < chooseItems.value.length - 1) {
      // 向左滑动，切换到下一张
      activeIndex.value++;
    } else if (touchDiff < 0 && activeIndex.value > 0) {
      // 向右滑动，切换到上一张
      activeIndex.value--;
    }
  }

  // 重新启动自动播放
  startAutoPlay();
};

/* 滑动到可视区域执行动画 */
let timerId: ReturnType<typeof setTimeout> | null = null;
const animateBoxes = () => {
  if (BoxesRef.value) {
    BoxesRef.value.forEach((box) => {
      const boxTop = box.getBoundingClientRect().top;
      const boxBottom = box.getBoundingClientRect().bottom;
      if (boxTop < window.innerHeight && boxBottom > 0) {
        box.classList.add('animate');
        HomeArcsRef.value?.classList.add('arc-animate');
        timerId = setTimeout(() => {
          box.classList.remove('home-animate-box');
          timerId = null;
        }, 1300);
      }
    });
  }
};

// 创建 resize 事件处理函数，保存引用以便后续移除
const handleResize = () => {
  checkMobileView();
  // 调整窗口大小时重新启动自动播放
  startAutoPlay();
};

onMounted(() => {
  checkMobileView();
  window.addEventListener('resize', handleResize);

  // 组件挂载时启动自动播放
  startAutoPlay();

  // 添加滚动监听器以触发动画
  animateBoxes();
  window.addEventListener('scroll', animateBoxes);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  stopAutoPlay();
  window.removeEventListener('scroll', animateBoxes);
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
});
</script>

<style scoped>
.choose-con-768-ul {
  will-change: transform;
}
</style>
