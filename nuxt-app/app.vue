<script setup>
  import { useAuthStore } from './stores/authorization';
  const { checkState } = useAuthStore();

  onMounted(()=> {
    checkState();
  })

  useHead({
    htmlAttrs: {
      lang: 'zh-TW',
    },
    title: '隧道四月-時事辯論分析平台'
  });
</script>
<template>
  <NuxtPage />
</template>

<style>
  *, *::before, *::after {
    position: relative;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  :root {
    --theme-black: #252525;
    --theme-white: white;
    --theme-inactive: rgba(121, 121, 121, 1);
    --shadow-black: rgba(37, 37, 37, 0.2);
    --double-border-black: rgba(121, 121, 121, 1);
    --double-border-active-black: rgba(162, 162, 162, 0.9);
  }
  html {
    font-family: '微軟正黑體';
    font-size: 16px;
    color: var(--theme-black);
    background-color:  var(--theme-white);
    scroll-behavior: smooth;
  }
  body, #__nuxt {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #__nuxt {
    padding-top: 100px;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.5rem;
  }
  li {
    list-style-type: none;
  }
  a, a:visited, a:hover, a:active {
    text-decoration: none;
    color: var(--theme-black);
  }

  .container {
    width: 100%;
    max-width: 1320px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .double-solid-border {
    box-shadow: var(--border-offset) var(--border-offset) 0px var(--double-border-black);
    transition: .2s;
  }
  .double-solid-border:hover {
    box-shadow: var(--border-hover-translate) var(--border-hover-translate) 0px var(--double-border-black);
    transform: translate(var(--border-minus-offset), var(--border-minus-offset));
  }

  @media (max-width: 1350px){
    .container {
      max-width: 1200px;
    }
  }
  @media (max-width: 1250px) {
    #__nuxt {
      padding-top: 70px;
    }
    html {
      font-size: 14px;
    }
    .container {
      max-width: 760px;
    }
    .double-solid-border {
      box-shadow: none !important;
    }
    .double-solid-border:hover {
      box-shadow: none !important;
      transform: translate(0, 0);
    }
  }
  @media (max-width: 800px) {
    html {
      font-size: 12px;
    }
    #__nuxt {
      padding-top: 40px;
    }
    .container {
      max-width: 375px;
    }
  }
</style>