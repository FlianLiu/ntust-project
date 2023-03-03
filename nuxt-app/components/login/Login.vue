<script setup>
  import { useAuthStore } from '~~/stores/authorization';
  const { setState, previousPage } = useAuthStore();

  const passwordType = ref('password');
  const email = ref('');
  const password = ref('');
  const headshot = ref('/rabbit-1.png');
  const headshotNumber = ref(1);

  watch(headshotNumber, ()=> {
    headshot.value = 'rabbit-' + headshotNumber.value + '.png';
  })

  function login() {
    // login API
    setState();
  }

  function reRoll() {
    headshotNumber.value = (headshotNumber.value + 1) % 3 + 1;
  }

  onMounted(()=> {
    
  })

</script>

<template>
  <LayoutSearch :showRegisterBtn="true"/>
  <div class="login-container">
    <form>
      <div class="icon-container">
        <img :src="headshot" alt="" height="75" @click="reRoll()">
        <div class="icons" @click="reRoll()">
          <img src="/dice.png" alt="" height="25">
          <h5>這裡是登入頁哦~</h5>
        </div>
      </div>
      <input id="email" type="email" name="email" placeholder="請輸入電子郵件" 
        v-model="email" required autocomplete="off">
      <div class="password-container">
        <input id="password" :type="passwordType" name="password" placeholder="請輸入密碼" 
         pattern="[a-zA-Z0-9]{8,}" v-model="password" required autocomplete="off">
        <img src="/eye-false.png" height="24" alt="" 
          v-show="passwordType === 'password'" @click="passwordType = 'text'">
        <img src="/eye-true.png" height="24" alt="" 
          v-show="passwordType === 'text'" @click="passwordType = 'password'">
      </div>
      <div class="selector-container">
        <div>
          <input id="keep-status" type="checkbox">
          <label for="keep-status">
            <h4>保持登入狀態</h4>
          </label>
        </div>
        <NuxtLink>
          <h4>忘記密碼</h4>
        </NuxtLink>
      </div>
      <NuxtLink :to="previousPage">
        <h4 class="login" @click="login">登入</h4>
      </NuxtLink>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .login-container {
    width: 100%;
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
    padding-bottom: 100px;
    form {
      border: 3px solid var(--theme-inactive);
      border-radius: 7px;
      padding: 20px 50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: border .3s, transform .3s, box-shadow .3s;
      &:hover {
        border: 3px solid var(--theme-black);
        transform: scale(1.02);
        box-shadow: 0 10px 30px var(--shadow-black);
      }
      div {
        display: flex;
        align-items: center;
      }
      > * {
        margin: 12.5px 0;
      }
      .icon-container {
        width: 100%;
        justify-content: center;
        user-select: none;
        .icons {
          position: absolute;
          right: 0;
          bottom: 0;
          opacity: .7;
          font-weight: normal;
          h5 {
            font-weight: normal;
          }
        }
      }
      .password-container 
        > img {
        position: absolute;
        right: 15px;
      }
      input {
        &#email, &#email:invalid , &#password, &#password:invalid {
          width: 350px;
          line-height: 1.2rem;
          padding: 10px 15px;
          font-size: 1rem;
          background-color: var(--theme-white);
          border: 3px solid var(--theme-inactive);
          border-radius: 7px;
          transition: border .2s;
        }
        &#email:focus, &#email:hover, &#email:valid , &#password:focus, &#password:hover, &#password:valid {
          border: 3px solid var(--theme-black);
        }
        &#password ~ img, &#password:invalid ~ img {
          opacity: .5;
          transition: opacity .2s;
        }
        &#password:focus ~ img, &#password:hover ~ img, &#password:valid ~ img {
          opacity: 1;
        }
        &:focus {
          outline: none;
        }
      }
      .selector-container {
        width: 100%;
        padding: 0 15px;
        justify-content: space-between;
        user-select: none;
        input {
          margin-top: 2px;
          margin-right: 5px;
        }
        input ~ label, a h4 {
          color: var(--theme-inactive);
          transition: color .2s;
        }
        input:checked ~ label, input:hover ~ label , a:hover h4 {
          color: var(--theme-black);
        }
      }
      h4.login {
        width: 200px;
        text-align: center;
        border: 3px solid var(--theme-black);
        border-radius: 7px;
        padding: 7px;
        font-size: 1.25rem;
        cursor: pointer;
        overflow: hidden;
        transition: transform .2s, box-shadow .2s;
        &::before {
          content: '';
          display: block;
          width: 0px;
          height: 200px;
          position: absolute;
          transform-origin: left;
          left: 0px;
          top: -0px;
          background-color: var(--theme-black);
          z-index: -1;
          transform: rotate(-45deg);
          transition: width .3s, height .3s;
        }
        &:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 5px 5px var(--shadow-black);
          color: var(--theme-white);
          &::before {
            width: 300px;
            height: 200px;
          }
        }
      }
    }
  }
</style>