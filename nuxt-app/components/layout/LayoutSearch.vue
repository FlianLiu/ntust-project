<script setup>
  import { useAuthStore } from '~~/stores/authorization';
  import { useSearchResultStore } from '~~/stores/searchResult';
  const { baseAPI, userId, state, userHeadShotNumber, resetState, setPreviousPage } = useAuthStore();
  const { setSearchKeyword } = useSearchResultStore();

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

  const topKeywords = useState('topKeywords', ()=> ['']);
  async function fetchTopKeywordData() {
    const { data:res } = await useFetch(`${baseAPI}/board/get-popular-keywords`, {
      method: 'GET',
    });
    topKeywords.value = res.value.tags;
  }
  fetchTopKeywordData();

  const searchBar = useState('search-bar', ()=> '');
  const route = useRoute();
  const fetchData = inject('fetchData');

  function resetSearchBar() {
    searchBar.value = "";
    setSearchKeyword("");
    if (route.fullPath === '/') {
      fetchData();
    }
  }
  function searchKeywords() {
    setSearchKeyword(searchBar.value);
    if (route.fullPath === '/') {
      fetchData();
    }else if(searchBar.value === '') {
      return
    }else {
      navigateTo('/');
    }
  }
  function toLoginPage() {
    const route = useRoute();
    if (route.path !== '/register') setPreviousPage(route.path);
  }

  const userInfos = reactive({})
  onMounted(()=> {
    const logined = new Date(localStorage.getItem('latestLoginedTime')).getTime();
    const nowDate = new Date().getTime();
    const userData = localStorage.getItem('userData');
    if ((((nowDate - logined) / (1000 * 60 * 60 * 24)) < 1) && !(userData === '' || userData === null)){
      const { id, headshot } = JSON.parse(localStorage.getItem('userData'));
      userInfos.state = true;
      userInfos.userId = id;
      userInfos.headshot = headshot;
    }
  })

  // RWD events
  const showLinks = ref(false);
</script>

<template>
  <nav>
    <div class="container">
      <NuxtLink to="/" @click="resetSearchBar">
        <h3>隧道肆月</h3>
      </NuxtLink>
      <div class="search-container" :class="{'showLinks': showLinks}">
        <div class="search-bar">
          <div class="img-container" @click="searchKeywords">
            <img src="/search.png" alt="" height="28">
          </div>
          <input type="text" placeholder="搜尋您感興趣的關鍵詞" v-model="searchBar" @keydown.enter="searchKeywords">
        </div>
      </div>
      <div class="infos" :class="{'showLinks': showLinks}">
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
        <template v-else-if="userInfos.state && userInfos.userId !== ''">
          <NuxtLink :to="'/users/'+userInfos.userId">
            <!-- user headshot -->
            <img :src="'/rabbit-'+userInfos.headshot+'.png'" height="40" alt="">
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink to="/login" @click="toLoginPage">
            <h4>登入</h4>
          </NuxtLink>
        </template>
      </div>
      <div class="burger" :class="{'showLinks': showLinks}" @click="showLinks = !showLinks">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
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
        &.showLinks {
          width: auto;
          height: 45px;
          &::before, .search-bar {
            display: none;
          }
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
      }
      .infos {
        height: 50px;
        width: 320px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        align-self: flex-end;
        margin-bottom: 0;
        &.showLinks {
          width: 500px;
          height: 45px;
          display: flex;
          a {
            padding: 5px 15px;
            min-width: 30px;
          }
        }
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
      .burger {
        width: 35px;
        height: 35px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        display: none;
        cursor: pointer;
        .line {
          width: 35px;
          height: 4px;
          background-color: var(--theme-black);
          border-radius: 2px;
          margin: 3px 0;
        }
        &.showLinks {
          .line {
            position: absolute;
            &:nth-child(1) {
              top: 50%;
              left: 50%;
              transform: translate(-50%, -5px) rotate(45deg);
            }
            &:nth-child(2) {
              width: 0;
            }
            &:nth-child(3) {
              top: 50%;
              left: 50%;
              transform: translate(-50%, -5px) rotate(-45deg);
            }
          }
        }
      }
    }
  }

  @media (max-width: 1350px){
    nav .container {
      > a {
        width: 250px;
      }
      .infos {
        width: 250px;
      }
    }
  }
  @media (max-width: 1250px) {
    nav .container {
      justify-content: space-between;
      padding: 15px 0;
      > a {
        width: auto;
      }
      .search-container {
        width: 400px;
      }
      .burger {
        display: flex;
      }
      .infos {
        display: none;
        position: absolute;
        right: 50px;
      }
    }
  }
  @media (max-width: 800px) {
    nav .container {
      padding: 5px 0;
      height: 40px;
      h3 {
        font-size: 18px;
      }
      .search-container {
        position: absolute;
        right: 40px;
        width: 200px;
        &::before {
          display: none;
        }
        &.showLinks {
          height: 16px;
        }
        .search-bar {
          height: 16px;
          flex-direction: row-reverse;
          border: none;
          .img-container {
            padding-right: 0;
            img {
              height: 16px;
            }
          }
          input {
            text-align: right;
          }
        }
      }
      .burger {
        width: 16px;
        height: 16px;
        margin: 0;
        &.showLinks {
          .line {
            &:nth-child(1) {
              transform: translate(-50%, -2px) rotate(45deg);
            }
            &:nth-child(3) {
              transform: translate(-50%, -2px) rotate(-45deg);
            }
          }
        }
        .line {
          width: 16px;
          height: 2px;
          margin: 1px 0;
        }
      }
      .infos.showLinks {
        height: 16px;
        width: auto;
        position: absolute;
        top: 13px;
        right: 35px;
        a {
          padding: 0 7px;
          img {
            height: 24px;
            width: auto;
          }
        }
      }
    }
    
  }
</style>