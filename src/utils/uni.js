import { isString, isObject } from 'lodash-es';
/**
 * @desc 检测登录态是否过期
 */
export const wxCheckSession = () => new Promise((resolve) => uni.checkSession({
  success() {
    resolve(true);
  },
  fail() {
    resolve(false);
  },
}));

/**
 * @desc uni 弹窗
 * @param {*} content
 * @param {*} param1
 */
export function uniDialog(
  content,
  {
    isCancel = false,
    title = '提示',
    confirmText = '确认',
    cancelText = '取消',
    ...moreObj
  } = {},
) {
  return new Promise((resolve) => {
    uni.showModal({
      title,
      content,
      confirmText,
      showCancel: isCancel,
      cancelText,
      success({ confirm, cancel }) {
        if (confirm) {
          resolve(true);
        } else if (cancel) {
          resolve(false);
        }
      },
    });
  });
}

/**
 * @desc uni 轻提示
 * @param {*} content 内容
 * @param {*} options 扩展参数
 */
export function uniToast(
  content,
  {
    position = 'center',
    duration = 2000,
    isMask = true,
    icon = 'none',
    ...moreObj
  } = {},
) {
  if (content) {
    uni.showToast({
      title: content,
      position,
      duration,
      mask: isMask,
      icon,
      ...moreObj,
    });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(uni);
      }, duration);
    });
  }
  uni.hideToast();
}

/**
 * @desc 显示或隐藏loading
 * @param {*} content
 * @param {*} options
 */
export function uniLoading(content, { isMask = true, ...moreOptions } = {}) {
  return {
    start: () => uni.showLoading({
      title: content,
      mask: isMask,
      ...moreOptions,
    }),
    end: uni.hideLoading,
  };
}

/**
 * @desc uni 操作列表
 * @param {*} arr
 * @param {*} options
 */
export function uniActionSheet(
  arr,
  { name = 'text', textColor = '#000000', ...moreObj } = {},
) {
  return new Promise((resolve) => {
    uni.showActionSheet({
      itemList: arr.reduce(
        (arr, item) => arr.concat(isString(item) ? item : item[name]),
        [],
      ),
      itemColor: textColor,
      success({ tapIndex }) {
        resolve({ item: arr[tapIndex], index: tapIndex });
      },
      ...moreObj,
    });
  });
}

/**
 * @desc 检测某项权限是否已经获得
 * @param {string} scope 权限名称
 */
export function uniIsAuthorize(scope) {
  return new Promise((resolve) => {
    uni.getSetting({
      success(res) {
        console.log('getSetting.success', res);
        const isOpen = res.authSetting[scope];
        resolve(isOpen);
      },
      fail(err) {
        console.log('getSetting.success', err);
        resolve(false);
      },
    });
  });
}

/**
 * @desc 获取需要的系统权限
 * @param {string} scope 权限名称
 * @param {*} options
 */
export async function uniAuthorize(scope, { tips = '' } = {}) {
  let isAuth = await uniIsAuthorize(scope);
  return new Promise((resolve) => {
    isAuth && resolve(true);
    uni.authorize({
      scope,
      success(authorizeRes) {
        console.log('authorize.success', authorizeRes);
        resolve(true);
      },
      async fail(authorizeErr) {
        console.log('authorize.fail', authorizeErr);
        const result = await uniDialog(
          tips || '我们需要您提供相关系统权限,才能使用相关服务,是否手动开启?',
          { isCancel: true },
        );
        if (result) {
          uni.openSetting({
            success(openSettingRes) {
              console.log('openSetting.success', openSettingRes);
              isAuth = openSettingRes.authSetting[scope];
              isAuth && uniToast('开启成功!');
              resolve(isAuth);
            },
            fail(openSettingErr) {
              console.log('openSetting.fail', openSettingErr);
              uniToast(
                '请点击右上角,三个小点中的设置页面手动开启相关系统权限,开启成功后记得刷新列表哦',
              );
              resolve(false);
            },
          });
        } else {
          resolve(false);
        }
      },
    });
  });
}

