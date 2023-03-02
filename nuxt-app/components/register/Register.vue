<script setup>
  import { useAuthStore } from '~~/stores/authorization';
  const { setState, previousPage } = useAuthStore();

  const passwordType = ref('password');
  const checkPasswordType = ref('password');

  const headshot = ref('/rabbit-1.png');
  const headshotNumber = ref('1');
  const name = ref('');
  const password = ref('');
  const checkPassword = ref('');
  const email = ref('');
  const emailVerificationCode = ref('');

  watch(headshotNumber, ()=> {
    headshot.value = 'rabbit-' + headshotNumber.value + '.png';
  })

  function reRoll() {
    headshotNumber.value = (headshotNumber.value + 1) % 3 +1;
  }

  function register() {
    // register API
    
  }
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
        <h4 class="get-verfication-code">取得驗證碼</h4>
      </div>
      <NuxtLink :to="previousPage">
        <h4 class="register" @click="register">註冊</h4>
      </NuxtLink>
    </form>
  </div>
</template>

<style scoped>
  .register-container {
    width: 100%;
    min-height: calc(100vh - 120px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
  }
  form {
    border: 3px solid var(--theme-inactive);
    border-radius: 7px;
    padding: 20px 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    
    transition: border .3s, transform .3s, box-shadow .3s;
  }
  form:hover {
    border: 3px solid var(--theme-black);
    transform: scale(1.02);
    box-shadow: 0 10px 30px var(--shadow-black);
  }
  form div {
    display: flex;
    align-items: center;
  }
  form > * {
    margin: 12.5px 0;
  }
  .carrot-container {
    margin: 0;
  }
  .carrot-container .carrot {
    margin: 0 3px;
  }
  .password-container > img {
    position: absolute;
    right: 15px;
  }
  .headshot-container {
    width: 100%;
    padding: 0 15px;
    justify-content: center;
    user-select: none;
  }
  .headshot-container h5 {
    font-weight: normal;
    position: absolute;
    left: 15px;
    bottom: 0;
    opacity: .7;
  }
  .headshot-container h5::before {
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
  input#name, input#name:invalid 
    , input#email, input#email:invalid
    , input.password, input.password:invalid
    , input#verificate, input#verificate:invalid {
    width: 350px;
    line-height: 1.2rem;
    padding: 10px 15px;
    font-size: 1rem;
    background-color: var(--theme-white);
    border-radius: 7px;

    border: 3px solid var(--theme-inactive);
    transition: border .2s;
  }
   input#name:focus, input#name:hover, input#name:valid 
    , input#email:focus, input#email:hover, input#email:valid
    , input.password:focus, input.password:hover, input.password:valid
    , input#verificate:focus, input#verificate:hover, input#verificate:valid {
    border: 3px solid var(--theme-black);
  }
  input.password ~ img, input.password:invalid ~ img {
    opacity: .5;
    transition: opacity .2s;
  }
  input.password:focus ~ img, input.password:hover ~ img, input.password:valid ~ img {
    opacity: 1;
  }
  input:focus {
    outline: none;
  }
  .verificate-container {
    display: flex;
    border-radius: 7px;
    overflow: hidden;
  }
  input#verificate ~ .get-verfication-code, input#verificate:invalid ~ .get-verfication-code {
    position: absolute;
    right: 0;
    padding: 15px;
    background-color: var(--theme-inactive);
    color: var(--theme-white);
    font-weight: normal;
    cursor: pointer;

    transition: background-color .2s;
  }
  input#verificate:focus ~ .get-verfication-code, input#verificate:hover ~ .get-verfication-code
    , input#verificate:valid ~ .get-verfication-code, .get-verfication-code:hover {
    background-color: var(--theme-black) !important;
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
  }
  h4.register:hover {
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 5px 5px var(--shadow-black);
    color: var(--theme-white);
  }
  h4.register::before {
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
  h4.register:hover::before {
    width: 300px;
    height: 200px;
  }

</style>