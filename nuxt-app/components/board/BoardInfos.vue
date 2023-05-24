<script setup>
  import VueWordCloud from 'vuewordcloud';
  import { useSearchBar } from '@/composables/searchBar.js';
  import { useAuthStore } from '~~/stores/authorization';
  import { useCollectedBoard } from '~~/composables/userCollectedBoard';

  const { searchTag } = useSearchBar();
  const { baseAPI, userToken, userId } = useAuthStore();
  const data = defineProps({
    id: {
      type: String,
      default: 'board-id'
    },
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
    },
    keywordsWithCount: {
      type: Array[Object],
      default: [{
        'keyword': '',
        'count': 0,
      },]
    },
  });
  
  const convertedDate = computed(()=> {
    const dt = new Date(data.date);
    return dt.toLocaleDateString();
  })

  const isUserLike = ref(data.isUserLike);
  const likeCount = ref(data.numberOfLike);
  async function userLikeBoard() {
    if (userId == '') {
      window.alert('無效操作,請先登入!');
      return
    }
    isUserLike.value = !isUserLike.value;
    const offset = data.isUserLike? -1: 0;
    const base = data.numberOfLike + offset;
    const delta = isUserLike.value? 1: 0;
    likeCount.value = base + delta;
    await useFetch(`${baseAPI}/board/post-like-board`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "user-id": userId
      },
      body: {
        "board-id": data.id,
        "is-like": isUserLike.value
      }
    });
  }

  const isUserCollected = ref(data.isUserCollected);
  async function userCollectBoard() {
    if (userId == '') {
      window.alert('無效操作,請先登入!');
      return
    }
    isUserCollected.value = !isUserCollected.value;
    useCollectedBoard(data.id, isUserCollected.value, data.title);
  }

  const isShowLink = ref(false);

  function sortWithCount(keywords) {
    return keywords.sort((a, b)=> b.count - a.count);
  }
  const imageWordCloud = sortWithCount(data.keywordsWithCount).map((el)=> {
    return [ el.keyword, el.count ];
  });
</script>

<template>
  <div class="board-infos-container">
    <h5 class="date"># {{ convertedDate }}</h5>
    <h1>{{ data.title }}</h1>
    <ul class="tags">
      <li v-for="tag in data.tags" @click="searchTag(tag['tag-name'])" class="tag double-solid-border">{{ tag['tag-name'] }}</li>
    </ul>
    <div class="links-container">
      <div class="link-title" @click="isShowLink = !isShowLink">
        <span>查看原文鏈結清單</span>
        <img src="/arrow.png" v-if="!isShowLink" alt="" height="12">
        <img src="/arrow-down.png" v-if="isShowLink" alt="" height="12">
      </div>
      <ul class="links" :class="{'show': isShowLink}">
        <li class="link" v-for="(link, index) in data.sourceLinkList" :style="'--delay: '+index*0.1+'s'">
          <a :href="link['ref-article-link-in-other-website']">
            <span>{{ link['ref-article-title-in-other-website'] }}:</span>{{ link['ref-article-link-in-other-website'] }}
          </a>
        </li>
      </ul>
    </div>
    <div class="user-controls">
      <div class="like-container" @click="userLikeBoard">
        <img src="/like-true.png" height="24" alt="" v-show="isUserLike">
        <img src="/like-false.png" height="24" alt="" v-show="!isUserLike">
        <h5>{{ likeCount }}</h5>
      </div>
      <div class="collect-container" @click="userCollectBoard">
        <img src="/collect-true.png" height="24" alt="" v-show="isUserCollected">
        <img src="/collect-false.png" height="24" alt="" v-show="!isUserCollected">
      </div>
      <img src="/share.png" height="24" alt="">
    </div>
    <vue-word-cloud
        class="image-cloud"
        style="height: 150px; width: 150px;"
        :words="imageWordCloud.slice(0,17)"
        color="#333333"
        :animation-duration="0"
        :spacing="0.2"
      />
  </div>
</template>

<style scoped lang="scss">
  .board-infos-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > * {
      margin-bottom: 15px;
    }
    h5.date {
      font-size: .8rem;
      opacity: 0.7;
      text-decoration: underline;
    }
    h1 {
      font-size: 2.25rem;
    }
    ul.tags {
      display: flex;
      li.tag {
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
    .links-container {
      .link-title {
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        span {
          margin-right: 15px;
        }
      }
      ul.links {
        height: 0;
        padding-left: 15px;
        margin-left: 3px;
        border-left: 2px dotted var(--theme-black);
        overflow: hidden;
        li {
          margin: 5px 0;
          letter-spacing: 0.5px;
          &::after {
            content: '';
            display: block;
            width: 100%;
            height: 100%;
            background-color: var(--theme-white);
            position: absolute;
            top: 0;
            right: 0;
          }
          span {
            margin-right: 10px;
          }
        }
        &.show {
          height: auto;
          li {
            &::after {
              width: 0%;
              transition: width .25s var(--delay);
            }
          }
        }
      }
    }
    .user-controls {
      display: flex;
      align-items: center;
      margin-bottom: 0;
      > * {
        margin-right: 15px;
        cursor: pointer;
      }
      .like-container, .collect-container {
        display: flex;
        align-items: center;
        user-select: none;
      }
      .like-container img {
        margin-top: 3px;
        margin-right: 7px;
      }
    }
    .image-cloud {
      display: none;
      position: absolute !important;
      right: 50px;
      top: 30px;
    }
  }


  @media (max-width: 1350px){

  }
  @media (max-width: 1250px) {
    .board-infos-container {
      margin-bottom: 30px;
      > * {
        max-width: 500px;
      }
      .image-cloud {
        top: 20px;
        display: block;
      }
    }
  }
  @media (max-width: 800px) {
    .board-infos-container {
      > * {
        max-width: 225px;
        margin-bottom: 10px;
      }
      h1 {
        font-size: 1.75rem;
      }
      .links-container {
        max-width: 100%;
        .link-title {
          margin-bottom: 5px;
        }
        ul.links {
          padding-left: 10px;
          li {
            &:first-child {
              margin-top: 0;
            }
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
      .user-controls {
        margin-bottom: 0;
        img {
          height: 20px;
        }
      }
      .image-cloud {
        max-height: 120px;
        max-width: 120px;
        top: 0;
        right: 0;
        margin-bottom: 0;
      }
    }
  }
</style>