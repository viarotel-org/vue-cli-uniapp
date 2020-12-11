import { toRawType, camelize } from './index.js';

export function getElement(el) {
  if (toRawType(el) === 'String') {
    el = document.querySelector(el);
  }
  return el;
};

export function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(getElement(el).className)
}

export function addClass(el, className) {
  if (!hasClass(getElement(el), className)) {
    const newClass = getElement(el).className.split(' ')
    newClass.push(className)
    getElement(el).className = newClass.join(' ')
  }
}

export function removeClass(el, className) {
  if (hasClass(getElement(el), className)) {
    const reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
    getElement(el).className = getElement(el).className.replace(reg, ' ')
  }
}

/**
 * @desc 获取标签元素自定义属性数据
 */
export function getElData(el, name) {
  const prefix = 'data-'
  return getElement(el).getAttribute(prefix + name)
}
/**
 * @desc 设置标签元素自定义属性数据
 */
export function setElData(el, name, value) {
  const prefix = 'data-'
  getElement(el).setAttribute(prefix + name, value)
}

/**
 * @desc getRect是获取相对的父元素(position非static)的位置 如果想获取相对页面的位置,请使用getBoundingClientRect
 */
export function getRect(el) {
  return {
    top: getElement(el).offsetTop,
    left: getElement(el).offsetLeft,
    width: getElement(el).offsetWidth,
    height: getElement(el).offsetHeight
  }
}

/**
 * @desc 为css样式添加兼容前缀
 * @param {string} style
 */
export function prefixStyle(style) {

  const elementStyle = document.createElement('div').style;

  const endEventListenerList = ['transitionend', 'animationend'];

  const browserPrefix = {
    standard: '',
    webkit: 'webkit',
    Moz: 'Moz',
    O: 'O',
    ms: 'ms',
  };

  const endEventListenerPrefixList = {
    transition: {
      transition: 'transitionend',
      webkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd',
      msTransition: 'msTransitionEnd'
    },
    animation: {
      animation: 'animationend',
      webkitAnimation: 'webkitAnimationEnd',
      MozAnimation: 'animationend',
      OAnimation: 'oAnimationEnd',
      msAnimation: 'msAnimationEnd'
    }
  };

  let baseStyle = '';
  if (endEventListenerList.indexOf(style) !== -1) {
    baseStyle = style.replace(/end/i, '');
  }

  for (let key in browserPrefix) {
    if (baseStyle) {
      let cssPrefixStyle = browserPrefix[key] ? browserPrefix[key] + '-' + baseStyle : baseStyle;
      let keyName = camelize(cssPrefixStyle);
      if (elementStyle[keyName] !== undefined) {
        return endEventListenerPrefixList[baseStyle][keyName];
      }
    } else {
      let cssPrefixStyle = browserPrefix[key] ? browserPrefix[key] + '-' + style : style;
      let keyName = camelize(cssPrefixStyle);
      if (elementStyle[keyName] !== undefined) {
        return keyName;
      }
    }
  }
  return '';
}

/**
 * @desc 返回当前节点在兄弟节点中的索引
 * @param {*} el class id node
 */
export function nodeIndex(el) {
  return Array.prototype.findIndex.call(getElement(el).parentNode.children, (item) =>
    getElement(el).isSameNode(item)
  );
};

/**
 * @desc 滚动到顶部
 * @param {string} el 元素的选择器或或者元素本身
 */
export function scrollToTop(el = 'body') {
  const scrollTop = getElement(el).scrollTop;
  if (scrollTop > 0) {
    window.requestAnimationFrame(() => scrollToTop(getElement(el)));
    getElement(el).scrollTop = scrollTop - scrollTop / 8
  }
};


/**
 * @desc 页面调试工具
 */
export function layoutDebug() {
  var styleEl = document.createElement("style");
  styleEl.classList.add("page-debug");
  styleEl.innerHTML =
    `
      * { background-color: rgba(255,0,0,.2); }
      * * { background-color: rgba(0,255,0,.2); }
      * * * { background-color: rgba(0,0,255,.2); }
      * * * * { background-color: rgba(255,0,255,.2); }
      * * * * * { background-color: rgba(0,255,255,.2); }
      * * * * * * { background-color: rgba(255,255,0,.2); }
      * * * * * * * { background-color: rgba(255,0,0,.2); }
      * * * * * * * * { background-color: rgba(0,255,0,.2); }
      * * * * * * * * * { background-color: rgba(0,0,255,.2); }
      * * * * * * * * * * { background-color: rgba(0,0,255,.2); } 
    `;
  document.querySelector("head").appendChild(styleEl);
};