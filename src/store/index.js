import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import site from './modules/site';
import dicts from './modules/dicts';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    user,
    site,
    dicts,
  },
  getters,
});

// Vue.prototype.$store = store;

export default store;
