import { dictDataList as getDicts } from '@/requests/modules/base';

export default {
  namespaced: true,
  state: () => ({
    dictMap: {},
    dictData: {},
  }),
  mutations: {
    setDicts(state, { key, value }) {
      state.dictData[key] = value;
    },
  },
  actions: {
    async getDicts({ commit, state }, key) {
      let tempData = [];
      if (state.dictData[key]) {
        tempData = state.dictData[key];
      } else {
        const { code, data } = await getDicts(state.dictMap[key] || key);
        if (code === '0000') {
          tempData = data.map((item) => ({
            ...item,
          }));
          commit('setDicts', {
            key,
            value: tempData,
          });
        }
      }
      return tempData;
    },
  },
};
