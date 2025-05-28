<template>
  <div class="scenario-app-con">
    <div class="scenario-app-file">
      <h1 class="txt-5004455 app-h1 mb-16">{{ $t('ai.file.title') }}</h1>

      <h6 class="txt-4001830 app-h6">
        {{ $t('ai.file.desc') }}
      </h6>

      <div
        class="carousel"
        @mousedown="startDrag"
        @mousemove="onDrag"
        @mouseup="endDrag"
        @mouseleave="endDrag"
      >
        <div class="carousel-inner">
          <div
            class="carousel-track"
            :style="{
              transform: `translateX(${currentTranslate}px)`,
              transition: isDragging ? 'none' : 'transform 0.5s ease',
            }"
          >
            <div
              v-for="(slide, index) in visibleSlides"
              :key="index"
              class="carousel-slide"
              :style="{ backgroundColor: slide.color }"
            >
              <div class="slide-content">
                <img :src="slide.svg" class="carousel-image" @load="updateSlideWidth" />
                <div class="slide-title">{{ slide.title }}</div>
                <div class="slide-desc">{{ slide.desc }}</div>
              </div>
            </div>
          </div>
          <div class="carousel-controls">
            <button
              class="carousel-arrow-left"
              @click="prevImage"
              aria-label="上一张"
            >
              <ClientDynamicImage 
                :src="leftArrowImg" 
                :default-src="`/img/light/ai_arrow2.png`"
                alt="" />
            </button>
            <button
              class="carousel-arrow-right"
              @click="nextImage"
              aria-label="下一张"
            >
              <ClientDynamicImage 
              :src="rightArrowImg" 
              :default-src="`/img/light/ai_arrow1.png`"
              alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { Style } from '../.nuxt/components';

const { t, locale } = useI18n();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

const leftArrowImg = computed(() => `/img/${theme.value}/ai_arrow2.png`);
const rightArrowImg = computed(() => `/img/${theme.value}/ai_arrow1.png`);

const slides = computed(() => [
  {
    svg: '/img/ai_icon1.svg',
    title: t('ai.file.slide.wordtitle'),
    desc: t('ai.file.slide.worddesc'),
    color: 'var(--bg-word-color)',
  },
  {
    svg: '/img/ai_icon2.svg',
    title: t('ai.file.slide.ppttitle'),
    desc: t('ai.file.slide.pptdesc'),
    color: 'var(--bg-ppt-color)',
  },
  {
    svg: '/img/ai_icon3.svg',
    title: t('ai.file.slide.exceltitle'),
    desc: t('ai.file.slide.exceldesc'),
    color: 'var(--bg-excel-color)',
  },
  {
    svg: '/img/ai_icon4.svg',
    title: t('ai.file.slide.pdftitle'),
    desc: t('ai.file.slide.pdfdesc'),
    color: 'var(--bg-pdf-color)',
  },
  {
    svg: '/img/ai_icon5.svg',
    title: t('ai.file.slide.rtftitle'),
    desc: t('ai.file.slide.rtfdesc'),
    color: 'var(--bg-rtf-color)',
  },
  {
    svg: '/img/ai_icon6.svg',
    title: t('ai.file.slide.txttitle'),
    desc: t('ai.file.slide.txtdesc'),
    color: 'var(--bg-txt-color)',
  },
  {
    svg: '/img/ai_icon7.svg',
    title: t('ai.file.slide.htmltitle'),
    desc: t('ai.file.slide.htmldesc'),
    color: 'var(--bg-html-color)',
  },
]);

const currentIndex = ref(0);
let autoPlayTimer: number | null = null;
let inactivityTimer: number | null = null;

// 动态获取 slide 宽度
const slideWidth = ref(400); // 默认宽度
const gap = computed(() => isSmallScreen.value ? 24 : 24); // 动态gap值
const carouselWidth = ref(800); // 默认宽度

