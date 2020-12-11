import { isObject, isString, tempImage } from './index.js';

/**
 * @desc api 是否存在
 */
export function isApi() {
  return !!window.api;
}

/**
 * @desc 打开window
 * @param pageParam 参数
 * @param option 选项
 */
export function apiOpenWin(option, pageParam = {}, config = {}) {
  if (!isApi()) {
    return;
  }
  let tempObj = {};
  if (isObject(option)) {
    tempObj = option;
  } else {
    tempObj = {
      name: option,
      url: option + ".html",
      pageParam,
      allowEdit: true,
      ...config
    }
  }
  api.openWin(tempObj);
};

/**
 * @desc 打开frame
 * @param option 选项
 * @param pageParam 参数
 * @param config 配置
 * @returns {function} 返回一个方法
 */
export function apiOpenFrame(option, pageParam = {}, config = {}) {
  if (!isApi()) {
    return;
  }
  let tempObj = {};
  if (isObject(option)) {
    tempObj = option;
  } else {
    tempObj = {
      name: option,
      url: option + ".html",
      pageParam,
      allowEdit: true,
      bgColor: "rgba(0,0,0,0)",
      ...config
    }
  }
  api.openFrame(tempObj);
};

/**
 * @desc 关闭window
 * @returns {function} 返回执行方法
 */
export function apiCloseWin(name, animation) {
  if (!isApi()) {
    return;
  }
  let options = {
    animation: animation || {
      type: "fade", //动画类型（详见动画类型常量）
      duration: 300 //动画过渡时间，默认300毫秒
    },
  };
  if (isString(name)) {
    options = {
      name,
      ...options
    }
  }
  return api.closeWin(options);
};
/**
 * @desc 关闭frame
 * @returns {function} 返回执行方法
 */
export function apiCloseFrame(name = '', animation) {
  if (!isApi()) {
    return;
  }
  let options = {
    animation: animation || {
      type: "fade", //动画类型（详见动画类型常量）
      duration: 300 //动画过渡时间，默认300毫秒
    },
  };
  if (isString(name)) {
    options = {
      name,
      ...options
    }
  }
  api.closeFrame(options);
};
/**
 * @desc 发送事件
 * @param {string} name 事件名称
 * @param {object} params 事件参数
 */
export function apiSendEvent(name = '', params = {}) {
  if (!isApi()) {
    return;
  }
  api.sendEvent({
    name,
    extra: {
      params
    }
  });
};
/**
 * @desc 监听事件
 * @param {string} name 事件名称
 * @param {function} fn 回调
 * @param {boolean} isOnce 是否只监听一次
 */
export function apiAddEventListener(name = '', fn, { isOnce = false } = {}) {
  if (!isApi()) {
    return;
  }
  api.addEventListener({
    name,
  }, (ret, err) => {
    console.log(name + ': ' + JSON.stringify(ret));
    const params = ret.value && ret.value.params ? ret.value.params : ret;
    fn && fn(params);
    isOnce && apiRemoveEventListener(name);
  });
};

/**
 * @desc 移除监听
 * @param {string} name 事件名称
 */
export function apiRemoveEventListener(name = '') {
  if (!isApi()) {
    return;
  }
  api.removeEventListener({
    name
  });
};

/**
 * @desc 操作剪切板
 * @param {string} value 有时为设置没有则为获取
 */
export function apiClipBoard(value, { isTips = true } = {}) {
  if (!isApi()) {
    return;
  }
  const clipBoard = api.require("clipBoard");
  return new Promise((resolve, reject) => {
    if (value) {
      clipBoard.set(
        {
          value,
        },
        (ret, err) => {
          console.log('apiClipBoard-set-ret:' + JSON.stringify(ret));
          console.log('apiClipBoard-set-err:' + JSON.stringify(err));
          if (ret.status) {
            isTips && apiToast("复制成功!");
            resolve && resolve({ status: true, value });
          } else {
            resolve && resolve({ status: false, value });
          }
        }
      );
    } else {
      clipBoard.get((ret, err) => {
        console.log('apiClipBoard-get-ret:' + JSON.stringify(ret));
        console.log('apiClipBoard-get-err:' + JSON.stringify(err));
        if (ret && ret.value) {
          resolve && resolve({ status: true, value: ret.value });
        } else {
          resolve && resolve({ status: false, value: '' });
        }
      });
    }
  })
};

