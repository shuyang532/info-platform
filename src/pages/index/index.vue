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
import {APP_ROUTES} from "../../base/constant";

@Component({
  name: 'Index'
})
export default class Index extends Vue {

  mounted() {
    const _this = this;
    Taro.login({
      success: (res: any) => {
        if (res.code) {
          Taro.request({
            url: API.checkLogin(),
            method: "GET",
            data: {
              code: res.code
            }
          }).then((loginRes: any) => {
            console.log(loginRes);

            /*if (loginRes.data.success) {
              console.log('登录成功');
              _this.toWelcome();
            } else {
              console.log('登录失败');
              _this.toRegister();
            }*/

            _this.toWelcome();


          });
        }
      }
    });
  }

  toWelcome() {
    Taro.navigateTo({
      url: APP_ROUTES.WELCOME
    })
  }

  toRegister() {
    Taro.navigateTo({
      url: APP_ROUTES.REGISTER
    })
  }

}
</script>

<style>
.container {
  padding: 24px;
}

</style>
