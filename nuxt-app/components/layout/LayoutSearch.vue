<script setup>
  import { useSearchBar } from '@/composables/searchBar.js';
  import { useAuthStore } from '~~/stores/authorization';
  const { userId, state, userHeadShotNumber, resetState, setPreviousPage } = useAuthStore();

  const topKeywords = useState('topKeywords', ()=> ['標籤','標籤','標籤','標籤','標籤','標籤','標籤']);
  

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
    topKeywords: topKeywords,
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
      <NuxtLink to="/" @click="resetSearchBar()">
        <h3>時事辯論分析平台</h3>
      </NuxtLink>
      <div class="search-container">
        <div class="search-bar">
          <div class="img-container">
            <img src="/search.png" alt="" height="28">
          </div>
          <input type="text" placeholder="搜尋您感興趣的關鍵詞..." v-model="data.search">
        </div>
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

<style scoped lang="scss">
  nav {
    width: 100%;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: var(--theme-white);
    .container {
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 20px 0;
      > a {
        width: 300px;
      }
      > * {
        margin-bottom: 0;
        display: flex;
        align-items: center;
      }
      .search-container {
        width: 700px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        &::before {
          content: '';
          display: block;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          border: 3px solid var(--theme-black);
          z-index: -1;
          position: absolute;
          left: 5px;
          top: 4px;
        }
        .search-bar {
          height: 45px;
          width: 100%;
          max-width: 700px;
          border: 3px solid var(--theme-black);
          background-color: var(--theme-white);
          border-radius: 10px;
          display: flex;
          align-items: center;
          .img-container {
            height: 100%;
            display: flex;
            align-items: center;
            padding: 0 15px;
            cursor: pointer;
          }
          input {
            line-height: 1.2rem;
            padding-top: 2px;
            font-size: 1rem;
            width: 100%;
            border: none;
            background-color: var(--theme-white);
            &:focus {
              outline: none;
            }
          }
          
        }
        ul.tags {
          display: flex;
          max-width: 500px;
          li {
            padding: 2px 10px;
            margin: 0 5px;
            border: 2px solid var(--theme-black);
            border-radius: 5px;
            font-size: 0.95rem;
            cursor: pointer;
          }
        }
      }
      .infos {
        height: 50px;
        width: 320px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        align-self: flex-end;
        margin-bottom: 0;
        img {
          width: 40px;
        }
        > * {
          padding: 5px 20px;
          min-width: 80px;
          cursor: pointer;
        }
        h4 {
          font-size: 1.05rem;
          font-weight: normal;
          letter-spacing: 0.5px;
        }
      }
    }
  }
</style>