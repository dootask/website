<template>
  <div class="home-page ad-page">
    <CookieConsent></CookieConsent>

    <div class="ad-dialog">
      <div class="ad-dialog-backdrop"></div>
      <div class="ad-dialog-wrapper">
        <div id="ad-dialog-header" class="ad-dialog-header">
          <div id="ad-dialog-header-img" class="ad-dialog-header-img"></div>
        </div>
        <div id="ad-dialog-content" class="ad-dialog-content">
          {{ t('ad.dialog_qr_code_tip') }}
        </div>
        <div class="ad-dialog-footer">
          <button id="ad-dialog-footer-btn" class="ad-dialog-footer-btn">
            确定
          </button>
        </div>
      </div>
    </div>
    <div id="layout" class="ad-wrapper">
      <HeaderBar id="ad-banner">
        <div class="topics">
          <div class="topics-con">
            <div class="topics-layout">
              <div class="topics-tit mb-32" style="width: auto !important">
                <span class="txt-6007290 topics-h1-green">
                  <span id="ad-banner-title-part1">DooTask</span>
                  <span id="ad-banner-title-underline">
                    <svg
                      class="arcs ad"
                      width="303"
                      height="47"
                      viewBox="0 0 303 47"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="arc"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M80.7308 27.6815C67.7286 31.9281 52.7004 36.1573 38.2511 37.2015C25.8945 38.1065 13.9833 36.7142 4.20939 30.762C2.82903 29.9266 1.1147 30.501 0.357722 32.0499C-0.0101685 32.7819 -0.0965865 33.582 0.10908 34.3518C0.314747 35.1217 0.803546 35.8278 1.51545 36.3835C12.1576 42.8752 25.1376 44.5634 38.6073 43.5192C53.3238 42.4401 68.6192 38.1935 81.8885 33.8773C83.6989 37.8717 87.4059 41.1683 92.2413 43.0841C100.857 46.7911 112.635 46.7389 125.036 44.6504C143.048 41.7788 162.395 34.4691 174.841 29.3175C175.353 29.1086 176.11 28.778 177.067 28.3429C177.357 29.0564 177.668 29.7352 178.024 30.4313C181.075 36.3661 186.485 41.187 191.984 42.8926C226.872 53.7876 267.682 40.7345 300.788 30.1181C301.651 29.7251 302.32 29.1168 302.688 28.3908C303.055 27.6648 303.1 26.8633 302.814 26.1151C302.391 24.3747 300.833 23.4349 299.319 23.9048C266.969 34.295 227.384 47.3133 193.476 36.7316C189.29 35.4437 185.238 31.7366 182.923 27.229C182.655 26.7243 182.433 26.2196 182.21 25.6975C187.266 23.0647 191.627 19.6969 195.056 15.7772C196.586 14.0321 197.496 12.0005 197.691 9.89049C197.887 7.78043 197.362 5.66764 196.17 3.76837C193.943 0.409393 190.581 0.113524 187.041 1.87133C183.305 4.06681 180.259 6.90026 178.136 10.1556C175.877 13.9037 174.947 18.0569 175.442 22.1818C174.329 22.704 173.438 23.1042 172.881 23.3305C160.703 28.3429 141.712 35.5133 124.19 38.4024C112.858 40.3168 102.104 40.5779 94.2228 37.1841C91.376 36.0727 89.0418 34.2967 87.5436 32.1021L94.4009 29.7526C98.7201 28.2732 107.759 25.8193 114.171 21.4335C116.839 19.7188 118.973 17.5523 120.412 15.098C121.85 12.6436 122.556 9.96562 122.476 7.26658C122.554 6.03434 122.211 4.80805 121.484 3.71325C120.756 2.61846 119.669 1.69448 118.335 1.03594C114.594 -0.704466 108.138 0.148332 105.733 0.722665C98.4529 2.46307 88.7235 9.66834 83.9145 17.7786C82.0105 20.8782 80.9276 24.2466 80.7308 27.6815ZM86.7198 25.68L92.6865 23.6438C96.7163 22.2515 105.154 20.0585 111.166 15.9686C112.881 14.9958 114.287 13.7263 115.271 12.2591C116.256 10.7919 116.794 9.16669 116.843 7.51024C116.843 7.21437 116.576 7.12735 116.353 7.02292C115.993 6.83692 115.593 6.70146 115.173 6.62263C112.42 6.17995 109.567 6.29984 106.891 6.97071C100.791 8.43265 92.642 14.5241 88.6122 21.329C87.7647 22.7162 87.1295 24.1766 86.7198 25.68ZM181.075 19.2406C183.881 17.6547 186.45 15.8274 188.733 13.7931C189.864 12.7944 190.795 11.6678 191.494 10.4515C191.774 10.0044 191.919 9.51331 191.919 9.01569C191.919 8.51807 191.774 8.027 191.494 7.57985C191.411 7.43237 191.257 7.3166 191.065 7.25789C190.873 7.19917 190.659 7.2023 190.47 7.26658C190.026 7.35576 189.605 7.50286 189.223 7.70168C186.481 9.31936 184.243 11.402 182.678 13.7931C181.692 15.5093 181.147 17.3602 181.075 19.2406Z"
                        fill="url(#paint0_linear_1346_204)"
                        opacity="0.8"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_1346_204"
                          x1="22.5372"
                          y1="-10.882"
                          x2="116.024"
                          y2="144.196"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#FF7155" />
                          <stop offset="0.497468" stop-color="#EF3E56" />
                          <stop offset="1" stop-color="#EE61D4" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </span>
                <span class="txt-6007290 topics-h1">
                  <span id="ad-banner-title-part2">,轻量级</span>
                  <br />
                  <span id="ad-banner-title-part3">任务管理工具</span>
                </span>
              </div>
              <h4 class="txt-4001830 topics-h4 mb-32">
                <span id="ad-banner-description"
                  >助力团队高效推进项目，让工作更简单。</span
                >
              </h4>
              <div class="flex-cc topics-btn">
                <div id="ad-banner-sign-up-button">
                  <a :href="`/${locale}/price`">
                    <button class="btn btn-primary">免费注册</button>
                  </a>
                </div>
                <div id="ad-banner-self-host-button">
                  <a
                    href="https://github.com/kuaifan/dootask/tree/pro"
                    target="_blank"
                  >
                    <button class="btn btn-default">私有化部署</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderBar>
      <main>
        <AdPlan />
        <AdIntro />
      </main>
      <FooterBar class="ad-footer"></FooterBar>
      <SideNav></SideNav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import '@/assets/scss/common.scss';
