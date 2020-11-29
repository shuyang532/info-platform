<template>
  <view style="position: relative; height: 100%;">
    <view style="position: absolute; z-index: 0; width: 100%; display: flex; flex-direction: column; align-items: center;">
      <view style="width: 90%; height: 200px; border-radius: 6px; box-shadow: 8px 8px 12px #cccccc; margin-top: 16px;">
        <image :src="activity.coverUrl" mode="scaleToFill" style="width: 100%; height: 100%; border-radius: 6px;" alt="cover"/>
      </view>

      <view style="width: 90%; display: flex; flex-direction: column; align-items: center;">

        <view style="width: 100%; display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding-bottom: 12px; border-bottom: 1px solid #e5e5e5;">
          <view style="font-size: 16px; color: #333333;">{{ activity.name }}</view>
          <AtButton style="margin: 0; padding: 0; height: auto; border: none; line-height: normal;" open-type="share">
            <image src="../../assets/share.png" mode="scaleToFill" style="width: 24px; height: 24px;"></image>
          </AtButton>
        </view>

        <view style="width: 100%; display: flex; justify-content: flex-start; align-items: center; margin-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e5e5;">
          <image src="../../assets/clock.png" mode="scaleToFill" style="width: 24px; height: 24px;"></image>
          <view style="margin-left: 12px; font-size: 14px; color: #333333;">{{ activity.startTime }} - {{ activity.endTime }}</view>
        </view>

        <view style="width: 100%; display: flex; justify-content: flex-start; align-items: center; margin-top: 12px; padding-bottom: 12px; border-bottom: 1px solid #e5e5e5;">
          <image src="../../assets/place.png" mode="scaleToFill" style="width: 24px; height: 24px;"></image>
          <view style="margin-left: 12px; font-size: 14px; color: #333333;">{{ activity.place }}</view>
        </view>

        <view style="width: 100%; display: flex; justify-content: flex-start; align-items: center; border-bottom: 1px solid #e5e5e5;">
          <view style="font-size: 14px; color: #333333; flex: 2; padding: 12px 0;">截止时间：{{ activity.deadline }}</view>
          <view style="font-size: 14px; color: #333333; flex: 1; padding: 12px 8px; border-left: 1px solid #e5e5e5;">人数：{{ activity.numberOfPeople }} / {{ activity.limitOfPeople }}</view>
        </view>

        <view style="width: 100%; display: flex; flex-direction: column; justify-content: flex-start; min-height: 80px; padding: 12px 0;">
          <view style="font-size: 14px; color: #333333;">活动简介</view>
          <view style="font-size: 12px; color: #666666; padding: 12px 8px;">{{ activity.description }}</view>
        </view>

      </view>

      <view style="width: 90%;">
        <AtButton type="primary" :on-click="onJoinActivity" style="margin: 12px 0;" v-if="activity.isSignUp() && !activity.join && !activity.isFull() ">报名</AtButton>
        <AtButton type="primary" :on-click="onJoinActivity" style="margin: 12px 0;" disabled v-if="activity.isSignUp && !activity.join && activity.isFull()">人数已满</AtButton>
        <AtButton style="background-color: #FFD600; border-color: #FFD600; color: white; margin: 12px 0;" :on-click="onUnJoinActivity" v-if="activity.isSignUp() && activity.join">取消报名</AtButton>
        <AtButton type="primary" :on-click="onJoinActivity" style="margin: 12px 0;" disabled v-if="activity.isSignUpEnd()">报名截止</AtButton>
        <AtButton type="primary" :on-click="onJoinActivity" style="margin: 12px 0;" disabled v-if="activity.isFinish()">活动已结束</AtButton>
      </view>

    </view>

    <view style="position: absolute; z-index: 10; width: 100%; height: 100%; background-color: #333333; opacity: 0.78;" v-if="joinSuccessHint || unJoinSuccessHint || joinFailureHint"></view>
    <view style="position: absolute; z-index: 99; top: 120px; width: 100%; display: flex; justify-content: center;" v-if="joinSuccessHint">
      <view style="width: 240px; border-radius: 4px; background-color: white;">
        <view style="display: flex; flex-direction: column; align-items: center; padding: 16px;">
          <AtIcon value='check' size='32' style="color: #6190E8; border: 3px #6190E8 solid; padding: 8px; border-radius: 50%;"></AtIcon>
          <view style="font-size: 14px; color: #333333; margin: 8px 0;">报名成功！</view>
          <view style="font-size: 12px; color: #FFD600; text-align: center;">届时请准时到场参加，违规三次以上将会被限制报名！</view>
        </view>
        <view style="display: flex; flex-direction: column; align-items: center; padding: 8px; border-top: 1px solid #e5e5e5;">
          <view style="font-size: 14px; color: #333333" @tap="confirmJoinSuccess">确认</view>
        </view>
      </view>
    </view>
    <view style="position: absolute; z-index: 99; top: 120px; width: 100%; display: flex; justify-content: center;" v-if="unJoinSuccessHint">
      <view style="width: 240px; border-radius: 4px; background-color: white;">
        <view style="display: flex; flex-direction: column; align-items: center; padding: 16px;">
          <AtIcon value='check' size='32' style="color: #6190E8; border: 3px #6190E8 solid; padding: 8px; border-radius: 50%;"></AtIcon>
          <view style="font-size: 14px; color: #333333; margin: 8px 0;">已取消报名！</view>
        </view>
        <view style="display: flex; flex-direction: column; align-items: center; padding: 8px; border-top: 1px solid #e5e5e5;">
          <view style="font-size: 14px; color: #333333" @tap="confirmUnJoinSuccess">确认</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {ActivityModel} from "../../models/activity.model";
import API from "../../base/api";

@Component({
  name: 'Detail',
})
export default class Detail extends Vue {
  activityId: string = '';
  activity: ActivityModel = new ActivityModel();

  joinSuccessHint: boolean = false;
  unJoinSuccessHint: boolean = false;
  joinFailureHint: boolean = false;

  created() {
    if (Taro.getCurrentInstance().router.params.id) {
      this.activityId = Taro.getCurrentInstance().router.params.id;
      Taro.setStorageSync({
        key: 'activityId',
        value: this.activityId
      });
    } else {
      this.activityId = Taro.getStorageSync({key: 'activityId'});
    }
    console.log(this.activityId);
  }

  mounted() {
    // this.getActivityDetail();
    this.activity.mock();
  }

  getActivityDetail() {
    Taro.request({
      url: API.getActivityDetail(),
      method: 'GET',
      data: {
        activityId: this.activityId
      }
    }).then((res: any) => {
      if (res.success) {
        this.activity.engrave(res.data);
      }
    })
  }

  onJoinActivity() {
    this.joinSuccessHint = true;
  }

  confirmJoinSuccess() {
    this.joinSuccessHint = false;
    this.activity.join = true;
  }

  onUnJoinActivity() {
    this.unJoinSuccessHint = true;
  }

  confirmUnJoinSuccess() {
    this.unJoinSuccessHint = false;
    this.activity.join = false;
  }

}
</script>

<style>

</style>
