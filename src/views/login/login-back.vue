<template>
  <div class="login">
    <h2>登录</h2>
    <nut-form :model-value="formData" ref="ruleForm">
      <nut-form-item required prop="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <input class="nut-input-text" v-model="formData.username" placeholder="请输入用户名" type="text" />
      </nut-form-item>
      <nut-form-item required prop="password" :rules="[{ required: true, message: '请填写联系电话' }]">
        <input class="nut-input-text" v-model="formData.password" placeholder="请输入密码" type="password" />
      </nut-form-item>
      <nut-button block type="info" @click="submit">登录</nut-button>
    </nut-form>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { ComponentInternalInstance, defineComponent, getCurrentInstance, reactive, ref } from 'vue';
import { useUserStore } from '@/store/modules/user';
import MD5 from 'md5';

const userStore = useUserStore();

export default defineComponent({
  setup() {
    const formData = reactive({
      username: '',
      password: ''
    });
    const ruleForm = ref<any>(null);
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    console.log(proxy?.$data);
    const submit = () => {
      ruleForm.value.validate().then(async ({ valid, errors }: any) => {
        if (valid) {
          const postdata = {
            grant_type: 'password',
            tenantId: '000000',
            username: formData.username,
            password: MD5(formData.password)
          };
          await userStore.login(postdata).then((res) => {
            console.log(res + 'login的数据');
          });
          await router.push({ name: '/' });
        } else {
          console.log('error submit!!', errors);
        }
      });
    };

    return {
      ruleForm,
      formData,
      submit
    };
  }
});
</script>

<style scoped lang="scss">
.login {
  padding: 20px;

  h2 {
    text-align: center;
    letter-spacing: 10px;
  }

  .nut-form-item {
    background: #f2f3f5;
    border-radius: 20px;
    margin-bottom: 20px;

    input {
      background: transparent;
    }
  }
}
</style>
