import axios from 'axios';
import qs from 'qs';
import { debounce } from 'lodash-es';
import store from '@/store';
import {
  baseURL,
  timeout,
  responseSuccessCode,
  tokenName,
  tokenPrefix,
} from '@/configs/request';
import { binaryParser } from '@/utils';
import adapter from './adapter';
import { toast, loading } from '@/utils/modal';
import { handleLogin, requestConsoles, responseConsoles } from './helper';

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

const service = axios.create({
  baseURL,
  timeout,
  adapter,
});

const handleLoading = loading('加载中, 请稍后...');

// 请求拦截
service.interceptors.request.use(
  (request) => {
    requestConsoles(request);

    const showLoading = request.showLoading;
    if (showLoading) {
      // 开启加载动画
      handleLoading.start();
    }

    const token = store.getters.token;
    if (token) request.headers[tokenName] = tokenPrefix + token;

    // 解决query无法传递数组的问题
    request.paramsSerializer = (params) => qs.stringify(params, {
      arrayFormat: 'repeat',
    });

    return request;
  },
  (error) => Promise.reject(error),
);

const closeLoading = debounce(handleLoading.end, 500);
// 响应拦截
service.interceptors.response.use(
  async (response) => {
    responseConsoles(response);

    const showLoading = response.config.showLoading;
    if (showLoading) {
      // 关闭加载动画
      closeLoading();
    }

    let res = response.data;
    // 文件二进制流响应全部数据（PS:文件名在请求头中）
    if (response.request && response.request.responseType === 'blob') {
      res = await binaryParser(response);
    }

    if (
      res.code === '1005'
      || res.code === '1006'
      || res.code === '1000'
      || (res.code === '1010' && response.config.url.indexOf('/login') === -1)
    ) {
      handleLogin(res);
    } else if (res.code !== responseSuccessCode && res.message) {
      toast(res.message, {
        type: 'warning',
        duration: 5 * 1000,
      });
    } else {
      return res;
    }
  },
  (error) => {
    console.log(`err${error}`); // for debug
    const status = error.response.status;

    if (status === 401 || status === 403) {
      handleLogin();
    } else {
      toast(error.message, {
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(error);
    }
  },
);

// todo
service.postForm = (url, data, options) => service.post(url, qs.stringify(data), {
  ...options,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default service;
