import { createApp } from 'vue';
import App from './App.vue';
import { nutUiComponents } from './plugins/nutUI';
import { vantUiComponents } from './plugins/vantUI';
// import { i18n } from './i18n';
import router from './router';
import { setupStore } from '@/store';
import 'lib-flexible/flexible.js';

const app = createApp(App);
app.config.globalProperties.$title = 'salimsu';
app.use(router);
setupStore(app);
// app.use(i18n);
app.mount('#app');
// nutUi按需加载
nutUiComponents.forEach((item) => {
  app.use(item);
});
// vantUi按需加载
vantUiComponents.forEach((item) => {
  app.use(item);
});
