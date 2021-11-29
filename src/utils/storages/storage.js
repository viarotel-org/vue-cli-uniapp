import store from 'store';
/**
 * 通用存储 store
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
export default {
  // 设置永久缓存
  set(key, value) {
    store.set(key, value);
  },
  // 获取永久缓存
  get(key) {
    return store.get(key);
  },
  // 移除永久缓存
  remove(key) {
    store.remove(key);
  },
  // 移除全部永久缓存
  clear() {
    store.clearAll();
  },
};
