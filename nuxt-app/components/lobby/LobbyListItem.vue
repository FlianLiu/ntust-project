<script setup>
  import { useSearchBar } from '@/composables/searchBar.js';
  const { searchTag } = useSearchBar();

  const { id, numberOfLike, date, title, tags, imageCloud, keywordWithCount } = defineProps({
    id: {
      type: String,
      default: 'IMG alt'
    },
    numberOfLike: {
      type: Number,
      default: 573,
    },
    date: {
      type: String,
      default: '2022-10-27'
    },
    title: {
      type: String,
      default: '看板標題 default title'
    },
    tags: {
      type: Array,
      default: ['標籤','標籤','標籤']
    },
    imageCloud: {
      type: String,
      default: '/image-cloud.png'
    },
    keywordWithCount: {
      type: Array,
      default: [
        {
					keyword: '關鍵詞1',
					count: 58,
				},
        {
					keyword: '關鍵詞2',
					count: 52,
				},
        {
					keyword: '關鍵詞3',
					count: 47,
				},
      ]
    }
  });



  function calculateMaxKeywordCount(keywords) {
    let max = 0;
    for (let i=0; i<keywords.length; i++) {
      if ( keywords[i].count > max ) max = keywords[i].count;
    }
    return max;
  }

</script>

<template>
  <NuxtLink :to="'/board/'+id" class="lobby-list-item">
    <div class="board-title-container">
      <div class="board-info">
        <img src="/polular-board-fire.png" height="20" alt="">
        <h5>{{ numberOfLike }}</h5>
        <span class="date">#{{ date }}</span>
      </div>
      <h3 class="title-text">{{ title }}</h3>
      <ul class="tags-container">
        <li @click.prevent="searchTag(tag)" class="tag" v-for="tag in tags">
          {{ tag }}
        </li>
      </ul>
    </div>
    <img class="image-cloud" :src="imageCloud" alt="">
    <div class="keywords">
      <div class="keyword" v-for="keywordObject in keywordWithCount">
        <span>{{ keywordObject.keyword }}</span>
        <div class="keyword-bar" 
          :data-max-count = "calculateMaxKeywordCount(keywordWithCount)"
          :data-count="keywordObject.count"
        >{{ keywordObject.count }}</div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
  .lobby-list-item {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid var(--theme-black);
    border-radius: 7px;
    padding: 20px 50px;
    margin-bottom: 20px;
    cursor: default;
  }
  .board-title-container {
    width: 50%;
  }
  .board-title-container .board-info {
    display: flex;
    align-items: center;
    font-size: 1.2rem;
  }
  .board-title-container .board-info > * {
    margin-right: 15px;
  }
  .board-title-container .board-info span.date {
    font-size: .8rem;
    opacity: 0.7;
    text-decoration: underline;
  }
  .board-title-container h3.title-text {
    margin: 10px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .board-title-container .tags-container {
    display: flex;
  }
  .board-title-container .tags-container .tag {
    padding: 2px 10px;
    margin-right: 10px;
    border: 2px solid var(--theme-black);
    border-radius: 5px;
    font-size: .95rem;
    cursor: pointer;
  }
  
  .keywords {
    height: 120px;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .keywords .keyword {
    display: flex;
    align-items: center;
  }
  .keywords .keyword span {
    width: 70px;
    text-align: center;
  }
  .keywords .keyword .keyword-bar {
    width: 150px;
    height: 25px;
    background-color: var(--theme-black);
    margin-left: 15px;
    color: white;
    font-size: .75rem;
    text-align: right;
    line-height: 25px;
    padding-right: 10px;
  }
</style>