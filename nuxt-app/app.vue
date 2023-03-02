<script setup>
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
    --theme-red: rgba(246, 67, 67, 1);
    --theme-inactive: rgba(121, 121, 121, 1);
    --shadow-black: rgba(0,0,0,0.2);
  }
  html {
    font-family: '微軟正黑體';
    font-size: 16px;
    color: var(--theme-black);
    background-color:  var(--theme-white);
  }
  body, #__nuxt {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #__nuxt {
    padding-top: 120px;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  .container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  li {
    list-style-type: none;
  }
  a, a:visited, a:hover, a:active {
    text-decoration: none;
    color: var(--theme-black);
  }
</style>