import '@/assets/scss/rem.scss';
import '@/assets/scss/ad.scss';
import '@/assets/scss/home.scss';
import '@/assets/css/animate.min.css';
import Qs from 'qs';
import type {
  AdBannerResponse,
  PricingPlansResponse,
  WhyChooseDooTaskResponse,
  TitlePart,
  ThemedButton,
  BannerDescription,
  MediaData,
  Plan,
  Feature,
  IntroCard,
} from '../types/ad';
definePageMeta({
  layout: 'blank',
});
defineOgImageComponent('NuxtSeo');
const { locale, t } = useI18n();

onMounted(() => {
  fetchAdBanner(locale.value);
  fetchAdPlan(locale.value);
  fetchAdIntro(locale.value);

  manageAnimate();

  handleDialog();
});

// 获取广告banner数据
function fetchAdBanner(language: string) {
  const query = Qs.stringify(
    {
      locale: language,
      populate: {
        title: {
          populate: '*',
        },
        description: {
          populate: '*',
        },
        background: {
          populate: '*',
        },
        underline: {
          populate: '*',
        },
        signUpButton: {
          populate: '*',
        },
        selfHostButton: {
          populate: '*',
        },
        localizations: {
          populate: '*',
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
  const apiUrl = `https://cms.hitosea.com/api/doo-task-ad-banner?${query}`;
  fetchData<AdBannerResponse>(apiUrl)
    .then(handleAdBannerResponse)
    .catch(handleError);
}

// 获取广告计划数据
function fetchAdPlan(language: string) {
  const query = Qs.stringify({
    locale: language,
    populate: {
      plans: {
        populate: {
          price: {
            populate: '*',
          },
          button: {
            populate: '*',
          },
          features: {
            populate: '*',
          },
        },
      },
    },
  });
  const apiUrl = `https://cms.hitosea.com/api/doo-task-ad-plan?${query}`;
  fetchData<PricingPlansResponse>(apiUrl)
    .then(handleAdPlanResponse)
    .catch(handleError);
}

// 获取广告介绍数据
function fetchAdIntro(language: string) {
  const query = Qs.stringify({
    locale: language,
    populate: {
      intros: {
        populate: {
          bar: {
            populate: '*',
          },
          cover: {
            populate: '*',
          },
          title: {
            populate: '*',
          },
          description: {
            populate: '*',
          },
        },
      },
    },
  });
  const apiUrl = `https://cms.hitosea.com/api/doo-task-ad-intro?${query}`;
  fetchData<WhyChooseDooTaskResponse>(apiUrl)
    .then(handleAdIntroResponse)
    .catch(handleError);
}

// 处理广告banner响应
function handleAdBannerResponse(response: AdBannerResponse) {
  // 在此实现广告banner处理逻辑
  try {
    const banner = response.data;
    const {
      attributes: {
        title,
        description,
        background,
        underline,
        signUpButton,
        selfHostButton,
      },
    } = banner;
    handleAdBannerTitle(title);
    handleAdBannerDescription(description);
    handleAdBannerBackground(background);
    handleAdBannerUnderline(underline);
    handleAdBannerSignUpButton(signUpButton);
    handleAdBannerSelfHostButton(selfHostButton);
  } catch (error) {
    console.error('处理广告banner响应时出错:', error);
  }
}

interface TitleText {
  [key: string]: {
    text: string;
    style?: Record<string, string>;
  };
}

function handleAdBannerTitle(title: TitlePart[] | string) {
  const titleText: TitleText = {};
  if (Array.isArray(title)) {
    title.forEach((item: TitlePart) => {
      titleText[item.key] = { text: item.text, style: item.style };
    });
  }
  const titlePart1El = document.getElementById('ad-banner-title-part1');
  const titlePart2El = document.getElementById('ad-banner-title-part2');
  const titlePart3El = document.getElementById('ad-banner-title-part3');

  if (titlePart1El && titleText['part1']) {
    titlePart1El.textContent = titleText['part1'].text;
    if (titleText['part1'].style) {
      Object.assign(titlePart1El.style, getStyle(titleText['part1'].style));
    }
  }
  if (titlePart2El && titleText['part2']) {
    titlePart2El.textContent = titleText['part2'].text;
    if (titleText['part2'].style) {
      Object.assign(titlePart2El.style, getStyle(titleText['part2'].style));
    }
  }
  if (titlePart3El && titleText['part3']) {
    titlePart3El.textContent = titleText['part3'].text;
    if (titleText['part3'].style) {
      Object.assign(titlePart3El.style, getStyle(titleText['part3'].style));
    }
  }
}

function handleAdBannerDescription(description: BannerDescription): void {
  const descriptionText = {
    text: description.text,
    style: description.style,
  };
  const descriptionEl = document.getElementById('ad-banner-description');
  if (descriptionEl && descriptionText.text) {
    descriptionEl.textContent = descriptionText.text;
    if (descriptionText.style) {
      Object.assign(descriptionEl.style, getStyle(descriptionText.style));
    }
  }
}

function handleAdBannerBackground(background: { data: MediaData }): void {
  const backgroundUrl = getMediaUrl(background);
  const adBannerEl = document.getElementById('ad-banner');

  if (adBannerEl && backgroundUrl) {
    adBannerEl.style.backgroundImage = `url(${backgroundUrl})`;
  }
}

function handleAdBannerUnderline(underline: { data: MediaData }): void {
  const underlineUrl = getMediaUrl(underline);
  const adBannerTitleUnderlineEl = document.getElementById(
    'ad-banner-title-underline',
  );
  if (adBannerTitleUnderlineEl && underlineUrl) {
    adBannerTitleUnderlineEl.innerHTML = `<img class="arcs ad" src="${underlineUrl}" alt="underline" />`;
  }
}

function handleAdBannerSignUpButton({
  style,
  link: { label, href, target },
}: ThemedButton): void {
  const signUpButtonEl = document.getElementById('ad-banner-sign-up-button');
  if (signUpButtonEl) {
    signUpButtonEl.innerHTML = `
        <a href="${href}" ${target === '_blank' ? 'target="_blank"' : ''} >
          <button class="btn btn-primary">
            ${label}
          </button>
        </a>`;
    if (style) {
      Object.assign(signUpButtonEl.style, getStyle(style));
    }
  }
}

function handleAdBannerSelfHostButton({
  style,
  link: { label, href, target },
}: ThemedButton) {
  const selfHostButtonEl = document.getElementById(
    'ad-banner-self-host-button',
  );
  if (selfHostButtonEl) {
    if (href === '#') {
      selfHostButtonEl.innerHTML = `
      <a>
        <button class="btn btn-default">
          ${label}
        </button>
      </a>`;
      function showDialog(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        const dialogEl = document.querySelector('.ad-dialog');
        if (!dialogEl) return;
        dialogEl.classList.add('show');
        lockBodyScroll(true);
        handleDialogAnimate(true);
      }
      selfHostButtonEl.addEventListener('click', showDialog);
    } else {
      selfHostButtonEl.innerHTML = `
      <a href="${href}" ${target === '_blank' ? 'target="_blank"' : ''} >
        <button class="btn btn-default">
          ${label}
        </button>
      </a>`;
    }
    Object.assign(selfHostButtonEl.style, getStyle(style));
  }
}
function lockBodyScroll(bool: boolean) {
  document.body.style.overflowY = bool ? 'hidden' : 'auto';
}
function handleDialogAnimate(bool: boolean) {
  const dialogEl = document.querySelector('.ad-dialog');
  if (!dialogEl) return;

  const dialogWrapperEl = dialogEl.querySelector('.ad-dialog-wrapper');
  if (!dialogWrapperEl) return;

  if (bool) {
    dialogWrapperEl.classList.add(
      'animate__animated',
      'animate__bounceIn',
      'animate__faster',
    );
    dialogWrapperEl.addEventListener('animationend', () => {
      dialogWrapperEl.classList.remove(
        'animate__animated',
        'animate__bounceIn',
        'animate__faster',
      );
    });
  } else {
    dialogWrapperEl.classList.remove(
      'animate__animated',
      'animate__bounceIn',
      'animate__faster',
    );
  }
}

// 管理动画
function manageAnimate() {
  let throttleTimer: boolean | null = null;
  const throttle = (callback: () => void, time: number) => {
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback();
      throttleTimer = false;
    }, time);
  };

  window.addEventListener('scroll', () => {
    throttle(() => {
      detectAdPlanEl();
      detectAdIntroEl();
    }, 200);
  });
}

const couldAdPlanElAnimate: Record<string, boolean> = {};
const couldAdIntroElAnimate: Record<string, boolean> = {};

function detectAdPlanEl() {
  const adPlanEl = document.querySelector('.ad-plan');
  if (isElementOutOfViewport(adPlanEl)) {
    const els = document.querySelectorAll('.plan-item');
    for (const el of els) {
      couldAdPlanElAnimate[`${el.id}`] = true;
    }
    return;
  }

  const _couldAdPlanElAnimate =
    Object.values(couldAdPlanElAnimate).every(Boolean);
  if (!_couldAdPlanElAnimate) return;
  if (isElementPartiallyInViewport(adPlanEl)) {
    const els = document.querySelectorAll('.plan-item');
    for (const el of els) {
      el.classList.add('animate__flipInX');
      couldAdPlanElAnimate[`${el.id}`] = false;
      el.addEventListener(
        'animationend',
        () => {
          el.classList.remove('animate__flipInX');
        },
        { once: true },
      );
    }
    return;
  }
}

function detectAdIntroEl() {
  const adIntroEl = document.querySelector('.ad-intro');
  if (isElementOutOfViewport(adIntroEl)) {
    const els = document.querySelectorAll('.ad-intro-item');
    for (const el of els) {
      couldAdIntroElAnimate[`${el.id}`] = true;
    }
    return;
  }

  const _couldAdIntroElAnimate = Object.values(couldAdIntroElAnimate).every(
    Boolean,
  );
  if (!_couldAdIntroElAnimate) return;
  if (isElementPartiallyInViewport(adIntroEl)) {
    const els = document.querySelectorAll('.ad-intro-item');
    for (const el of els) {
      el.classList.add('animate__zoomIn');
      couldAdIntroElAnimate[`${el.id}`] = false;
      el.addEventListener(
        'animationend',
        () => {
          el.classList.remove('animate__zoomIn');
        },
        { once: true },
      );
    }
    return;
  }
}

function isElementPartiallyInViewport(el: Element | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom > 0 &&
    rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
    rect.right > 0
  );
}

function isElementOutOfViewport(el: Element | null) {
  if (!el) return false;
  const rect = el.getBoundingClientRect();
  return (
    rect.bottom < 0 ||
    rect.top > (window.innerHeight || document.documentElement.clientHeight) ||
    rect.right < 0 ||
    rect.left > (window.innerWidth || document.documentElement.clientWidth)
  );
}

// 处理广告计划响应
function handleAdPlanResponse(response: PricingPlansResponse) {
  // 在此实现广告计划处理逻辑
  try {
    const {
      data: {
        attributes: { title, description, plans },
      },
    } = response;
    handleAdPlanTitle(title);
    handleAdPlanDescription(description);
    handleAdPlanPlans(plans);
  } catch (error) {
    console.error('处理广告计划响应时出错:', error);
  }
}

function handleAdPlanTitle(title: string) {
  const planTitleEl = document.getElementById('ad-plan-title');
  if (planTitleEl && title) {
    planTitleEl.textContent = title;
  }
}

function handleAdPlanDescription(description: string) {
  const planDescriptionEl = document.getElementById('ad-plan-description');
  if (planDescriptionEl && description) {
    planDescriptionEl.textContent = description;
  }
}

async function handleAdPlanPlans(plans: Plan[]) {
  const planContentEl = document.getElementById('ad-plan-content');
  if (planContentEl && Array.isArray(plans)) {
    const prevPlanItems = planContentEl.querySelectorAll('.plan-item');

    for (const prevPlanItem of prevPlanItems) {
      prevPlanItem.classList.add('animate__animated', 'animate__backOutDown');
      prevPlanItem.addEventListener(
        'animationend',
        () => {
          prevPlanItem.remove();
        },
        { once: true },
      );
    }

    plans.sort((a, b) => a.priority - b.priority);
    for (const plan of plans) {
      const planItemEl = document.createElement('div');
      planItemEl.className = `plan-item ${plan.activated ? 'active' : ''}`;
      planItemEl.innerHTML = `
          ${plan.tag ? `<div class="plan-item-tag">${plan.tag}</div>` : ''}
          <div class="plan-item-title">
              <span>${plan.title}</span>
          </div>
          <div class="plan-item-price">
              <span class="plan-item-price-current price">
                  ${plan.price.current}
                  <span class="plan-item-price-payment">
                      ${plan.price.payment ?? ''}
                  </span>
              </span>
              <span class="plan-item-price-original ${
                plan.price.isPrice ? 'price' : ''
              }">
                  ${plan.price.original ?? ''}
              </span>
          </div>
          <div class="plan-item-button">
              <a href="${plan.button.href}" ${
                plan.button.target === '_blank' ? 'target="_blank"' : ''
              }>
                  <button class="btn-primary">
                      ${plan.button.label}
                  </button>
              </a>
          </div>
          <div class="plan-item-description">
              <ul class="plan-item-description-list">
                ${plan.features
                  .map((feature: Feature) => {
                    const iconUrl = feature.icon.data
                      ? getMediaUrl(feature.icon)
                      : '/img/ad/checked.svg';
                    return `
                    <li class="plan-item-description-item">
                      <i class="plan-item-description-item-icon">
                        <img src="${iconUrl}" alt="${feature.title}" />
                      </i>
                      <span class="plan-item-description-item-content ${
                        feature.activated ? '' : 'disabled'
                      }">
                        ${feature.text}
                      </span>
                    </li>
                  `;
                  })
                  .join('')}
                </ul>
            </div>
          `;
      planContentEl.appendChild(planItemEl);
      planItemEl.classList.add(
        'animate__animated',
        'animate__backInUp',
        'animate__faster',
        'animate__delay-1s',
      );
      couldAdPlanElAnimate[`${plan.id}`] = false;
      planItemEl.addEventListener(
        'animationend',
        () => {
          planItemEl.classList.remove(
            'animate__backInUp',
            'animate__faster',
            'animate__delay-1s',
          );
          couldAdPlanElAnimate[`${plan.id}`] = true;
        },
        { once: true },
      );

      await new Promise((resolve) => {
        setTimeout(resolve, 150);
      });
    }

    overridePlanButton();
  }
}

