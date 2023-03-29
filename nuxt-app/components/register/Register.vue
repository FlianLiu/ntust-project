<script setup>
  import { useAuthStore } from '~~/stores/authorization';
  const { baseAPI, setState, previousPage } = useAuthStore();

  const passwordType = ref('password');
  const checkPasswordType = ref('password');

  const headshot = ref('/rabbit-1.png');
  const headshotNumber = ref('1');
  const name = ref('');
  const password = ref('');
  const checkPassword = ref('');
  const email = ref('');
  const emailVerificationCode = ref('');

  function reRoll() {
    headshotNumber.value = (parseInt(headshotNumber.value) + 1) % 3 +1;
  }
  async function getVerficationCode() {
    if (email.value === '') {
      window.alert('請先輸入您的電子郵件');
      return
    }

    const { data } = await useFetch(`${baseAPI}/auth/post-require-verification-code`, {
      method: 'POST',
      body: {
        "user-mail": email.value
      }
    });
    if ( data.value.status === "success") {
      window.alert('已傳送驗證碼到您的信箱!')
    }
  }

  async function register() {
    if(name.value === '' || password.value === '' || checkPassword.value === '' 
      || email.value === '' || emailVerificationCode.value === '') {
      window.alert('請確實填寫每個欄位內容!!')
      return
    }
    if (password.value !== checkPassword) {
      window.alert('密碼輸入不一致，請重新輸入!')
      checkPassword.value = '';
      return
    }

    const { data } = await useFetch(`${baseAPI}/auth/post-register`, {
      method: 'POST',
      body: {
        "user-name": name.value,
        "user-password": password.value,
        "user-email": email.value,
        "email-verification-code": emailVerificationCode.value,
        "user-headshot-number": headshotNumber.value
      }
    });
    if (data.value.result === "verifyError") {
      window.alert('請先取得電子郵件驗證碼');
      return
    } else if (data.value.result === "insertError") {
      window.alert('您輸入的電子郵件已經存在');
      return
    } else if (data.value.result === "verify error") {
      window.alert('您輸入的驗證碼錯誤');
      return
    }

    if (data.value.status === 'success') {
      const { data } = await useFetch(`${baseAPI}/auth/post-login`, {
        method: 'POST',
        body: {
          "user-account": email.value,
          "user-password": password.value
        }
      });
      if (data.value.status === 'success') {
        window.alert('註冊成功!');
        setState(data.value['user-id'], data.value['user-name'], data.value['user-headshot-number'], data.value['user-email'], password.value, data.value['user-token']);
        navigateTo(previousPage);
      }
      
    }
  }

  watch(headshotNumber, ()=> {
    headshot.value = 'rabbit-' + headshotNumber.value + '.png';
  })
</script>

