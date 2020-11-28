<template>
  <view class="container">

    <image :src="imgUrl" mode="scaleToFill"></image>

    <view style="width: 100%; margin-top: 100px;">
      <AtButton
        type="primary"
        :on-click="toActivity"
        style="margin: 12px;"
      >
        进入首页
      </AtButton>
      <AtButton
        type="secondary"
        :on-click="toExit"
        style="margin: 12px;"
      >
        退出小程序
      </AtButton>
    </view>

  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {APP_ROUTES} from "../../base/constant";

@Component({
  name: 'Welcome'
})
export default class Welcome extends Vue{

  imgUrl: string = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg"

  toActivity() {
    Taro.switchTab({
      url: APP_ROUTES.ACTIVITY
    })
  }

  toExit() {

  }
}

</script>

<style>

.container {
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
