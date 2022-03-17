<script setup>
import { computed, defineProps, ref } from 'vue';

const props = defineProps({
  msg: String,
  defaultActive: {
    type: Number,
    default: 0
  },
  data: {
    type: Array,
    default: () => {
      return [];
    }
  }
});

// const active = computed({
//   get() {
//     return defineProps('defaultActive');
//   }
// });

const active = computed(() => {
  return props.defaultActive;
});
//引入图标
// const inactivess = ref(new URL(`../../src/assets/img/index.svg`, import.meta.url).href);
</script>

<template>
  <div>
    <!--    <h1>{{ msg + '1' }}</h1>-->
    <!--    <h1>{{ props.msg }}</h1>-->
    <!--    <h1>{{ active }}</h1>-->
    <!--    <input type="text" v-model="active" />-->

    <!--    <van-icon :name="inactivess"></van-icon>-->

    <van-tabbar :border="false" class="tabbar" fixed route v-model="active">
      <van-tabbar-item :key="index" :replace="true" :to="item.to" v-for="(item, index) in data">
        <!--        <h1>{{item.icon.inactive"}}</h1>-->
        <template #icon="props">
          <!--          {{ props }}-->
          <van-icon :name="props.active ? item.icon.active : item.icon.inactive" class-prefix="my-icon" />
          <!--          <van-icon name="http://localhost:3000/src/assets/img/index.svg" />-->
          <!--          <h1>{{ item.icon.active }}</h1>-->

          <!--          <img src="../assets/logo.png" alt="" width="50" />-->
        </template>
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>

    <!--    <van-tabbar v-model="active">-->
    <!--      <van-tabbar-item icon="home-o">标签</van-tabbar-item>-->
    <!--      <van-tabbar-item icon="search">标签</van-tabbar-item>-->
    <!--      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>-->
    <!--      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>-->
    <!--    </van-tabbar>-->
  </div>
  <!--  <div>{{ msg }}</div>-->
</template>

<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.van-tabbar-item {
  color: #cdcdcd !important;
}

.van-tabbar-item--active {
  color: #41b6a6 !important;
}

.van-tabbar {
  height: 60px !important;
}
</style>
