<script setup>
  import { useSearchBar } from '@/composables/searchBar.js';
  import { useAuthStore } from '~~/stores/authorization';
  const { searchTag } = useSearchBar();
  const { baseAPI } = useAuthStore(); 

  const { id, numberOfLike, date, title, tags, imageCloud, keywordWithCount } = defineProps({
    id: {
      type: String,
      default: ''
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
  const toBoardPage = ref('');
  if (id !== '') toBoardPage.value = '/board/'+ id;

  function calculateMaxKeywordCount(keywords) {
    let max = 0;
    for (let i=0; i<keywords.length; i++) {
      if ( keywords[i].count > max ) max = keywords[i].count;
    }
    return max;
  }

  // RWD event
  const switchGraph = ref(false);

</script>

<template>
  <div class="lobby-list-item">
    <div class="decorate-border"></div>
    <NuxtLink :to="toBoardPage" class="board-infos-container">
      <div class="board-title-container" :class="{'show-analyze': !switchGraph}">
        <div class="board-info">
          <img src="/polular-board-fire.png" height="20" alt="">
          <h5>{{ numberOfLike }}</h5>
          <span class="date">#{{ date }}</span>
        </div>
        <h3 class="title-text">{{ title }}</h3>
        <ul class="tags-container">
          <li @click.prevent="searchTag(tag['tag-name'])" class="tag double-solid-border" v-for="tag in tags">
            {{ tag['tag-name'] }}
          </li>
        </ul>
      </div>
      <img :src="`${baseAPI}${imageCloud}`" alt="" height="110" class="image-cloud" :class="{'show': !switchGraph}, {'show-analyze': switchGraph}">
      <div class="keywords" :class="{'show': switchGraph}, {'show-analyze': switchGraph}">
        <div class="keyword" v-for="keywordObject in keywordWithCount.sort().slice(0,3)">
          <span>{{ keywordObject.keyword }}</span>
          <div class="keyword-bar" 
            :data-max-count = "calculateMaxKeywordCount(keywordWithCount)"
            :data-count="keywordObject.count"
          >{{ keywordObject.count }}</div>
        </div>
      </div>
      <div class="switch-button-container" @click.prevent="switchGraph = !switchGraph">
        <img src="/switch.png" alt="" height="16">
      </div>
    </NuxtLink>

    <div class="keywords-container" :class="{'show': toggleGraph}">
      <div class="keywords">
        <div class="keyword" v-for="keywordObject in keywordWithCount.sort().slice(0,3)">
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
      .keywords {
        display: none;
      }
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
      .switch-button-container {
        height: 100%;
        display: none;
        align-items: center;
        padding: 5px;
        position: absolute;
        border-left: 3px solid var(--theme-black);
        top: 0;
        right: 0;
        cursor: pointer;
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
    .decorate-border {
      width: 100%;
      height: 100%;
      border: 3px solid var(--theme-black);
      position: absolute;
      left: 5.5px;
      top: 5px;
      border-radius: 10px;
      display: none;
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
          width: 125px;
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
  }


  @media (max-width: 1350px){
    
  }
  @media (max-width: 1250px) {
    .lobby-list-item {
      width: calc(100% - 5px);
      margin-bottom: 15px;
      .board-infos-container {
        box-shadow: 0px 0px 0px var(--shadow-black);
        padding: 20px 30px;
        padding-right: 100px;
        .switch-button-container {
          display: flex;
        }
        img.image-cloud {
          display: none;
          &.show {
            display: block;
          }
        }
        .keywords {
          height: 110px;
          padding-top: 0;
          margin-right: -15px;
          opacity: 1;
          &.show {
            display: flex;
            z-index: 2;

          }
          .keyword {
            margin: 5px 0;
          }
          .keyword-bar {
            margin-left: 0;
          }
        }
      }
      .keywords-container {
        display: none;
      }
      .decorate-border {
        display: block;
      }
    }
  }
  @media (max-width: 800px) {
    .lobby-list-item {
      width: 100%;
      margin-bottom: 10px;
      .board-infos-container {
        min-height: 130px;
        border-radius: 5px;
        padding: 10px 20px;
        padding-right: 30px;
        img.image-cloud {
          height: 90px;
        }
        .board-title-container, img.image-cloud {
          display: none;
          &.show {
            display: none;
          }
          &.show-analyze {
            display: block;
          }
        }
        .board-title-container {
          .board-info {
            img {
              height: 18px;
              margin-right: 7px;
            }
            h5 {
              margin-right: 10px;
            }
          }
          h3.title-text {
            max-width: 300px;
          }
        }
        .keywords {
          height: 90px;
          display: none;
          margin-right: 30px;
          &.show {
            display: none;
          }
          &.show-analyze {
            display: flex;
          }
          .keyword .keyword-bar {
            &::before {
              display: none;
            }
          }
        }
      }
      .decorate-border {
        display: none;
      }
    }
    .double-solid-border {
      border-radius: 3px !important;
    }
  }
</style>