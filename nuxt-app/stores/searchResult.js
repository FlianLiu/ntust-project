import { defineStore } from 'pinia'

export const useSearchResultStore = defineStore('searchResult', () => {
  const searchKeyword = ref('');
  
  function setSearchKeyword(keyword) {
    searchKeyword.value = keyword;
  }

  return {
    searchKeyword,
    setSearchKeyword
  }
});