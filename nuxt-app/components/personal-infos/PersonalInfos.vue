<script setup>
  import { useAuthStore } from '@/stores/authorization';
  import { useCollectedBoard } from '~~/composables/userCollectedBoard';
  import { useSupportedBoard } from '~~/composables/userSupportedBoard';
  const { userHeadShotNumber, userName, userEmail } = useAuthStore();
  const { userEstablishedDate, personalOperateHistory, collectedBoards, supportedSigningBoards } = defineProps({
    userEstablishedDate: {
      type: String,
      default: 'yyyy/mm/dd'
    },
    personalOperateHistory: {
      type: Object,
      default: {
        "number-of-received-likes": 0,
        "number-of-released-comments": 0,
        "number-of-collect-boards": 0,
        "number-of-like-boards": 0,
        "number-of-like-comments": 0,
        "number-of-launch-petition-boards": 0,
        "number-of-support-signing-boards": 0
      }
    },
    collectedBoards: {
      type: Array[Object],
      default: [{
        "board-id": '',
        "board-title": ''
      }]
    },
    supportedSigningBoards: {
      type: Array[Object],
      default: [{
        "signing-board-id": '',
        "board-title": '',
        "number-of-signers": 1,
        "user-is-supported": true,
      }]
    }
  });
  
  const collectedBoardsList = reactive({});
  const collectedBoardsDelta = ref(0);
  async function collectBoard(boardId, boardTitle) {
    if (collectedBoardsList[boardId] === undefined) {
      collectedBoardsList[boardId] = true;
    }
    collectedBoardsList[boardId] = !collectedBoardsList[boardId]
    collectedBoardsDelta.value += collectedBoardsList[boardId]? 1: -1;
    useCollectedBoard(boardId, collectedBoardsList[boardId], boardTitle);
  }

  const setUserSupported = inject('setUserSupported');
  function buttonActiveEvent(index, boardId) {
    setUserSupported(index, false);
    useSupportedBoard(boardId, false);
  }
  provide('buttonInactiveEvent', buttonInactiveEvent);
  function buttonInactiveEvent(index, boardId) {
    setUserSupported(index, true);
    useSupportedBoard(boardId, true);
  }
  provide('buttonActiveEvent', buttonActiveEvent);
  provide('buttonInactiveEvent', buttonInactiveEvent);


  // RWD event
  const personalInfoState = ref(true);
  const relativeBoardState = ref(true);
</script>