/**
 * @desc 授权登录
 * @param {*} mixins 登录所需的参数
 */
export async function uniLogin({ provider = 'weixin', ...mixins } = {}) {
  return new Promise((resolve) => {
    uni.login({
      ...mixins,
      provider,
      success({ authResult, code, errMsg }) {
        console.log('authResult', authResult);
        console.log('code', code);
        console.log('errMsg', errMsg);
        resolve({
          authResult,
          code,
          errMsg,
          status: true,
        });
      },
      fail() {
        resolve({ status: false });
      },
    });
  });
}

/**
 * @desc uni预览图片
 * @param {array} list 要预览的图片列表
 * @param {*} mixins
 */
export async function uniPreviewImage(
  list = [],
  {
    index = 0,
    name = 'url',
    loop = true,
    actionList = [],
    actionName = 'name',
    ...mixins
  } = {},
) {
  console.log('uniPreviewImage.list', list);
  return uni.previewImage({
    urls: list.map((i) => (isObject(i) ? i[name] : i)),
    current: index,
    loop,
    ...(actionList.length
      ? {
        longPressActions: {
          itemList: actionList.map((i) => i[actionName]),
          success({ index, tapIndex }) {
            console.log('uniPreviewImage.success.data', data);
            actionName[data.tapIndex].success
                && actionName[data.tapIndex].success({
                  item: list[index],
                  actionItem: actionList[tapIndex],
                  index,
                  actionIndex: tapIndex,
                });
          },
          fail(err) {
            console.log('uniPreviewImage.fail.err', err);
          },
        },
      }
      : {}),
    ...mixins,
  });
}

/**
 * @desc  有value为设置反之为获取
 * @param {string} value 剪切板内容
 */
export function uniClipboardData(value) {
  return new Promise((resolve) => {
    if (value) {
      uni.setClipboardData({
        data: value,
        success(res) {
          console.log('uni.setClipboardData.success', res);
          resolve({ value, status: true });
        },
        fail(err) {
          console.log('uni.setClipboardData.success', err);
          resolve({ value: '', status: false });
        },
      });
    } else {
      uni.getClipboardData({
        success(res) {
          console.log('uni.getClipboardData.success', res);
          resolve({ value: res.data, status: true });
        },
        fail(err) {
          console.log('uni.setClipboardData.success', err);
          resolve({ value: '', status: false });
        },
      });
    }
  });
}

/**
 * @desc 通过相册或相机选取图片
 * @param {*} count 可选取的个数
 * @param {*} moreOptions 更多选项
 */
export function uniChooseImage(
  count = 1,
  { sourceType = ['album', 'camera'], ...moreOptions } = {},
) {
  return new Promise((resolve) => {
    uni.chooseImage({
      count, // 默认9
      sourceType, // 选择图片的方式
      ...moreOptions,
      success: ({ tempFilePaths, tempFiles }) => {
        console.log('uni.chooseImage.success.tempFilePaths', tempFilePaths);
        console.log('uni.chooseImage.success.tempFiles', tempFiles);
        resolve({
          status: true,
          localPathFileArr: tempFilePaths,
          formDataFileArr: tempFiles,
        });
      },
      fail: (err) => {
        console.log('uni.chooseImage.fail.err', err);
        resolve({ status: false, localPathFileArr: [], formDataFileArr: [] });
      },
    });
  });
}

/**
 * @desc 保存图片到相册
 * @param {string} filePath
 */
export function uniSaveImageToPhotosAlbum(filePath) {
  return new Promise((resolve) => {
    uni.saveImageToPhotosAlbum({
      filePath,
      success: (res) => {
        console.log('uni.saveImageToPhotosAlbum.success.res', res);
        resolve({ status: true });
      },
      fail: (err) => {
        console.log('uni.saveImageToPhotosAlbum.fail.err', err);
        resolve({ status: false });
      },
    });
  });
}

/**
 * @desc uni获取小程序appId
 */
