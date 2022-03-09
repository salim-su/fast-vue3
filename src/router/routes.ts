import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  // {
  //   name: 'Home',
  //   path: '/home',
  //   component: () => import('@/views/home/home.vue'),
  //   meta: {
  //     keepAlive: true,
  //     requireAuth: true,
  //     title: 'home'
  //   }
  // },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      keepAlive: true,
      requireAuth: false,
      title: 'login'
    }
  },
  // {
  //   name: 'Index',
  //   path: '/index',
  //   component: () => import('@/views/index/index.vue'),
  //   meta: {
  //     keepAlive: true,
  //     requireAuth: true,
  //     title: 'index'
  //   }
  // },
  {
    path: '/',
    name: '/',
    component: () => import('@/views/layouts/layouts.vue'),
    redirect: '/index',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: false
    },
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: { title: '首页', keepAlive: true, requireAuth: true }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/home.vue'),
        meta: { title: '我的', keepAlive: true, requireAuth: true }
      }
    ]
  }
];

export default routes;
