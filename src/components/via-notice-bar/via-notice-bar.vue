<template>
  <u-notice-bar
    @click="(index) => $emit('click-item', list[index])"
    mode="horizontal"
    :list="_list"
    :is-circular="false"
    :volume-icon="false"
    padding="0"
    class=""
    bg-color="transparent"
    color="#000"
  ></u-notice-bar>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      default: "name",
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    _list() {
      return this.list.map((i) => i[this.name]);
    },
  },
};
</script>

<style></style>
