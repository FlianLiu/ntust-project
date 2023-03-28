<script setup>
  import { useSearchResultStore } from '~~/stores/searchResult';
  import { useAuthStore } from '~~/stores/authorization';
  const { baseAPI } = useAuthStore();

  const data = reactive( {data: []});
  async function fetchData() {
    const { searchKeyword } = useSearchResultStore();
    if (searchKeyword === '') {
      const { data:res } = await useFetch(`${baseAPI}/board/get-popular-boards`, {
        method: 'GET',
      });
      data['data'] = res.value.data;
    }else {
      const { data:res } = await useFetch(`${baseAPI}/board/post-search-board`, {
        method: 'POST',
        body: {
          "keyword": searchKeyword
        }
      });
      data['data'] = res.value.data;
    }
  }
  provide('fetchData', fetchData);
  fetchData();

</script>
<template>
  <Lobby :data="data"/>
</template>
<style>

</style>