<template>
  <view class="p-4">
    <view class="truncate text-xl">{{ title }}</view>
    <view class="text-sm text-gray pt-2">{{ releaseDate }}</view>
    <view class="pt-4">
      <rich-text :nodes="content"></rich-text>
    </view>
  </view>
</template>

<script>
import { mixinUni } from "@/utils";
export default {
  mixins: [mixinUni],
  data() {
    return {
      isSetNavavigationBar: true,
      query: {},
    };
  },
  onLoad() {
    this.query = this.$Route.query;
    this.setNavigationBar();
  },
  computed: {
    releaseDate() {
      return this.query.releaseDate || "";
    },
    content() {
      return this.query.content || "";
    },
    title() {
      return this.query.title || "详情";
    },
    navBarFontColor() {
      let tempStr = "";
      switch (this.query.navBarFontColor) {
        case "white":
          tempStr = "#ffffff";
          break;
        case "black":
          tempStr = "#000000";
          break;
        default:
          tempStr = "#000000";
          break;
      }
      return tempStr;
    },
    navBarBgColor() {
      return this.query.navBarBgColor || "#EBEBEB";
    },
  },
  methods: {
    setNavigationBar() {
      uni.setNavigationBarTitle({
        title: this.title,
      });
      uni.setNavigationBarColor({
        frontColor: this.navBarFontColor,
        backgroundColor: this.navBarBgColor,
      });
    },
  },
};
</script>

<style></style>