<template>
  <LayoutSearch/>
  <div class="register-container">
    <form>
      <div class="carrot-container">
        <div class="carrot">
          <img src="/carrot-false.png" height="25" alt="" v-if="name == ''">
          <img src="/carrot-true.png" alt="" height="25" v-if="name !== ''">
        </div>
        <div class="carrot">
          <img src="/carrot-false.png" height="25" alt="" v-if="password == ''">
          <img src="/carrot-true.png" alt="" height="25" v-if="password !== ''">
        </div>
        <div class="carrot">
          <img src="/carrot-false.png" height="25" alt="" v-if="checkPassword == ''">
          <img src="/carrot-true.png" alt="" height="25" v-if="checkPassword !== ''">
        </div>
        <div class="carrot">
          <img src="/carrot-false.png" height="25" alt="" v-if="email == ''">
          <img src="/carrot-true.png" alt="" height="25" v-if="email !== ''">
        </div>
        <div class="carrot">
          <img src="/carrot-false.png" height="25" alt="" v-if="emailVerificationCode == ''">
          <img src="/carrot-true.png" alt="" height="25" v-if="emailVerificationCode !== ''">
        </div>
      </div>
      <div class="headshot-container">
        <h5 @click="reRoll">點我切換頭像</h5>
        <img id="headshot" :src="headshot" alt="" height="75" @click="reRoll">
      </div>
      <input id="name" type="name" name="name" required placeholder="請輸入您的暱稱" 
        v-model="name" autocomplete="off">
      <div class="password-container">
        <input class="password" :type="passwordType"
          placeholder="請輸入密碼" v-model="password" required autocomplete="off">
        <img src="/eye-false.png" height="24" alt="" 
          v-show="passwordType === 'password'" @click="passwordType = 'text'">
        <img src="/eye-true.png" height="24" alt="" 
          v-show="passwordType === 'text'" @click="passwordType = 'password'">
      </div>
      <div class="password-container">
        <input class="password" :type="checkPasswordType" 
          placeholder="請再次輸入密碼" v-model="checkPassword" required autocomplete="off">
        <img src="/eye-false.png" height="24" alt="" 
          v-show="checkPasswordType === 'password'" @click="checkPasswordType = 'text'">
        <img src="/eye-true.png" height="24" alt="" 
          v-show="checkPasswordType === 'text'" @click="checkPasswordType = 'password'">
      </div>
      <input id="email" type="email" name="email" placeholder="請輸入電子郵件" 
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" v-model="email" required autocomplete="off">
      <div class="verificate-container">
        <input id="verificate" type="text" name="verificate" 
          placeholder="郵件驗證碼" v-model="emailVerificationCode" required autocomplete="off">
        <h4 class="get-verfication-code" @click="getVerficationCode">取得驗證碼</h4>
      </div>
      <h4 class="register" @click="register">註冊</h4>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .register-container {
    width: 100%;
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
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
      .carrot-container {
        margin: 0;
        .carrot {
          margin: 0 3px;
        }
      }
      .headshot-container {
        width: 100%;
        padding: 0 15px;
        justify-content: center;
        user-select: none;
        h5 {
          font-weight: normal;
          position: absolute;
          left: 15px;
          bottom: 0;
          opacity: .7;
          &::before {
            content: '';
            display: block;
            height: 20px;
            width: 20px;
            background-image: url('/arrow-follow.png');
            background-repeat: no-repeat;
            background-size: contain;
            transform: rotate(-70deg) scaleX(-1);
            position: absolute;
            right: -20px;
            top: -15px;
          }
        }
      }
      .password-container {
        &:hover {
          input{
            border: 3px solid var(--theme-black) !important;
          }
          img {
            opacity: 1 !important;
          }
        }
        img {
          position: absolute;
          right: 15px;
        }
      }
      .verificate-container {
        display: flex;
        border-radius: 7px;
        overflow: hidden;
        &:hover {
          #verificate {
            border: 3px solid var(--theme-black);
          }
          .get-verfication-code {
            background-color: var(--theme-black) !important;
          }
        } 
      }
      input {
        &#name, &#name:invalid , &#email, &#email:invalid
        , &.password, &.password:invalid , &#verificate, &#verificate:invalid {
          width: 350px;
          line-height: 1.2rem;
          padding: 10px 15px;
          font-size: 1rem;
          background-color: var(--theme-white);
          border-radius: 7px;
          border: 3px solid var(--theme-inactive);
          transition: border .2s;
        }
        &#name:focus, &#name:hover, &#name:valid , &#email:focus, &#email:hover, &#email:valid
          , &.password:focus, &.password:hover, &.password:valid 
          , &#verificate:focus, &#verificate:valid {
          border: 3px solid var(--theme-black);
        }
        &.password ~ img, &.password:invalid ~ img {
          opacity: .5;
          transition: opacity .2s;
        }
        &.password:focus ~ img, &.password:hover ~ img, &.password:valid ~ img {
          opacity: 1;
        }
        &:focus {
          outline: none;
        }
        &#verificate ~ .get-verfication-code, &#verificate:invalid ~ .get-verfication-code {
          position: absolute;
          right: 0;
          padding: 15px;
          background-color: var(--theme-inactive);
          color: var(--theme-white);
          font-weight: normal;
          cursor: pointer;
          transition: background-color .2s;
        }
        &#verificate:focus ~ .get-verfication-code, &#verificate:valid ~ .get-verfication-code {
          background-color: var(--theme-black) !important;
        }
      }
      h4.register {
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

  @media (max-width: 1250px) {
    .register-container {
      min-height: calc(100vh - 80px);
      padding: 0;
      form {
        border: 3px solid var(--theme-black);
        &:hover {
          transform: scale(1);
          box-shadow: 0 0 0 var(--shadow-black);
        }
      }
    }
  }
  @media (max-width: 800px) {
    .register-container {
      min-height: calc(100vh - 50px);
      padding: 0;
      form {
        width: 375px;
        > * {
          margin: 10px 0;
        }
        .carrot-container {
          .carrot {
            img {
              height: 16px;
            }
          }
        }
        .headshot-container {
          img {
            height: 50px;
          }
        }
        input#name, input#email, .password-container, .verificate-container {
          margin: 5px 0;
        }
        .password-container {
          img {
            opacity: 1 !important;
          }
        }
        input {
          &#name, &#email, &.password, &#verificate {
            &:focus, &:valid, &:invalid {
              border: 3px solid var(--theme-black);
              width: 325px;
            }
            border: 3px solid var(--theme-black);
            width: 325px;
          }
        }
        h4.get-verfication-code {
          background-color: var(--theme-black) !important;
        }
      }
    }
  }

</style>