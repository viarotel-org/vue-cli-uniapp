import Vue from 'vue';

Vue.config.productionTip = false;

import App from './App';
App.mpType = 'app';

import store from './store';
Vue.prototype.$store = store;

import uView from "uview-ui";
Vue.use(uView);

import request from "./request";
Vue.use(request);

// this.$Router操作路由 this.$Route获取参数
import './plugins/uniRouter';

import { tempImage } from "./utils";
Vue.prototype.$tempImage = tempImage;

//自定义或原生底部导航栏适配器跳转工具
import uniTabberAdapterSkip from "@/plugins/uniTabberAdapterSkip";
Vue.prototype.$uniTabberAdapterSkip = uniTabberAdapterSkip;

//支持异步操作的计算属性工具
import AsyncComputed from 'vue-async-computed';
Vue.use(AsyncComputed)

const app = new Vue({
    store,
    ...App
});

//H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
import { RouterMount } from 'uni-simple-router';
RouterMount(app, '#app');
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif