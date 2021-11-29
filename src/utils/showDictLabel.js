import {
  isString,
} from 'lodash-es';
import dictData from '@/configs/dicts';
/**
 * @description 回显数据字典
 */
export const showDictLabel = (data, value) => {
  const actions = [];
  Object.keys(data).map((key) => {
    if (data[key].dictValue == `${value}`) {
      actions.push(data[key].dictLabel);
      return false;
    }
  });
  return actions.join('');
};

export default (param, value) => {
  const data = isString(param) ? dictData[param] : param;
  return showDictLabel(data || {}, value);
};
