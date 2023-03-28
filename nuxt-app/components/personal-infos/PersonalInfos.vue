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

</script>

<template>
  <LayoutSearch :showLogoutBtn="true"/>
  <div class="container">
    <div class="user-infos-container">
      <div class="user-personal-infos">
        <img :src="'/rabbit-'+userHeadShotNumber+'.png'" alt="" height="100" class="head-shot">
        <div>
          <h2>{{ userName }}</h2>
          <h4>{{ userEmail }}</h4>
          <h4>{{ userEstablishedDate }} ~</h4>
        </div>
      </div>
      <div class="user-operated-infos">
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
    </div>
    <div class="relative-board-container">
      <PetitionList listTitle="您蒐藏的看板：" :linkToBoard="true" :list="collectedBoards" :titleMaxLine="2"
        :listBorder="false" :containerBorder="true">
        <template #icon="{ boardId, boardTitle }">
          <div v-if="collectedBoardsList[boardId] === undefined || collectedBoardsList[boardId] === true"  @click="collectBoard(boardId, boardTitle)">
            <img src="/collect-true.png" alt="" height="28">
          </div>
          <div v-else  @click="collectBoard(boardId, boardTitle)">
            <img src="/collect-false.png" alt="" height="28">
          </div>
        </template>
        <template #title="{ title }">
          <h4 class="title">{{ title }}</h4>
        </template>
        <template #buttonInactive>
          <h4>前往看板</h4>
          <img src="/send.png" height="28" alt="">
        </template>
      </PetitionList>
      <div class="spacing"></div>
      <PetitionList listTitle="您參與的連署：" :linkToBoard="true" :titleMaxLine="2" :list="supportedSigningBoards"
        :listBorder="false" :containerBorder="true">
        <template #icon="{ numberOfSigners }">
          <div class="icon">
            <h4>{{ numberOfSigners }}/30</h4>
          </div>
        </template>
        <template #title="{ title }">
          <h4>{{ title }}</h4>
        </template>
        <template #buttonActive>
          <h4>已參與連署</h4>
          <img src="/signing-true.png" height="28" alt="">
        </template>
        <template #buttonCanceled>
          <h4>支持連署</h4>
          <img src="/signing-false.png" height="28" alt="">
        </template>
        <template #buttonInactive>
          <h4>前往看板</h4>
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
      .spacing {
        width: 60px;
      }
    }
  }
</style>