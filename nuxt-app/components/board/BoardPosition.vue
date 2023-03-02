<script setup>
  import { useSearchBar } from '@/composables/searchBar.js';
  const { searchTag } = useSearchBar();
  const data = defineProps({
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
            'commented-user-headshot-number': 0,
            'commented-date': 'commented date',
            'is-user-liked': false,
            'is-user-reported': false,
            'number-of-liker': 0,
            'content': 'comments'
          }
        ]
      }]
    }
  });
  const suggestBoards = reactive({
    'data': [
      {
        'board-id': 'board-id-1',
        'number-of-like': 573,
        'date': '2022-10-27',
        'title': '早餐應該要吃中式還是西式?',
        'tags': ['早餐', '中式', '西式',],
        'image-cloud': '/image-cloud.png',
        'keyworks-with-count': [
          {
            'keyword': '蛋餅',
            'count': 58,
          },
          {
            'keyword': '漢堡',
            'count': 52,
          },
          {
            'keyword': '饅頭',
            'count': 47,
          },
        ]
      },{
        'board-id': 'board-id-2',
        'number-of-like': 489,
        'date': '2022-11-12',
        'title': '今年天氣是不是比較冷啊?',
        'tags': ['氣候', '全球暖化'],
        'image-cloud': '/image-cloud.png',
        'keyworks-with-count': [
          {
            'keyword': '好冷',
            'count': 75,
          },
          {
            'keyword': '電暖器',
            'count': 57,
          },
          {
            'keyword': '冰棒',
            'count': 32,
          },
        ]
      },{
        'board-id': 'board-id-3',
        'number-of-like': 315,
        'date': '2022-12-25',
        'title': '聖誕節還是一個人過該怎麼辦?',
        'tags': ['魯蛇', '聖誕節', '伴侶', '女朋友'],
        'image-cloud': '/image-cloud.png',
        'keyworks-with-count': [
          {
            'keyword': '魯蛇',
            'count': 87,
          },
          {
            'keyword': '笑死',
            'count': 45,
          },
          {
            'keyword': '可悲',
            'count': 32,
          },
        ]
      },{
        'board-id': 'board-id-4',
        'number-of-like': 279,
        'date': '2023-1-1',
        'title': '今年的元旦依舊在家睡到飽，真的有人會去參加元旦升旗典禮嗎?',
        'tags': ['升旗', '元旦', '睡飽', '跨年'],
        'image-cloud': '/image-cloud.png',
        'keyworks-with-count': [
          {
            'keyword': '升旗',
            'count': 87,
          },
          {
            'keyword': '元旦',
            'count': 45,
          },
          {
            'keyword': '睡飽',
            'count': 32,
          },
          {
            'keyword': '跨年',
            'count': 25,
          },
        ]
      }
    ]
  });

  const selectedPostion = ref(0);
  const userCommented = ref('')
</script>

