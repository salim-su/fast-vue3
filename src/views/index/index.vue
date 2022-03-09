<template>
  <van-nav-bar title="标题" fixed="true" />
  <h1 class="style">我是父组件</h1>
  <div>
    <button @click="updateStore('canshu')">updateStore</button>
  </div>
  <input type="text" v-model="nameVal" />

  <div>
    <h1>子组件传来的值</h1>
    <h1>{{ childData }}</h1>
  </div>
  <Child @updata="updata" :name="nameVal">
    <template #title>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
      <h1>我是具名插槽</h1>
    </template>
  </Child>
  <van-cell-group inset>
    <van-field v-model="value" label="文本" placeholder="请输入用户名" />
    <van-field v-model="value1" label="文本" placeholder="请输入用户名1" />
  </van-cell-group>
</template>

<script type="ts" setup>
// const { data } = await apPage()
// console.log(data)
import { apPage, getName } from "@/api";
import { computed, ref, watch, watchEffect } from "vue";
import Child from "@/components/Child.vue";
import { useUserStore } from "@/store/modules/user";
import { storeToRefs } from "pinia";

// getName().then(res => {
//   console.log(res);
// })
apPage();
const value = ref('salimsu');
const value1 = ref('salimsu1');
const nameVal = ref('salimsu');

const userStore = useUserStore();
console.log(userStore.getUesrToken)
let num = 1;

const store = computed(() => {
  return userStore.getUesrToken
})
console.log(store)
console.log(userStore.getUesrToken)
const { token } = storeToRefs(userStore)
console.log(token)
const updateStore = (canshu) => {
  num++;
  console.log(canshu)
  userStore.setToken(canshu+num);
  console.log(userStore.token);
}

watch(token, (currentValue, prevValue) => {
  console.log(currentValue)
  console.log(prevValue)
})
// watchEffect((userStore) => {
//   userStore
// })
const obj = {
  name: 'salimsu',
  age: 18,
  sex: '男',
}
let childData = ref('1');
console.log(childData)
const updata = (data) => {
  console.log(data); //我是子组件的值
  childData.value = data;
  console.log(childData)
}
const { age } = obj;
console.log(age)

watch(value, (currentValue, prevValue) => {
  console.log(currentValue)
  console.log(prevValue)
})

watch(value1, (currentValue, prevValue) => {
  console.log(currentValue)
  console.log(prevValue)
})
// computed()
</script>
<style scoped>
.style {
  width: 100%;
  height: 50px;
  background: #41b6a6;
}
</style>