export function uniGetAppId() {
  return uni.getAccountInfoSync
    ? uni.getAccountInfoSync().miniProgram.appId
    : '';
}

/**
 * @desc uni获取经纬度
 */
export function uniGetLocation({ type = 'wgs84', ...moreOptions } = {}) {
  return new Promise((resolve) => {
    uni.getLocation({
      type,
      success({ longitude, latitude }) {
        console.log(`当前位置的经度：${longitude}`);
        console.log(`当前位置的纬度：${latitude}`);
        resolve({
          longitude,
          latitude,
        });
      },
      ...moreOptions,
    });
  });
}

/**
 * @desc 调起内置地图选择位置
 */
export function uniChooseLocation({ ...moreOptions } = {}) {
  return new Promise((resolve) => {
    uni.chooseLocation({
      success(res) {
        console.log('uni.chooseLocation.res', res);
        const {
          address, latitude, longitude, name,
        } = res;
        resolve({
          status: true,
          address,
          latitude,
          longitude,
          name,
        });
      },
      fail(err) {
        console.log('uni.chooseLocation.err', err);
        resolve({
          status: false,
          address: '',
          latitude: 0,
          longitude: 0,
        });
      },
      ...moreOptions,
    });
  });
}

/**
 * @desc 调起内置地图查看位置
 */
export function uniOpenLocation({
  latitude = 39.909,
  longitude = 116.39742,
  ...moreOptions
} = {}) {
  return new Promise((resolve) => {
    uni.openLocation({
      latitude,
      longitude,
      success(res) {
        console.log('uni.uniOpenLocation.res', res);
        resolve({ status: true });
      },
      fail(err) {
        console.log('uni.uniOpenLocation.err', err);
        resolve({ status: false });
      },
      ...moreOptions,
    });
  });
}

/**
 * @desc 用户分享操作的vue混入
 */
export const uniShare = {
  data() {
    return {
      $shareObj: {
        title: '', // 默认为小程序名称
        path: '', // 默认为当前页面路径
        imageUrl: '', // 默认为当前页面的截图
      },
    };
  },
  onShareAppMessage({ from, target }) {
    return this.$shareObj;
  },
  onShareTimeline() {
    return this.$shareObj;
  },
};

/**
 * @desc 常用uni vue混入
 */
let _observer = null;
export const mixinUni = {
  data() {
    return {
      $shareObj: {
        title: '', // 默认为小程序名称
        path: '', // 默认为当前页面路径
        imageUrl: '', // 默认为当前页面的截图
      },
    };
  },
  onLoad() {
    this.isSetNavavigationBar && this.$setNavigationBarColor();
  },
  onUnload() {
    _observer && _observer.disconnect();
  },
  onShareAppMessage({ from, target }) {
    return this.$shareObj;
  },
  onShareTimeline() {
    return this.$shareObj;
  },
  computed: {
    siteInfo() {
      return this.$store.getters.siteInfo;
    },
  },
  methods: {
    // 交叉观察者
    $uniObserver(el = '', { parentEl = '', callBack } = {}) {
      _observer = uni.createIntersectionObserver(this, { observeAll: true });
      let observe = null;
      let appear = false;
      if (parentEl) {
        observe = _observer.relativeTo(parentEl).observe;
      } else {
        observe = _observer.relativeToViewport().observe;
      }
      observe(el, (res) => {
        if (res.intersectionRatio > 0 && !appear) {
          appear = true;
        } else if (!res.intersectionRatio > 0 && appear) {
          appear = false;
        }
        console.log('observe', appear);
        callBack(appear);
      });
    },
    // 获取远程文件地址
    $getFileUrl(value) {
      return this.siteInfo.fileBaseUrl + value;
    },
    // 设置导航栏颜色
    $setNavigationBarColor({ textColor, backgroundColor } = {}) {
      uni.setNavigationBarColor({
        frontColor: textColor || this.siteInfo.isDark ? '#000000' : '#ffffff',
        backgroundColor: backgroundColor || this.siteInfo.themeColor,
      });
    },
  },
};