const updateSlideWidth = () => {
  nextTick(() => {
    const slideEl = document.querySelector('.carousel-slide');
    if (slideEl) {
      slideWidth.value = (slideEl as HTMLElement).offsetWidth;
    }
    const carouselEl = document.querySelector('.carousel-inner');
    if (carouselEl) {
      carouselWidth.value = (carouselEl as HTMLElement).offsetWidth;
    }
    updateCurrentTranslate();
  });
};

// 响应式判断屏幕尺寸
const isSmallScreen = ref(false);
const isLargeScreen = ref(false);
const handleResize = () => {
  if (typeof window !== 'undefined') {
    isSmallScreen.value = window.innerWidth < 768;
    isLargeScreen.value = window.innerWidth > 1024;
    updateSlideWidth();
    // 确保在屏幕尺寸变化后重新计算位置
    nextTick(() => {
      updateCurrentTranslate();
    });
  }
};

function updateCurrentTranslate() {
  const currentGap = gap.value;
  const totalWidth = slideWidth.value + currentGap;
  
  if (!isLargeScreen.value) {
    // 小屏幕时所有图片居中显示
    const offset = (carouselWidth.value - slideWidth.value) / 2;
    currentTranslate.value = offset - (currentIndex.value * totalWidth);
    return;
  }
  
  // 大屏幕时根据屏幕宽度动态计算偏移量
  const screenWidth = window.innerWidth;
  const minScreenWidth = 1024; // 最小大屏宽度
  const midScreenWidth = 1920; // 中等参考宽度
  const maxScreenWidth = 2560; // 最大参考宽度
  
  let screenRatio, minBaseOffset, maxBaseOffset;
  
  if (screenWidth <= midScreenWidth) {
    // 1024px - 1920px 范围
    screenRatio = Math.min(1, Math.max(0, (screenWidth - minScreenWidth) / (midScreenWidth - minScreenWidth)));
    minBaseOffset = Math.floor(minScreenWidth * 0.28); // 最小基础偏移量
    maxBaseOffset = Math.floor(midScreenWidth * 0.105); // 中等基础偏移量
  } else {
    // 1920px - 2560px 范围
    screenRatio = Math.min(1, Math.max(0, (screenWidth - midScreenWidth) / (maxScreenWidth - midScreenWidth)));
    minBaseOffset = Math.floor(midScreenWidth * 0.109); // 中等基础偏移量
    maxBaseOffset = Math.floor(maxScreenWidth * 0.06); // 最大基础偏移量
  }
  
  const baseOffset = Math.floor(minBaseOffset + (maxBaseOffset - minBaseOffset) * screenRatio);
  
  // 计算左边缘初始距离
  const initialOffset = Math.floor(screenWidth * 0.1); // 左边缘距离为屏幕宽度的10%
  
  // 根据索引设置不同的偏移量倍数
  let offsetMultiplier;
  if (screenWidth <= midScreenWidth) {
    // 1024px - 1920px 范围的倍数
    switch (currentIndex.value) {
      case 0: offsetMultiplier = 0.62; break;
      case 1: offsetMultiplier = 0.6; break;
      case 2: offsetMultiplier = 0.6; break;
      case 3: offsetMultiplier = 0.8; break;
      case 4: offsetMultiplier = 1; break;
      case 5: offsetMultiplier = 1.2; break;
      default: offsetMultiplier = 1.3;
    }
  } else {
    // 1920px - 2560px 范围的倍数
    switch (currentIndex.value) {
      case 0: offsetMultiplier = 0.7; break;
      case 1: offsetMultiplier = 0.75; break;
      case 2: offsetMultiplier = 0.8; break;
      case 3: offsetMultiplier = 0.9; break;
      case 4: offsetMultiplier = 1; break;
      case 5: offsetMultiplier = 1.1; break;
      default: offsetMultiplier = 1.2;
    }
  }
  
  // 计算最终偏移量
  const slideOffset = Math.floor(baseOffset * offsetMultiplier);
  currentTranslate.value = initialOffset - (currentIndex.value * slideOffset);
}

// 重置不活动计时器
const resetInactivityTimer = () => {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
  inactivityTimer = setTimeout(() => {
    if (!autoPlayTimer) {
      startAutoPlay();
    }
  }, 30000); // 3秒后启动自动播放
};

