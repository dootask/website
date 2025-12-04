<template>
  <div
    v-show="adDiaplsy"
    id="ad"
    ref="AdRef"
    class="ad ad-page"
    :class="{ 'ad-show': isShow }"
    :style="!hasButtonText ? { cursor: 'pointer' } : {}"
    @click="() => {
      if (!hasButtonText) {
        goToAdPage();
      }
    }"
  >
    <div class="ad-content">
      <div class="ad-content-left">
        <p id="ad-text" ref="AdTextRef" class="ad-text">{{ displayedText }}</p>
        <button v-if="hasButtonText" id="ad-btn" ref="AdBtnRef" class="ad-btn" @click="goToAdPage">{{ buttonText
          }}</button>
      </div>
      <div id="ad-close" ref="AdCloseRef" class="ad-close" @click.stop.prevent="hideAdBar">
        <img src="/img/price_icon2.svg" alt="关闭" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import '@/assets/scss/ad.scss';
import { fetchData } from '../utils/fetch';
import type { BannerBarResponse, BannerBarProps } from '../types/strapi'


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
const adTexts = ref<string[]>([]); // 存储分割后的多句话
const currentTextIndex = ref(0); // 当前显示的句子索引
const displayedText = ref(''); // 打字机效果显示的文本
const buttonText = ref(defaultAdContent.buttonText);
const currentBackground = ref(defaultAdContent.defaultBackground);

const AdRef = ref<HTMLElement | null>();
const AdTextRef = ref<HTMLElement | null>();
const AdBtnRef = ref<HTMLElement | null>();
const AdCloseRef = ref<HTMLElement | null>();

// 打字机效果配置
const enableTypewriter = ref(true); // 是否启用打字机效果，默认开启
const typewriterSpeed = ref(100); // 打字速度（毫秒/字符）
const typewriterLoop = ref(true); // 是否循环播放打字机效果，默认关闭
const typewriterLoopDelay = ref(2000); // 打字完成后停留时间（毫秒）
const backspaceSpeed = ref(50); // 退格速度（毫秒/字符），建议比打字速度快
const backspaceDelay = ref(1000); // 退格前的延迟时间（毫秒）
let typewriterTimer: ReturnType<typeof setTimeout> | null = null;
const isFirstTypewriterRun = ref(true); // 标记是否首次运行打字机效果


const hasButtonText = ref(false);

// 动态高度配置
const enableDynamicHeight = ref(true); // 是否启用动态高度，默认开启
const minAdBarHeight = ref(window?.innerWidth <= 768 ? 64 : 100); // 最小高度
const maxAdBarHeight = ref(window?.innerWidth <= 768 ? 200 : 120); // 最大高度（移动端更大以适应多行）
const currentAdBarHeight = ref(minAdBarHeight.value); // 当前实际高度

// 调整导航栏位置
function adjustNavPosition(direction: string) {
  const navWrapper = document.getElementsByClassName('nav')[0] as HTMLElement;
  if (navWrapper) {
    navWrapper.style.top = direction === 'down' ? `${currentAdBarHeight.value}px` : '0';
  }
}

// 调整头部边距
function adjustHeaderMargin(height: number) {
  const headerEl = document.getElementsByTagName('header')[0];
  if (headerEl) {
    headerEl.style.marginTop = `${height}px`;
  }
}

// 计算并更新广告栏动态高度
function calculateAdBarHeight() {
  if (!enableDynamicHeight.value) {
    currentAdBarHeight.value = minAdBarHeight.value;
    updateLayoutPositions();
    return;
  }

  nextTick(() => {
    const adWrapper = AdRef.value;
    const adContent = adWrapper?.querySelector('.ad-content') as HTMLElement;
    
    if (!adWrapper || !adContent) return;

    // 临时设置为auto以测量实际内容高度
    adWrapper.style.height = 'auto';
    adWrapper.style.minHeight = `${minAdBarHeight.value}px`;
    
    // 获取内容实际高度（包括padding）
    const contentHeight = adContent.scrollHeight;
    
    // 计算需要的总高度（内容高度 + 一些额外空间）
    let newHeight = contentHeight + 16; // 增加一些padding空间
    
    // 限制在最小和最大高度之间
    newHeight = Math.max(minAdBarHeight.value, Math.min(maxAdBarHeight.value, newHeight));
    
    // 更新当前高度
    currentAdBarHeight.value = newHeight;
    
    // 应用新高度
    adWrapper.style.height = `${newHeight}px`;
    adWrapper.style.minHeight = '';
    
    // 更新布局位置
    updateLayoutPositions();
  });
}

