<template>
  <view class="flex flex-col items-stretch absolute inset-0">
    <view class="flex-grow overflow-scroll-smooth h-100 relative">
      <tab0 v-if="tabbarItem.type === 'tab-0'"></tab0>
      <tab1 v-if="tabbarItem.type === 'tab-1'"></tab1>
      <tab2 v-if="tabbarItem.type === 'tab-2'"></tab2>
      <tab3 v-if="tabbarItem.type === 'tab-3'"></tab3>
    </view>
    <via-tabbar
      v-model="tabbarActive"
      :list="tabbarArr"
      class="flex-shrink-0"
      :active-color="siteInfo.themeColor"
    ></via-tabbar>
  </view>
</template>

<script>
import { tempImage } from "@/utils";
import Tab0 from "./tab-0";
import Tab1 from "./tab-1";
import Tab2 from "./tab-2";
import Tab3 from "./tab-3";
export default {
  components: {
    Tab0,
    Tab1,
    Tab2,
    Tab3,
  },
  data() {
    return {
      query: {},
      tabbarActive: 0,
    };
  },
  watch: {
    tabbarActive() {
      this.$nextTick(() => {
        uni.$emit(`${this.tabbarItem.type}-onload-event`, this.query.params);
      });
    },
  },
  computed: {
    tabbarItem() {
      return this.tabbarArr[this.tabbarActive] || {};
    },
    tabbarArr() {
      return [
        {
          id: "tab-0",
          type: "tab-0",
          icon: tempImage(25),
          iconActive: tempImage(25),
          text: "首页",
        },
        {
          id: "tab-1",
          type: "tab-1",
          icon: tempImage(25),
          iconActive: tempImage(25),
          text: "分类",
        },
        {
          id: "tab-2",
          type: "tab-2",
          icon: tempImage(25),
          iconActive: tempImage(25),
          text: "购物车",
        },
        {
          id: "tab-3",
          type: "tab-3",
          icon: tempImage(25),
          iconActive: tempImage(25),
          text: "我的",
        },
      ];
    },
  },
  onShow() {
    this.tabbarItem.type && uni.$emit(`${this.tabbarItem.type}-onshow-event`);
  },
  onLoad() {
    this.query = this.$Route.query;
    const tabbarActive = this.tabbarArr.findIndex(
      (i) => i.type === this.query.tabbarName
    );
    this.tabbarActive = tabbarActive === -1 ? 0 : tabbarActive;
  },
  methods: {},
};
</script>

<style></style>
