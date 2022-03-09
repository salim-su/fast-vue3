import { createRouter, createWebHashHistory, createWebHistory, Router } from 'vue-router';
import routes from './routes';
import { getCurrentInstance } from 'vue';
// import { APP_TITLE } from '@config/constant';
// import logo from '@assets'
// import logo from '@config'
import { x } from '@config/index';
import { API_BASE_URL } from '@config/constant';
import { useUserStore } from '@/store/modules/user';
import { Toast } from 'vant/lib';
import { useCookies } from '@vueuse/integrations/useCookies';
const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: routes
});

console.log(getCurrentInstance());

router.beforeEach(async (to, from, next) => {
  const token = window.localStorage.getItem('token');
  console.log(token);
  if (to.meta.title) {
    console.log(to);
    document.title = `${to.meta.title}`;
  } else {
    document.title = 'proxy';
  }
  if (to.meta.requireAuth) {
    if (token) {
      console.log('有token');
      next();
    } else {
      if (to.path === '/login') {
        console.log('无token，path为' + `${to.path}`);
        next();
      } else {
        console.log('无token，path为' + `${to.path}`);
        next({
          path: '/login'
        });
      }
    }
  } else {
    Toast('无权限');
    next();
  }

  // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  //   if (localStorage.getItem('token')) { // 判断本地是否存在access_token
  //     next()
  //   } else {
  //     if (to.path === '/login') {
  //       next()
  //     } else {
  //       next({
  //         path: '/login'
  //       })
  //     }
  //   }
  // } else {
  //   next()
  // }
});

export default router;
