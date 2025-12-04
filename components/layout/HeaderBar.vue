<!-- 关于我们头部 -->
<template>
  <header ref="header" class="head">
    <slot name="ad"></slot>
    <div ref="nav" class="nav">
      <div class="nav-layout">
        <NuxtLink :to="`/${locale}`" class="logo">
          <ClientDynamicImage
            id="logo"
            :src="`/img/${theme}/logo.svg`"
            :default-src="`/img/light/logo.svg`"
            alt="DooTask,Logo"
          />
          <i class="dootask txt-7002027">DooTask</i>
        </NuxtLink>
        <ul class="nav-ul">
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-product"
              :to="`/${locale}/product`"
              :class="{ 'support-active': isActiveRoute('/product') }"
              >{{ $t('navigation.product') }}</NuxtLink
            >
          </li>
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-ai"
              :to="`/${locale}/ai`"
              :class="{ 'support-active': isActiveRoute('/ai') }"
              >AI</NuxtLink
            >
          </li>
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-solutions"
              :to="`/${locale}/solutions`"
              :class="{ 'support-active': isActiveRoute('/solutions') }"
              >{{ $t('navigation.solution') }}</NuxtLink
            >
          </li>
          <!-- 支持部分 -->
          <li class="nav-ul-item">
            <i
              id="support-txt"
              class="txt-4001620 txt nav-support"
              @click="toggleMenuPopHandle"
            >
              {{ $t('navigation.support') }}
              <img
                id="drop-down-svg"
                src="/img/vector.svg"
                :alt="$t('navigation.support')"
                class="nav-vector"
                :style="isMenuPopVisisble ? 'transform: rotate(180deg)' : ''"
              />
            </i>
            <ol
              id="submenu-pop"
              class="submenu-pop"
              :style="isMenuPopVisisble ? 'display: block' : ''"
            >
              <li
                v-for="(item, index) in supportItems"
                :key="index"
                class="submenu-pop-item"
                @click="changeMenu()"
              >
                <NuxtLink
                  :to="item.link"
                  :target="item.target"
                  class="txt-4001418 txt-sub"
                  :class="{ 'external-link-icon': item.target }"
                >
                  {{ item.text }}
                </NuxtLink>
              </li>
            </ol>
          </li>
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-price"
              :to="`/${locale}/price`"
              :class="{ 'support-active': isActiveRoute('/price') }"
              >{{ $t('navigation.pricing') }}</NuxtLink
            >
          </li>
          <li class="nav-ul-item">
            <NuxtLink
              class="txt-4001620 txt nav-price"
              :to="`/${locale}/appstore`"
              :class="{ 'support-active': isActiveRoute('/appstore') }"
              >{{ $t('navigation.appstore') }}</NuxtLink
              >
          </li>
        </ul>
        <div class="nav-r">
          <a :href="saasSignupUrl" target="_blank" :title="$t('common.try_saas_now')">
            <i class="nav-r-icon cloud-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
              </svg>
            </i>
          </a>
          <div id="lang-img" class="lang">
            <img
              src="/img/lang-select.svg"
              :alt="$t('navigation.lang_switch')"
              @click="showLangPopHandle"
            />
            <ul
              id="lang-pop"
              class="lang-pop"
              :style="{ display: isLangPopVisisble ? 'block' : 'none' }"
            >
              <li class="lang-pop-item" @click="switchLanguage('zh')">
                <i class="lang-txt">简体中文</i>
              </li>
              <li class="lang-pop-item" @click="switchLanguage('en')">
                <i class="lang-txt">English</i>
              </li>
            </ul>
          </div>
          <i
            v-show="theme === 'dark'"
            class="nav-r-icon"
            @click="setTheme('light')"
          >
            <img src="/img/light.svg" :alt="$t('theme.light')" />
          </i>
          <i
            v-show="theme === 'light'"
            class="nav-r-icon"
            @click="setTheme('dark')"
          >
            <img src="/img/drak.svg" :alt="$t('theme.dark')" />
          </i>
          <a href="https://github.com/kuaifan/dootask" target="_blank">
            <i class="nav-r-icon">
              <img src="/img/github.svg" alt="github" />
            </i>
          </a>
          <i class="line-1"></i>
          <span class="get-started">
            <a :href="manageDashboardUrl" target="_blank">
              <button class="btn btn-primary">
                {{ $t('common.try_now') }}
              </button>
            </a>
          </span>
        </div>
        <div class="menuBtn" @click="openDrawer">
          <img
            id="menuBtn"
            :src="`/img/menu.svg`"
            :alt="$t('navigation.menu')"
          />
        </div>
      </div>
    </div>
    <slot></slot>
    <!-- 抽屉导航 -->
    <div class="drawer" :class="{ 'open-drawer': isDrawerVisible }">
      <div class="drawer-t mb-36">
        <a href="/" class="logo">
          <ClientDynamicImage
            id="logo"
            :src="`/img/${theme}/logo.svg`"
            :default-src="`/img/light/logo.svg`"
            alt="DooTaskLogo"
          />
          <i class="dootask txt-7002027">DooTask</i>
        </a>
        <i class="close-drawer" @click="closeDrawer">✕</i>
      </div>
      <ul class="drawer-ul">
        <li class="drawer-item-t mb-16">
          <div
            v-for="(item, index) in mainMenuItems.slice(0, 3)"
            :key="index"
            class="drawer-item"
          >
            <a class="txt-4001620 txt" :href="item.link" @click="closeDrawer">{{
              item.text
            }}</a>
          </div>
          <div class="drawer-item" @click="expandMenuHandle('support')">
            <i class="txt-4001620 txt">
              {{ $t('navigation.support') }}
              <img
                id="drawer-down-support-svg"
                src="/img/vector.svg"
                class="nav-vector"
                :alt="$t('navigation.support')"
                :style="isSupportMenuOpen ? 'transform: rotate(180deg)' : ''"
              />
            </i>
          </div>
          <ol v-show="isSupportMenuOpen" id="support" class="drawer-active">
            <div
              v-for="(item, index) in supportItems"
              :key="index"
              class="drawer-item"
            >
              <NuxtLink
                class="txt-4001620 txt"
                :to="item.link"
                :target="item.target"
                :class="{ 'external-link-icon': item.target }"
                @click="closeDrawer"
                >{{ item.text }}</NuxtLink
              >
            </div>
          </ol>
          <div
            v-for="(item, index) in mainMenuItems.slice(3, 5)"
            :key="index"
            class="drawer-item"
          >
            <a class="txt-4001620 txt" :href="item.link" @click="closeDrawer">{{
              item.text
            }}</a>
          </div>
        </li>
        <li class="drawer-item-c">
          <div class="drawer-item" @click.stop="expandMenuHandle('theme')">
            <i class="txt-4001620 txt">
              {{ $t('navigation.theme') }}
              <img
                src="/img/vector.svg"
                :alt="$t('navigation.theme')"
                class="nav-vector"
                :style="isThemeMenuOpen ? 'transform: rotate(180deg)' : ''"
              />
            </i>
          </div>
          <ol v-show="isThemeMenuOpen" id="theme" class="drawer-active">
            <div
              v-for="(item, index) in themeItems"
              :key="index"
              class="drawer-item"
            >
              <i class="txt-4001620 txt" @click="setTheme(item.value)">{{
                item.text
              }}</i>
            </div>
          </ol>
        </li>

        <li class="drawer-item-c">
          <div class="drawer-item" @click="expandMenuHandle('language')">
            <i class="txt-4001620 txt">
              {{ $t('navigation.language') }}
              <img
                src="/img/vector.svg"
                :alt="$t('navigation.language')"
                class="nav-vector"
                :style="isLanguageMenuOpen ? 'transform: rotate(180deg)' : ''"
              />
            </i>
          </div>
          <ol
            id="language"
            class="drawer-active"
            :style="{ display: isLanguageMenuOpen ? 'block' : 'none' }"
          >
            <div
              v-for="(item, index) in languageItems"
              :key="index"
              class="drawer-item"
            >
              <i class="txt-4001620 txt" @click="handleSetLocale(item.value)">{{
                item.text
              }}</i>
            </div>
          </ol>
        </li>
        <li class="drawer-item">
          <a
            class="txt-4001620 txt"
            href="https://github.com/kuaifan/dootask"
            target="_blank"
            @click="closeDrawer"
            >GitHub</a
          >
        </li>
        <li class="drawer-item">
          <a
            class="txt-4001620 txt"
            :href="saasSignupUrl"
            target="_blank"
            @click="closeDrawer"
            >{{ $t('common.try_saas_now') }}</a
          >
        </li>
        <li class="drawer-item">
          <a
            class="txt-4001620 txt"
            :href="manageDashboardUrl"
            target="_blank"
            @click="closeDrawer"
            >{{ $t('common.try_now') }}</a
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 使用 composables
const { theme, setTheme: setThemeComposable } = useTheme();
const { locale, switchLanguage } = useLanguage();
const { isActiveRoute, getMainMenuItems, getSupportItems, getThemeItems, getLanguageItems } = useNavigation();
const { siteUrl: siteUrlRef } = useAppSiteConfig();

