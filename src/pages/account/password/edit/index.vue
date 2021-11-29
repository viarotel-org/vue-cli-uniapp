<template>
  <view class="">
    <view class="px-3 mx-3 mt-4 bg-white rounded-md">
      <u-form
        ref="uFormEl"
        :model="formData"
        label-width="180"
      >
        <u-form-item
          label="原密码"
          prop="oldPassword"
        >
          <u-input
            v-model="formData.oldPassword"
            type="password"
          />
        </u-form-item>
        <u-form-item
          label="新密码"
          prop="newPassword"
        >
          <u-input
            v-model="formData.newPassword"
            type="password"
          />
        </u-form-item>
        <u-form-item
          label="确认新密码"
          prop="newPassword_1"
        >
          <u-input
            v-model="formData.newPassword_1"
            type="password"
          />
        </u-form-item>
      </u-form>
    </view>
    <view class="px-3 pt-6">
      <u-button
        type="primary"
        shape="circle"
        @click="submit"
      >
        提交
      </u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      formData: {
        oldPassword: '',
        newPassword: '',
        newPassword_1: '',
      },
      formRules: {},
    };
  },
  created() {
    this.formRules = {
      oldPassword: [
        {
          required: true,
          message: '该选项不能为空',
          trigger: ['blur', 'change'],
        },
      ],
      newPassword: [
        {
          required: true,
          message: '该选项不能为空',
          trigger: ['blur', 'change'],
        },
      ],
      newPassword_1: [
        {
          required: true,
          message: '该选项不能为空',
          trigger: ['blur', 'change'],
        },
        {
          // 返回true表示校验通过，返回false表示不通过
          validator: (rule, value, callback) => {
            if (value === this.formData.newPassword) {
              return true;
            }
            return false;
          },
          message: '两次输入的密码不一致',
          trigger: ['blur'],
        },
      ],
    };
  },
  onLoad() {},
  onReady() {
    this.$refs.uFormEl.setRules(this.formRules);
  },
  methods: {
    validatorRule_newPassword_1(rule, value, callback) {
      if (value === this.formData.newPassword) {
        return true;
      }
      return false;
    },

    submit() {
      this.$refs.uFormEl.validate((valid) => {
        if (valid) {
          this.submitAfter();
        }
      });
    },
    async submitAfter() {
      const params = this.packParams();
      const res = await this.$req.personChangePwd(params);
      if (res.code === '0000') {
        await store.dispatch('user/logout');
        await this.$toast('密码修改成功, 请重新登录', { icon: 'success' });
        this.$Router.replaceAll({ path: '/pages/account/login/index' });
      }
    },
    packParams(data = this.formData) {
      // console.log("packParams.data", data);
      return {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
    },
  },
};
</script>

<style></style>
