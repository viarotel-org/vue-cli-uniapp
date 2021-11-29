import Vue from 'vue';
import App from '@/App';
import store from '@/store';

import { router, RouterMount } from '@/router';

import plugins from '@/plugins';

import requests from '@/requests';

import icons from '@/icons';

import directives from '@/directives';

import tempImage from './utils/tempImage';

import showDictLabel from './utils/showDictLabel';

import { dialog, toast, loading } from './utils/modal';

Vue.config.productionTip = false;

App.mpType = 'app';

Vue.use(router);
Vue.use(plugins);
Vue.use(requests);
Vue.use(icons);
Vue.use(directives);
Vue.prototype.$tempImage = tempImage;
Vue.prototype.$showDictLabel = showDictLabel;
Vue.prototype.$dialog = dialog;
Vue.prototype.$toast = toast;
Vue.prototype.$loading = loading;

const app = new Vue({
  store,
  ...App,
});

// v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app');
// #endif

// #ifndef H5
app.$mount(); // 为了兼容小程序及app端必须这样写才有效果
// #endif
