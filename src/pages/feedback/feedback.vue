<template>
  <view>

    <view style="background-color: #f7f7f7; display: flex; justify-content: center; align-items: center; padding: 64px 24px 48px;">
      <image src="../../assets/feedback.png" mode="scaleToFill" style="width: 64px; height: 64px;"></image>
    </view>

    <view style="padding: 24px;">
      <view style="display: flex; justify-content: flex-start; align-items: center; border-bottom: 1px #e5e5e5 solid; padding-bottom: 16px;">
        <view style="font-size: 14px; color: #333333; flex: 1;">联系邮箱</view>
        <view style="font-size: 14px; color: #999999; flex: 3;">{{ serviceEmail }}</view>
      </view>

    </view>


  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component({
  name: 'Feedback'
})
export default class Feedback extends Vue{
  serviceEmail: string = 'service@163.com';

}

</script>

<style>

</style>