// 创建 computed 属性来生成完整的 URL，确保在模板中正确解包
// 添加安全检查，确保在 SSR 环境下也能正常工作
const siteUrl = computed(() => {
  try {
    const url = siteUrlRef?.value;
    return url && typeof url === 'string' ? url : 'https://www.dootask.com';
  } catch {
    return 'https://www.dootask.com';
  }
});

const saasSignupUrl = computed(() => {
  const baseUrl = siteUrl.value;
  return `${baseUrl}/saas/signup`;
});

const manageDashboardUrl = computed(() => {
  const baseUrl = siteUrl.value;
  return `${baseUrl}/manage/dashboard`;
});

// 抽屉相关状态和方法
// const isDrawerOpen = ref(false);

//控制菜单三个选项的展开
const isSupportMenuOpen = ref(false);
const isThemeMenuOpen = ref(false);
const isLanguageMenuOpen = ref(false);

// 背景显示状态
const showBackground = ref(true);

// 使用 composables 生成菜单项
const mainMenuItems = computed(() => getMainMenuItems());
const supportItems = computed(() => getSupportItems());
const themeItems = computed(() => getThemeItems());
const languageItems = computed(() => getLanguageItems());

onMounted(() => {
  const supportTxt = document.getElementById('support-txt');
  const submenuPop = document.getElementById('submenu-pop');
  const langImg = document.getElementById('lang-img');
  const langPop = document.getElementById('lang-pop');

  // 点击菜单外部关闭各种弹出菜单
  window.addEventListener('click', (e) => {
    // 关闭支持菜单弹窗
    if (
      submenuPop &&
      !submenuPop.contains(e.target as Node) &&
      e.target !== supportTxt
    ) {
      isMenuPopVisisble.value = false;
    }

    // 关闭语言选择弹窗
    if (
      langPop &&
      !langPop.contains(e.target as Node) &&
      e.target !== langImg
    ) {
      isLangPopVisisble.value = false;
    }
  });

  showBackground.value = true;

  const navbar = document.querySelector('.nav') as HTMLElement;
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 10) {
        // 当滚动距离大于30px时，添加navbar-white类，remove后导航栏背景色为白色
        navbar.classList.add('navbar-white');
      } else {
        navbar.classList.remove('navbar-white');
      }
    });
  }
});