// 处理广告介绍响应
function handleAdIntroResponse(response: WhyChooseDooTaskResponse) {
  try {
    const {
      data: {
        attributes: { title, description, intros },
      },
    } = response;
    handleAdIntroTitle(title);
    handleAdIntroDescription(description);
    handleAdIntroIntros(intros);
  } catch (error) {
    console.error('处理广告介绍响应时出错:', error);
  }
}

function handleAdIntroTitle(title: string) {
  const introTitleEl = document.getElementById('ad-intro-title');
  if (introTitleEl && title) {
    introTitleEl.textContent = title;
  }
}

function handleAdIntroDescription(description: string) {
  const introDescriptionEl = document.getElementById('ad-intro-description');
  if (introDescriptionEl && description) {
    introDescriptionEl.textContent = description;
  }
}

async function handleAdIntroIntros(intros: IntroCard[]) {
  const introContentEl = document.getElementById('ad-intro-content');
  if (introContentEl && Array.isArray(intros)) {
    const prevIntroItems = introContentEl.querySelectorAll('.ad-intro-item');
    for (const prevIntroItem of prevIntroItems) {
      prevIntroItem.classList.add('animate__animated', 'animate__zoomOut');
      prevIntroItem.addEventListener(
        'animationend',
        () => {
          prevIntroItem.remove();
        },
        { once: true },
      );
    }

    intros.sort((a, b) => a.priority - b.priority);

    for (const intro of intros) {
      const introItemEl = document.createElement('div');
      const barUrl = intro.bar.data
        ? getMediaUrl(intro.bar)
        : '/img/ad/intro-card-head.png';
      const coverUrl = intro.cover.data
        ? getMediaUrl(intro.cover)
        : `/img/ad/intro-card-img${intro.priority + 1}.svg`;
      introItemEl.className = 'ad-intro-item';
      introItemEl.innerHTML = `
          <div class="ad-intro-item-header">
              <img src="${barUrl}" alt="intro-bar" />
          </div>
          <div class="ad-intro-item-image">
              <img src="${coverUrl}" alt="intro-cover" />
          </div>
          <div class="ad-intro-item-title">
              <span>${intro.title}</span>
          </div>
          <div class="ad-intro-item-description">
              <span>${intro.description}</span>
          </div>
        `;
      introContentEl.appendChild(introItemEl);
      introItemEl.classList.add(
        'animate__animated',
        'animate__zoomIn',
        'animate__delay-1s',
      );
      couldAdIntroElAnimate[`${intro.id}`] = false;

      introItemEl.addEventListener(
        'animationend',
        () => {
          introItemEl.classList.remove('animate__zoomIn', 'animate__delay-1s');
          couldAdIntroElAnimate[`${intro.id}`] = true;
        },
        { once: true },
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 150);
      });
    }
  }
}

