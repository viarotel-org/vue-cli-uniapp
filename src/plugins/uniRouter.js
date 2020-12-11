import Vue from 'vue';
import Router from 'uni-simple-router';
// import store from '@/store';
Vue.use(Router);

const router = new Router({
  // encodeURI: false,
  routes: ROUTES //pages.json中读取的路由表
});

//全局路由前置守卫
// router.beforeEach((to, from, next) => {
//   console.log('router.beforeEach.to:', to);
//   console.log('router.beforeEach.from:', from);
//   // switch (to.name) {
//   //   case 'home':
//   //     if (!store.getters.token) {
//   //       return next({ name: 'account' });
//   //     }
//   //     break;
//   // }
//   next();
// });
// // 全局路由后置守卫
// router.afterEach((to, from) => {
// });

export default router;