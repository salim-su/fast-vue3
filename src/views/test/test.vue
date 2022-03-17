<template>
  <div>
    <button
      v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0]"
      :key="index"
      @click="go"
      style="height: 100px; display: block"
    >
      salimsu</button
    >
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';

const go = () => {
  router.push({ path: '/index' });
};
</script>

<style scoped lang="less"></style>
