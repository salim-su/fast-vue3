import { createFetch, ignorableWatch } from '@vueuse/core';
import { Notify } from 'vant';
import { reactive, ref } from 'vue';

const useFetchApi = createFetch({
  baseUrl: '',
  options: {
    async beforeFetch({ options }) {
      const myToken = 'token';
      // options.headers = {
      //   ...options.headers,
      //   Authorization: `Bearer ${myToken}`
      // };
      options.headers = {
        Authorization: 'Basic c3dvcmQ6c3dvcmRfc2VjcmV0',
        'Tenant-Id': '000000'
      };
      return { options };
    },
    afterFetch(ctx) {
      console.log(ctx.data);
      console.log(ctx.response);

      const data = eval('(' + ctx.data + ')');
      console.log(data);

      if (data.error_code == '400') {
        Notify({ type: 'danger', message: data.error_description });
      }
      // ctx.data = 'salimsu';
      // const { data, response } = ctx;
      // console.log(eval('(' + data + ')'));
      // console.log(eval('(' + response + ')'));
      // const result = eval('(' + response + ')');
      // if (result) {
      //   console.log(1111);
      // } else {
      //   console.log(2222);
      // }
      // ctx.data = reactive(result);
      // if (response.status >= 200 && response.status < 300) {
      //   try {
      //     console.log(response);
      //     const jsonObj = data;
      //     if (jsonObj.code != 200) {
      //       Notify({ type: 'danger', message: jsonObj.message || 'Error' });
      //     }
      //     ctx.data = jsonObj.data;
      //   } catch (error) {
      //     console.error(error);
      //     ctx.data = null;
      //   }
      // } else {
      //   Notify({ type: 'danger', message: response.statusText || 'Error' });
      //   ctx.data = null;
      // }
      return ctx;
    }
  }
});

export default useFetchApi;
