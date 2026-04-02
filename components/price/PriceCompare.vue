<template>
  <section class="plans">
    <div class="plans-con">
      <div class="plans-layout">
        <h2 class="txt-5004455 plans-tit-h2 mb-16">
          {{ $t('pricing.comparetitle') }}
        </h2>
        <h5 class="txt-4001830 plans-tit-h5 mb-80">
          {{ $t('pricing.comparedesc') }}
        </h5>
        <ul class="plans-ul-t">
          <div class="price-ceiling">
            <li class="plans-ul-t-item grid-6" style="padding: 20px 24px">
              <h4 class="txt-5002024 plans-ul-t-item-h4">
                {{ $t('pricing.features') }}
              </h4>
              <h4 v-for="(plan, index) in plans" :key="index" class="txt-5002024 plans-ul-t-item-h4">
                {{ plan.name }}
              </h4>
            </li>
          </div>

          <li class="plans-ul-t-item grid-6" style="padding: 32px 24px">
            <h4 class="txt-5001616 plans-ul-t-item-h4">
              {{ $t('pricing.price') }}
            </h4>
            <div v-for="(plan, index) in plans" :key="index" class="plans-ul-t-item-h4">
              <div class="price-card-money  mb-24">
                <h2 class="txt-6003645 price-card-h2">
                  {{ plan.price }}
                </h2>
                <i v-if="plan.priceUnit" class="txt-5001628 price-card-unit">{{
                  plan.priceUnit
                }}</i>

              </div>
              <span class="plans-ul-b-item-btn">
                <!-- <ClientOnly> -->
                <a v-if="plan.buttonLink" :href="plan.buttonLink" target="_blank">
                  <button class="btn btn-primary">
                    {{ plan.buttonText }}
                  </button>
                </a>

                <button v-else class="btn btn-primary" @click="handlePlanSelect(plan)">
                  {{ plan.buttonText }}
                </button>
                <!-- </ClientOnly> -->
              </span>
            </div>
          </li>

          <template v-for="(section, sectionIndex) in compareSections" :key="sectionIndex">
            <li class="plans-ul-t-item">
              <ol class="plans-ol">
                <li class="plans-ol-item">
                  <h6 class="txt-5001616 plans-ul-t-item-h4">
                    {{ section.title }}
                  </h6>
                </li>
                <li v-for="(item, itemIndex) in section.items" :key="itemIndex" class="plans-ol-item grid-6">
                  <h6 class="txt-4001616 plans-ol-item-h6">
                    {{ item.name }}
                  </h6>
                  <template v-for="(plan, planIndex) in plans" :key="planIndex">
                    <h6 v-if="typeof item.support[planIndex] === 'string'" class="txt-4001616 plans-ol-item-h6">
                      {{ item.support[planIndex] }}
                    </h6>
                    <img v-else-if="item.support[planIndex]" class="plans-ol-item-icon" src="/img/price_icon1.svg"
                      :alt="item.name" />
                    <img v-else class="plans-ol-item-icon2" src="/img/price_icon2.svg" :alt="item.name" />
                  </template>
                </li>
              </ol>
            </li>
          </template>
        </ul>
        <!-- 小屏幕下的对比计划 -->
        <ul class="plans-ul-768">
          <li v-for="(plan, planIndex) in plans" :key="planIndex" class="plans-ul-768-item mb-36">
            <h5 class="txt-5001822 help-h5 mb-16">
              {{ plan.name }}
            </h5>
            <ol class="plans-ol-768">
              <template v-for="(section, sectionIndex) in compareSections" :key="sectionIndex">
                <li class="plans-ol-768-item">
                  <div class="plans-ol-768-content">
                    <h6 class="txt-5001616 plans-ol-item-h4">
                      {{ section.title }}
                    </h6>
                  </div>
                  <div v-for="(item, itemIndex) in section.items" :key="itemIndex" class="plans-ol-768-content">
                    <h6 class="txt-4001516 plans-ol-item-h6">
                      {{ item.name }}
                    </h6>
                    <span v-if="typeof item.support[planIndex] === 'string'">
                      {{ item.support[planIndex] }}
                    </span>

                    <img v-else-if="item.support[planIndex]" class="plans-ol-item-icon" src="/img/price_icon1.svg"
                      :alt="item.name" />
                    <img v-else class="plans-ol-item-icon2" src="/img/price_icon2.svg" :alt="item.name" />
                  </div>
                </li>
              </template>

              <li class="price-card-money mb-16">
                <h2 class="txt-6002430 price-card-h2">
                  {{ plan.price }}
                </h2>
                <i v-if="plan.priceUnit" class="txt-5001528 price-card-unit">{{
                  plan.priceUnit
                }}</i>
              </li>
              <li>
                <span style="display: inline-block; width: 100%">
                  <a v-if="plan.buttonLink" :href="plan.buttonLink" target="_blank" class="start_a">
                    <button class="btn btn-primary">
                      {{ plan.buttonText }}
                    </button>
                  </a>
                  <button v-else class="btn btn-primary" @click="handlePlanSelect(plan)">
                    {{ plan.buttonText }}
                  </button>
                </span>
              </li>
            </ol>
          </li>
        </ul>
      </div>
    </div>

    <!-- 联系我们模态框 -->
    <div v-if="showContactModal" class="modal-overlay" :class="{ dark: theme === 'dark' }" @click.stop>
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
  </section>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';