onUnmounted(() => {});

// 语言选择
const isLangPopVisisble = ref(false);

const showLangPopHandle = (e: Event) => {
  // 阻止事件冒泡
  e.stopPropagation();
  // 切换语言弹窗的可见性
  isLangPopVisisble.value = !isLangPopVisisble.value;
};

// 设置主题
const setTheme = (newTheme: 'light' | 'dark' | string) => {
  try {
    setThemeComposable(newTheme);
  } catch (error) {
    console.error('切换主题时出错:', error);
  }
};

// 导航下拉菜单
const isMenuPopVisisble = ref(false);

const toggleMenuPopHandle = () => {
  isMenuPopVisisble.value = !isMenuPopVisisble.value;
};

const changeMenu = () => {
  isMenuPopVisisble.value = false;
};

// 状态管理
const isDrawerVisible = ref(false);
// const drawerRef = ref<HTMLElement | null>(null);


const openDrawer = () => {
  isDrawerVisible.value = true;
};

const closeDrawer = () => {
  isDrawerVisible.value = false;
};

const expandMenuHandle = (val: string) => {
  if (val === 'support') {
    isSupportMenuOpen.value = !isSupportMenuOpen.value;
  } else if (val === 'language') {
    isLanguageMenuOpen.value = !isLanguageMenuOpen.value;
    // 关闭其他可能打开的菜单
    isSupportMenuOpen.value = false;
    isThemeMenuOpen.value = false;
  } else if (val === 'theme') {
    isThemeMenuOpen.value = !isThemeMenuOpen.value; // 切换主题菜单的显示状态
  }
};

//语言选择
const handleSetLocale = (newLocale: 'zh' | 'en') => {
  switchLanguage(newLocale);
  isLangPopVisisble.value = false;
};
</script>
