<script setup>
  import { useAuthStore } from '@/stores/authorization';
  const data = defineProps({
    userEstablishedDate: {
      type: String,
      default: 'yyyy/mm/dd'
    },
    personalOperateHistory: {
      type: Object,
      default: {
        'number-of-received-likes': 0,
        'number-of-released-comments': 0,
        'number-of-collect-boards': 0,
        'number-of-like-comments': 0,
        'number-of-launch-petition-boards': 0,
        'number-of-support-signing-boards': 0,
      }
    },
    colletedBoards: {
      type: Array,
      default: [{
        'board-id': 'uuid-board-id-1',
        'board-title': 'board-title-1'
      }]
    },
    supportedSigningBoards: {
      type: Array,
      default: [
        'signing-board-1'
      ]
    }
  });
  const userOperated = computed(()=> data.personalOperateHistory);
  const { userName, userEmail } = useAuthStore();
  

  const SupportedSigningBoardsList = reactive(convertSupportedSigningBoardToList());
  function convertSupportedSigningBoardToList() {
    const list = data.supportedSigningBoards;
    const SigningBoardsList = [];
    for( let i=0; i<list.length; i++) {
      const listItem = list[i];
      const convertedListItem = {
        'board-id': listItem['signing-board-id'],
        // API
        'board-title': i+'board-title board-title board-title board-title board-title board-title',
        'number-of-signers': 20,
        'user-is-supported': true,
      }
      SigningBoardsList.push(convertedListItem);
    }
    SigningBoardsList.sort((x, y)=> {
      return y['number-of-signers'] - x['number-of-signers'];
    })
    return SigningBoardsList;
  }

  onMounted(()=> {
    
  });
  onUnmounted(()=> {
    
  });

</script>

<template>
  <LayoutSearch :showLogoutBtn="true"
  />
  <div class="container">
    <div class="user-infos-container">
      <div class="user-personal-infos">
        <img src="/rabbit-2.png" alt="" height="100" class="head-shot">
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
            <h3>{{ userOperated['number-of-received-likes'] }}</h3>
          </li>
          <li>
            <h4>發表的留言數</h4>
            <h3>{{ userOperated['number-of-released-comments'] }}</h3>
          </li>
          <li>
            <h4>收藏的看板數</h4>
            <h3>{{ userOperated['number-of-collect-boards'] }}</h3>
          </li>
          <li>
            <h4>按讚的留言數</h4>
            <h3>{{ userOperated['number-of-like-comments'] }}</h3>
          </li>
          <li>
            <h4>發起連署次數</h4>
            <h3>{{ userOperated['number-of-launch-petition-boards'] }}</h3>
          </li>
          <li>
            <h4>連署投票次數</h4>
            <h3>{{ userOperated['number-of-support-signing-boards'] }}</h3>
          </li>
        </ul>
      </div>
    </div>
    <div class="relative-board-container">
      <PetitionList listTitle="您蒐藏的看板：" :linkToBoard="true" :list="data.colletedBoards" :titleMaxLine="2"
        :listBorder="false" :containerBorder="true">
        <template #icon>
          <img src="/collect-true.png" alt="" height="28">
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
      <PetitionList listTitle="您參與的連署：" :linkToBoard="true" :titleMaxLine="2" :list="SupportedSigningBoardsList"
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
        <template #buttonInactive>
          <h4>前往看板</h4>
          <img src="/send.png" height="28" alt="">
        </template>
      </PetitionList>
    </div>
  </div>
</template>

<style scoped>
  h3 {
    font-size: 1.25rem;
    letter-spacing: 0.5px;
  }
  .icon {
    width: 50px;
    text-align: center;
    margin-left: 10px;
  }
  .container {
    flex-direction: column;
  }
  .container > * {
    width: 100%;
    display: flex;
  }
  .spacing {
    width: 60px;
  }
  .user-infos-container {
    border: 3px solid var(--theme-black);
    border-radius: 7px;
    padding: 40px 80px;
  }
  .user-infos-container h2 {
    font-size: 1.75rem;
  }
  .user-infos-container h3 {
    font-size: 1.4rem;
  }
  .user-infos-container h4 {
    font-size: 1.1rem;
  }
  .user-infos-container .user-personal-infos {
    width: 50%;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
  .user-infos-container .user-personal-infos img {
    margin-right: 50px;    
  }
  .user-infos-container .user-personal-infos div > * {
    letter-spacing: 0.5px;
    margin: 5px 0;
  }
  .user-infos-container .user-operated-infos {
    width: 50%;
  }
  .user-infos-container .user-operated-infos ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .user-infos-container .user-operated-infos ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px 20px;
  }
  .user-infos-container .user-operated-infos ul li h3 {
    width: 125px;
    margin-top: 5px;
    padding: 10px;
    border: 3px solid var(--theme-black);
    border-radius: 5px;
    text-align: center;
  }
  .relative-board-containerimg {
    cursor: pointer;
  }
</style>