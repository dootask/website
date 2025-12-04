<template>
  <div v-if="displayCookieConsent" id="cookieConsent">
    <div>
      {{ t('cookie.content')
      }}<a id="cookie_a" :href="`/${locale}/cookie`" target="_blank">{{
        t('cookie.link_text')
      }}</a>
    </div>
    <div id="buttonBox">
      <button
        id="rejectButton"
        class="btn btn-primary"
        @click="handleRejectButtonClick"
      >
        {{ t('cookie.reject_btn_text') }}
      </button>
      <button
        id="agreeButton"
        class="btn btn-primary"
        @click="handleAgreeButtonClick"
      >
        {{ t('cookie.agree_btn_text') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n();

const displayCookieConsent = ref(false);

onMounted(() => {
  const hasConsented = sessionStorage.getItem('cookieConsent');
  if (!hasConsented) {
    displayCookieConsent.value = true;
  }
});

const hideCookieConsent = () => {
  displayCookieConsent.value = false;
};
const handleAgreeButtonClick = () => {
  sessionStorage.setItem('cookieConsent', 'true');
  hideCookieConsent();
};
const handleRejectButtonClick = () => {
  sessionStorage.setItem('cookieConsent', 'false');
  hideCookieConsent();
};
</script>

<style scoped>
#cookieConsent {
  max-width: 24em;
  display: block;
  height: auto;
  flex-direction: column;
  background-color: rgb(249, 250, 251);
  color: rgb(30, 30, 30);
  padding: 1.2em;
  border-radius: 5px;
  bottom: 1em;
  right: 1em;
  position: fixed;
  overflow: hidden;
  box-sizing: border-box;
  font-family: Helvetica, Calibri, Arial, sans-serif;
  z-index: 9999;
  text-align: left;
  font-size: 16px;
  line-height: 1.5em;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
#cookieConsent a {
  padding: 0.2em;
  display: inline-block;
  color: rgb(30, 30, 30);
  text-decoration: underline;
}

#cookieConsent #buttonBox {
  text-align: right;
  flex: 1 0 auto;
  align-items: center;
  align-content: space-between;
  flex-direction: row;
  display: flex;
  font-size: 16px;
  margin: 1em 0 0;
}

#cookieConsent #buttonBox #agreeButton {
  position: static;
  display: block;
  padding: 0.7em 0.4em;
  font-size: 0.9em;
  font-weight: 700;
  text-align: center;
  width: 100%;
  border-radius: 5px;
  margin-left: 0.5em;
}

#cookieConsent #buttonBox #rejectButton {
  background-color: transparent;
  border-color: transparent;
  color: rgb(30, 30, 30);
  display: block;
  padding: 0.7em 0.4em;
  font-size: 0.9em;
  font-weight: 700;
}
</style>
