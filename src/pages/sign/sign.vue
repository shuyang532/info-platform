<template>
  <view class="tf-sign-container">

    <view class="tf-sign-code-image">
      <image src="../../assets/images/sign_container.png" mode="scaleToFill" class="tf-sign-code-outer-size"></image>
      <view style="margin-top: 32px;" @tap="onRefreshQR">
        <image src="../../assets/images/refresh.png" mode="scaleToFill" class="tf-sign-code-inner-size"></image>
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

<style lang="scss">
@import "src/assets/variables.scss";


.tf-sign-container {
  position: relative;
  height: 100%;
  background-color: $tf-color-blue1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tf-sign-code-image {
  width: 600px;
  min-height: 640px;
  background-color: $tf-color-white;
  border-radius: 8px;
  box-shadow: 8px 8px 16px $tf-color-grey2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tf-sign-code-outer-size {
    width: 360px;
    height: 360px;
  }

  .tf-sign-code-inner-size {
    width: 96px;
    height: 96px;
  }
}

</style>
