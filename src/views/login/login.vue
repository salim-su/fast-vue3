<template>
  <div class="login-container">
    <div class="login-main__container">
      <div class="login__title ls1">天津港第四港埠有限公司</div>
      <div class="login__logo"></div>
      <div class="login__input">
        <span class="fw fs14">手机号</span>
        <van-field
          class="input__box"
          v-model="phoneNumber"
          type="tel"
          :class="!isErrorPhone || this.phoneNumber.match(this.telPattern) ? '' : 'error__input'"
        />
        <span class="fw fs14">验证码</span>
        <van-field
          class="input__box send-sms__container mb10"
          v-model="verificationCode"
          maxlength="6"
          type="digit"
          :class="!isErrorCode || verificationCode ? '' : 'error__input'"
        >
          <template #button>
            <van-button size="small" class="send-sms__btn" @click="onSendSMS" :disabled="isSend">
              获取验证码
              <span v-if="isSend"> （{{ countDownTime }}） </span>
            </van-button>
          </template>
        </van-field>
        <van-button class="btn__submit" native-type="submit" @click="onLogin">
          <span class="ls2 fs16">登 录</span>
        </van-button>
      </div>
      <div class="login__footer" v-if="loginType === 'driver'">
        <span style="color: #999">
          没有用户信息，登录失败？
          <span style="border-bottom: 1px dotted #4a6cd3; color: #4a6cd3" @click="toRegister">去注册</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Toast } from 'vant/lib';
import router from '@/router';
import { useUserStore } from '@/store/modules/user';
import { sendSMS } from '@/api';

const verificationCode = ref('');
const phoneNumber = ref('');
const isSend = ref(false);
const countDownTime = ref(60);
const telPattern = ref(/^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/);
const isErrorPhone = ref(false);
const isErrorCode = ref(false);
const loginType = ref('group');

const userStore = useUserStore();

const onSendSMS = () => {
  if (phoneNumber.value.match(telPattern.value)) {
    sendSMS({
      phoneNumber: phoneNumber.value
    }).then((res: any) => {
      if (res.data === true) {
        countDown();
      } else {
        Toast.fail('次数过多，请稍后再试！');
        isSend.value = false;
      }
    });
  } else {
    // this.isErrorTel = true;
  }
};
const onLogin = () => {
  isErrorPhone.value = false;
  isErrorCode.value = false;

  if (!phoneNumber.value.match(telPattern.value)) {
    isErrorPhone.value = true;
  }

  if (!verificationCode.value) {
    isErrorCode.value = true;
  }
  if (!isErrorCode.value && !isErrorPhone.value) {
    const postdata = {
      phoneNumber: phoneNumber.value,
      code: verificationCode.value,
      loginType: loginType.value
    };
    userStore.loginBySms(postdata).then((res) => {
      console.log(res);
      router.push({ name: '/' });
    });
    // LoginByPhone({
    //   phoneNumber: phoneNumber.value,
    //   code: verificationCode.value,
    //   loginType: loginType.value
    // }).then((token: any) => {
    //   window.localStorage.setItem(this.loginType + '_token', token.data);
    //   if (token.data) {
    //     if (this.loginType === 'driver') {
    //       this.$router.push('/weight-bill');
    //     } else {
    //       this.$router.push('/weighing-plan');
    //     }
    //   }
    // });
  }
};
const countDown = () => {
  setTimeout(() => {
    if (countDownTime.value === 1) {
      isSend.value = false;
      countDownTime.value = 60;
    } else {
      isSend.value = true;
      countDownTime.value = countDownTime.value - 1;
      countDown();
    }
  }, 1000);
};
</script>

<style scoped lang="less">
.login-container {
  .c(@k, @v) {
    @{k}: calc(@v / 750 * 100vw);
  }

  position: fixed;
  height: 100vh;
  width: 100vw;
  background-image: url('../../assets/img/bg_login.png');
  background-position: top left;
  background-size: 100% 100%;
  background-repeat: no-repeat;

  .login-main__container {
    //.c(width, 660);
    width: 330px;
    margin: 0 auto;
    margin-top: 20%;

    .login__title {
      font-size: 26px;
      color: #fbfbfb;
      text-align: center;
      font-weight: 500;
      margin-bottom: 20px;
    }

    .login__logo {
      width: 66px;
      height: 66px;
      transform: translateZ(0);
      border: 3px solid #fbfbfb;
      border-radius: 10px;

      background-image: url('../../assets/img/logo.png');
      background-repeat: no-repeat;
      background-position: center;
      background-color: #6282e3;
      background-size: 70%;

      margin: 0 auto;
    }

    .login__input {
      background-color: #fbfbfb;
      border-radius: 10px;

      margin-top: -33px;
      padding: 32px 23px 23px;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .input__box {
        border-radius: 50px;
        border: unset;
        background-color: #f0f0f0;
        width: 100%;
      }

      .send-sms__container {
        padding-top: 6px !important;
        padding-bottom: 6px !important;
        padding-right: 6px !important;
      }

      .send-sms__btn {
        color: #986a32;
        background: linear-gradient(to right, #f4d497, #f0c574);
        border-radius: 50px;
        padding: 5px 20px;
        display: flex;
        justify-content: center;
        align-items: center;

        .van-button__content {
          height: auto;
        }
        .van-button__text {
          padding: 0;
        }
      }

      span {
        align-self: self-start;
        padding: 10px 0;
      }
    }

    .btn__submit {
      width: 100%;
      margin-top: 10px;
      border-radius: 50px;
      //height: unset;
      background: linear-gradient(to right, #6c8be5, #4368d4);
      color: #fbfbfb;
      font-size: larger;

      .van-button__content {
        height: unset;
      }

      .van-button__text {
        padding: 15px;
      }
    }

    .login__footer {
      height: 46px;
      width: 310px;
      margin: 0 auto;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      background: linear-gradient(to bottom, #f3f4f8, #fff, #f3f4f8);

      display: flex;
      justify-content: center;
      align-items: center;
    }

    .error__input {
      border: 1px solid red !important;
      color: red !important;
    }
  }
}
</style>
