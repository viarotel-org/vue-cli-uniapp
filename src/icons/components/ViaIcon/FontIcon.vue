<template>
  <i
    :class="['iconfont', deepClass, iconName]"
    @click="$emit('click')"
  />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    deepClass: {
      type: [String, Object, Array],
      default: '',
    },
  },
  computed: {
    iconName() {
      return `${this.name}`;
    },
  },
};
</script>

<style lang="postcss">
@import "~@/icons/fonts/iconfont.css";
</style>
