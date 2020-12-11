/**
 * @file apicloud 常用工具封装
 * @author viarotel <viarotel@163.com> 
 */

const _hasOwnProperty = Object.prototype.hasOwnProperty;

const _toString = Object.prototype.toString;

/**
 * @desc 获取原始类型 
 * @param {any} value toRawType('') String Array Date Number Function Boolean Null
 */
export function toRawType(value) {
  return _toString.call(value).slice(8, -1);
}

export function isObject(input) {
  return toRawType(input) === "Object";
};
export function isArray(input) {
  return (
    input instanceof Array ||
    toRawType(input) === "Array"
  );
};
export function isDate(input) {
  return (
    input instanceof Date ||
    toRawType(input) === "Date"
  );
};
export function isNumber(input) {
  return (
    input instanceof Number ||
    toRawType(input) === "Number"
  );
};

export function isString(input) {
  return (
    input instanceof String ||
    toRawType(input) === "String"
  );
};

export function isStringNumber(value) {
  return /^\d+$/.test(value) && isString(value);
}

export function isBoolean(input) {
  return typeof input == "boolean";
};
export function isFunction(input) {
  return typeof input == "function";
};
export function isNull(input) {
  return input === undefined || input === null;
};

export function isNullObject(input) {
  return !Object.keys(input).length;
};

export function isPlainObject(obj) {
  if (
    obj &&
    toRawType(obj) === "Object" &&
    obj.constructor === Object &&
    !_hasOwnProperty.call(obj, "constructor")
  ) {
    var key;
    for (key in obj) {
    }
    return key === undefined || _hasOwnProperty.call(obj, key);
  }
  return false;
};
export function freeze(obj) {
  //冻结对象
  Object.freeze(obj);
  Object.keys(obj).forEach(function (key, value) {
    if (isObject(obj[key])) {
      freeze(obj[key]);
    }
  });
  return obj;
};

/**
 * @desc 深度克隆
 * @param {object} value 
 * @returns {object}
 */
export function deepClone(value) {
  let ret;

  switch (toRawType(value)) {
    case 'Object':
      ret = {};
      break;
    case 'Array':
      ret = [];
      break;
    default:
      return value;
  }

  Object.keys(value).forEach((key) => {
    const copy = value[key]
    ret[key] = deepClone(copy)
  });

  return ret
}

/**
 * @desc 深度合并克隆
 * @param {object} origin 原对象
 * @param  {...object} params 多个对象
 */
export function deepAssign(origin, ...objs) {
  let tempObj = objs.reduce((obj, i) => {
    obj = { ...obj, ...i };
    return obj
  }, {});

  return deepClone({ ...origin, ...tempObj });
}

/**
 * @desc 检测指定的一个或多个keys在obj中是否同时存在
 * @param {object} obj 
 * @param {string} keys
 */
export function isAttrs(obj, ...keys) {
  return !keys.some(i => !_hasOwnProperty.call(obj, i));
}

/**
 * @desc 检测指定的一个或多个keys在obj中是否具有不存在的
 * @param {object} obj 
 * @param {string} keys
 */
export function isNoAttrs(obj, ...keys) {
  return keys.some(i => !_hasOwnProperty.call(obj, i));
}

/**
 * @desc 获取指定路径的对象的值
 * @param {object} obj 
 * @param {string} keypath 路径
 * @returns {any}
 */
export function getKeyValue(obj, keypath) {
  if (!isObject(obj)) {
    return null;
  }
  let array = null;
  if (isArray(keypath)) {
    array = keypath;
  } else if (isString(keypath)) {
    array = keypath.split('.');
  }
  if (array == null || array.length == 0) {
    return null;
  }
  let value = null;
  let key = array.shift();
  const keyTest = key.match(new RegExp("^(\\w+)\\[(\\d+)\\]$"));
  if (keyTest) {
    key = keyTest[1];
    let index = keyTest[2];
    value = obj[key];
    if (isArray(value) && value.length > index) {
      value = value[index];
    }
  } else {
    value = obj[key];
  }

  if (array.length > 0) {
    return getKeyValue(value, array)
  }
  return value;
};
/**
 * @desc 根据指定的路径设置对象的值
 * @param {*} obj
 * @param {*} keypath 路径
 * @param {*} value 
 * @param {*} orignal 
 * @returns {object}
 */
