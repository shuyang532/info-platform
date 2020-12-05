<template>
  <view class="tf-welcome-container">

    <image :src="imgUrl" mode="scaleToFill" class="tf-welcome-image"></image>

    <view class="tf-welcome-button-part">
      <AtButton type="primary" :on-click="toActivity" class="tf-welcome-button">
        进入首页
      </AtButton>
      <AtButton type="secondary" :on-click="toExit" class="tf-welcome-button">
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

<style lang="scss">
.tf-welcome-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.tf-welcome-image {
  width: 90%;
  height: 480px;
}

.tf-welcome-button-part {
  width: 90%;

  .tf-welcome-button {
    margin: 24px 0;
  }
}

</style>
