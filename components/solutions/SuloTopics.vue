<template>
  <div class="topics">
    <div class="topics-con">
      <div class="topics-layout">
        <div class="topics-tit mb-32">
          <span class="txt-6007290 topics-h1">{{ $t('solution.title') }}</span>
        </div>
        <h4 class="txt-4001830 topics-h4 mb-32" style="width: auto !important">
          {{ $t('solution.desc') }}
        </h4>
        <div class="flex-cc topics-btn">
          <span class="mr-24 get-started">
            <NuxtLink :to="`/${locale}/price`">
              <button class="btn btn-primary mr-20">
                {{ $t('common.get_started') }}
              </button>
            </NuxtLink>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const { locale } = useI18n();

</script>

