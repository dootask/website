<template>
  <div class="topics" style="padding-bottom: 120px;">
    <div class="topics-con" style="max-width: 1440px;">
      <div class="topics-layout">
        <div class="topics-tit mb-32">
          <span class="txt-6007290 topics-h1">{{ $t('pricing.title') }}</span>
        </div>
        <h4 class="txt-4001830 topics-h4 mb-64">
          {{ $t('pricing.desc') }}
        </h4>
        <ul ref="PriceCardRef" class="price-card">
          <li
            v-for="(plan, index) in pricePlans"
            :key="index"
            ref="PriceCardItemRef"
            class="price-card-item"
            :class="{
              active: selectedPlanIndex === index,
              'price-animate-box': !animateLoaded,
            }"
            :style="{ '--delay': `${(index * 0.1).toFixed(1)}s` }"
            @click="selectCard(index)"
          >
            <h4 class="txt-5002025 price-card-h4 mb-24">
              {{ plan.name }}
              <i v-if="index === 3" class="rec-icon">{{ $t('pricing.plans.recommended') }}</i>
            </h4>
            <div class="price-card-money mb-12">
              <h2 class="txt-6003645 price-card-h2">
                <span v-if="index !== 0">{{ plan.price }}</span>
                <span v-if="index === 0">{{ $t('pricing.plans.saas.price7day') }}</span>
              </h2>
              <i v-if="plan.priceUnit" class="txt-5001628 price-card-unit">{{
                plan.priceUnit
              }}</i>
            </div>
            <h6 class="txt-4001624 price-card-h6 mb-24" style="height: 48px; white-space: pre-line;">
              {{ plan.userLimit }}
            </h6>
            <button
              class="btn btn-green mb-24"
              :class="{
                'btn-primary': hoveredPlanIndex === index,
                'btn-selected': selectedPlanIndex === index,
              }"
              @click.stop="handlePlanSelect(index)"
            >
              {{ plan.buttonText }}
            </button>
            <ol class="price-card-ol">
              <li
                v-for="(feature, featureIndex) in plan.features"
                :key="featureIndex"
                class="price-card-ol-item mb-12"
              >
                <img
                  class="icon mr-12"
                  :src="feature.icon"
                  :alt="feature.text"
                />
                <h6 class="txt-4001624 price-card-h6">
                  {{ feature.text }}
                </h6>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>

    <!-- 联系我们模态框 -->
    <div
      v-if="showContactModal"
      class="modal-overlay"
      :class="{ dark: theme === 'dark' }"
      @click.stop
    >
      <div class="modal-content" @click.stop>
        <h3>{{ modalTitle }}</h3>
        <div class="modal-body">
          <!-- 客服二维码图片 -->
          <div class="modal-qrcode-wrapper">
            <img src="/img/side_nav_wechat.png" alt="qrcode" class="modal-qrcode"/>
            <p class="modal-qrcode-label">{{ $t(modalQrcodeKey) }}</p>
          </div>
          <p class="modal-desc">{{ $t('pricing.modaldesc') }}</p>
          <div class="modal-contact-info">
            <p>{{ $t('pricing.modalphone') }}</p>
            <p>{{ $t('pricing.modaladdr1') }}@{{ $t('pricing.modaladdr2') }}</p>
          </div>
        </div>
        <div class="modal-actions">
          <button class="btn-confirm" @click="closeModal">
            {{ $t('pricing.btn') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, toRefs, onBeforeUnmount } from 'vue';
import { useI18n } from 'vue-i18n';
import { throttle } from '../../utils/debounceThrottle';

const { t } = useI18n();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);
const { siteUrl: siteUrlRef } = useAppSiteConfig();

// 获取站点 URL
const siteUrl = computed(() => {
  try {
    const url = siteUrlRef?.value;
    return url && typeof url === 'string' ? url : 'https://www.dootask.com';
  } catch {
    return 'https://www.dootask.com';
  }
});

// SaaS 注册链接
const saasSignupUrl = computed(() => {
  return `${siteUrl.value}/saas/signup`;
});

const selectedPlanIndex = ref(3);
const hoveredPlanIndex = ref(-1);
const showContactModal = ref(false);
const modalTitle = ref('');
const modalQrcodeKey = ref('pricing.modalqrcode');
const animateLoaded = ref(false);

