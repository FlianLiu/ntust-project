import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authorization', () => {
  const userId = ref('');
  const userName = ref('');
  const userHeadShotNumber = ref(0);
  const userEmail = ref('');
  const userToken = ref('');
  const state = ref(false);
  const previousPage = ref('');

  function resetState() {
    userId.value = '';
    userName.value = '';
    userHeadShotNumber.value = 0;
    userEmail.value = '';
    userToken.value = '';
    state.value = false;
    console.log('logout!');
  }
  function setState() {
    userId.value = 'uuid';
    userName.value = 'Flian';
    userHeadShotNumber.value = 1;
    userEmail.value = 'test@gmail.com';
    userToken.value = 'token';
    state.value = true;
    console.log('login!');
  }
  function switchState(state) {
    state.value = state;
  }

  function setPreviousPage(path) {
    previousPage.value = path;
    // console.log('set previous page to: '+ previousPage.value)
  }

  return {
    userId,
    userName,
    userHeadShotNumber,
    userEmail,
    userToken,

    state,
    switchState,
    resetState,
    setState,

    previousPage,
    setPreviousPage,
  }
})