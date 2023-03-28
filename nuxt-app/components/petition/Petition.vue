<script setup>
  import { useAuthStore } from '~~/stores/authorization';
  import { useSupportedBoard } from '~~/composables/userSupportedBoard';
  const { baseAPI, userId, userToken } = useAuthStore();
  const { signingBoards, recentlyAchievedBoards } = defineProps({
    signingBoards: {
      type: Array[Object],
      default: [{
        'board-id': 'uuid-board-id',
        'board-title': 'board-title',
        'number-of-signers': 0,
        'user-is-supported': false,
      }]
    },
    recentlyAchievedBoards: {
      type: Array[Object],
      default: [{
        'board-id': 'board-uuid',
        'board-title': 'board-title',
      }]
    }
  });

  const launchPetition = reactive({
    title: '',
    motivation: ''
  });
  const fetchData = inject('fetchData');
  async function submitLaunchPetition() {
    if (launchPetition.title === '' || launchPetition.motivation === '') {
      window.alert('請完整輸入內容後，才可發起連署!!');
      return
    }
    if (userId === '' || userToken === '') {
      window.alert('請先登入後，才可發起連署!!');
      return
    }
    const { data: res } = await useFetch(`${baseAPI}/petition/post-initiate-board`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${userToken}`,
        "user-id": userId
      },
      body: {
        "board-title": launchPetition.title,
        "board-motivation": launchPetition.motivation
      }
    });
    if (res.value.status === "success") window.alert('您已成功發起連署!!');
    fetchData();
  }
  
  function isUserLogin() {
    if (userId === '' || userToken === '') window.alert('無效操作，請先登入!!');
    return !(userId === '' || userToken === '');
  }

  const setUserSupported = inject('setUserSupported');
  function buttonActiveEvent(index, boardId) {
    if (!isUserLogin()) return;
    setUserSupported(index, false);
    useSupportedBoard(boardId, false);
  }
  function buttonInactiveEvent(index, boardId) {
    if (!isUserLogin()) return;
    setUserSupported(index, true);
    useSupportedBoard(boardId, true);
  }
  provide('buttonActiveEvent', buttonActiveEvent);
  provide('buttonInactiveEvent', buttonInactiveEvent);

</script>

<template>
  <LayoutSearch />
  <div class="container">
    <div class="petition-container">
      <PetitionList listTitle="參與連署投票 !" :progressBar="true" :list="signingBoards" :titleMaxLine="2">
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
          <img src="/signing-true.png" height="24" alt="">
        </template>
        <template #buttonInactive>
          <h4>支持連署</h4>
          <img src="/signing-false.png" height="24" alt="">
        </template>
      </PetitionList>
      <div class="spacing"></div>
      <PetitionList listTitle="近期連署看板：" :linkToBoard="true" :list="recentlyAchievedBoards" :titleMaxLine="2">
        <template #icon>
          <span>已達標</span>
        </template>
        <template #title="{ title }">
          <h4>{{ title }}</h4>
        </template>
        <template #buttonInactive>
          <h4>前往看板</h4>
          <img src="/send.png" height="24" alt="">
        </template>
      </PetitionList>
    </div>
    <div class="launch-petition">
      <div class="launch-title">
        <h3>發起連署</h3>
        <p>#注意: 每個用戶每個月最多只能發起3次連署！</p>
      </div>
      <div class="launch-container">
        <textarea type="text" placeholder="請輸入欲連署的看板名稱..." rows="1" v-model="launchPetition.title"></textarea>
        <textarea type="text" placeholder="請輸入開版動機..." rows="1" v-model="launchPetition.motivation"></textarea>
        <div class="button double-solid-border" @click="submitLaunchPetition">
          <h4>發起連署</h4>
          <img src="/create-signing.png" height="24" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .container {
    > div {
      width: 100%;
      h3 {
        font-size: 1.25rem;
        letter-spacing: 0.5px;
      }
      .button {
        --border-offset: 3px;
        --border-minus-offset: -3px;
        --border-hover-translate: 6px;
        width: 150px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 5px 15px;
        border: 3px solid var(--theme-black);
        border-radius: 5px;
        cursor: pointer;
        user-select: none;
        h4 {
          margin-right: 5px;
        }
        &.active {
          background-color: var(--theme-black);
          color: var(--theme-white);
        }
        &.active h4 {
          font-weight: normal;
        }
      }
    }
    .petition-container {
      width: 100%;
      display: flex;
      .spacing {
        width: 60px;
      }
      .icon {
        width: 50px;
        text-align: center;
      }
    }
    .launch-petition {
      width: 100%;
      > div {
        width: 100%;
        display: flex;
        align-items: center;
      }
      .launch-title {
        margin: 20px;
        h3 {
          margin-right: 50px;
        }
      }
      .launch-container {
        border: 3px solid var(--theme-black);
        border-radius: 7px;
        padding: 20px;
        padding-left: 30px;
        justify-content: space-between;
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
          border-radius: 7px;
        }
        textarea {
          width: 500px;
          line-height: 1.25rem;
          font-size: 1rem;
          padding: 5px;
          border: none;
          border-bottom: 3px solid var(--theme-black);
          background-color: var(--theme-white);
          resize: none;
          &:focus {
            outline: none;
          }
          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
</style>