import { useI18n } from 'vue-i18n';

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
  return 'https://demo.n.dootask.com/';
});

const showContactModal = ref(false);
const modalTitle = ref('');
const modalQrcodeKey = ref('pricing.modalqrcode');

interface IPlan {
  name: string;
  price: string;
  priceUnit?: string;
  buttonText: string;
  buttonLink?: string;
}

const plans = computed<IPlan[]>(() => [
  {
    name: t('pricing.plans.saas.name'),
    price: t('pricing.plans.saas.price'),
    buttonText: t('pricing.plans.try_now'),
    buttonLink: saasSignupUrl.value,
  },
  {
    name: t('pricing.plans.open_source.name'),
    price: t('pricing.plans.open_source.price'),
    buttonText: t('pricing.plans.free_use'),
    buttonLink: 'https://github.com/kuaifan/dootask',
  },
  {
    name: t('pricing.plans.basic.name'),
    price: t('pricing.plans.basic.price'),
    priceUnit: t('pricing.plans.basic.unit'),
    buttonText: t('pricing.plans.buy_now'),
  },
  {
    name: t('pricing.plans.pro.name'),
    price: t('pricing.plans.pro.price'),
    buttonText: t('pricing.plans.buy_now'),
  },
  {
    name: t('pricing.plans.enterprise.name'),
    price: t('pricing.plans.enterprise.price'),
    buttonText: t('pricing.plans.custom'),
  },
]);

// 计划类型枚举，用于更清晰地定义支持情况
enum PlanType {
  SAAS = 0,
  OPEN_SOURCE = 1,
  BASIC = 2,
  PRO = 3,
  ENTERPRISE = 4,
}

// 支持值类型
type SupportValue = boolean | string;

// 辅助函数：创建支持数组（按计划顺序）
function createSupport(
  saas: SupportValue,
  openSource: SupportValue,
  basic: SupportValue,
  pro: SupportValue,
  enterprise: SupportValue
): SupportValue[] {
  return [saas, openSource, basic, pro, enterprise];
}

// 辅助函数：所有计划都支持相同值
function allSupported(value: SupportValue = true): SupportValue[] {
  return createSupport(value, value, value, value, value);
}

// 辅助函数：SaaS不支持，其他计划支持
function saasNotSupported(value: SupportValue = true): SupportValue[] {
  return createSupport(false, value, value, value, value);
}

