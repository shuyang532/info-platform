<template>
  <view>

    <view style="background-color: #f7f7f7; display: flex; justify-content: space-between; align-items: center; padding: 64px 24px 48px;">
      <view style="display: flex; justify-content: flex-start; align-items: center;">
        <AtAvatar circle :image="user.avatarUrl" style="width: 64px; height: 64px;"></AtAvatar>
        <view style="font-size: 16px; color: #333333; margin-left: 16px;">{{ user.nickname }}</view>
      </view>
      <view style="display: flex; justify-content: flex-end; align-items: center;">
        <view style="font-size: 12px; color: #999999;">个人主页</view>
        <view @tap="toSpace">
          <AtIcon value="chevron-right" style="font-size: 16px; color: #6190E8; line-height: normal; margin-left: 4px;"></AtIcon>
        </view>
      </view>
    </view>

    <view style="padding: 24px;">
      <view style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px #e5e5e5 solid; padding-bottom: 16px;">
        <view style="font-size: 14px; color: #333333;">我参与的</view>
        <view @tap="toJoin">
          <AtIcon value="chevron-right" style="font-size: 16px; color: #999999; line-height: normal; margin-left: 4px;"></AtIcon>
        </view>
      </view>
      <view style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px #e5e5e5 solid; padding: 16px 0;">
        <view style="font-size: 14px; color: #333333;">意见反馈</view>
        <view @tap="toFeedback">
          <AtIcon value="chevron-right" style="font-size: 16px; color: #999999; line-height: normal; margin-left: 4px;"></AtIcon>
        </view>
      </view>
    </view>


  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {APP_ROUTES} from "../../base/constant";
import {UserModel} from "../../models/user.model";

@Component({
  name: 'Mine'
})
export default class Mine extends Vue{
  user: UserModel = new UserModel();

  mounted() {
    this.user.mock();
  }

  toSpace() {
    console.log('去个人主页');
    Taro.navigateTo({
      url: APP_ROUTES.SPACE
    });
  }

  toJoin() {
    console.log('去我参与的');
    Taro.navigateTo({
      url: APP_ROUTES.JOIN+'?id='+this.user.id
    });
  }

  toFeedback() {
    console.log('去意见反馈');
    Taro.navigateTo({
      url: APP_ROUTES.FEEDBACK
    });
  }


}

</script>

<style>

</style>
