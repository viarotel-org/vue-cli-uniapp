import { Dialog, Notify, Toast } from 'vant';


export function dialog(content, { isCancel = false, title = '提示', confirmText = '确认', cancelText = '取消', ...moreObj } = {}) {
  return new Promise(resolve => {
    Dialog({
      title,
      message: content,
      confirmButtonText: confirmText,
      showCancelButton: !!cancelText || isCancel,
      cancelButtonText: cancelText || '取消',
      ...moreObj,
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        resolve(false);
      });
  });
};

export function toast(content, { position = 'middle', duration = 2000, forbidClick = true, ...moreObj } = {}) {
  return new Promise(resolve => {
    Toast({
      message: content,
      position,
      duration,
      forbidClick,
      onClose() {
        resolve(true);
      },
      ...moreObj,
    });
  });
};

export function loading(content, { duration = 0, forbidClick = true, ...moreObj } = {}) {
  if (content) {
    Toast.loading({
      message: content,
      duration,
      forbidClick,
      ...moreObj,
    });
  } else {
    Toast.clear();
  }
  return Toast;
};

export function notify(content, { duration = 2000, ...moreObj } = {}) {
  return new Promise(resolve => {
    Notify({
      message: content,
      type,
      duration,
      onClose() {
        resolve(true);
      },
      ...moreObj,
    });
  });
};