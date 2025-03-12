<template>
  <div v-show="adDiaplsy" id="ad" ref="AdRef" class="ad ad-page">
    <div class="ad-content">
      <div class="ad-content-left">
        <p id="ad-text" ref="AdTextRef" class="ad-text">最新活动</p>
        <button id="ad-btn" ref="AdBtnRef" class="ad-btn" @click="goToAdPage">查看详情</button>
      </div>
      <div id="ad-close" ref="AdCloseRef" class="ad-close">
        <img src="/img/price_icon2.svg" alt="关闭" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import '@/assets/scss/ad.scss';
import { fetchData, handleError } from '../utils/fetch';
import type { BannerBarResponse, BannerBarAttributes } from '../types/ad'
const { locale } = useI18n();

onMounted(() => {
  fetchAdBar(locale.value);
});

const adDiaplsy = ref(false);

const AdRef = ref<HTMLElement | null>();
const AdTextRef = ref<HTMLElement | null>();
const AdBtnRef = ref<HTMLElement | null>();
const AdCloseRef = ref<HTMLElement | null>();

// 根据窗口宽度设置广告栏高度
const adBarHeight = window?.innerWidth <= 768 ? 48 : 64;
const adBarHeightPX = `${adBarHeight}px`;

// 初始化广告栏
const initializeAdBar = () => {
  displayAdBar();
  adjustNavPosition('down');

  // 添加关闭广告栏的事件监听器
  AdCloseRef.value?.addEventListener('click', () => {
    hideAdBar();
    adjustNavPosition('up');
  });
};

// 显示广告栏
function displayAdBar() {
  const adWrapper = AdRef.value;
  if (!adWrapper) return;
  adWrapper.style.height = adBarHeightPX;
  adWrapper.style.display = 'block';

  // 调整头部元素的边距
  const headerEl = document.getElementsByTagName('header')[0];
  if (!headerEl) return;
  headerEl.style.marginTop = adBarHeightPX;
}

// 隐藏广告栏
function hideAdBar() {
  const adWrapper = AdRef.value;
  if (!adWrapper) return;
  adWrapper.style.height = '0px';
  adWrapper.style.display = 'none';

  // 重置头部元素的边距
  const headerEl = document.getElementsByTagName('header')[0];
  if (!headerEl) return;
  headerEl.style.marginTop = '0px';
}

// 调整导航栏位置
function adjustNavPosition(direction: string) {
  const navWrapper = document.getElementsByClassName('nav')[0] as HTMLElement;
  navWrapper.style.top = direction === 'down' ? adBarHeightPX : '0';
}

// 获取广告栏数据
const fetchAdBar = (language: string) => {
  const apiUrl = `https://cms.hitosea.com/api/doo-task-ad-bar?locale=${language}&populate[0]=background`;
  
  fetchData<BannerBarResponse>(apiUrl)
    .then(({ data: { attributes } }) => {
      updateAdBar(attributes);
    })
    .catch((_error) => {});
};

// 更新广告栏内容
function updateAdBar({ background, text, buttonText }: BannerBarAttributes) {
  // insertAdBarElement();
  adDiaplsy.value = true;
  
  const adWrapper = AdRef.value;
  if (!adWrapper) return;
  // 设置背景图片
  const backgroundUrl = background?.data?.attributes?.url;
  if (backgroundUrl) {
    adWrapper.style.backgroundImage = `url(https://cms.hitosea.com${backgroundUrl})`;
  }

  // 更新文本内容
  if (AdTextRef.value) {
    AdTextRef.value.textContent = text;
  }

  // 更新按钮文本
  if (AdBtnRef.value) {
    AdBtnRef.value.textContent = buttonText;
  }

  initializeAdBar();
}

const route = useRoute();
const router = useRouter();

// 监听语言变化
watch(locale, (newLocale) => {
  fetchAdBar(newLocale);
});

// 监听路由变化
watch(
  () => route.path,
  () => {
    fetchAdBar(locale.value);
  }
);

const goToAdPage = () => {
  // 跳转到主页
  router.push(`/${locale.value}/ad`)
}
</script>
