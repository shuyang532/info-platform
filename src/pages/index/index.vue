<template>
  <view class="container">
    <AtButton
      type="primary"
      :on-click="toWelcome"
      style="margin: 12px;"
    >
      进入欢迎页
    </AtButton>
    <AtButton
      type="secondary"
      :on-click="toRegister"
      style="margin: 12px;"
    >
      进入注册页
    </AtButton>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import API from "../../base/api";

@Component({
  name: 'Index'
})
export default class Index extends Vue {

  mounted() {
    const _this = this;
    wx.login({
      success: (res: any) => {
        if (res.code) {
          Taro.request({
            url: API.checkLogin(),
            method: "GET",
            data: {
              code: res.code
            },
            success: (loginRes: any) => {
              // console.log(loginRes);
              if (loginRes.data.success) {
                console.log('登录成功');
                _this.toWelcome();
              } else {
                console.log('登录失败');
                _this.toRegister();
              }
            }
          });
        }
      }
    });
  }

  toWelcome() {
    Taro.navigateTo({
      url: '/pages/welcome/welcome'
    })
  }

  toRegister() {
    Taro.navigateTo({
      url: '/pages/register/register'
    })
  }

}
</script>

<style>
.container {
  padding: 24px;
}

</style>
