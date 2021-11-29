const getSiteData = () => ({});
export default {
  namespaced: true,
  state() {
    return {
      siteData: {},
    };
  },
  mutations: {
    setSiteData(state, data) {
      state.siteData = data;
    },
  },
  actions: {
    // 获取站点信息
    async getSiteData({ commit }, { params = {}, options = {} } = {}) {
      const { data = {} } = await getSiteData(params, options);
      const parseData = {
        ...data,
      };
      console.log('siteData', parseData);
      commit('setSiteData', parseData);
      return parseData;
    },
  },
};
