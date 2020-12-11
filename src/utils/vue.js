
/**
 * @desc 由一个组件，向上找到最近的指定组件；由一个组件，向上找到所有的指定组件； 由一个组件，向下找到最近的指定组件；由一个组件，向下找到所有指定的组件；由一个组件，找到指定组件的兄弟组件。
 * @param {*} ctx 上下文
 * @param {*} componentName 组件名称
 */

export function findComponentUpward(componentName, ctx = this) {
  let parent = ctx.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
};

/**
 * @desc 指令 超出隐藏 v-truncate:2="20" "2"为行数 20为最多显示20个文字 
 */
export const vTruncate = {
  install(Vue, options = {}) {
    Vue.directive('truncate', {
      inserted: callback,
      updated: callback,
      componentUpdated: callback,
    })
    function callback(el, binding) {
      // console.log("el", el);
      // console.log('el.innerText.length', el.innerText.length);
      // console.log("binding", binding);
      let truncate = `
        word-wrap:break-word;
        overflow: hidden;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: ${binding.arg || 1};
      `;

      let width = "";
      let halfSizeNumber = el.innerText.match(/[\x00-\xff]/g) ? el.innerText.match(/[\x00-\xff]/g).length : 0; //计算半角字体的个数
      const textNumber = (el.innerText.length - halfSizeNumber) + halfSizeNumber / 2;
      if (binding.value && binding.value < textNumber) {
        width = `
          width: ${Number(binding.value) + 0.786}em;
        `;
      }
      el.style.cssText += truncate + width;
    }
  },
}