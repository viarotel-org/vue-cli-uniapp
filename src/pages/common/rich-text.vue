<template>
  <rich-text
    class="absolute inset-0 p-3"
    :nodes="content"
    :selectable="isAllowSelect"
  ></rich-text>
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
    content() {
      return this.query.content || "";
    },
    isAllowSelect() {
      return !!this.query.isAllowSelect;
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