// 更新导航栏和头部位置
function updateLayoutPositions() {
  adjustNavPosition('down');
  adjustHeaderMargin(currentAdBarHeight.value);
}

// 清除打字机定时器
function clearTypewriterTimer() {
  if (typewriterTimer) {
    clearTimeout(typewriterTimer);
    typewriterTimer = null;
  }
}

// 退格效果
function startBackspaceEffect() {
  const backspaceNextChar = () => {
    if (displayedText.value.length > 0) {
      // 逐个删除字符
      displayedText.value = displayedText.value.slice(0, -1);
      typewriterTimer = setTimeout(backspaceNextChar, backspaceSpeed.value);
    } else {
      // 退格完成，切换到下一句话
      if (adTexts.value.length > 1) {
        currentTextIndex.value = (currentTextIndex.value + 1) % adTexts.value.length;
      }
      
      // 等待一段时间后重新开始打字
      typewriterTimer = setTimeout(() => {
        const nextText = adTexts.value[currentTextIndex.value] || adText.value;
        startTypewriterEffect(nextText, true); // 重新开始打字循环
      }, backspaceDelay.value);
    }
  };
  
  backspaceNextChar();
}

// 打字机效果
function startTypewriterEffect(text: string, isLoop = false) {
  // 清除之前的定时器
  clearTypewriterTimer();
  
  // 如果未启用打字机效果，直接显示完整文本
  if (!enableTypewriter.value) {
    displayedText.value = text;
    // 只在第一次计算高度
    if (isFirstTypewriterRun.value) {
      nextTick(() => calculateAdBarHeight());
      isFirstTypewriterRun.value = false;
    }
    return;
  }
  
  // 重置显示文本（只在非循环时重置）
  if (!isLoop) {
    displayedText.value = '';
  }
  
  let currentIndex = 0;
  let lastHeightUpdateIndex = 0; // 记录上次更新高度时的索引
  
  const typeNextChar = () => {
    if (currentIndex < text.length) {
      displayedText.value += text[currentIndex];
      currentIndex++;
      
      // 只在第一次运行时计算高度，循环时跳过
      if (isFirstTypewriterRun.value) {
        // 每打几个字符就重新计算一次高度（避免频繁计算）
        if (currentIndex - lastHeightUpdateIndex >= 5 || currentIndex === text.length) {
          calculateAdBarHeight();
          lastHeightUpdateIndex = currentIndex;
        }
      }
      
      typewriterTimer = setTimeout(typeNextChar, typewriterSpeed.value);
    } else {
      // 打字完成，只在第一次确保最终高度正确
      if (isFirstTypewriterRun.value) {
        calculateAdBarHeight();
        isFirstTypewriterRun.value = false;
      }
      
      // 打字完成后，如果启用循环，则在延迟后开始退格
      if (typewriterLoop.value) {
        typewriterTimer = setTimeout(() => {
          startBackspaceEffect(); // 开始退格效果
        }, typewriterLoopDelay.value);
      }
    }
  };
  
  // 延迟开始，等待广告栏完全显示（只在第一次延迟）
  const startDelay = isFirstTypewriterRun.value && !isLoop ? 300 : 0;
  typewriterTimer = setTimeout(typeNextChar, startDelay);
}

