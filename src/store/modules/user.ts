import { loginByPhone, loginPassword, loginSystem, loginSystems } from '@/api';
import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';
import { watch } from 'vue';

const token = window.localStorage.getItem('token');
const { VITE_TOKEN_KEY } = import.meta.env;

interface StoreUser {
  token: any;
  info: AnyObject;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    token: token || null,
    info: {}
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
    getUesrToken(): any {
      return this.token || null;
    }
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
    },
    setToken(token: any) {
      this.token = token ? token : null;
    },
    login(postData: any) {
      console.log(postData);
      return new Promise((resolve, reject) => {
        // const { data } = loginPassword();
        const { data } = loginSystems(postData);
        watch(data, () => {
          const res = eval('(' + data.value + ')');
          if (res.error_code == '400') {
            console.log(1);
            resolve(null);
          } else {
            // useCookies().set(VITE_TOKEN_KEY as string, res.access_token);
            localStorage.clear();
            localStorage.setItem('token', res.access_token);
            this.setToken(res.access_token);
            // this.setToken(null);
            // console.log(this.token);
            // console.log(2);
            // const date = new Date();
            // date.setDate(new Date().getDate() + 10); //10天后的日期
            // useCookies().set(VITE_TOKEN_KEY as string, res.access_token, { expires: date });
            // useCookies().set(VITE_TOKEN_KEY as string, res.access_token);
            // console.log(1);
            resolve(res);
          }
          // console.log(res);
          // this.setToken()
          // this.setInfo(data.value);
          // console.log(reject);
          // console.log(data.value);
        });
      });
    },
    loginBySms(postData: any) {
      console.log(postData);
      return new Promise((resolve, rejects) => {
        loginByPhone(postData).then((res) => {
          if (res?.data) {
            localStorage.clear();
            localStorage.setItem('token', res.data);
            this.setToken(res.data);
            resolve(res);
          } else {
            resolve(null);
          }
        });
      });
    }
  }
});
