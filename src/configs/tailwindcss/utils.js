/**
 * @todo
 * @desc 根据提供的模板生成自定义样式所需要的数据
 * @param {*} template
 * @param {*} start
 * @param {*} end
 * @param {*} scale 比例
 * @param {*} step 步数
 */
const createConfig = function (template, start, end, scale = 1, step = 1) {
  const mapReplace = (target, value, rule = /\$/g) => target.replace(rule, value);
  const index = template.indexOf(':');
  const key = template.slice(0, index);
  const value = template.slice(index + 1);
  const tempObj = {};
  for (start; start <= end; start += step) {
    tempObj[mapReplace(key, start)] = mapReplace(value, start * scale);
  }
  // console.log(tempObj);
  return tempObj;
};

module.exports = {
  createConfig,
};
