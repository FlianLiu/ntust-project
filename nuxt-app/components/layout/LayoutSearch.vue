<script setup>
  import { useSearchBar } from '@/composables/searchBar.js';
  import { useAuthStore } from '~~/stores/authorization';
  const { userId, state, userHeadShotNumber, resetState, setPreviousPage } = useAuthStore();

  const { showLogoutBtn, showRegisterBtn } = defineProps({
    showLogoutBtn: {
      type: Boolean,
      default: false,
    },
    showRegisterBtn: {
      type: Boolean,
      default: false,
    }
  });

  const { searchTag } = useSearchBar();
  const searchBar = useState('search-bar', ()=> '');

  const data = reactive({
    topKeywords: ['標籤','標籤','標籤','標籤','標籤','標籤','標籤'],
    search: searchBar
  });

  function resetSearchBar() {
    searchBar.value = "";
  }
  function login() {
    const route = useRoute();
    if (route.path !== '/register') setPreviousPage(route.path);
  }

</script>

<template>
  <nav>
    <div class="container">
      <NuxtLink to="/" @click="resetSearchBar()" class="mb-0">
        <h3>時事辯論分析平台</h3>
        <!-- <h3>兔年配口茶</h3> -->
        <!-- <h3>隧道肆月</h3> -->
      </NuxtLink>
      <div class="search-container mb-0">
        <div class="search-bar">
          <div class="img-container">
            <img src="/search.png" alt="" height="22">
          </div>
          <input type="text" placeholder="搜尋您感興趣的關鍵詞..." v-model="data.search">
        </div>
        <ul class="tags">
          <li v-for="keyword in data.topKeywords" @click="searchTag(keyword)">{{ keyword }}</li>
        </ul>
      </div>
      <div class="infos">
        <NuxtLink to="/petition">
          <h4>連署開版</h4>
        </NuxtLink>
        <template v-if="showLogoutBtn">
          <NuxtLink to="/">
            <h4 @click="resetState">登出</h4>
          </NuxtLink>
        </template>
        <template v-else-if="showRegisterBtn">
          <NuxtLink to="/register">
            <h4>註冊</h4>
          </NuxtLink>
        </template>
        <template v-else-if="state">
          <NuxtLink :to="'/users/'+userId">
            <!-- user headshot -->
            <img src="/rabbit-1.png" height="40" alt="">
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/login" @click="login">
            <h4>登入</h4>
          </NuxtLink>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
  nav {
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: var(--theme-white);
  }
  .container {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 20px 0;
  }
  .container > * {
    width: 33%;
  }
  .infos {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0;
  }
  .infos img {
    width: 40px;
  }
  .infos > * {
    padding: 5px 20px;
    min-width: 80px;
    cursor: pointer;
  }
  .infos h4 {
    font-size: 1.05rem;
    font-weight: normal;
    letter-spacing: 0.5px;
  }
  .mb-0 {
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }
  h3 {
    padding-top: 10px;
  }
  .search-container {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .search-container .search-bar {
    width: 100%;
    max-width: 500px;
    margin-bottom: 10px;
    border: 3px solid var(--theme-black);
    border-radius: 7px;
    display: flex;
    align-items: center;
  }
  .search-container .search-bar .img-container {
    display: flex;
    align-items: center;
    padding: 7px 20px 7px 15px;
    cursor: pointer;
  }
  .search-container .search-bar input {
    margin-left: 10px;
    line-height: 1.2rem;
    padding-top: 2px;
    font-size: 1rem;
    width: 100%;
    border: none;
    background-color: var(--theme-white);
  }
  .search-container .search-bar input:focus {
    outline: none;
  }
  .search-container ul.tags {
    display: flex;
    max-width: 500px;
  }
  .search-container ul.tags li {
    padding: 2px 10px;
    margin: 0 5px;
    border: 2px solid var(--theme-black);
    border-radius: 5px;
    font-size: 0.95rem;
    cursor: pointer;
  }
</style>