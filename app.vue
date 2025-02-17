<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  script: [
    {
      innerHTML: `(function(){let theme=sessionStorage.getItem('theme');if(!theme){theme=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';sessionStorage.setItem('theme',theme)}document.documentElement.setAttribute('data-theme',theme)})();`,
      type: 'text/javascript'
    }
  ],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : 'DooTask';
  },
});
</script>