<script setup>
  const data = defineProps({
    id: {
      type: String,
      default: '00000000-0000-0000-0000-000000000000'
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
        'keyword': 'keyword',
        'count': 0,
      },]
    },
    positions: {
      type: Array[Object],
      defulat: [{
        'position-name': 'position',
        'position-id': 'position-uuid',
        'comments': [
          {
            'comment-id': 'comment-uuid',
            'commented-user-id': 'user-uuid',
            'commented-user-name': 'user name',
            'commented-user-mughead-number': 0,
            'commented-date': 'commented date',
            'is-user-liked': false,
            'is-user-reported': false,
            'number-of-liker': 0,
            'content': 'comments'
          }
        ]
      }]
    },
  });
  
  onMounted(()=> {
    const seachBar = useState('search-bar', ()=> '');
    seachBar.value = '';
  });
</script>

<template>
  <LayoutSearch/>
  <h3 v-if="data.id === '00000000-0000-0000-0000-000000000000'">文章不存在!</h3>
  <div class="container" v-else>
    <BoardInfos 
      :id="data.id"
      :date="data.date"
      :title="data.title"
      :tags="data.tags"
      :sourceLinkList="data.sourceLinkList"
      :isUserCollected="data.isUserCollected"
      :isUserLike="data.isUserLike"
      :numberOfLike="data.numberOfLike"
      :keywordsWithCount="data.keywordsWithCount"
    />
    <BoardAnalysis
      :positions="data.positions"
      :keywordsWithCount="data.keywordsWithCount"
    />
    <BoardPosition 
      :positions="data.positions"
    />
  </div>
</template>

<style lang="scss">
  .container > * {
    margin-bottom: 50px;
  }
  ul {
    &::-webkit-scrollbar {
      width: 13px;
      background-color: var(--theme-white);
      border-left: 2px solid var(--theme-black);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--theme-black);
    }
  }

  @media (max-width: 1350px){

  }
  @media (max-width: 1250px) {
    .container {
      padding-top: 20px;
      > * {
        margin-bottom: 30px;
      }
    }
  }
  @media (max-width: 800px) {
    
  }
</style>