export function setKeyValue(obj, keypath, value, orignal) {
  if (!isObject(obj)) {
    return false;
  }
  let array = null;
  if (isArray(keypath)) {
    array = keypath;
  } else if (isString(keypath)) {
    array = keypath.split('.');
    orignal = obj;
  }
  if (array == null || array.length == 0) {
    return false;
  }
  let children = null;
  let index = 0;
  let key = array.shift();
  const keyTest = key.match(new RegExp("^(\\w+)\\[(\\d+)\\]$"));
  if (keyTest) {
    key = keyTest[1];
    index = keyTest[2];
    children = obj[key];
    if (isArray(children) && children.length > index) {
      if (array.length > 0) {
        return setKeyValue(children[index], array, value, orignal);
      }
      children[index] = value;
    }
  } else {
    if (array.length > 0) {
      return setKeyValue(obj[key], array, value, orignal);
    }
    obj[key] = value;
  }
  return orignal;
};

/**
 * @desc 返回范围返回范围内的随机整数
 * @param {number} min 
 * @param {number} max
 * @returns {number}
 */
export function getRandomInt(min, max) {
  // Math.random()不包括1,有缺陷
  return Math.random() * (max - min + 1) + min | 0
}

/**
 * @desc 传入数组 打乱数组中值的顺序
 * @param {array} arr
 * @returns {array}
 */
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

/**
 * @desc  重复字符串
 * @param {string} str 字符串
 * @param {number} num 重复的次数
 * @returns {string}
 */
export function stringRepeat(str, num) {
  return new Array(num + 1).join(str)
}
/**
 * @desc 左侧补零
 * @param {string} str 字符串
 * @param {number} n 总位数 padLeftZero('0', n = 2) 00 padLeftZero('11', n = 3) 011
 * @returns {string}
 */
export function padLeftZero(str, n = 2) {
  return (stringRepeat('0', n) + str).substr(str.length)
}

/**
 * @desc 格式化时间
 * @param {*} date
 * @param {*} format
 * @returns {string}
 */
export function formatDate(date, format = 'YYYY-MM-DD hh:mm:ss') {
  const o = {
    'Y+': date.getFullYear(),
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    't+': date.getMilliseconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      const str = o[k] + ''
      format = format.replace(RegExp.$1, padLeftZero(str, RegExp.$1.length))
    }
  }
  return format
}

/**
 * @desc 格式化倒计时
 * @param {number} countDownStamp 
 * @param {string} format
 * @returns {string}
 */
export function formatCountDown(countDownStamp, format = 'DD天 hh:mm:ss') {
  if (countDownStamp < 0) {
    countDownStamp = 0
  }
  const millisecond = countDownStamp % 1000
  const restSecond = (countDownStamp - millisecond) / 1000
  const second = restSecond % 60
  const restMinute = (restSecond - second) / 60
  const minute = restMinute % 60
  const restHour = (restMinute - minute) / 60
  const hour = restHour % 24
  const restDay = (restHour - hour) / 24
  const day = restDay
  const o = {
    'D+': day,
    'h+': hour,
    'm+': minute,
    's+': second,
    't+': millisecond
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      const str = o[k] + ''
      format = format.replace(RegExp.$1, padLeftZero(str, RegExp.$1.length))
    }
  }
  return format
}

/**
 * @desc 等待该函数执行成功后进行下一步
 * @param {number}} time 等待的时间
 */
export function wait(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, Number(time))
  })
}

/**
 * @desc 获取url参数
 * @param {string} url 要提取参数的url
 * @returns {object} 返回值为对象 
 */
export function getUrlParams(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
};

/**
 * @desc 将参数附加到url中
 * @param {string} originUrl
 * @param {object} data
 * @returns {string} url 
 */
export function parseParamUrl(originUrl, data) {
  let url = ''
  for (const k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += `&${k}=${encodeURIComponent(value)}`
  }
  url = url ? url.substring(1) : ''

  originUrl += (originUrl.indexOf('?') === -1 ? '?' : '&') + url

  return originUrl
}

/**
 * @desc "-"转驼峰
 * @param {string} str
 */
export function camelize(str) {
  str = String(str);
  return str.replace(/-(\w)/g, function (m, c) {
    return c ? c.toUpperCase() : ''
  });
}

