import { random } from 'lodash-es';

/**
 * @desc 返回占位图
 * @param w 宽
 * @param h 高
 * @returns {string} 链接地址
 */
export default function tempImage(width, height) {
  if (!width) {
    width = random(50, 1000);
    height = random(50, 1000);
  }

  let url = `http://placekitten.com/${width}/`;
  // let url = `https://dummyimage.com/${width}x`;
  // let url = `http://lorempixel.com/${width}/`;
  if (height) {
    url += height;
  } else {
    url += width;
  }

  return url;
}
