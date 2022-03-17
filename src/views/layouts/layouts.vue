<template>
  <!--  <h1>layouts</h1>-->
  <div class="app-container">
    <div class="layout-content">
      <!--      <div class="topTips"  v-show="this.$isIOS.v"></div>-->
      <!--      <keep-alive v-if="route.meta.keepAlive">-->
      <!--        <router-view></router-view>-->
      <!--      </keep-alive>-->
      <!--      <router-view v-else></router-view>-->
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component v-if="route.meta && route.meta.keepAlive" :is="Component" :key="route.meta.usePathKey ? route.fullPath : undefined" />
        </keep-alive>
        <component v-if="!(route.meta && route.meta.keepAlive)" :is="Component" :key="route.meta.usePathKey ? route.fullPath : undefined" />
      </router-view>
      <!---->
      <!--      <router-view></router-view>-->
    </div>
    <div class="layout-footer" v-if="false">
      <!--      <TabBar :data="tabbars" />-->
      <TabBar :data="tabbars"></TabBar>
    </div>
  </div>
</template>

<script setup>
import TabBar from '../../components/TabBar.vue';
import HelloWorld from "../../components/HelloWorld";

const tabbars = [
  {
    title: '首页',
    to: {
      name: 'Index',
      replace: true
    },
    icon: {
      active: new URL(`../../assets/img/index-sel.svg`, import.meta.url).href,
      inactive: new URL(`../../assets/img/index.svg`, import.meta.url).href
      // inactive: require('../../../static/img/index.svg')
    }
  },
  {
    title: '我的',
    to: {
      name: 'Home',
      replace: true
    },
    icon: {
      active: new URL(`../../assets/img/mine-sel.svg`, import.meta.url).href,
      inactive: new URL(`../../assets/img/mine.svg`, import.meta.url).href
    }
  }
];
</script>

<style scoped></style>
