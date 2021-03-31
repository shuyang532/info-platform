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

  // TODO 首图需和UI讨论更换
  imgUrl: string = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpz44eEk-QoxmEXHjiiHk7eJP5F_5d8r-S7A&usqp=CAU";

  toActivity() {
    Taro.switchTab({
      url: APP_ROUTES.ACTIVITY
    })
  }

  toExit() {
    // TODO
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
