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
  const toggleGraph = ref(false);

  function calculateMaxKeywordCount(keywords) {
    let max = 0;
    for (let i=0; i<keywords.length; i++) {
      if ( keywords[i].count > max ) max = keywords[i].count;
    }
    return max;
  }

</script>

<template>
  <div class="lobby-list-item">
    <NuxtLink :to="'/board/'+id" class="board-infos-container">
      <div class="board-title-container">
        <div class="board-info">
          <img src="/polular-board-fire.png" height="20" alt="">
          <h5>{{ numberOfLike }}</h5>
          <span class="date">#{{ date }}</span>
        </div>
        <h3 class="title-text">{{ title }}</h3>
        <ul class="tags-container">
          <li @click.prevent="searchTag(tag)" class="tag double-solid-border" v-for="tag in tags">
            {{ tag }}
          </li>
        </ul>
      </div>
      <img class="image-cloud" :src="imageCloud" alt="">
    </NuxtLink>

    <div class="keywords-container" :class="{'show': toggleGraph}">
      <div class="keywords">
        <div class="keyword" v-for="keywordObject in keywordWithCount">
          <span>{{ keywordObject.keyword }}</span>
          <div class="keyword-bar" 
            :data-max-count = "calculateMaxKeywordCount(keywordWithCount)"
            :data-count="keywordObject.count"
          >{{ keywordObject.count }}</div>
        </div>
      </div>
      <div class="img-container" @click.prevent="toggleGraph = !toggleGraph">
        <img src="/arrow.png" alt="" height="16">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .lobby-list-item {
    width: 700px;
    margin-bottom: 15px;
    .board-infos-container {
      width: 100%;
      height: 100%;
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 5px 0px 10px var(--shadow-black);
      background-color: var(--theme-white);
      border-radius: 10px;
      border: 3px solid var(--theme-black);
      cursor: default;
      .board-title-container {
        .board-info {
          display: flex;
          align-items: center;
          font-size: 1.2rem;
          > * {
            margin-right: 15px;
          }
          span.date {
            margin-left: 10px;
            margin-right: 0;
            font-size: .8rem;
            opacity: 0.7;
            text-decoration: underline;
          }
        }
        h3.title-text {
          max-width: 450px;
          margin: 10px 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .tags-container {
          display: flex;
          .tag {
            --border-offset: 2px;
            --border-minus-offset: -3px;
            --border-hover-translate: 5px;
            padding: 2px 10px;
            margin-right: 10px;
            border: 2px solid var(--theme-black);
            border-radius: 5px;
            font-size: .95rem;
            cursor: pointer;
          }
        }
      }
      .image-cloud {
        height: 110px;
      }
    }
    
    .keywords-container {
      position: absolute;
      left: 0;
      top: 0;
      width: 720px;
      height: 100%;
      padding-top: 4px;
      padding-left: 5px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      transition: width .5s;
      pointer-events: none;
      &::before {
        content: '';
        display: block;
        width: 100%;
        height: calc(100% + 3px);
        border-radius: 10px;
        border: 3px solid var(--theme-black);
        position: absolute;
        left: 5px;
        top: 3px;
        z-index: -1;
      }
      .keywords {
        padding-top: 5px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 10px;
        user-select: none;
        z-index: -1;
        opacity: 0;
        transition: opacity .1s;
        .keyword {
          display: flex;
          align-items: center;
          margin: 10px 0;
          span {
            font-size: 1rem;
            width: 70px;
            text-align: center;
          }
          .keyword-bar {
            width: 125;
            height: 22px;
            background-color: var(--theme-black);
            margin-left: 15px;
            color: white;
            font-size: .75rem;
            text-align: right;
            line-height: 22px;
            padding-right: 10px;
          }
          .keyword-bar::before {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: -1;
            top: 5px;
            left: 6px;
            border: 3px solid var(--theme-black);
          }
        }
      }
      .img-container {
        height: 100%;
        padding-right: 2px;
        padding-left: 8px;
        display: flex;
        align-items: center;
        z-index: 1;
        cursor: pointer;
        user-select: none;
        pointer-events: all;
      }
      &.show {
        width: 950px;
        .keywords {
          opacity: 1;
          transition: opacity .5s .3s;
        }
        .img-container img {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>