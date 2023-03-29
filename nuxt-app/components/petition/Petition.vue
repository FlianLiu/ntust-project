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


  // RWD event
  const petitionBoardState = ref(true);
  const launchPetitionState = ref(true);

</script>

<template>
  <LayoutSearch />
  <div class="container">
    <div class="petition-container">
      <div class="options-container">
        <h3 @click="petitionBoardState = true" :class="{'show': petitionBoardState}">參與聯署投票</h3>
        <h3 @click="petitionBoardState = false" :class="{'show': !petitionBoardState}">近期連署看板</h3>
      </div>
      <PetitionList listTitle="參與連署投票 !" :progressBar="true" :list="signingBoards" 
        :titleMaxLine="2" :class="{'show': petitionBoardState}">
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
      <PetitionList listTitle="近期連署看板：" :linkToBoard="true" :list="recentlyAchievedBoards" 
        :titleMaxLine="2" :class="{'show': !petitionBoardState}">
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
        <div class="options-container">
          <h4 @click="launchPetitionState = true" :class="{'show': launchPetitionState}">連署看板名稱</h4>
          <h4 @click="launchPetitionState = false" :class="{'show': !launchPetitionState}">開版動機</h4>
        </div>
        <textarea type="text" placeholder="請輸入欲連署的看板名稱..." rows="1" v-model="launchPetition.title" :class="{'show': launchPetitionState}"></textarea>
        <textarea type="text" placeholder="請輸入開版動機..." rows="1" v-model="launchPetition.motivation" :class="{'show': !launchPetitionState}"></textarea>
        <div class="button double-solid-border" @click="submitLaunchPetition">
          <h4>發起連署</h4>
          <img src="/create-signing.png" height="22" alt="">
          <img src="/send.png" alt="" height="20" class="send-button">
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
        .options-container {
          width: 100%;
          height: 35px;
          padding: 0px 30px;
          border-bottom: 3px dashed var(--theme-black);
          display: flex;
          align-items: center;
          position: absolute;
          z-index: 1;
          left: 0;
          top: 0;
          display: none;
          h4 {
            opacity: .5;
            cursor: pointer;
            user-select: none;
            &:first-child {
              margin-right: 30px;
            }
            &.show {
              opacity: 1;
            }
          }
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
        .button {
          padding: 7.5px 15px;
          img.send-button {
            display: none;
          }
        }
      }
    }
  }


  @media (max-width: 1350px){
    .container {
      .petition-container {
        .spacing {
          width: 30px;
        }
      }
      .launch-petition {
        .launch-container {
          textarea {
            width: 450px;
          }
        }
      }
    }
  }
  @media (max-width: 1250px) {
    .container {
      .petition-container {
        margin-top: 20px;
        flex-direction: column;
        .options-container {
          display: flex;
          padding-bottom: 10px;
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
      .launch-petition {
        .launch-title {
          margin: 0;
          margin-left: 20px;
          margin-bottom: 20px;
        }
        .launch-container {
          padding-top: 50px;
          padding-bottom: 15px;
          .options-container {
            display: flex;
          }
          textarea {
            width: 500px;
            display: none;
            &.show {
              display: block;
            }
          }
        }
      }
    }
  }
  @media (max-width: 800px) {
    .container {
      .petition-container {
        margin-top: 5px;
        margin-bottom: 40px;
        .options-container {
          padding-bottom: 5px;
          h3 {
            font-size: 1.05rem;
            margin-right: 10px;
          }
        }
        .petitioning-container {
          h4 {
            margin-right: 0;
          }
          img {
            height: 16px;
          }
        }
      }
      .launch-petition {
        .launch-title {
          margin: 0;
          margin-left: 10px;
          margin-bottom: 10px;
          h3 {
            margin-right: 30px;
          }
        }
        .launch-container {
          padding: 15px;
          padding-top: 50px;
          border-radius: 5px;
          &::before {
            display: none !important;
          }
          .options-container {
            padding: 0px 15px;
            h4 {
              &:first-child {
                margin-right: 20px;
              }
            }
          }
          textarea {
            width: 100%;
          }
          .button {
            padding: 0;
            border: none;
            position: absolute;
            right: -45px;
            h4, img {
              display: none;
            }
            img.send-button {
              display: block;
            }
          }
        }
      }
    }
  }
</style>