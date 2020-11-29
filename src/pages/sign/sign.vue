<template>
  <view style="position: relative; height: 100%; background-color: #F0FFFF; display: flex; justify-content: center; align-items: center;">

    <view style="width: 300px; min-height: 320px; background-color: white; border-radius: 4px; box-shadow: 4px 4px 8px #f7f7f7; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <image src="../../assets/sign_container.png" mode="scaleToFill" style="width: 180px; height: 180px;"></image>
      <view style="margin-top: 32px;" @tap="onRefreshQR">
        <image src="../../assets/refresh.png" mode="scaleToFill" style="width: 48px; height: 48px;"></image>
      </view>
    </view>

  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({
  name: 'Sign'
})
export default class Sign extends Vue{

  onRefreshQR() {
    console.log('刷新二维码');
  }
}

</script>

<style>

</style>
