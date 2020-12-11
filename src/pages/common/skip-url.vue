<template>
  <web-view class="" :webview-styles="{ progress }" :src="url"></web-view>
</template>

<script>
import { isAttrs } from "@/utils";
export default {
  data() {
    return {
      query: {},
    };
  },
  onLoad() {
    this.query = this.$Route.query;
    console.log(JSON.stringify(this.query));
  },
  onReady() {
    this.setNavigationBar();
  },
  computed: {
    title() {
      return this.query.title || "详情";
    },
    url() {
      return this.query.url || "";
    },
    progress() {
      return isAttrs(this.query, "progress") ? progress : { color: "#4CAF50" };
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