// 添加拖拽相关的状态
const isDragging = ref(false);
const startX = ref(0);
const currentTranslate = ref(0);
const prevTranslate = ref(0);

// 修改开始拖拽函数
const startDrag = (e: MouseEvent) => {
  isDragging.value = true;
  startX.value = e.clientX;
  prevTranslate.value = currentTranslate.value;
  stopAutoPlay();
  resetInactivityTimer();
};

// 修改结束拖拽函数
const endDrag = () => {
  if (!isDragging.value) return;

  isDragging.value = false;
  const threshold = slideWidth.value / 4;
  const diff = currentTranslate.value - prevTranslate.value;
  const currentGap = gap.value;

  if (Math.abs(diff) > threshold) {
    if (diff > 0 && currentIndex.value > 0) {
      currentIndex.value -= 1;
    } else if (diff < 0 && currentIndex.value < slides.value.length - 1) {
      currentIndex.value += 1;
    }
  }

  updateCurrentTranslate();
  resetInactivityTimer();
};

// 拖拽中
const onDrag = (e: MouseEvent) => {
  if (isDragging.value) {
    const currentX = e.clientX;
    const diff = currentX - startX.value;
    const currentGap = gap.value;
    const totalWidth = slideWidth.value + currentGap;
    
    currentTranslate.value = prevTranslate.value + diff;
    
    if (isLargeScreen.value) {
      const screenWidth = window.innerWidth;
      const minScreenWidth = 1024;
      const midScreenWidth = 1920;
      const maxScreenWidth = 2560;
      
      let screenRatio, minBaseOffset, maxBaseOffset;
      
      if (screenWidth <= midScreenWidth) {
        screenRatio = Math.min(1, Math.max(0, (screenWidth - minScreenWidth) / (midScreenWidth - minScreenWidth)));
        minBaseOffset = Math.floor(minScreenWidth * 0.28);
        maxBaseOffset = Math.floor(midScreenWidth * 0.105);
      } else {
        screenRatio = Math.min(1, Math.max(0, (screenWidth - midScreenWidth) / (maxScreenWidth - midScreenWidth)));
        minBaseOffset = Math.floor(midScreenWidth * 0.105);
        maxBaseOffset = Math.floor(maxScreenWidth * 0.08);
      }
      
      const baseOffset = Math.floor(minBaseOffset + (maxBaseOffset - minBaseOffset) * screenRatio);
      
      // 计算左边缘初始距离
      const initialOffset = Math.floor(screenWidth * 0.1);
      
      // 计算最大和最小位移值
      const maxTranslate = initialOffset;
      const minTranslate = initialOffset - ((slides.value.length - 1) * (baseOffset * (screenWidth <= midScreenWidth ? 1.3 : 1.2)));
      
      currentTranslate.value = Math.min(maxTranslate, Math.max(minTranslate, currentTranslate.value));
    } else {
      const offset = (carouselWidth.value - slideWidth.value) / 2;
      const maxTranslate = offset;
      const minTranslate = offset - ((slides.value.length - 1) * totalWidth);
      currentTranslate.value = Math.min(maxTranslate, Math.max(minTranslate, currentTranslate.value));
    }
  }
};

const visibleSlides = computed(() => slides.value);

// 轮播切换按钮
const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 1;
    updateCurrentTranslate();
  }
};
const nextImage = () => {
  if (currentIndex.value < slides.value.length - 1) {
    currentIndex.value += 1;
    updateCurrentTranslate();
  }
};

const startAutoPlay = () => {
  autoPlayTimer = setInterval(nextImage, 10000);
};

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  window.addEventListener('resize', updateSlideWidth);
  nextTick(() => {
    updateSlideWidth();
    // 增加延迟时间，确保所有资源加载完成
    setTimeout(() => {
      updateSlideWidth();
      updateCurrentTranslate();
    }, 200);
  });
  startAutoPlay();
  resetInactivityTimer();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  window.removeEventListener('resize', updateSlideWidth);
  stopAutoPlay();
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
  }
});
</script>
