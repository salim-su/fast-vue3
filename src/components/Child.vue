<template>
  <div>
    <h1 class="style">我是子组件</h1>
    <button @click="ziupdata">按钮</button>
  </div>

  <div>
    <h1>父组件给我的值</h1>
    <h1>{{ name }}</h1>
  </div>

  <div>
    <h1>插槽</h1>
    <slot name="title" />
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

//自定义函数，父组件可以触发
const em = defineEmits(['updata']);
const ziupdata = () => {
  em('updata', '我是子组件的值');
};

// defineProps({
//   name: {
//     type: String,
//     default: '我是默认值'
//   })

defineProps({
  name: {
    type: String,
    default: 'default'
  }
});
</script>

<style scoped>
.style {
  width: 100%;
  height: 50px;
  background: #41b6a6;
}
</style>
