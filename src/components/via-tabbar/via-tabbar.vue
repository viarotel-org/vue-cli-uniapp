<template>
  <view
    class="flex items-center justify-center"
    :class="showBorderTop ? 'border-t border-gray-100' : ''"
    :style="{
      height: '50px',
    }"
  >
    <view
      @click="$emit('input', iIndex)"
      v-for="(i, iIndex) in list"
      :key="iIndex"
      class="w-1 flex-grow flex flex-col items-center justify-center"
    >
      <image
        :src="value === iIndex ? i.iconActive : i.icon"
        mode="aspectFill"
        :style="[
          {
            width: '25px',
            height: '25px',
          },
          imageStyle,
          i.iconStyle ? i.iconStyle : {},
        ]"
      />
      <text
        class=""
        :style="[
          {
            fontSize: '12px',
            paddingTop: '2px',
          },
          textStyle,
          i.textStyle ? i.textStyle : {},
          {
            color: value === iIndex ? activeColor : color,
          },
        ]"
        >{{ i.text }}</text
      >
    </view>
  </view>
</template>

<script>
export default {
  name: "via-tabbar",
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 0,
    },
    color: {
      type: String,
      default: "#7A7E83",
    },
    activeColor: {
      type: String,
      default: "#000000",
    },
    imageStyle: {
      type: Object,
      default: () => {},
    },
    textStyle: {
      type: Object,
      default: () => {},
    },
    showBorderTop: {
      type: Boolean,
      default: true,
    },
  },
  computed: {},
  created() {},
  methods: {},
};
</script>

<style></style>
