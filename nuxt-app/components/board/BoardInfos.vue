<script setup>
  import { useSearchBar } from '@/composables/searchBar.js';
  const { searchTag } = useSearchBar();
  const data = defineProps({
    date: {
      type: String,
      default: 'date'
    },
    title: {
      type: String,
      default: 'title'
    },
    tags: {
      type: Array[String],
      default: ['tag']
    },
    sourceLinkList: {
      type: Array[Object],
      default: [{
        'ref-article-title-in-other-website': 'ref title',
        'ref-article-link-in-other-website': 'ref link'
      }]
    },
    isUserCollected: {
      type: Boolean,
      default: false
    },
    isUserLike: {
      type: Boolean,
      default: false
    },
    numberOfLike: {
      type: Number,
      default: 0
    }
  });
  const isUserLike = ref(data.isUserLike);
  const likeCount = ref(data.numberOfLike);
  watch(isUserLike ,()=> {
    const offset = data.isUserLike? -1: 0;
    const base = data.numberOfLike + offset;
    const delta = isUserLike.value? 1: 0;
    likeCount.value = base + delta;
  })
  const isUserCollected = ref(data.isUserCollected);
  const isShowLink = ref(false);

</script>

<template>
  <div class="board-infos-container">
    <h5 class="date">#{{ data.date }}</h5>
    <h1>{{ data.title }}</h1>
    <ul class="tags">
      <li v-for="tag in data.tags" @click="searchTag(tag)" class="tag">{{ tag }}</li>
    </ul>
    <div class="links-container">
      <div class="link-title" @click="isShowLink = !isShowLink">
        <span>查看原文鏈結清單</span>
        <img src="/arrow.png" v-if="!isShowLink" alt="" height="12">
        <img src="/arrow-down.png" v-if="isShowLink" alt="" height="12">
      </div>
      <ul class="links" v-if="isShowLink">
        <li class="link" v-for="link in data.sourceLinkList">
          <a :href="link['ref-article-link-in-other-website']">
            <span>{{ link['ref-article-title-in-other-website'] }}:</span>{{ link['ref-article-link-in-other-website'] }}
          </a>
        </li>
      </ul>
    </div>
    <div class="user-controls">
      
      <div class="like-container" @click="isUserLike = !isUserLike">
        <img src="/like-true.png" height="24" alt="" v-show="isUserLike">
        <img src="/like-false.png" height="24" alt="" v-show="!isUserLike">
        <h5>{{ likeCount }}</h5>
      </div>
      <div class="collect-container" @click="isUserCollected = !isUserCollected">
        <img src="/collect-true.png" height="24" alt="" v-show="isUserCollected">
        <img src="/collect-false.png" height="24" alt="" v-show="!isUserCollected">
      </div>
      <img src="/share.png" height="24" alt="">
    </div>
  </div>
</template>

<style scoped>
  img {
    cursor: pointer;
  }
  .board-infos-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .board-infos-container > * {
    margin-bottom: 15px;
  }
  h5.date {
    font-size: .8rem;
    opacity: 0.7;
    text-decoration: underline;
  }
  h1 {
    font-size: 2.5rem;
  }
  ul.tags {
    display: flex;
  }
  ul.tags li.tag {
    padding: 2px 10px;
    margin-right: 10px;
    border: 2px solid var(--theme-black);
    border-radius: 5px;
    font-size: .95rem;
    cursor: pointer;
  }
  .links-container .link-title {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  .links-container .link-title span {
    margin-right: 15px;
  }
  .links-container ul.links {
    padding-left: 15px;
    margin-left: 3px;
    border-left: 2px dotted var(--theme-black);
  }
  .links-container ul.links li {
    margin: 5px 0;
    letter-spacing: 0.5px;
  }
  .links-container ul.links li span {
    margin-right: 10px;
  }
  .user-controls {
    display: flex;
    align-items: center;
  }
  .user-controls > * {
    margin-right: 15px;
  }
  .user-controls .like-container, 
  .user-controls .collect-container {
    display: flex;
    align-items: center;
    user-select: none;
  }
  .user-controls .like-container img {
    margin-top: 3px;
    margin-right: 7px;
  }
</style>