/**
 * @desc 原生弹窗 
 * @param {string} content 内容
 * @param {object} options 选项 {isCancel, confirmText, cancelText }
 * @returns {promise} ret true | false
 */
export function apiDialog(content = "内容", { isCancel = false, title = "提示", confirmText = "确认", cancelText = "取消" } = {}) {
  if (!isApi()) {
    return;
  }
  const type = isCancel ? 'confirm' : 'alert';
  return new Promise((resolve) => {
    api[type](
      {
        title: title,
        msg: content,
        buttons: type === "alert" ? [confirmText] : [confirmText, cancelText],
      },
      ({ buttonIndex }) => {
        if (buttonIndex == 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    );
  });
}

/**
 * @desc 原生动作面板
 * @param {array} arr 自定义按钮数组 默认为text字段 可在options中用name改变 并可以携带需要的参数在info中返回
 * @param {object} options 其他选项 {name, warning, cancel, textColor, textColorActive, bgColor, bgColorActive, maskColor}
 * @returns {promise} { type: normal | warning | cancel, info, index } info为数组选中项详情
 */
export function apiActionSheet(
  arr,
  {
    cancel = "取消",
    textColor = "#000000",
    textColorActive = "#000000",
    bgColor = "#FFFFFF",
    bgColorActive = "#f2f3f5",
    maskColor = "rgba(0, 0, 0, 0.6)",
    name = "text",
    warning,
    ...moreObj
  } = {}
) {
  if (!isApi()) {
    return;
  }
  return new Promise((resolve) => {
    api.actionSheet(
      {
        buttons: arr.reduce((arr, item) => arr.concat(isString(item) ? item : item[name]), []),
        cancelTitle: cancel,
        ...(warning ? { destructiveTitle: warning } : {}),
        style: {
          fontNormalColor: textColor,
          fontPressColor: textColorActive,
          itemNormalColor: bgColor,
          itemPressColor: bgColorActive,
          layerColor: maskColor,
        },
        ...moreObj
      },
      ({ buttonIndex }) => {
        // console.log(JSON.stringify(buttonIndex));
        let tempObj = {};
        let index = warning ? buttonIndex - 2 : buttonIndex - 1;
        let info = arr[index];

        if (info) {
          tempObj = {
            type: "normal",
            info,
            index
          };
        } else if (warning && index == -1) {
          tempObj.type = "warning";
        } else {
          tempObj.type = "cancel";
        }
        console.log('apiActionSheet:' + JSON.stringify(tempObj));
        resolve(tempObj);
      }
    );
  });
}

/**
 * @desc 设置偏好数据，存储与本地文件系统。
 * @param key 索引名
 * @param value 数据
 */
export function apiSetStorage(key, value) {
  if (!isApi()) {
    return;
  }
  api.setPrefs({
    key: key,
    value: JSON.stringify(value)
  });
};

/**
 * @desc 获取偏好数据
 * @param key 索引名
 * @returns {object} 布尔类型
 */
export function apiGetStorage(key) {
  if (!isApi()) {
    return;
  }
  var value = api.getPrefs({
    sync: true,
    key: key
  });
  if (value) {
    value = JSON.parse(value);
  }
  return value;
};

/**
 * @desc 移除偏好数据
 * @param key 索引名
 */
export function apiRmStorage(key) {
  if (!isApi()) {
    return;
  }
  api.removePrefs({
    key: key
  });
};

/**
 * @desc 提示
 * @param {string} content 内容
 * @param {object} 选项
 */
export function apiToast(content, { position = 'middle', duration = 2000 } = {}) {
  if (!isApi()) {
    return;
  }

  api.toast({
    msg: content,
    location: position,
    duration: time
  });
};
/**
 * @desc frame是否在当前window中存在
 * @param name frame名称
 * @returns {boolean} 布尔类型
 */
export function apiIsFrame(name) {
  if (!isApi()) {
    return;
  }
  return api.frames().some((item) => item.name === name);
};

/**
 * @desc window是否存在
 * @param name window名称
 * @returns {boolean} 布尔类型
 */
export function apiIsWin(name) {
  if (!isApi()) {
    return;
  }
  return api.windows().some((item) => item.name === name);
};

/**
 * @desc 指定权限是否开启
 * @param name 权限名称
 * @returns {boolean} 布尔类型
 */
export function apiIsAuth(name) {
  if (!isApi()) {
    return;
  }
  var tempArr = api.hasPermission({
    list: [name || ""]
  });
  return tempArr.length && tempArr[0].granted;
};

/**
 * @desc 获取系统权限并执行 后续方法
 * @param name 权限名称
 * @returns {Promise} 回调
 */
export function apiGetSystemAuth(name) {
  if (!isApi()) {
    return;
  }
  return new Promise((resolve) => {
    if (apiIsAuth(name)) {
      resolve();
    } else {
      requestPermission(name);
    }
    function requestPermission(name, tips) {
      apiDialog(tips || '此操作需要获取相应系统权限,请点击确定').then((status) => {
        if (status) {
          api.requestPermission(
            {
              list: [name],
              code: 1
            },
            (ret, err) => {
              // console.log(JSON.stringify(ret));
              if (isIos) {
                //回到app时触发 解决ios 授权完成授权状态没有改变的问题
                apiAddEventListener("resume", (res) => {
                  apiGetSystemAuth(name);
                }, { isOnce: true });
              } else {
                if (ret.list[0].granted) {
                  resolve();
                } else {
                  requestPermission(name, '您拒绝了系统权限请求,这样将不能使用相关服务,是否手动开启?');
                }
              }
            }
          );
        } else {
          apiToast('您拒绝了相应系统权限申请');
        }
      })
    }
  });
};

/**
 * @desc 请求数据
 * @param {string} url 请求地址
 * @param {Any} options 请求方式或请求参数
 * @param {boolean} isEncrypt 是否加密
 * @returns {Promise} 回调
 */
export function apiAjax(url, options, { isEncrypt = false, isLoading = true } = {}) {
  if (!isApi()) {
    return;
  }
  let method = 'post';
  let params = {};
  let body = {};
  let key = '';
  const headers = {
    "Content-Type": "application/json;charset=utf-8",
    token: apiGetStorage("token") || ""
    // token: "1234"
    // token: "4321"
  };
  if (isString(options)) {
    method = options;
  } else {
    params = options;
  }
  if (isEncrypt) {
    key = getKey(); //生成随机key
    const _rsa = RSA(key); //生成对key 进行加密
    const _cipher = AESEnc(key, JSON.stringify(params)); //对传入的参数进行加密
    body = {
      _rsa,
      _cipher
    }
    console.log('key: ' + key);
    console.log('body: ' + JSON.stringify(body));
  } else {
    body = params;
  }
  return new Promise((resolve, reject) => {
    isLoading && api.showProgress({
      title: "努力加载中",
      text: "请稍后...",
      modal: true
    });
    api.ajax(
      {
        url,
        method,
        headers,
        data: {
          body
        }
      },
      (ret, err) => {
        console.log(ret);
        console.log(err);
        isLoading && api.hideProgress();
        if (ret) {
          if (ret.code == 403) {
            apiRmStorage("token");
            apiOpenWin(
              "postLogin_index",
              {},
              {
                slidBackEnabled: false
              }
            );
          } else {
            if (isEncrypt && ret.data) {
              ret.data = JSON.parse(AESDec(key, ret.data)); //解密
            }
          }
          resolve && resolve(ret);
        } else {
          apiToast(`操作失败,请检查网络状态! 错误码: ${err.statusCode}`);
          reject && reject(err);
        }
        console.log('-------------------------------------------------------------------start-------------------------------------------------------------------');
        console.log('当前页面打开方式: ' + api.frameName.length ? "frame" : "window");
        console.log('当前页面文件名: ' + api.frameName.length ? api.frameName : api.winName);
        console.log('headers: ' + JSON.stringify(headers));
        console.log('url: ' + JSON.stringify(url));
        console.log('params: ' + JSON.stringify(params));
        console.log('ret: ' + JSON.stringify(ret));
        console.log('err: ' + JSON.stringify(err));
        console.log('-------------------------------------------------------------------end-------------------------------------------------------------------');
      }
    );
  });
}

/**
 * @desc 有参数时显示loading 无参数时隐藏loading
 * @param {object} options 
 */
export function apiLoading(content, { modal = true, title = '加载中', ...moreObj } = {}) {
  if (!isApi()) {
    return;
  }
  if (content) {
    api.showProgress({
      text: content,
      title,
      modal,
      ...moreObj
    });
  } else {
    api.hideProgress();
  }
};

export const mixinApicloud = {
  mounted() {
    this.$pageViewappearMonitor();
  },
  methods: {
    $apiOpenWin: apiOpenWin,
    $apiOpenFrame: apiOpenFrame,
    $apiCloseWin: apiCloseWin,
    $apiCloseFrame: apiCloseFrame,
    $tempImage: tempImage,
    $apiSendEvent: apiSendEvent,
    $apiAddEventListener: apiAddEventListener,
    /**
     * @desc 初始化window显示监听事件 并改变顶部导航栏颜色 支持监听回调
     * @param {function} callBack 
     */
    $pageViewappearMonitor(callBack) {
      if (!isApi()) {
        return;
      }
      if (this.topSafeAreaColor) {
        const setStatusBarStyle = style => this.$ac.setStatusBarStyle({
          style,
          color: "transparent"
        });

        setStatusBarStyle(this.topSafeAreaColor);

        apiAddEventListener('viewappear', () => {
          setStatusBarStyle(this.topSafeAreaColor);
          callBack && callBack.call(this);
        });
      }
    },
    /**
     * @desc 存取 全局数据 仅在程序运行期间有效
     * @param {string} key 名称
     * @param {object} value 值
    */
    $handleGlobalData(key, value) {
      if (!isApi()) {
        return;
      }

      if (value) {
        this.$ac.setGlobalData({
          key,
          value,
        }); //发送数据更新事件

        apiSendEvent({
          name: "globalDataChangeEvent",
          extra: key
        });
      } else {
        value = this.$ac.getGlobalData({
          key,
        }) || this[key];
      }

      this[key] = value; //监听全局数据的变化

      apiAddEventListener('globalDataChangeEvent',
        (ret) => {
          this.handleGlobalData(ret);
        }
      );
    },
    /**
     * @desc 下拉刷新 上拉加载 数据封装
     * @param {Array} data 数组
     * @param {string} list 列表名称
     * @param {function} length 每次返回的数组长度
    */
    $loadUtils(key, data, { length = 20, upLoading = 'upLoading', downLoading = 'downLoading', finished = 'finished' } = {}) {

      if (this[upLoading]) {
        this[key] = this[key].concat(data);
        this[upLoading] = false;
      } else {
        this[key] = data;
        this[downLoading] = false;
      }

      if (data.length < length) {
        this[finished] = true;
      } else {
        this[finished] = false;
      }
    },
  },
}