// 获取广告栏数据
const fetchAdBar = (language: string) => {
  const apiUrl = `https://cms.hitosea.com/api/doo-task-ad-bar?locale=${language}&populate[0]=background`;

  fetchData<BannerBarResponse>(apiUrl)
    .then(({ data }) => {
      if (data && data.attributes) {
        updateAdBarFromAPI(data.attributes);
      }
    })
    .catch((_error) => {
      // API 请求失败时使用默认内容
      console.warn('Failed to fetch ad bar data, using default content');
    });
};

// 从 API 数据更新广告栏
function updateAdBarFromAPI(attributes: BannerBarProps) {
  // 更新文本内容
  adText.value = attributes.text || defaultAdContent.text;
  
  // 解析文本，检查是否有多句话（用 | 分割）
  if (adText.value.includes('|')) {
    adTexts.value = adText.value.split('|').map(text => text.trim()).filter(text => text.length > 0);
  } else {
    adTexts.value = [adText.value];
  }
  
  // 重置当前句子索引
  currentTextIndex.value = 0;
  
  if (attributes.buttonText) {
    hasButtonText.value = true;
    buttonText.value = attributes.buttonText || defaultAdContent.buttonText;
  } else {
    buttonText.value = attributes.buttonText
  }

  // 更新背景图片
  if (attributes.background?.data?.attributes?.url) {
    currentBackground.value = `https://cms.hitosea.com${attributes.background.data.attributes.url}`;
  }

  // 应用更新
  updateAdBar();

  // 重置首次运行标志（新内容需要重新计算高度）
  isFirstTypewriterRun.value = true;
  
  // 启动打字机效果（使用第一句话）
  const firstText = adTexts.value[0] || adText.value;
  startTypewriterEffect(firstText);
}


// 组件挂载时初始化
onMounted(async () => {
  // 等待语言加载完成
  await nextTick();
  
  // 初始化默认文本数组
  if (adText.value.includes('|')) {
    adTexts.value = adText.value.split('|').map(text => text.trim()).filter(text => text.length > 0);
  } else {
    adTexts.value = [adText.value];
  }

  // 初始调整头部和导航栏位置（使用初始高度）
  adjustHeaderMargin(currentAdBarHeight.value);
  adjustNavPosition('down');

  // 显示广告条
  adDiaplsy.value = true;
  initializeAdBar();

  // 从 API 获取广告栏数据
  fetchAdBar(locale.value);

  // 添加动画类
  setTimeout(() => {
    isShow.value = true;
  }, 50);
  
  // 添加窗口大小调整监听
  window.addEventListener('resize', handleResize);
});

// 初始化广告栏
const initializeAdBar = () => {
  const adWrapper = AdRef.value;
  if (!adWrapper) return;

  adWrapper.style.height = `${currentAdBarHeight.value}px`;
  adWrapper.style.display = 'block';
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
    adjustHeaderMargin(0);
    adjustNavPosition('up');
  }, 300);
}

// 更新广告栏内容
function updateAdBar() {
  const adWrapper = AdRef.value;
  if (!adWrapper) return;

  // 设置背景图片
  adWrapper.style.backgroundImage = `url(${currentBackground.value})`;

  // 更新按钮文本
  if (AdBtnRef.value) {
    AdBtnRef.value.textContent = buttonText.value;
  }
}

const route = useRoute();
const router = useRouter();

// 监听语言变化
watch(locale, (newLocale) => {
  // 语言变化时重新获取对应语言的广告栏数据
  fetchAdBar(newLocale);
});

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

// 处理窗口大小变化
const handleResize = () => {
  const isMobile = window.innerWidth <= 768;
  minAdBarHeight.value = isMobile ? 64 : 100;
  maxAdBarHeight.value = isMobile ? 200 : 120;
  // 重置状态
  isFirstTypewriterRun.value = true;
  
  // 重新计算高度
  calculateAdBarHeight();
};

// 组件卸载时清理定时器和事件监听
onUnmounted(() => {
  clearTypewriterTimer();
  window.removeEventListener('resize', handleResize);
});
</script>
