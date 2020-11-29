<template>
  <view style="position: relative; height: 100%;">

    <view style="position: absolute; z-index: 0; width: 100%;">
      <view style="background-color: #f7f7f7; display: flex; justify-content: center; align-items: center; padding: 64px 24px 48px;">
        <AtAvatar circle :image="user.avatarUrl" style="width: 64px; height: 64px;"></AtAvatar>
      </view>

      <view style="padding: 24px;">
        <view style="display: flex; justify-content: flex-start; align-items: center; border-bottom: 1px #e5e5e5 solid; padding-bottom: 16px;">
          <view style="font-size: 14px; color: #333333; flex: 1;">昵称</view>
          <view style="font-size: 14px; color: #999999; flex: 3;">{{ user.nickname }}</view>
        </view>
        <view style="display: flex; justify-content: flex-start; align-items: center; border-bottom: 1px #e5e5e5 solid; padding: 16px 0;">
          <view style="font-size: 14px; color: #333333; flex: 1;">姓名</view>
          <view style="font-size: 14px; color: #999999; flex: 3;">{{ user.username }}</view>
        </view>
        <view style="display: flex; justify-content: flex-start; align-items: center; border-bottom: 1px #e5e5e5 solid; padding: 16px 0;">
          <view style="font-size: 14px; color: #333333; flex: 1;">学号</view>
          <view style="font-size: 14px; color: #999999; flex: 3;">{{ user.studentNumber }}</view>
        </view>
        <view style="display: flex; justify-content: flex-start; align-items: center; border-bottom: 1px #e5e5e5 solid; padding: 16px 0;">
          <view style="font-size: 14px; color: #333333; flex: 1;">诚信记录</view>
          <view style="font-size: 14px; color: #00E676; flex: 2.5;" v-if="user.break===0">本月无不良记录</view>
          <view style="font-size: 14px; color: #d32f2f; flex: 2.5;" v-else>本月有{{ user.break }}次不良记录</view>
          <view style="font-size: 14px; color: #333333; flex: 0.5;" @tap="onShowHint">
            <AtIcon value='alert-circle' style="font-size: 16px; color: #6190E8; line-height: normal;"></AtIcon>
          </view>
        </view>

      </view>
    </view>

    <AtActionSheet cancelText='取消' :isOpened="showHint" :on-cancel="onHideHint" :on-close="onHideHint">
      <AtActionSheetItem>
        <view style="font-size: 14px; color: #999999; text-align: center;">报名活动后不参加（取消报名除外）将会被记为违规</view>
        <view style="font-size: 14px; color: #999999; text-align: center;">三次以上违规将在一个月内不能报名任何活动</view>
      </AtActionSheetItem>
      <AtActionSheetItem :on-click="onShowAppeal" style="color: #d32f2f;">
        申诉
      </AtActionSheetItem>
    </AtActionSheet>

    <view style="position: absolute; z-index: 10; width: 100%; height: 100%; background-color: #333333; opacity: 0.78;" v-if="showAppeal"></view>
    <view style="position: absolute; z-index: 99; top: 120px; width: 100%; display: flex; justify-content: center;" v-if="showAppeal">
      <view style="width: 280px; border-radius: 4px; background-color: white;">
        <view style="display: flex; justify-content: center; align-items: center; padding: 16px; border-bottom: 1px #e5e5e5 solid; font-size: 14px;">申诉理由</view>
        <view style="display: flex; justify-content: center; align-items: center; padding: 16px; border-bottom: 1px #e5e5e5 solid;">
          <AtTextarea :value="appealContext" :onChange="handleChange" placeholder='请在此填写' placeholderStyle="font-size: 14px;" style="background-color: #f7f7f7; font-size: 14px; border: none;"/>
        </view>
        <view style="display: flex; align-items: center;">
          <view style="flex: 1; padding: 16px; text-align: center; font-size: 14px; color: #333333;" @tap="cancelAppeal">取消</view>
          <view style="flex: 1; padding: 16px; border-left: 1px #e5e5e5 solid; text-align: center; font-size: 14px; color: #d32f2f;" @tap="confirmAppeal">提交申请</view>
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
  name: 'Space'
})
export default class Space extends Vue{
  user: UserModel = new UserModel();
  showHint: boolean = false;
  showAppeal: boolean = false;

  appealContext: string = '';


  mounted() {
    this.user.mock();
  }

  onShowHint() {
    console.log('展示申诉提示');
    this.showHint = true;
  }

  onHideHint() {
    console.log('隐藏申诉提示');
    this.showHint = false;
  }

  onShowAppeal() {
    console.log('展示申诉框');
    this.showHint = false;
    this.showAppeal = true;
    this.appealContext = '';
  }

  handleChange(val: string) {
    this.appealContext = val;
  }

  cancelAppeal() {
    console.log('取消申诉');
    this.showAppeal = false;
  }

  confirmAppeal() {
    console.log('提交申诉');
    console.log(this.appealContext);
    this.showAppeal = false;
  }


}

</script>

<style>

</style>
