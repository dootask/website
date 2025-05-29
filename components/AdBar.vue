<template>
  <div v-show="adDiaplsy" id="ad" ref="AdRef" class="ad ad-page" :class="{ 'ad-show': isShow }">
    <div class="ad-content">
      <div class="ad-content-left">
        <p id="ad-text" ref="AdTextRef" class="ad-text">{{ adText }}</p>
        <button id="ad-btn" ref="AdBtnRef" class="ad-btn" @click="goToAdPage">{{ buttonText }}</button>
      </div>
      <div id="ad-close" ref="AdCloseRef" class="ad-close">
        <img src="/img/price_icon2.svg" alt="关闭" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, nextTick } from 'vue';
import '@/assets/scss/ad.scss';

const { locale } = useI18n();

// 默认广告内容
const defaultAdContent = {
  text: '更多优惠来袭！',
  buttonText: '前往了解',
  background: '/img/ad/bar_card.png',
  defaultBackground: '/img/ad/bar_card.png'
};

// 响应式数据
const adDiaplsy = ref(false);
const isShow = ref(false);
const adText = ref(defaultAdContent.text);
const buttonText = ref(defaultAdContent.buttonText);
const currentBackground = ref(defaultAdContent.defaultBackground);

const AdRef = ref<HTMLElement | null>();
const AdTextRef = ref<HTMLElement | null>();
const AdBtnRef = ref<HTMLElement | null>();
const AdCloseRef = ref<HTMLElement | null>();

// 根据窗口宽度设置广告栏高度
const adBarHeight = window?.innerWidth <= 768 ? 48 : 64;
const adBarHeightPX = `${adBarHeight}px`;

// 调整导航栏位置
function adjustNavPosition(direction: string) {
  const navWrapper = document.getElementsByClassName('nav')[0] as HTMLElement;
  if (navWrapper) {
    navWrapper.style.top = direction === 'down' ? adBarHeightPX : '0';
  }
}

// 调整头部边距
function adjustHeaderMargin(margin: string) {
  const headerEl = document.getElementsByTagName('header')[0];
  if (headerEl) {
    headerEl.style.marginTop = margin;
  }
}

// 预加载图片
function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// 组件挂载时初始化
onMounted(async () => {
  // 等待语言加载完成
  await nextTick();
  
  // 根据当前语言设置广告内容
  if (locale.value === 'en') {
    adText.value = 'September Double Deal Bonanza!';
    buttonText.value = 'Go to';
  } else {
    adText.value = defaultAdContent.text;
    buttonText.value = defaultAdContent.buttonText;
  }
  
  // 调整头部和导航栏位置
  adjustHeaderMargin(adBarHeightPX);
  adjustNavPosition('down');
  
  // 显示广告条
  adDiaplsy.value = true;
  initializeAdBar();
  updateAdBar();
  
  // 添加动画类
  setTimeout(() => {
    isShow.value = true;
  }, 50);
});

// 初始化广告栏
const initializeAdBar = () => {
  const adWrapper = AdRef.value;
  if (!adWrapper) return;
  
  adWrapper.style.height = adBarHeightPX;
  adWrapper.style.display = 'block';

  // 添加关闭广告栏的事件监听器
  AdCloseRef.value?.addEventListener('click', () => {
    hideAdBar();
  });
};

// 隐藏广告栏
function hideAdBar() {
  const adWrapper = AdRef.value;
  if (!adWrapper) return;
  
  isShow.value = false;
  
  // 等待动画结束后再隐藏
  setTimeout(() => {
    adWrapper.style.height = '0px';
    adWrapper.style.display = 'none';
    adDiaplsy.value = false;
    
    // 重置头部和导航栏位置
    adjustHeaderMargin('0px');
    adjustNavPosition('up');
  }, 300);
}

// 更新广告栏内容
function updateAdBar() {
  const adWrapper = AdRef.value;
  if (!adWrapper) return;
  
  // 设置背景图片
  currentBackground.value = defaultAdContent.background;
  adWrapper.style.backgroundImage = `url(${currentBackground.value})`;

  // 更新文本内容
  if (AdTextRef.value) {
    AdTextRef.value.textContent = adText.value;
  }

  // 更新按钮文本
  if (AdBtnRef.value) {
    AdBtnRef.value.textContent = buttonText.value;
  }
}

const route = useRoute();
const router = useRouter();

// 监听语言变化
watch(locale, () => {
  // 根据语言更新文本内容
  if (locale.value === 'en') {
    adText.value = 'September Double Deal Bonanza!';
    buttonText.value = 'Go to';
  } else {
    adText.value = defaultAdContent.text;
    buttonText.value = defaultAdContent.buttonText;
  }
  updateAdBar();
}, { immediate: true });

// 监听路由变化
watch(
  () => route.path,
  () => {
    updateAdBar();
  }
);

const goToAdPage = () => {
  // 跳转到主页
  router.push(`/${locale.value}/ad`)
}
</script>