function handleDialog() {
  const dialogEl = document.querySelector('.ad-dialog');
  if (!dialogEl) return;

  lockBodyScroll(dialogEl.classList.contains('show'));
  overridePlanButton();

  const dialogBackdropEl = dialogEl.querySelector('.ad-dialog-backdrop');
  if (dialogBackdropEl) {
    dialogBackdropEl.addEventListener('click', () => {
      dialogEl.classList.remove('show');
      lockBodyScroll(false);
      handleDialogAnimate(false);
    });
  }

  const dialogFooterBtnEl = dialogEl.querySelector('.ad-dialog-footer-btn');
  if (dialogFooterBtnEl) {
    dialogFooterBtnEl.addEventListener('click', () => {
      dialogEl.classList.remove('show');
      lockBodyScroll(false);
      handleDialogAnimate(false);
    });
  }
}

function overridePlanButton() {
  function showDialog(e: Event) {
    e.preventDefault();
    e.stopPropagation();

    const dialogEl = document.querySelector('.ad-dialog');
    if (!dialogEl) return;
    dialogEl.classList.add('show');
    lockBodyScroll(true);
    handleDialogAnimate(true);
  }

  const planButtonEl = document.querySelectorAll('.plan-item-button');
  planButtonEl.forEach((el) => {
    el.removeEventListener('click', showDialog);

    const aEl = el.querySelector('a');
    if (!aEl) return;
    if (!aEl.href || aEl.href.includes('#')) {
      aEl.removeAttribute('href');
      el.addEventListener('click', showDialog);
    }
  });
}
</script>
