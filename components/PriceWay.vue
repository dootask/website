<template>
  <div class="topics">
    <div class="topics-con">
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
              <i v-if="index === 2" class="rec-icon">Rec.</i>
            </h4>
            <div class="price-card-money mb-12">
              <h2 class="txt-6003645 price-card-h2">
                {{ plan.price }}
              </h2>
              <i v-if="plan.priceUnit" class="txt-5001628 price-card-unit">{{
                plan.priceUnit
              }}</i>
            </div>
            <h6 class="txt-4001624 price-card-h6 mb-24" style="height: 48px">
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
        <br />
        <div class="modal-body">
          <p>{{ $t('pricing.modaldesc') }}</p>
          <p>{{ $t('pricing.modalphone') }}</p>
          <p>{{ $t('pricing.modaladdr1') }}@{{ $t('pricing.modaladdr2') }}</p>
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
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n'; // 假设你的主题管理 store 路径

const { t } = useI18n();
const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

const selectedPlanIndex = ref(2);
const hoveredPlanIndex = ref(-1);
const showContactModal = ref(false);
const modalTitle = ref('');
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
    name: t('pricing.plans.free.name'),
    price: '¥0',
    priceUnit: t('pricing.plans.free.unit'),
    userLimit: t('pricing.plans.free.limit'),
    buttonText: t('pricing.plans.deploy'),
    buttonLink: 'https://github.com/kuaifan/dootask/tree/v0.13.0',
    features: [
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_first'),
      },
    ],
  },
  {
    name: t('pricing.plans.free_sec.name'),
    price: '¥0',
    priceUnit: t('pricing.plans.free_sec.unit'),
    userLimit: t('pricing.plans.free_sec.limit'),
    buttonText: t('pricing.plans.deploy'),
    buttonLink: 'https://github.com/kuaifan/dootask/tree/pro',
    features: [
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_first'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_sec'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_third'),
      },
    ],
  },
  {
    name: t('pricing.plans.pro.name'),
    price: '¥18,888',
    userLimit: t('pricing.plans.pro.limit'),
    buttonText: t('pricing.plans.communicate'),
    features: [
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_first'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_sec'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_forth'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_five'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_six'),
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
        text: t('pricing.plans.features_first'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_sec'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_forth'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_five'),
      },
      {
        icon: '/img/price_icon1.svg',
        text: t('pricing.plans.features_six'),
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

  // 对于有通信按钮的卡片，打开模态框
  if (pricePlan.buttonText === t('pricing.plans.communicate')) {
    modalTitle.value = t('pricing.plans.communicate');
    showContactModal.value = true;
  } else if (pricePlan.buttonText === t('pricing.plans.custom')) {
    modalTitle.value = t('pricing.custom');
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
