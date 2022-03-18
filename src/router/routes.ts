import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'Index',
    path: '/index',
    component: () => import('@/views/index/index.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true,
      title: 'index'
    }
  },
  {
    name: 'Test',
    path: '/test',
    component: () => import('@/views/test/test.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true,
      title: 'test'
    }
  },
  {
    name: 'Dispatch',
    path: '/dispatch',
    component: () => import('@/views/dispatch/dispatch.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true,
      title: 'dispatch'
    }
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/login.vue'),
    meta: {
      keepAlive: true,
      requireAuth: true,
      title: 'login'
    }
  },
  {
    path: '/',
    name: '/',
    redirect: '/index'
  }
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
  // {
  //   path: '/',
  //   name: '/',
  //   component: () => import('@/views/layouts/layouts.vue'),
  //   redirect: '/index',
  //   meta: {
  //     title: '首页',
  //     keepAlive: false,
  //     requireAuth: false
  //   },
  //   children: [
  //     {
  //       path: '/index',
  //       name: 'Index',
  //       component: () => import('@/views/index/index.vue'),
  //       meta: { title: '首页', keepAlive: false, requireAuth: false }
  //     },
  //     {
  //       path: '/home',
  //       name: 'Home',
  //       component: () => import('@/views/home/home.vue'),
  //       meta: { title: '我的', keepAlive: false, requireAuth: false }
  //     }
  //   ]
  // }
];

export default routes;
