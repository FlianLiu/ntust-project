import { defineStore } from 'pinia'

export const useAuthStore = defineStore('authorization', () => {
  const userId = ref('');
  const userName = ref('');
  const userHeadShotNumber = ref(1);
  const userEmail = ref('');
  const userPassword = ref('');
  const userToken = ref('');
  const state = ref(false);
  const keepState = ref(false);
  const previousPage = ref('');
  const baseAPI = ref('http://localhost:80');

  function resetState() {
    userId.value = '';
    userName.value = '';
    userHeadShotNumber.value = 0;
    userEmail.value = '';
    userToken.value = '';
    state.value = false;
    
    localStorage.setItem('userData', '');
  }
  function setState(id, name, headshot, email, password, token) {
    userId.value = id;
    userName.value = name;
    userHeadShotNumber.value = headshot===""? 1: headshot;
    userEmail.value = email;
    userPassword.value = password;
    userToken.value = token;
    state.value = true;

    localStorage.setItem('latestLoginedTime', new Date());
    localStorage.setItem('userData', JSON.stringify({
      id: userId.value,
      name: userName.value,
      headshot: userHeadShotNumber.value,
      email: userEmail.value,
      password: userPassword.value,
      token: userToken.value
    }))
    if (keepState.value) {
      localStorage.setItem('email', userEmail.value);
      localStorage.setItem('password', userPassword.value);
      localStorage.setItem('keepState', keepState.value);
    }else {
      localStorage.setItem('email', '');
      localStorage.setItem('password', '');
      localStorage.setItem('keepState', false);
    }
  }
  function switchState(state) {
    state.value = state;
  }
  function setPreviousPage(path) {
    previousPage.value = path;
  }
  function setKeepState(newState) {
    keepState.value = newState;
  }


  return {
    baseAPI,

    userId,
    userName,
    userHeadShotNumber,
    userEmail,
    userToken,

    state,
    keepState,
    setKeepState,
    switchState,
    resetState,
    setState,

    previousPage,
    setPreviousPage,
  }
})