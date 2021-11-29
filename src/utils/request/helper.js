import { debounce } from 'lodash-es';
import { router } from '@/router';
import store from '@/store';
import { toast, dialog } from '@/utils/modal';

/**
 * @description 操作登录
 */
export const handleLogin = debounce(async (res = {}, type = 'toast') => {
  await store.dispatch('user/logout');

  switch (type) {
    case 'dialog':
      {
        const result = await dialog(
          res.message || '登录状态已过期, 请重新登录!',
          {
            isCancel: true,
            confirmText: '重新登录',
          },
        );
        if (!result) return;
      }
      break;
    case 'toast':
      await toast(res.message || '登录状态已过期, 请重新登录!', {
        type: 'error',
      });
      break;
  }

  router.replaceAll({ path: '/pages/account/login/index' });
}, 500);

/**
 * @description 请求时输出 用于调试
 */
export function requestConsoles(req) {
  console.log('>>>>>>>>>> Request Start >>>>>>>>>>');
  console.log('url: ', req.url);
  console.log('data: ', req.data);
  console.log('params: ', req.params);
  console.log('request: ', req);
  console.log('>>>>>>>>>> Request End >>>>>>>>>>');
}

/**
 * @description 响应时输出 用于调试
 */
export function responseConsoles(res) {
  console.log('<<<<<<<<<< Response Start <<<<<<<<<<');
  console.log('url: ', res.config.url);
  console.log('data: ', res.data);
  console.log('response: ', res);
  console.log('<<<<<<<<<< Response End <<<<<<<<<<');
}
