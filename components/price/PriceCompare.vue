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
            <li class="plans-ul-t-item grid-5" style="padding: 20px 24px">
              <h4 class="txt-5002024 plans-ul-t-item-h4">
                {{ $t('pricing.features') }}
              </h4>
              <h4
                v-for="(plan, index) in plans"
                :key="index"
                class="txt-5002024 plans-ul-t-item-h4"
              >
                {{ plan.name }}
              </h4>
            </li>
          </div>

          <li class="plans-ul-t-item grid-5" style="padding: 32px 24px">
            <h4 class="txt-5001616 plans-ul-t-item-h4">
              {{ $t('pricing.price') }}
            </h4>
            <div
              v-for="(plan, index) in plans"
              :key="index"
              class="plans-ul-t-item-h4"
            >
              <div class="price-card-money mb-24">
                <h2 class="txt-6003645 price-card-h2">
                  {{ plan.price }}
                </h2>
                <i v-if="plan.priceUnit" class="txt-5001628 price-card-unit">{{
                  plan.priceUnit
                }}</i>
              </div>
              <span class="plans-ul-b-item-btn">
                <!-- <ClientOnly> -->
                  <a
                    v-if="plan.buttonLink"
                    :href="plan.buttonLink"
                    target="_blank"
                  >
                    <button class="btn btn-primary">
                      {{ plan.buttonText }}
                    </button>
                  </a>

                  <button
                    v-else
                    class="btn btn-primary"
                    @click="handlePlanSelect(plan)"
                  >
                    {{ plan.buttonText }}
                  </button>
                <!-- </ClientOnly> -->
              </span>
            </div>
          </li>

          <template
            v-for="(section, sectionIndex) in compareSections"
            :key="sectionIndex"
          >
            <li class="plans-ul-t-item">
              <ol class="plans-ol">
                <li class="plans-ol-item">
                  <h6 class="txt-5001616 plans-ul-t-item-h4">
                    {{ section.title }}
                  </h6>
                </li>
                <li
                  v-for="(item, itemIndex) in section.items"
                  :key="itemIndex"
                  class="plans-ol-item grid-5"
                >
                  <h6 class="txt-4001616 plans-ol-item-h6">
                    {{ item.name }}
                  </h6>
                  <template v-for="(plan, planIndex) in plans" :key="planIndex">
                    <h6 v-if="typeof item.support[planIndex] === 'string'" class="txt-4001616 plans-ol-item-h6">
                      {{ item.support[planIndex] }}
                    </h6>
                    <img
                      v-else-if="item.support[planIndex]"
                      class="plans-ol-item-icon"
                      src="/img/price_icon1.svg"
                      :alt="item.name"
                    />
                    <img
                      v-else
                      class="plans-ol-item-icon2"
                      src="/img/price_icon2.svg"
                      :alt="item.name"
                    />
                  </template>
                </li>
              </ol>
            </li>
          </template>
        </ul>
        <!-- 小屏幕下的对比计划 -->
        <ul class="plans-ul-768">
          <li
            v-for="(plan, planIndex) in plans"
            :key="planIndex"
            class="plans-ul-768-item mb-36"
          >
            <h5 class="txt-5001822 help-h5 mb-16">
              {{ plan.name }}
            </h5>
            <ol class="plans-ol-768">
              <template
                v-for="(section, sectionIndex) in compareSections"
                :key="sectionIndex"
              >
                <li class="plans-ol-768-item">
                  <div class="plans-ol-768-content">
                    <h6 class="txt-5001616 plans-ol-item-h4">
                      {{ section.title }}
                    </h6>
                  </div>
                  <div
                    v-for="(item, itemIndex) in section.items"
                    :key="itemIndex"
                    class="plans-ol-768-content"
                  >
                    <h6 class="txt-4001516 plans-ol-item-h6">
                      {{ item.name }}
                    </h6>
                    <span v-if="typeof item.support[planIndex] === 'string'">
                      {{ item.support[planIndex] }}
                    </span>

                    <img
                      v-else-if="item.support[planIndex]"
                      class="plans-ol-item-icon"
                      src="/img/price_icon1.svg"
                      :alt="item.name"
                    />
                    <img
                      v-else
                      class="plans-ol-item-icon2"
                      src="/img/price_icon2.svg"
                      :alt="item.name"
                    />
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
                  <a
                    v-if="plan.buttonLink"
                    :href="plan.buttonLink"
                    target="_blank"
                    class="start_a"
                  >
                    <button class="btn btn-primary">
                      {{ plan.buttonText }}
                    </button>
                  </a>
                  <button
                    v-else
                    class="btn btn-primary"
                    @click="handlePlanSelect(plan)"
                  >
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
    <div
      v-if="showContactModal"
      class="modal-overlay"
      :class="{ dark: theme === 'dark' }"
      @click.stop
    >
      <div class="modal-content">
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
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useI18n } from 'vue-i18n';


