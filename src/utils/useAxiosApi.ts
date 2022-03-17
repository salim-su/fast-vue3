import { useAxios } from '@vueuse/integrations/useAxios';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios/index';
import { Toast } from 'vant/lib';
import { useUserStore } from '@/store/modules/user';
import router from '@/router';

// create an axios instance
const instance = axios.create({
  withCredentials: false,
  timeout: 5000
});
// request interceptor
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log(config);
    // const userStore = useUserStore();
    // useCookies
    // do something before request is sent
    const token = localStorage.getItem('token');
    //
    if (token) {
      // let each request carry token
      config.headers = {
        ...config.headers,
        Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
        'Blade-Auth': `Bearer ${token}`
      };
    }
    return config;
  },
  (error: any) => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response: AxiosResponse) => {
    console.log(response);
    const res = response.data;
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      // alert('salimsu');
      Toast(res.msg);
      // 412: Token expired;
      if (res.code === 412) {
        // store.dispatch('user/userLogout');
      }
      return Promise.reject(res.msg || 'Error');
    } else {
      console.log(res);
      return Promise.resolve(res);
    }
  },
  (error: any) => {
    console.log(error);
    // alert('salimsu');
    // console.log('err' + error);
    console.log(error.message);
    console.log(error);
    console.log(error.response);

    if (error.message.includes('timeout')) {
      // 判断请求异常信息中是否含有超时timeout字符串
      Toast({
        message: '请求超时',
        className: 'salimsu',
        duration: 1000
      });
      // setTimeout((res) => {
      //   router.push({ name: 'Login' });
      // }, 1000);
    }

    const errorResponse = error.response.data;
    console.log(error.response.data.code);
    // Toast(errorResponse.msg);
    // console.log(errorResponse);
    if (errorResponse.code === 401) {
      Toast({
        message: errorResponse.msg + '请重新登录',
        className: 'salimsu',
        duration: 1000
      });
      setTimeout((res) => {
        router.push({ name: 'Login' });
      }, 1000);
    }
    if (errorResponse.code === 500) {
      //msg
      Toast({
        message: errorResponse.msg,
        className: 'salimsu',
        duration: 1000
      });
    }
    // Toast(error.message);
    // return Promise.reject(error.message);
    return Promise.reject(errorResponse.msg);
  }
);

/**
 * reactive useFetchApi
 */

// export default function useAxiosApi(url: string, config: AxiosRequestConfig) {
//   // console.log(useAxios(url, config, instance));
//   return Promise.resolve(useAxios(url, config, instance));
// }
export default instance;
