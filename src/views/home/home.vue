<template>
  <h1>home</h1>
  <nut-button type="info" @click="gohome">信息按钮</nut-button>
  <nut-button type="default">默认按钮</nut-button>
  <nut-button type="danger">危险按钮</nut-button>

  <h1>salimsu1</h1>
  <van-button type="warning">警告按钮</van-button>
  <div>
    <van-cell is-link @click="showPopup">展示弹出层</van-cell>
    <van-popup v-model:show="show">内容</van-popup>
    <div v-if="show">show</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import router from '@/router';

const show = ref(false);
const showPopup = () => {
  show.value = true;
};
const gohome = () => {
  localStorage.clear();
  router.push({ name: '/' });
};
// export default defineComponent({
//   name: 'Button',
//   setup() {
//     // const { data } = getSafetyNotice();
//     const data1 = apPage();
//     const show = ref(false);
//     const showPopup = () => {
//       show.value = true;
//     };
//     // console.log(data);
//     console.log(data1);
//
//     const userStore = useUserStore();
//     const getUserInfo = computed(() => {
//       const { name = '' } = userStore.getUserInfo || {};
//       return name;
//     });
//     return {
//       getUserInfo,
//       show,
//       showPopup
//     };
//   }
// });
</script>