const PriceCardRef = ref<HTMLElement | null>(null);
const PriceCardItemRef = ref<NodeListOf<HTMLElement> | null>(null);

interface PricePlan {
  name: string;
  price: string;
  priceUnit?: string;
  userLimit: string;
  buttonText: string;
  buttonLink?: string;
  features: {
    icon: string;
    text: string;
  }[];
  recommended?: boolean;
}
const pricePlans = computed((): PricePlan[] => [
  {
    name: t('pricing.plans.saas.name'),
    price: t('pricing.plans.saas.price'),
    userLimit: t('pricing.plans.saas.limit'),
    buttonText: t('pricing.plans.try_now'),
    buttonLink: saasSignupUrl.value,
    features: [
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.saas.feature1'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.saas.feature2'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.saas.feature3'),
      },
    ],
  },
  {
    name: t('pricing.plans.open_source.name'),
    price: t('pricing.plans.open_source.price'),
    userLimit: t('pricing.plans.open_source.limit'),
    buttonText: t('pricing.plans.free_use'),
    buttonLink: 'https://github.com/kuaifan/dootask',
    features: [
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.open_source.feature1'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.open_source.feature2'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.open_source.feature3'),
      },
    ],
  },
  {
    name: t('pricing.plans.basic.name'),
    price: t('pricing.plans.basic.price'),
    priceUnit: t('pricing.plans.basic.unit'),
    userLimit: t('pricing.plans.basic.limit'),
    buttonText: t('pricing.plans.buy_now'),
    features: [
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.basic.feature1'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.basic.feature2'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.basic.feature3'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.basic.feature4'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.basic.feature5'),
      },
    ],
  },
  {
    name: t('pricing.plans.pro.name'),
    price: t('pricing.plans.pro.price'),
    userLimit: t('pricing.plans.pro.limit'),
    buttonText: t('pricing.plans.buy_now'),
    features: [
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature1'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature2'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature3'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature4'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature5'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature6'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature7'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature8'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.pro.feature9'),
      },
    ],
  },
  {
    name: t('pricing.plans.enterprise.name'),
    price: t('pricing.plans.enterprise.price'),
    userLimit: t('pricing.plans.enterprise.limit'),
    buttonText: t('pricing.plans.custom'),
    features: [
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature1'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature2'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature3'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature4'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature5'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature6'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature7'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature8'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.enterprise.feature9'),
      },
    ],
  },
]);

const selectCard = (index: number) => {
  // 更新选中的卡片，仅保存选中状态
  selectedPlanIndex.value = index;
};

function handlePlanSelect(index: number) {
  const pricePlan = pricePlans.value[index];

  // 如果有直接链接，打开链接
  if (pricePlan.buttonLink) {
    window.open(pricePlan.buttonLink, '_blank');
  }

  // 重置所有卡片的 recommended 为 false
  pricePlans.value.forEach((p) => {
    p.recommended = false;
  });

  // 将当前点击的卡片设置为选中状态
  selectCard(index);

  // 对于需要打开模态框的按钮，打开联系模态框
  if (pricePlan.buttonText === t('pricing.plans.communicate')) {
    modalTitle.value = t('pricing.plans.communicate');
    modalQrcodeKey.value = 'pricing.modalqrcode_contact';
    showContactModal.value = true;
  } else if (pricePlan.buttonText === t('pricing.plans.custom')) {
    modalTitle.value = t('pricing.custom');
    modalQrcodeKey.value = 'pricing.modalqrcode_consult';
    showContactModal.value = true;
  } else if (pricePlan.buttonText === t('pricing.plans.buy_now')) {
    // 立即购买按钮也打开联系模态框
    modalTitle.value = t('pricing.plans.buy_now');
    modalQrcodeKey.value = 'pricing.modalqrcode_buy';
    showContactModal.value = true;
  }
}

// 改进 closeModal 函数
function closeModal() {
  showContactModal.value = false;
}

/* 滑动到可视区域执行动画 */
const animateBoxes = () => {
  const boxes = PriceCardItemRef.value;
  if (boxes) {
    setTimeout(() => {
      boxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        const boxBottom = box.getBoundingClientRect().bottom;
        if (boxTop < window.innerHeight && boxBottom > 0) {
          box.classList.add('animate');
          setTimeout(() => {
            animateLoaded.value = true;
          }, 1200);
        }
      });
    }, 100);
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
