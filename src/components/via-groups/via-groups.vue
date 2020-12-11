<template>
  <view :class="customClass" :style="[customStyle]"> </view>
</template>

<script>
export default {
  name: "via-groups",
  props: {
    value: {
      type: [Number, Array],
      default: 0,
    },
    list: {
      type: [Array],
      default: () => [],
    },
    customClass: String,
    customStyle: Object,
  },
};
</script>

<style></style>