const compareSections = computed(() => [
  {
    title: t('pricing.sysuse'),
    items: [
      {
        name: t('pricing.usernum'),
        support: createSupport(
          '≤3',
          '≤3',
          '≤10',
          t('pricing.unlimit'),
          t('pricing.cusable')
        ),
      },
      {
        name: t('pricing.projnum'),
        support: allSupported(t('pricing.unlimit')),
      },
      {
        name: t('pricing.tasknum'),
        support: allSupported(t('pricing.unlimit')),
      },
      {
        name: t('pricing.offdeply'),
        support: createSupport(
          false,
          t('pricing.support'),
          t('pricing.support'),
          t('pricing.official'),
          t('pricing.official')
        ),
      },
    ],
  },
  {
    title: t('pricing.taskcoll'),
    items: [
      {
        name: t('pricing.multiview'),
        support: allSupported(),
      },
      {
        name: t('pricing.cuscol'),
        support: allSupported(),
      },
      {
        name: t('pricing.visibset'),
        support: allSupported(),
      },
      {
        name: t('pricing.repcyc'),
        support: allSupported(),
      },
    ],
  },
  {
    title: t('homepage.scenarios.scen_promana_ti'),
    items: [
      {
        name: t('pricing.progress'),
        support: allSupported(),
      },
      {
        name: t('pricing.protemp'),
        support: allSupported(),
      },
      {
        name: t('pricing.tasktemp'),
        support: allSupported(),
      },
      {
        name: t('pricing.tasktag'),
        support: allSupported(),
      },
      {
        name: t('pricing.gantchar'),
        support: allSupported(),
      },
    ],
  },
  {
    title: t('pricing.apply'),
    items: [
      {
        name: t('pricing.appro'),
        support: saasNotSupported(),
      },
      {
        name: t('pricing.okr'),
        support: saasNotSupported(),
      },
      {
        name: t('pricing.bot'),
        support: saasNotSupported(),
      },
      {
        name: t('pricing.asset_management'),
        support: saasNotSupported(),
      },
      {
        name: t('pricing.performance_appraisal'),
        support: saasNotSupported(),
      },
      {
        name: t('pricing.meeting'),
        support: saasNotSupported(),
      },
      {
        name: t('pricing.okrresult'),
        support: saasNotSupported(),
      },
      {
        name: 'LDAP',
        support: allSupported(),
      },
      {
        name: t('pricing.email'),
        support: allSupported(),
      },
      {
        name: t('pricing.apppush'),
        support: saasNotSupported(),
      },
      {
        name: t('pricing.team'),
        support: allSupported(),
      },
    ],
  },
  {
    title: t('pricing.chat'),
    items: [
      {
        name: '@' + t('pricing.func'),
        support: allSupported(),
      },
      {
        name: t('pricing.linktask'),
        support: allSupported(),
      },
      {
        name: t('pricing.emo'),
        support: allSupported(),
      },
      {
        name: t('pricing.category'),
        support: allSupported(),
      },
      {
        name: t('pricing.rightclick'),
        support: allSupported(),
      },
      {
        name: t('pricing.meswithout'),
        support: allSupported(),
      },
      {
        name: t('pricing.colorcode'),
        support: allSupported(),
      },
    ],
  },
]);

function handlePlanSelect(plan: IPlan) {
  // 如果有直接链接，打开链接
  if (plan.buttonLink) {
    window.open(plan.buttonLink, '_blank');
    return;
  }

  // 打开联系模态框
  if (plan.buttonText === t('pricing.plans.communicate')) {
    modalTitle.value = t('pricing.plans.communicate');
    modalQrcodeKey.value = 'pricing.modalqrcode_contact';
    showContactModal.value = true;
  } else if (plan.buttonText === t('pricing.plans.custom')) {
    modalTitle.value = t('pricing.custom');
    modalQrcodeKey.value = 'pricing.modalqrcode_consult';
    showContactModal.value = true;
  } else if (plan.buttonText === t('pricing.plans.buy_now')) {
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
</script>
