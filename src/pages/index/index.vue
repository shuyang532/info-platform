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
import {APP_ROUTES} from "../../base/constant";
import { getLogin } from '../../base/servers/servers';

@Component({
  name: 'Index'
})
export default class Index extends Vue {

  mounted() {
    const _this = this;
    Taro.login({
      success: (res: any) => {
        getLogin(res.code).then((loginRes: any) => {
          if (loginRes.success) {
           _this.toWelcome();
         } else {
           _this.toRegister();
         }
        }).catch((err: any) => {
          console.log(err);
        })
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
