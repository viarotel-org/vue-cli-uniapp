import { setToken, getToken, removeToken } from '@/utils/token';
import { getUserData } from '@/requests/modules/user';

export default {
  namespaced: true,
  state() {
    return {
      userData: {},
      token: getToken(),
    };
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data;
    },
    removeToken(state) {
      state.token = '';
      removeToken();
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
  },
  actions: {
    // 获取用户详情
    async getUserData({ commit }, { params = {}, options = {} } = {}) {
      const { data = {} } = await getUserData(params, options);
      const parseData = {
        ...data,
        id: data.id,
      };
      // console.log("userData", parseData);
      commit('setUserData', parseData);
      return parseData;
    },
    async logout({ commit }) {
      commit('removeToken');
      commit('setUserData', {});
    },
  },
};