/**
 * @desc 驼峰转"-"
 * @param {string} str
 */
export function middleline(str) {
  str = String(str);
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}


/*
 * 版本号比较方法
 * 传入两个字符串，当前版本号：reqV；比较版本号：curV
 * 调用方法举例：compare("0.0.2","0.0.1")，将返回true
 */
export function compare(reqV, curV) {
  if (reqV && curV) {
    //将两个版本号拆成数字
    var arr1 = reqV.split("."),
      arr2 = curV.split(".");
    var minLength = Math.min(arr1.length, arr2.length),
      position = 0,
      diff = 0;
    //依次比较版本号每一位大小，当对比得出结果后跳出循环
    while (
      position < minLength &&
      (diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0
    ) {
      position++;
    }
    diff = diff != 0 ? diff : arr1.length - arr2.length;
    //若reqV大于curV，则返回true
    return diff > 0;
  } else {
    //输入为空
    // console.log("版本号不能为空");
    return false;
  }
}

/**
 * @desc 递归返回无重复的数组组合
 * @param {array} ...chunks 多个数组 例: combine(["iPhone X", "iPhone XS"],["黑色", "白色"]) 
 * @returns  [[ 'iPhone X', '黑色' ],[ 'iPhone X', '白色' ],[ 'iPhone XS', '黑色' ],[ 'iPhone XS', '白色' ]]
 */
export function combine(...chunks) {
  let res = []

  let helper = function (chunkIndex, prev) {
    let chunk = chunks[chunkIndex]
    let isLast = chunkIndex === chunks.length - 1
    for (let val of chunk) {
      let cur = prev.concat(val)
      if (isLast) {
        // 如果已经处理到数组的最后一项了 则把拼接的结果放入返回值中
        res.push(cur)
      } else {
        helper(chunkIndex + 1, cur)
      }
    }
  }

  // 从属性数组下标为 0 开始处理
  // 并且此时的 prev 是个空数组
  helper(0, [])

  return res
};

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(func, { wait = 500, immediate } = {}) {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      let callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
};

/**
 * @desc 函数节流
 * @param fn 函数
 * @param wait 延迟执行毫秒数
 * @param {object} trailing false 表示禁用停止触发的回调; leading false 表示禁用第一次执行
 */
export function throttle(fn, wait, { trailing = true, leading = true } = {}) {
  let timer;
  let previous = 0;
  let throttled = function () {
    let now = +new Date();
    // remaining 不触发下一次函数的剩余时间
    if (!previous && leading === false) previous = now;
    let remaining = wait - (now - previous);
    if (remaining < 0) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      fn.apply(this, arguments)
    } else if (!timer && trailing !== false) {
      timer = setTimeout(() => {
        previous = leading === false ? 0 : new Date().getTime();
        timer = null;
        fn.apply(this, arguments);
      }, remaining);
    }
  }
  return throttled;
}

/**
 * @desc 获取uuid
 * @returns {string}
 */
export function uuid() {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


/**
 * @desc 返回占位图
 * @param w 宽
 * @param h 高
 * @returns {string} 链接地址
 */
export function tempImage(w, h) {
  // let tempStr = "http://placekitten.com/" + w + "/";
  // let tempStr = "https://dummyimage.com/" + w + "x";
  let tempStr = "http://lorempixel.com/" + w + "/";
  if (arguments.length === 1) {
    tempStr += w;
  } else {
    tempStr += h;
  }
  return tempStr;
};

/**
 * @todo
 * @desc 文件转Base64
 * @param {string || array} paths 文件路径
 * @returns {promise} base64
 */
export function getBase64(paths) {
  if (isArray(paths)) {
    let asyncArr = paths.reduce((arr, i) => {
      arr.push(fileToBase64(i));
      return arr;
    }, []);
    return Promise.all(asyncArr);

  } else {
    return fileToBase64(paths);
  }

  function fileToBase64(path) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener("load", () => resolve(reader.result));
      reader.readAsDataURL(path);
    })
  }
};

/**
 * @desc 检测当前设备类型
 * @returns {object}
 */
