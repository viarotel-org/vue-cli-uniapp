import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

const banlist = {
  // sms: true
};
const modules = getModules(require.context("./modules", true, /\.js$/));
function getModules(files) {
  const rules = (path) => path.replace(/(.*\/)*([^.]+).*/ig, "$2");
  const filePathArr = files.keys().filter(path => !banlist[rules(path)]);
  return filePathArr.reduce((arr, path) => {
    let name = rules(path);
    arr[name] = {
      ...files(path).default,
      namespaced: true
    };
    return arr;
  }, []);
}
// console.log(modules);

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  getters
});