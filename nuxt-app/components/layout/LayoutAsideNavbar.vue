<script setup>
  import { useAuthStore } from '~~/stores/authorization';
  const topKeywords = useState('topKeywords');
  const { userId } = useAuthStore();
  const { searchTag } = useSearchBar();
</script>

<template>
  <div class="aside-navbar">
    <div class="links">
      <NuxtLink to="/petition" class="link">
        <img src="/create-signing.png" alt="" height="18">
        <h4>連署開版</h4>
      </NuxtLink>
      <NuxtLink :to="'/users/'+userId" class="link">
        <img src="/profile.png" alt="" height="18">
        <h4>個人資料</h4>
      </NuxtLink>
    </div>
    <div class="top-keywords">
      <h4>近期熱門關鍵詞</h4>
      <ul class="keywords">
        <li class="keyword double-solid-border" v-for="keyword in topKeywords" @click="searchTag(keyword)">
          {{ keyword }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.aside-navbar {
  margin-bottom: 0;
  h4 {
    font-size: 1.05rem;
    font-weight: normal;
    letter-spacing: 0.5px;
  }
  .links {
    padding-bottom: 5px;
    border-bottom: 2px dashed var(--theme-black);
    .link {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      img {
        margin-right: 10px;
      }
    }
  }
  .top-keywords {
    margin-top: 20px;
    h4 {
      font-weight: bold;
      font-size: 1.25rem;
      margin-bottom: 15px;
    }
    ul.keywords {
      display: flex;
      flex-wrap: wrap;
      li.keyword {
        --border-offset: 2px;
        --border-minus-offset: -3px;
        --border-hover-translate: 5px;
        margin-right: 10px;
        margin-bottom: 10px;
        padding: 1px 10px;
        padding-bottom: 3px;
        border: 2px solid var(--theme-black);
        border-radius: 5px;
        background-color: var(--theme-white);
        cursor: pointer;
      }
    }
  }
}

</style>