export function checkDevice() {
  const ua = window.navigator.userAgent;

  const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua);

  const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua);
  const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua);
  const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua);
  const isMac = /macintosh|mac os x/i.test(ua) && !isIpad && !isIpod && !isIphone;

  const isWechat = /micromessenger/i.test(ua);
  const isWindows = /windows|win32/i.test(ua);

  //window.navigator.userAgent.match(/APICloud/i) 开发环境和生产环境都有效,但需要在 config.xml中配置 <preference name="userAgent" value="APICloud" /> 配置 并云编译环境下才有效 ios loader状态下无效
  //window.location.protocol === 'file:' 判断是否为file 从而推断实在手机上运行 如果当前环境为开发环境则无效
  //false | true 为手动控制
  const isAPICloud = !!ua.match(/APICloud/i) || window.location.protocol === 'file:' || !!window.api || false;

  return {
    isIpad,
    isIpod,
    isIphone,
    isMac,
    isWindows,
    isWechat,

    isAndroid,
    isIos: isIpad || isIpod || isIphone,
    isPc: isWindows || isMac,
    isAPICloud,
  }
}
export const isAndroid = () => checkDevice().isAndroid;
export const isIos = () => checkDevice().isIos;
export const isPc = () => checkDevice().isPc;
export const isAPICloud = () => checkDevice().isAPICloud;

/**
 * @todo
 * @desc 解析blob响应内容并下载
 * @param {object} res blob响应内容
 */
export function resolveBlob(response) {
  // 提取文件名
  const fileName = response.headers['content-disposition'].match(
    /filename=(.*)/
  )[1]
  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: 'application/octet-stream' })
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(filename))
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob)
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement('a')
    tempLink.style.display = 'none'
    tempLink.href = blobURL
    tempLink.setAttribute('download', decodeURI(filename))
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
    }
    // 挂载a标签
    document.body.appendChild(tempLink)
    tempLink.click()
    document.body.removeChild(tempLink)
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL)
  }
}

// 回显数据字典
export function getDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).map((key) => {
    if (datas[key].dictValue == ('' + value)) {
      actions.push(datas[key].dictLabel);
      return false;
    }
  })
  return actions.join('');
}

/**
 * 
 * @desc 对象结构转数组结构
 * @param {object} obj 
 * @param {object} options 参数配置
 */
export function objectToArray(obj, { keyName = 'id', valueName = 'name', mixin } = {}) {
  return Object.keys(obj).reduce((arr, i, iIndex) => {
    const tempObj = {
      [keyName]: i,
      [valueName]: obj[i],
    };
    arr.push({
      ...tempObj,
      ...mixin ? mixin(tempObj, iIndex) : {}
    });
    return arr;
  }, []);
}

/**
 * 
 * @desc 对对象进行遍历
 * @param {object} obj 
 * @param {function} callBack 回调
 */
export function mapObject(obj, callBack) {
  if (!callBack) return Error('回调不能为空!');

  return Object.keys(obj).map((key, index) => callBack(obj[key], { key, index, obj }))
}

/**
 * @desc 检测输入的色值是否合法
 * @param value 色值
 */
export function isColorValue(value) {
  let type = '';
  if (/^rgb\(/.test(value)) {
    //如果是rgb开头，200-249，250-255，0-199
    type = "^[rR][gG][Bb][\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[\)]{1}$";
  } else if (/^rgba\(/.test(value)) {
    //如果是rgba开头，判断0-255:200-249，250-255，0-199 判断0-1：0 1 1.0 0.0-0.9
    type = "^[rR][gG][Bb][Aa][\(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){3}[\\s]*(1|1.0|0|0.[0-9])[\\s]*[\)]{1}$";
  } else if (/^#/.test(value)) {
    //六位或者三位
    type = "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$";
  } else if (/^hsl\(/.test(value)) {
    //判断0-360 判断0-100%(0可以没有百分号)
    type = "^[hH][Ss][Ll][\(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*)[\)]$";
  } else if (/^hsla\(/.test(value)) {
    type = "^[hH][Ss][Ll][Aa][\(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,){2}([\\s]*(1|1.0|0|0.[0-9])[\\s]*)[\)]$";
  }
  let re = new RegExp(type);
  if (value.match(re) == null) {
    return false;
  } else {
    return true;
  }
}

// export * from './dom.js';
export * from './uniapp.js';
export * from './vue.js';