const { t } = useI18n();

const themeStore = useThemeStore();
const { theme } = toRefs(themeStore);

const showContactModal = ref(false);
const modalTitle = ref('');

interface IPlan {
  name: string;
  price: string;
  priceUnit?: string;
  buttonText: string;
  buttonLink?: string; 
} 

const plans = computed<IPlan[]>(() => [
  {
    name: t('pricing.plans.free.name'),
    price: '¥0',
    priceUnit: t('pricing.plans.free.unit'),
    buttonText: t('pricing.plans.deploy'),
    buttonLink: 'https://github.com/kuaifan/dootask/tree/v0.13.0',
  },
  {
    name: t('pricing.plans.free_sec.name'),
    price: '¥0',
    priceUnit: t('pricing.plans.free.unit'),
    buttonText: t('pricing.plans.deploy'),
    buttonLink: 'https://github.com/kuaifan/dootask/tree/pro',
  },
  {
    name: t('pricing.plans.pro.name'),
    price: '¥18,888',
    buttonText: t('pricing.plans.communicate'),
  },
  {
    name: t('pricing.plans.enterprise.name'),
    price: t('pricing.plans.enterprise.price'),
    buttonText: t('pricing.plans.custom'),
  },
]);

const compareSections = computed(() => [
  {
    title: t('pricing.sysuse'),
    items: [
      {
        name: t('pricing.usernum'),
        support: [
          t('pricing.unlimit'),
          '≤3',
          t('pricing.unlimit'),
          t('pricing.cusable'),
        ],
      },
      {
        name: t('pricing.projnum'),
        support: [
          t('pricing.unlimit'),
          t('pricing.unlimit'),
          t('pricing.unlimit'),
          t('pricing.unlimit'),
        ],
      },
      {
        name: t('pricing.tasknum'),
        support: [
          t('pricing.unlimit'),
          t('pricing.unlimit'),
          t('pricing.unlimit'),
          t('pricing.unlimit'),
        ],
      },
      {
        name: t('pricing.offdeply'),
        support: [
          t('pricing.support'),
          t('pricing.support'),
          t('pricing.official'),
          t('pricing.official'),
        ],
      },
    ],
  },
  {
    title: t('pricing.taskcoll'),
    items: [
      {
        name: t('pricing.multiview'),
        support: [true, true, true, true],
      },
      {
        name: t('pricing.cuscol'),
        support: [true, true, true, true],
      },
      {
        name: t('pricing.visibset'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.repcyc'),
        support: [false, true, true, true],
      },
    ],
  },
  {
    title: t('homepage.scenarios.scen_promana_ti'),
    items: [
      {
        name: t('pricing.progress'),
        support: [true, true, true, true],
      },
      {
        name: t('pricing.protemp'),
        support: [true, true, true, true],
      },
      {
        name: t('pricing.gantchar'),
        support: [true, true, true, true],
      },
    ],
  },
  {
    title: t('pricing.apply'),
    items: [
      {
        name: t('pricing.appro'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.okr'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.bot'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.meeting'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.okrresult'),
        support: [false, true, true, true],
      },
      {
        name: 'LDAP',
        support: [false, true, true, true],
      },
      {
        name: t('pricing.email'),
        support: [true, true, true, true],
      },
      {
        name: t('pricing.apppush'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.team'),
        support: [true, true, true, true],
      },
    ],
  },
  {
    title: t('pricing.chat'),
    items: [
      {
        name: '@' + t('pricing.func'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.linktask'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.emo'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.category'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.rightclick'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.meswithout'),
        support: [false, true, true, true],
      },
      {
        name: t('pricing.colorcode'),
        support: [false, true, true, true],
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
  modalTitle.value =
    plan.buttonText === t('pricing.plans.communicate')
      ? t('pricing.plans.communicate')
      : t('pricing.custom');

  showContactModal.value = true;
}

// 改进 closeModal 函数
function closeModal() {
  showContactModal.value = false;
}
</script>
