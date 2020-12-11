import Vue from 'vue';


export function dialog(content, { isCancel = false, title = '提示', confirmText = '确定', cancelText = '取消' } = {}) {
  return new Promise(resolve => {
    Vue.prototype.$dialog.confirm({
      text: content,
      title,
      actions: {
        true: confirmText,
        ...isCancel ? {
          false: cancelText,
        } : {},
      },
    }).then(ret => {
      if (ret) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export function toast(content, { type = 'error', position = 'top-right', duration = 2000 } = {}) {
  return new Promise((resolve) => {
    Vue.prototype.$dialog.message[type](content, {
      position,
      timeout: duration
    }).then(() => {
      resolve(true);
    });
  });
};

let closeLoading;
export async function loading(content, { ...moreObj } = {}) {
  if (content) {
    Vue.prototype.$dialog.withLoading(
      {
        text: content,
        ...moreObj
      },
      () =>
        new Promise(function (resolve) {
          closeLoading = resolve;
        })
    );
  } else {
    closeLoading();
  }
};

export function notify(content, { type = 'error', position = 'top-right', duration = 2000 } = {}) {
  return new Promise((resolve) => {
    Vue.prototype.$dialog.notify[type](content, {
      position,
      timeout: duration
    }).then(() => {
      resolve(true);
    });
  });
};