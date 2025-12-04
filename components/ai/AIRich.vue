<template>
  <div>
    <div class="airich-layout">
      <h1 class="app-h3">
        {{ $t('ai.richselect.title') }}
      </h1>
      <ClientOnly>
      <div class="accordion-grid" v-if="!isMobile">
  
        <div
          v-for="(item, index) in items"
          :key="index"
          class="accordion-item"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        >
          <div
            class="accordion-content"
            :class="{ active: activeIndex === index }"
            :style="{ backgroundImage: `url(${item.image})` }"
          >
            <div class="logo-mask" :class="{ hide: activeIndex === index }">
              <h3>{{ item.title }}</h3>
            </div>
            <!-- 下半段渐变蒙版，仅展开时显示 -->
            <div class="accordion-bottom-mask" v-if="activeIndex === index"></div>
            <transition name="accordion-fade">
              <div class="accordion-text" v-if="activeIndex === index">
                <h3>{{ item.title }}</h3>
                <p>{{ item.description }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="mobile-grid" v-else>
        <div
          v-for="(item, index) in items"
          :key="index"
          class="mobile-grid-item"
          :style="{ backgroundImage: `url(${item.image})` }"
        >
          <div class="mobile-grid-title">{{ item.title }}</div>
        </div>
      </div>
    </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const { t, locale } = useI18n();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

const items = computed(() => [
  {
    image:`/img/${theme.value}/${locale.value}_ai_pic7.png`,
    title:t('ai.richselect.sub01'),
    description:t('ai.richselect.desc01'),
  },
  {
    image: `/img/${theme.value}/${locale.value}_ai_pic8.png`,
    title: t('ai.richselect.sub02'),
    description:t('ai.richselect.desc02'),
  },
  {
    image: `/img/${theme.value}/${locale.value}_ai_pic9.png`,
    title: t('ai.richselect.sub03'),
    description:t('ai.richselect.desc03'),
  },
  {
    image:`/img/${theme.value}/${locale.value}_ai_pic10.png`,
    title: t('ai.richselect.sub04'),
    description:t('ai.richselect.desc04'),
  },
  {
    image:`/img/${theme.value}/${locale.value}_ai_pic11.png`,
    title: t('ai.richselect.sub05'),
    description:t('ai.richselect.desc05'),
  },
  {
    image:`/img/${theme.value}/${locale.value}_ai_pic12.png`,
    title: t('ai.richselect.sub06'),
    description:t('ai.richselect.desc06'),
  },
  {
    image: `/img/${theme.value}/${locale.value}_ai_pic13.png`,
    title: t('ai.richselect.sub07'),
    description:t('ai.richselect.desc07'),
  },
  {
    image:`/img/${theme.value}/${locale.value}_ai_pic14.png`,
    title: t('ai.richselect.sub08'),
    description:t('ai.richselect.desc08'),
  },
  {
    image:`/img/${theme.value}/${locale.value}_ai_pic15.png`,
    title: t('ai.richselect.sub09'),
    description:t('ai.richselect.desc09'),
  },
]);

const activeIndex = ref(-1);
const isHovering = ref(false);
const hoverTimer = ref<number | null>(null);

const isMobile = ref(false);

const handleResize = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth <= 820;
  }
};

onMounted(() => {
  handleResize(); // 初始化时也判断一次
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
  }
});
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize);
  }
});

const handleMouseEnter = (index: number) => {
  if (hoverTimer.value) clearTimeout(hoverTimer.value);
  hoverTimer.value = window.setTimeout(() => {
    activeIndex.value = index;
    isHovering.value = true;
    hoverTimer.value = null;
  }, 200); // 0.5秒后激活
};

const handleMouseLeave = () => {
  if (hoverTimer.value) {
    clearTimeout(hoverTimer.value);
    hoverTimer.value = null;
  }
  activeIndex.value = -1;
  isHovering.value = false;
};

</script>