<template>
  <div class="position-container">
    <div class="position-bar">
      <div class="position" v-for="(position, index) in data.positions" @click="selectedPostion = index" 
          :class="[selectedPostion == index? 'active':'']">
        <h4>{{ position['position-name'] }}</h4>
      </div>
    </div>
    <div class="comment-container">
      <div class="comments">
        <ul>
          <li class="comment" v-for="commentObject in data.positions[selectedPostion].comments">
            <img class="headshot" src="/rabbit-1.png" alt="" height="50">
            <div>
              <h5 class="date"># {{ commentObject['commented-date'] }}</h5>
              <div>
                <h4>{{ commentObject['commented-user-name'] }}</h4>
                <div class="like-container">
                  <img src="/like-true.png" height="16" v-show="commentObject['is-user-liked']" alt="">
                  <img src="/like-false.png" height="16" v-show="!commentObject['is-user-liked']" alt="">
                  <h5>{{ commentObject['number-of-like'] }}</h5>
                </div>
              </div>
              <p>{{ commentObject.content }}</p>
            </div>
            <img class="report" src="/report.png" alt="" height="24">
          </li>
        </ul>
      </div>
      <div class="leave-comment-container">
        <div class="leave-comment">
          <div>
            <h3>留下您的想法吧！</h3>
            <span>in {{ data.positions[selectedPostion]['position-name'] }}</span>
          </div>
          <div class="leave-comment-input-container">
            <img src="/rabbit-1.png" height="50" alt="">
            <div class="input-container">
              <input type="text" placeholder="請輸入留言內容..." v-model="userCommented">
              <img src="/send.png" height="24" alt="">
            </div>
          </div>
        </div>
        <div class="suggest-boards">
          <h3>更多類似看板：</h3>
          <ul>
            <template v-for="(board, index) in suggestBoards.data" >
              <NuxtLink :to="'/board/'+ board['board-id']" v-if="index <= 3">
                <li>
                  <div class="infos">
                    <h5 class="date">{{ board.date }}</h5>
                    <ul>
                      <li v-for="tag in board.tags" @click.prevent="searchTag(tag)">#{{ tag }}</li>
                    </ul>
                  </div>
                  <h3 class="title">{{ board.title }}</h3>
                </li>
              </NuxtLink>
            </template>
          </ul>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
  .position-container {
    width: 100%;
  }
  .position-bar {
    display: flex;
    border-bottom: 3px solid var(--theme-black);
    overflow: hidden;
    padding-left: 1px;
    margin-bottom: 20px;
  }
  .position-bar .position {
    padding: 10px 30px;
    border: 3px solid var(--theme-black);
    border-radius: 5px 5px 0 0;
    transform: translateY(10px);
    margin: 0 -1px;
    margin-bottom: -4px;
    padding-bottom: 10px;
    cursor: pointer;
    user-select: none;
  }
  .position-bar .position h4 {
    transform: translateY(-5px);
  }
  .position-bar .position.active {
    transform: translateY(0px);
  }
  .position-bar .position.active h4 {
    transform: translateY(0px);
  }

  .comment-container {
    width: 100%;
    height: 440px;
    display: flex;
    justify-content: space-between;
  }
  .comment-container .comments {
    width: 615px;
    height: 100%;
    overflow-y: scroll;
  }
  .comment-container .comments::-webkit-scrollbar {
    width: 13px;
    background-color: var(--theme-white);
    border: 2px solid var(--theme-black);
  }
  .comment-container .comments::-webkit-scrollbar-thumb {
    background-color: var(--theme-black);
  }
  .comment-container .comments ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-right: 15px;
  }
  .comment-container .comments ul li.comment {
    display: flex;
    justify-content: space-between;
    border: 3px solid var(--theme-black);
    border-radius: 5px;
    padding: 15px;
    margin-bottom: 10px;
  }
  .comment-container .comments ul li.comment img.report {
    cursor: pointer;
  }
  .comment-container .comments ul li.comment:last-child {
    margin-bottom: 0;
  }
  .comment-container .comments ul li.comment .headshot {
    margin: 5px;
  }
  .comment-container .comments ul li.comment > div {
    margin-right: 30px;
    margin-left: 15px;
  }
  .comment-container .comments ul li.comment > div > * {
    margin-bottom: 3px;
  }
  .comment-container .comments ul li.comment > div h5.date {
    font-size: .8rem;
    opacity: 0.7;
    letter-spacing: 0.5px;
  }
  .comment-container .comments ul li.comment > div > div {
    display: flex;
    align-items: center;
  }
  .comment-container .comments ul li.comment > div > div h4 {
    margin-right: 30px;
  }
  .comment-container .comments ul li.comment > div > div .like-container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .comment-container .comments ul li.comment > div > div .like-container img {
    margin-right: 5px;
    margin-top: 2px;
    cursor: pointer;
  }
  .comment-container .comments ul li.comment > div p {
    font-size: .9rem;
  }
  .comment-container .comments ul li.comment img.report {
    margin-top: -5px;
    margin-right: -5px;
  }

  .comment-container .leave-comment-container {
    width: 585px;
    padding-left: 20px;
  }
  .comment-container .leave-comment-container h3 {
    font-size: 1.25rem;
    letter-spacing: 1px;
    margin-right: 30px;
  }
  .comment-container .leave-comment-container .leave-comment {
    margin-bottom: 30px;
  }
  .comment-container .leave-comment-container .leave-comment div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 15px;
  }
  .comment-container .leave-comment-container .leave-comment div span {
    font-size: .9rem;
    padding-top: 3px;
  }
  .comment-container .leave-comment-container .leave-comment .leave-comment-input-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 3px solid var(--theme-black);
    border-radius: 5px;
    padding: 15px;
    padding-right: 30px;
  }
  .comment-container .leave-comment-container .leave-comment .leave-comment-input-container .input-container {
    width: 440px;
    border-bottom: 3px solid var(--theme-black);
    padding-bottom: 2px;
    margin-bottom: -3px;
  }
  .comment-container .leave-comment-container .leave-comment .leave-comment-input-container .input-container img {
    cursor: pointer;
  }
  .comment-container .leave-comment-container .leave-comment .leave-comment-input-container .input-container input {
    margin-left: 5px;
    line-height: 1.2rem;
    padding-top: 2px;
    font-size: 1rem;
    width: 100%;
    border: none;
    background-color: var(--theme-white);
  }
  .comment-container .leave-comment-container .leave-comment .leave-comment-input-container .input-container input:focus {
    outline: none;
  }
  .comment-container .suggest-boards > h3 {
    margin-bottom: 15px;
  }
  .comment-container .suggest-boards > ul {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding-left: 15px;
    padding-bottom: 15px;
    border-left: 2px dotted var(--theme-black);
  }
  .comment-container .suggest-boards > ul a > li {
    margin: 4.5px 0;
  }
  .comment-container .suggest-boards > ul li .infos {
    display: flex;
    align-items: center;
  }
  .comment-container .suggest-boards > ul li .infos ul {
    display: flex;
    margin-left: 30px;
  }
  .comment-container .suggest-boards > ul li .infos ul li {
    margin-right: 10px;
  }
  .comment-container .suggest-boards > ul li h3 {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

</style>