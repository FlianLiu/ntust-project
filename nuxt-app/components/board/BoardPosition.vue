<script setup>
  import { useSearchBar } from '@/composables/searchBar.js';
  import { useAuthStore } from '~~/stores/authorization';

  const { searchTag } = useSearchBar();
  const { baseAPI, userToken, userId, userName } = useAuthStore();

  const { positions } = defineProps({
    positions: {
      type: Array[Object],
      default: [{
        'position-name': '',
        'position-id': '',
        'position-count': 0,
        'comments': [
          {
            'comment-id': '',
            'commented-user-id': '',
            'commented-user-name': '',
            'commented-user-headshot-number': 0,
            'commented-date': '',
            'is-user-liked': false,
            'is-user-reported': false,
            'number-of-liker': 0,
            'content': ''
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
  const fetchData = inject('fetchData');
  async function submitComment() {
    if (userCommented.value === '') {
      window.alert('請先輸入留言內容後，再按送出按鈕!');
      return
    }
    if (userId === '') {
      window.alert('登入後才能留言哦!');
      return
    }
    await useFetch(`${baseAPI}/board/post-comment`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "user-id": userId,
        "user-name": userName
      },
      body: {
        "post-position-id": positions[selectedPostion.value]['position-id'],
        "comment":{
            "commented-user-id": userId,
            "content": userCommented.value
        }
      }
    });
    userCommented.value = '';
    fetchData();
    window.alert('已送出留言!');
  }

  const likeCommentTrigger = inject('likeComment');
  function likeComment(index, commentId) {
    if (userId === '') {
      window.alert('登入後才能按讚留言哦!');
      return
    }
    likeCommentTrigger(index, commentId, selectedPostion.value);
  }

  function reportComment() {
    window.alert('此功能暫未開放!')
  }

</script>

<template>
  <div class="position-container">
    <div class="position-bar">
      <div class="position" v-for="(position, index) in positions" @click="selectedPostion = index" 
        :class="[selectedPostion == index? 'active':'']">
        <h4>{{ position['position-name'] }}</h4>
      </div>
      <div class="options-container">
        <label for="position">
          <h3>選擇立場: </h3>
        </label>
        <select name="" id="position" v-model="selectedPostion">
          <option v-for="(position, index) in positions" :value="index">{{ position['position-name'] }}</option>
        </select>
        <a class="leave-commnet-container" href="#leave-comment-container">
          <img src="/click.png" height="16" alt="">
          <h4>留下您的想法吧!</h4>
        </a>
      </div>
    </div>
    
    <div class="comment-container">
      <div class="comments">
        <ul :class="{'isNull': positions[selectedPostion].comments.length === 0}">
          <li v-if="positions[selectedPostion].comments.length === 0" class="isNull"><h3>當第一位留言者吧!</h3></li>
          <li class="comment" v-for="(commentObject ,index) in positions[selectedPostion].comments">
            <img class="headshot" src="/rabbit-1.png" alt="" height="50">
            <div>
              <h5 class="date"># {{ commentObject['commented-date'] }}</h5>
              <div>
                <h4>{{ commentObject['commented-user-name'] }}</h4>
                <div class="like-container" @click="likeComment(index, commentObject['comment-id'])">
                  <img src="/like-true.png" height="16" v-show="commentObject['is-user-liked']" alt="">
                  <img src="/like-false.png" height="16" v-show="!commentObject['is-user-liked']" alt="">
                  <h5>{{ commentObject['number-of-like'] }}</h5>
                </div>
              </div>
              <p>{{ commentObject.content }}</p>
            </div>
            <img class="report" src="/report.png" alt="" height="24" @click="reportComment">
          </li>
        </ul>
      </div>
      <div class="leave-comment-container" id="leave-comment-container">
        <div class="leave-comment">
          <div class="leave-comment-title">
            <h3>留下您的想法吧！</h3>
            <span>in {{ positions[selectedPostion]['position-name'] }}</span>
          </div>
          <div class="leave-comment-input-container">
            <img src="/rabbit-1.png" height="50" alt="">
            <div class="input-container">
              <textarea type="text" placeholder="請輸入留言內容..." v-model="userCommented" rows="1"></textarea>
            </div>
            <div class="submit-button double-solid-border" @click="submitComment">
              <h4>送出</h4>
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

<style scoped lang="scss">
  .position-container {
    width: 100%;
    .position-bar {
      display: flex;
      border-bottom: 3px solid var(--theme-black);
      overflow: hidden;
      padding-left: 1px;
      margin-bottom: 20px;
      .position {
        padding: 10px 30px;
        border: 3px solid var(--theme-black);
        border-radius: 5px 5px 0 0;
        transform: translateY(10px);
        margin: 0 -1px;
        margin-bottom: -4px;
        padding-bottom: 10px;
        cursor: pointer;
        user-select: none;
        h4 {
          transform: translateY(-5px);
        }
        &.active {
          transform: translateY(0px);
          h4 {
            transform: translateY(0px);
          }
        }
      }
      .options-container {
        width: 100%;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 7px;
        padding-left: 10px;
        display: none;
        label {
          margin-right: 15px;
          h3 {
            font-size: 1.25rem;
          }
        }
        select {
          border: 2px solid var(--theme-black);
          outline: none;
          &:focus-visible {
            outline: none;
          }
        }
        .leave-commnet-container {
          display: flex;
          position: absolute;
          right: 0;
          cursor: pointer;
          img {
            margin-right: 5px;
          }
        }
      }

    }
    .comment-container {
      width: 100%;
      height: 445px;
      display: flex;
      justify-content: space-between;
      .comments {
        width: 660px;
        height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          width: 13px;
          background-color: var(--theme-white);
          border: 2px solid var(--theme-black);
        }
        &::-webkit-scrollbar-thumb {
          background-color: var(--theme-black);
        }
        ul {
          width: 100%;
          display: flex;
          flex-direction: column;
          padding-right: 15px;
          &.isNull {
            height: 100%;
            justify-content: center;
            li.isNull {
              transform: translateY(-5px);
              h3 {       
                text-align: center; 
                font-size: 1.25rem;
              }
            }
          }
          li.comment {
            display: flex;
            border: 3px solid var(--theme-black);
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 10px;
            background-color: var(--theme-white);
            &:last-child {
              margin-bottom: 0;
            }
            &::before {
              content: '';
              display: block;
              position: absolute;
              left: 5px;
              top: 5px;
              z-index: -1;
              width: calc(100% + 3px);
              height: calc(100% + 3px);
              border: 3px solid var(--theme-black);
              border-radius: 5px;
            }
            img.report {
              position: absolute;
              top: 10px;
              right: 10px;
              cursor: pointer;
            }
            .headshot {
              margin: 5px;
            }
            > div {
              margin-right: 30px;
              margin-left: 15px;
              > * {
                margin-bottom: 3px;
              }
              h5.date {
                font-size: .8rem;
                opacity: 0.7;
                letter-spacing: 0.5px;
              }
              p {
                max-width: 400px;
              }
              > div {
                display: flex;
                align-items: center;
                h4 {
                  margin-right: 30px;
                }
                .like-container {
                  display: flex;
                  align-items: center;
                  cursor: pointer;
                  img {
                    margin-right: 5px;
                    margin-top: 2px;
                    cursor: pointer;
                  }
                }
              }
              p {
                font-size: .9rem;
              }
            }

          }
        }
      }
      .leave-comment-container {
        width: 630px;
        padding-left: 20px;
        h3 {
          font-size: 1.25rem;
          letter-spacing: 1px;
          margin-right: 30px;
        }
        .leave-comment {
          margin-bottom: 30px;
          div {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            span {
              font-size: .9rem;
              padding-top: 3px;
            }
          }
          .leave-comment-title {
            margin-bottom: 15px;
          }
          .leave-comment-input-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 3px solid var(--theme-black);
            border-radius: 5px;
            padding: 15px 20px;
            background-color: var(--theme-white);
            &::before {
              content: '';
              display: block;
              position: absolute;
              left: 5px;
              top: 5px;
              z-index: -1;
              width: calc(100% + 3px);
              height: calc(100% + 3px);
              border: 3px solid var(--theme-black);
              border-radius: 5px;
            }
            .input-container {
              textarea {
                width: 350px;
                border: none;
                border-bottom: 3px solid var(--theme-black);
                font-size: 1rem;
                line-height: 1.5rem;
                resize: none;
                padding-left: 5px;
                &::-webkit-scrollbar {
                  display: none;
                }
                &:focus {
                  outline: none;
                }
              }
            }
            .submit-button {
              --border-offset: 3px;
              --border-minus-offset: -3px;
              --border-hover-translate: 6px;
              padding: 5px 20px;
              border: 3px solid var(--theme-black);
              border-radius: 5px;
              cursor: pointer;
              h4 {
                margin-right: 10px;
              }
            }
          }
        }
        .suggest-boards {
          > h3 {
            margin-bottom: 15px;
          }
          > ul {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: space-around;
            padding-left: 15px;
            border-left: 2px dotted var(--theme-black);
            a > li {
              margin: 6px 0;
              .infos {
                display: flex;
                align-items: center;
                ul {
                  display: flex;
                  margin-left: 30px;
                  li {
                    margin-right: 10px;
                    
                  }
                }
              }
            }
            li h3 {
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }

  @media (max-width: 1350px){

  }
  @media (max-width: 1250px) {
    .position-container {
      .comment-container {
        height: auto;
        flex-direction: column;
        .comments {
          height: 500px;
          width: 100%;
          margin-bottom: 50px;
          ul li.comment {
            &::before {
              width: calc(100% + 3.5px);
              height: calc(100% + 3.5px);
              left: 3px;
              top: 3px;
            }
            div {
              h4 {
                font-size: 1.2rem;
              }
              p {
                max-width: 600px;
                font-size: 1rem;
              }
            }
          }
        }
        .leave-comment-container {
          width: 100%;
          padding-left: 0;
          .leave-comment {
            margin-bottom: 40px;
            .leave-comment-input-container .input-container {
              textarea {
                width: 500px;
                padding-bottom: 2px;
              }
            }
          }
          .suggest-boards {
            > h3 {
              margin-bottom: 10px;
            }
          }
        }
      }
    }
  }
  @media (max-width: 800px) {
    .position-container {
      .position-bar {
        border-bottom: 3px dashed var(--theme-black);
        .position {
          display: none;
        }
        .options-container {
          display: flex;
        }
      }
      .comment-container {
        .comments {
          height: 450px;
          margin-bottom: 30px;
          ul li.comment {
            &::before {
              border: none;
            }
            div {
              p {
                max-width: 240px;
              }
            }
          }
        }
        .leave-comment-container {
          .leave-comment {
            margin-bottom: 30px;
            .leave-comment-title {
              margin-bottom: 10px;
            }
            .leave-comment-input-container {
              padding: 15px;
              &::before {
                display: none;
              }
              > img {
                height: 40px;
              }
              .input-container {
                textarea {
                  width: 250px;
                  padding: 0;
                  border: none;
                  font-size: 1.05rem;
                }
              }
              .submit-button {
                border: none;
                padding: 0;
                h4 {
                  display: none;
                }
              }
            }
          }
          .suggest-boards {
            ul {
              padding-left: 10px;
            }
          }
        }
      }
    }
  }
</style>