<template>
  <LayoutSearch :showLogoutBtn="true"/>
  <div class="container">
    <div class="user-infos-container">
      <div class="user-personal-infos" :class="{'show': personalInfoState}">
        <img :src="'/rabbit-'+userHeadShotNumber+'.png'" alt="" height="100" class="head-shot">
        <div>
          <h2>{{ userName }}</h2>
          <h4>{{ userEmail }}</h4>
          <h4>{{ userEstablishedDate }} ~</h4>
        </div>
      </div>
      <div class="user-operated-infos" :class="{'show': !personalInfoState}">
        <ul>
          <li>
            <h4>留言收到的讚數</h4>
            <div class="infos-list-container">
              <h3>{{ personalOperateHistory['number-of-received-likes'] }}</h3>
            </div>
          </li>
          <li>
            <h4>發表的留言數</h4>
            <div class="infos-list-container">
              <h3>{{ personalOperateHistory['number-of-released-comments'] }}</h3>
            </div>
          </li>
          <li>
            <h4>收藏的看板數</h4>
            
            <div class="infos-list-container">
              <h3>{{ personalOperateHistory['number-of-collect-boards'] + collectedBoardsDelta }}</h3>
            </div>
          </li>
          <li>
            <h4>按讚的留言數</h4>
            
            <div class="infos-list-container">
              <h3>{{ personalOperateHistory['number-of-like-comments'] }}</h3>
            </div>
          </li>
          <li>
            <h4>發起連署次數</h4>
            
            <div class="infos-list-container">
              <h3>{{ personalOperateHistory['number-of-launch-petition-boards'] }}</h3>
            </div>
          </li>
          <li>
            <h4>連署投票次數</h4>
            
            <div class="infos-list-container">
              <h3>{{ personalOperateHistory['number-of-support-signing-boards'] }}</h3>
            </div>
          </li>
        </ul>
      </div>
      <img src="/arrow-down.png" alt="" height="16" class="switch-button top" :class="{'show': !personalInfoState}" 
        @click="personalInfoState = !personalInfoState">
      <img src="/arrow-down.png" alt="" height="16" class="switch-button bottom" :class="{'show': personalInfoState}"
        @click="personalInfoState = !personalInfoState">
    </div>
    <div class="relative-board-container">
      <div class="options-container">
        <h3 @click="relativeBoardState = true" :class="{'show': relativeBoardState}">蒐藏的看板</h3>
        <h3 @click="relativeBoardState = false" :class="{'show': !relativeBoardState}">參與的連署</h3>
      </div>
      <PetitionList listTitle="您蒐藏的看板：" :linkToBoard="true" :list="collectedBoards" :titleMaxLine="2"
        :listBorder="false" :containerBorder="true" :class="{'show': relativeBoardState}">
        <template #icon="{ boardId, boardTitle }">
          <img src="/collect-true.png" alt="" height="28" v-if="collectedBoardsList[boardId] === undefined || collectedBoardsList[boardId] === true"  @click="collectBoard(boardId, boardTitle)">
          <img src="/collect-false.png" alt="" height="28" v-else @click="collectBoard(boardId, boardTitle)">
        </template>
        <template #title="{ title }">
          <h4 class="title">{{ title }}</h4>
        </template>
        <template #buttonInactive>
          <h4 class="board-button">前往看板</h4>
          <img src="/send.png" height="28" alt="">
        </template>
      </PetitionList>
      <div class="spacing"></div>
      <PetitionList listTitle="您參與的連署：" :linkToBoard="true" :titleMaxLine="2" :list="supportedSigningBoards"
        :listBorder="false" :containerBorder="true" :class="{'show': !relativeBoardState}">
        <template #icon="{ numberOfSigners }">
          <div class="icon">
            <h4>{{ numberOfSigners }}/30</h4>
          </div>
        </template>
        <template #title="{ title }">
          <h4>{{ title }}</h4>
        </template>
        <template #buttonActive>
          <h4 class="board-button">已參與連署</h4>
          <img src="/signing-true.png" height="28" alt="">
        </template>
        <template #buttonCanceled>
          <h4 class="board-button">支持連署</h4>
          <img src="/signing-false.png" height="28" alt="">
        </template>
        <template #buttonInactive>
          <h4 class="board-button">前往看板</h4>
          <img src="/send.png" height="28" alt="">
        </template>
      </PetitionList>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    flex-direction: column;
    h3 {
      font-size: 1.25rem;
      letter-spacing: 0.5px;
    }
    .icon {
      width: 50px;
      text-align: center;
      margin-left: 10px;
    }
    > * {
      width: 100%;
      display: flex;
    }
    .user-infos-container {
      border: 3px solid var(--theme-black);
      border-radius: 7px;
      padding: 40px 80px;
      background-color: var(--theme-white);
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 5px;
        top: 5px;
        z-index: -10;
        width: calc(100% + 3px);
        height: calc(100% + 3px);
        border: 3px solid var(--theme-black);
        border-radius: 7px;
      }
      .switch-button {
        display: none;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
      h2 {
        font-size: 1.75rem;
      }
      h3 {
        font-size: 1.4rem;
      }
      h4 {
        font-size: 1.1rem;
      }
      .user-personal-infos {
        width: 50%;
        display: flex;
        align-items: center;
        padding-left: 20px;
        img {
          margin-right: 50px;
        }
        div > * {
          letter-spacing: 0.5px;
          margin: 5px 0;
        }
      }
      .user-operated-infos {
        width: 50%;
        ul {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 10px 20px;
            h4 {
              margin-bottom: 5px;
            }
            .infos-list-container {
              &::before {
                content: '';
                display: block;
                position: absolute;
                left: 5px;
                top: 5px;
                width: 100%;
                height: 100%;
                border: 3px solid var(--theme-black);
                border-radius: 5px;
              }
              h3 {
                width: 125px;
                padding: 10px;
                border: 3px solid var(--theme-black);
                border-radius: 5px;
                text-align: center;
                background-color: var(--theme-white);
              }
            }
          }
        }
      }
    }
    .relative-board-container {
      img {
        cursor: pointer;
      }
      .options-container {
        display: none;
        padding-bottom: 5px;
        border-bottom: 3px dashed var(--theme-black);
        h3 {
          margin: 0 15px;
          cursor: pointer;
          opacity: 0.5;
          &.show {
            opacity: 1;
          }
        }
      }
      .spacing {
        width: 60px;
      }
    }
  }


  @media (max-width: 1350px){
    .container {
      .relative-board-container {
        .spacing {
          width: 30px;
        }
      }
    }
  }
  @media (max-width: 1250px) {
    .container {
      .user-infos-container {
        height: 300px;
        margin-top: 20px;
        padding: 0;
        img.switch-button {
          cursor: pointer;
          user-select: none;
          &.show {
            display: block;
          }
          &.top {
            top: 10px;
            transform: translateX(-50%) rotate(180deg);
          }
          &.bottom {
            bottom: 10px;
          }
        }
        > div {
          width: 100% !important;
          display: none !important;
          &.show {
            display: flex !important;
          }
          &.user-personal-infos {
            padding: 0;
            justify-content: center;
            img {
              height: 75px;
              margin-right: 50px;
            }
          }
          &.user-operated-infos {
            justify-content: center;
            ul {
              padding: 40px 50px;
              li {
                margin: 0 40px;
              }
            }
          }
        }
      }
      .relative-board-container {
        display: flex;
        flex-direction: column;
        .options-container {
          padding-bottom: 10px;
          display: flex;
        }
        .petitioning-container {
          width: 100%;
          display: none;
          &.show {
            display: block;
          }
          img {
            height: 24px;
          }
        }
      }
      .spacing {
        display: none;
      }
    }
  }
  @media (max-width: 800px) {
    .container {
      .user-infos-container {
        height: 200px;
        margin-top: 5px;
        margin-bottom: 40px;
        &::before {
          display: none;
        }
        .user-personal-infos {
          img {
            margin-right: 30px;
          }
          h2 {
            font-size: 1.25rem;
          }
        }
        .user-operated-infos {
          ul {
            justify-content: space-between;
            padding: 25px 15px !important;
            li {
              width: 100px;
              margin: 0 !important;
              .infos-list-container {
                &::before {
                  display: none;
                }
                h3 {
                  width: 80px !important;
                  padding: 7px !important;
                }
              }
            }
          }
        }
      }
      .relative-board-container {
        .options-container {
          padding-bottom: 5px;
          h3 {
            font-size: 1.05rem;
          }
        }
        h4.board-button {
          font-size: 8px;
        }
        img {
          height: 16px;
        }
        .petitioning-container {
          img {
            height: 16px;
          }
        }
      }
    }
    
    
  }
</style>