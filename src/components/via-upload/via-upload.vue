<template>
  <u-upload
    ref="uUpload"
    @on-success="onSuccess"
    :max-count="maxCount"
    :file-list="_fileList"
    :width="width"
    :height="height"
    :action="action"
    :header="header"
    :name="name"
    :source-type="_sourceType"
    :upload-text="uploadText"
    :disabled="disabled"
    :deletable="deletable"
    :show-progress="showProgress"
  ></u-upload>
</template>

<script>
import { getStorages } from "@/plugins/storages";
import { requestConfig } from "@/config";
import { deepClone, uniToast, uniGetAppId } from "@/utils";
export default {
  name: "via-upload",
  data() {
    return {
      action: requestConfig.baseUrl + "Public/uplode_image",
      header: {
        appId: uniGetAppId(),
        [requestConfig.authorization.key]:
          requestConfig.authorization.prefix + getStorages("token"),
      },
    };
  },
  props: {
    showProgress: {
      type: Boolean,
      default: true,
    },
    deletable: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean,
    value: {
      type: [Array],
      default: () => [],
    },
    name: {
      type: String,
      default: "file",
    },
    width: [String, Number],
    height: [String, Number],
    maxCount: {
      type: [String, Number],
      default: 1,
    },
    sourceType: {
      type: String,
      default: "auto",
    },
    presetUrlName: {
      type: String,
      default: "presetUrl",
    },
    urlName: {
      type: String,
      default: "url",
    },
    uploadText: {
      type: String,
      default: "添加图片",
    },
  },
  computed: {
    _fileList() {
      let tempArr = [];
      this.value.forEach((i, iIndex) => {
        if (i[this.presetUrlName] && !i[this.urlName]) {
          tempArr[iIndex] = { url: i[this.presetUrlName] };
        }
      });
      return tempArr;
    },
    _sourceType() {
      let tempArr = [];
      switch (this.sourceType) {
        case "album":
          tempArr = ["album"];
          break;
        case "camera":
          tempArr = ["camera"];
          break;
        case "auto":
          tempArr = ["album", "camera"];
          break;
      }
      return tempArr;
    },
  },
  methods: {
    async onSuccess(res, index) {
      console.log("res", res);
      console.log("index", index);

      const { result: data, message: msg, code } = res;

      if (code === requestConfig.responseSuccessCode) {
        let value = deepClone(this.value);
        if (value[index]) {
          value[index][this.urlName] = data.url;
        } else {
          value[index] = {
            [this.urlName]: data.url,
          };
        }

        console.log(value[index]);

        this.$emit("input", value);
      } else {
        await uniToast(`${msg},请检查网络后重试`);
        this.$refs.uUpload.remove(index);
      }
    },
  },
};
</script>

<style></style>
