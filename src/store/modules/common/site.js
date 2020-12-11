import { getStorages, setStorages } from "@/plugins/storages";
import request from "@/request";
import { dictConfig } from "@/config";
import { getDictLabel, mapObject, isColorValue } from "@/utils"

export default {
  namespaced: true,
  state: () => ({
    siteInfo: getStorages('siteInfo') || {
      themeColor: "",
      isDark: "",
      fileBaseUrl: "",
      appLogo: "",
      appName: "",
      tabbarArr: [],
      indexCustomArr: []
    },
  }),
  getters: {
    themeTextColorStyle(state) {
      return `color: ${state.siteInfo.themeColor};`;
    },
    themeBgColorStyle(state) {
      return `background-color: ${state.siteInfo.themeColor};`;
    },
  },
  mutations: {
    setSiteInfo(state, data) {
      state.siteInfo = data;
      setStorages('siteInfo', data);
    },
  },
  actions: {
    //获取站点信息
    async getSiteInfo({ commit }, { params = {}, options = {} } = {}) {
      const { result: data } = await request.getSiteInfo(params, options);

      const themeColor = isColorValue(data.sys_config.back_color) ? data.sys_config.back_color : '#337A4B';

      const formatData = {
        themeColor,
        isDark: data.sys_config.isDark,
        fileBaseUrl: data.sys_config.qny_host,
        appLogo: data.sys_config.small_logo,
        appName: data.sys_config.small_name,
        tabbarArr: data.table_config.map((i, iIndex) => ({
          id: i.cate,
          type: getDictLabel(dictConfig.tabberArr, i.cate),
          icon: i.uncheck,
          iconActive: i.icon,
          text: i.cate_value,
        })),
        indexCustomArr: data.page_config.editable_page_config_list.map((i, iIndex) => ({
          id: getDictLabel(dictConfig.indexCustomArr, i.editable_page_model_id),
          sort: i.editable_page_config_sort_order,
          style: {
            ...i.editable_page_config_content.width ? {
              width: i.editable_page_config_content.width,
            } : {},
            ...i.editable_page_config_content.height ? {
              height: i.editable_page_config_content.height,
            } : {},
            ...i.editable_page_config_content.back_color && i.editable_page_config_content.back_color != "unset" ? {
              backgroundColor: i.editable_page_config_content.back_color,
            } : {},
            marginTop: i.editable_page_config_content.margin_top,
            marginBottom: i.editable_page_config_content.margin_bottom,
            order: i.editable_page_config_sort_order
          },
          title: i.editable_page_config_content.text ?
            getArrayOrObjectOneData(i.editable_page_config_content.text).list[0].content : '',
          categoryId: i.editable_page_config_content.goods ?
            i.editable_page_config_content.goods[0].gc_id : 0,
          goodsArr: i.goods_list ?
            getArrayOrObjectOneData(i.goods_list).map(ii => ({
              id: ii.goods_id,
              title: ii.goods_name,
              image: ii.goods_image,
              price: ii.goods_price,
              oldPrice: ii.goods_marketprice,
              sales: ii.goods_salenum,
              shopName: ii.store_name,
              goodsType:
                (ii.is_service === 1 && "booking") ||
                (ii.is_virtual === 1 && "virtual") ||
                "real",
            })) : [],
          richText: i.editable_page_config_content.editor ? i.editable_page_config_content.editor[0] : '',
          swiperArr: i.editable_page_config_content.image ? mapObject(i.editable_page_config_content.image[0].list, (ii) => ({
            link: ii.content || '',
            image: ii.path
          })) : [],
          noticeImage: i.editable_page_config_content.image ? getArrayOrObjectOneData(i.editable_page_config_content.image[0].list).path : '',
        })),
      }
      console.log('formatData', formatData);
      commit('setSiteInfo', formatData);
      return formatData;

      function getArrayOrObjectOneData(any) {
        const key = Object.keys(any)[0];
        return any[key]
      }

      // const data = {
      //   themeColor: '#2E7D32',
      //   // themeColor: '#63B3ED',
      //   isDark: false,
      //   appLogo: '/static/image/logo.png',
      //   appName: '蜂窝',
      //   fileBaseUrl: 'http://qjnuuae8v.hn-bkt.clouddn.com/',
      // };
      // commit('setSiteInfo', data);
      // return data;
    },
  },
};