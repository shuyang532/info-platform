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

@Component({
  name: 'Index'
})
export default class Index extends Vue {

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
