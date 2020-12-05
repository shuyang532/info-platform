<template>
  <view class="tf-detail-container">
    <view class="tf-detail-main-part">
      <view class="tf-detail-image-part">
        <image :src="activity.coverUrl" mode="scaleToFill" class="tf-detail-image" alt="cover"/>
      </view>

      <view class="tf-detail-info-part">

        <view class="tf-detail-name">
          <view class="tf-detail-name-text">{{ activity.name }}</view>
          <AtButton class="tf-detail-share-btn" open-type="share">
            <image src="../../assets/images/share.png" mode="scaleToFill" class="tf-detail-icon"></image>
          </AtButton>
        </view>

        <view class="tf-detail-place">
          <image src="../../assets/images/clock.png" mode="scaleToFill" class="tf-detail-icon"></image>
          <view class="tf-detail-place-text">{{ activity.startTime }} - {{ activity.endTime }}</view>
        </view>

        <view class="tf-detail-place">
          <image src="../../assets/images/place.png" mode="scaleToFill" class="tf-detail-icon"></image>
          <view class="tf-detail-place-text">{{ activity.place }}</view>
        </view>

        <view class="tf-detail-deadline">
          <view class="tf-detail-deadline-text">截止时间：{{ activity.deadline }}</view>
          <view class="tf-detail-deadline-person">人数：{{ activity.numberOfPeople }} / {{ activity.limitOfPeople }}</view>
        </view>

        <view class="tf-detail-description">
          <view class="tf-detail-description-text">活动简介</view>
          <view class="tf-detail-description-context">{{ activity.description }}</view>
        </view>

      </view>

      <view class="tf-detail-btn-part">
        <AtButton type="primary" :on-click="onJoinActivity" class="tf-detail-btn" v-if="activity.isSignUp() && !activity.join && !activity.isFull() ">报名</AtButton>
        <AtButton type="primary" :on-click="onJoinActivity" class="tf-detail-btn" disabled v-if="activity.isSignUp && !activity.join && activity.isFull()">人数已满</AtButton>
        <AtButton :on-click="onUnJoinActivity" class="tf-detail-info-btn" v-if="activity.isSignUp() && activity.join">取消报名</AtButton>
        <AtButton type="primary" :on-click="onJoinActivity" class="tf-detail-btn" disabled v-if="activity.isSignUpEnd()">报名截止</AtButton>
        <AtButton type="primary" :on-click="onJoinActivity" class="tf-detail-btn" disabled v-if="activity.isFinish()">活动已结束</AtButton>
      </view>

    </view>

    <view class="tf-detail-mask" v-if="joinSuccessHint || unJoinSuccessHint || joinFailureHint"></view>
    <view class="tf-detail-dialog" v-if="joinSuccessHint">
      <view class="tf-detail-dialog-card">
        <view class="tf-detail-dialog-content">
          <AtIcon value='check' size='32' class="tf-detail-dialog-icon"></AtIcon>
          <view class="tf-detail-dialog-content-text">报名成功！</view>
          <view class="tf-detail-dialog-content-hint">届时请准时到场参加，违规三次以上将会被限制报名！</view>
        </view>

        <view class="tf-detail-dialog-action">
          <view class="tf-detail-dialog-action-text" @tap="confirmJoinSuccess">确认</view>
        </view>
      </view>
    </view>
    <view class="tf-detail-dialog" v-if="unJoinSuccessHint">
      <view class="tf-detail-dialog-card">
        <view class="tf-detail-dialog-content">
          <AtIcon value='check' size='32' class="tf-detail-dialog-icon"></AtIcon>
          <view class="tf-detail-dialog-content-text">已取消报名！</view>
        </view>
        <view class="tf-detail-dialog-action">
          <view class="tf-detail-dialog-action-text" @tap="confirmUnJoinSuccess">确认</view>
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
    /*if (Taro.getCurrentInstance().router.params.id) {
      this.activityId = Taro.getCurrentInstance().router.params.id;
      Taro.setStorageSync({
        key: 'activityId',
        value: this.activityId
      });
    } else {
      this.activityId = Taro.getStorageSync({key: 'activityId'});
    }
    console.log(this.activityId);*/
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

<style lang="scss">
@import "src/assets/variables.scss";


.tf-detail-container {
  position: relative;
  height: 100%;
}

.tf-detail-main-part {
  position: absolute;
  z-index: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tf-detail-image-part {
  width: 90%;
  height: 400px;
  border-radius: 12px;
  box-shadow: 16px 16px 24px $tf-color-grey3;
  margin-top: 32px;

  .tf-detail-image {
    width: 100%;
    height: 100%;
    border-radius: 12px;
  }
}

.tf-detail-info-part {
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;

  .tf-detail-name {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 32px;
    padding-bottom: 24px;
    border-bottom: 2px solid $tf-color-grey4;

    .tf-detail-name-text {
      font-size: 32px;
      color: $tf-color-dark1;
    }

    .tf-detail-share-btn {
      margin: 0;
      padding: 0;
      height: auto;
      border: none;
      line-height: normal;
    }
  }

  .tf-detail-icon {
    width: 48px;
    height: 48px;
  }

  .tf-detail-place {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 24px;
    padding-bottom: 24px;
    border-bottom: 2px solid $tf-color-grey4;

    .tf-detail-place-text {
      margin-left: 24px;
      font-size: 28px;
      color: $tf-color-dark1;
    }
  }

  .tf-detail-deadline {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2px solid $tf-color-grey4;

    .tf-detail-deadline-text {
      font-size: 28px;
      color: $tf-color-dark1;
      flex: 2;
      padding: 24px 0;
    }

    .tf-detail-deadline-person {
      font-size: 28px;
      color: $tf-color-dark1;
      flex: 1;
      padding: 24px 16px;
      border-left: 2px solid $tf-color-grey4;
    }
  }

  .tf-detail-description {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 160px;
    padding: 24px 0;

    .tf-detail-description-text {
      font-size: 28px;
      color: $tf-color-dark1;
    }

    .tf-detail-description-context {
      font-size: 24px;
      color: $tf-color-dark2;
      padding: 24px 16px;
    }
  }
}

.tf-detail-btn-part {
  width: 90%;

  .tf-detail-btn {
    margin: 24px 0;
  }

  .tf-detail-info-btn {
    background-color: $tf-color-info;
    border-color: $tf-color-info;
    color: $tf-color-white;
    margin: 24px 0;
  }
}

.tf-detail-mask {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: $tf-color-dark1;
  opacity: 0.78;
}

.tf-detail-dialog {
  position: absolute;
  z-index: 99;
  top: 240px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.tf-detail-dialog-card {
  width: 480px;
  border-radius: 8px;
  background-color: $tf-color-white;

  .tf-detail-dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;

    .tf-detail-dialog-icon {
      color: $tf-color-primary;
      border: 6px $tf-color-primary solid;
      padding: 16px;
      border-radius: 50%;
    }

    .tf-detail-dialog-content-text {
      font-size: 28px;
      color: $tf-color-dark1;
      margin: 16px 0;
    }

    .tf-detail-dialog-content-hint {
      font-size: 24px;
      color: $tf-color-info;
      text-align: center;
    }
  }

  .tf-detail-dialog-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    border-top: 2px solid $tf-color-grey4;

    .tf-detail-dialog-action-text {
      font-size: 28px;
      color: $tf-color-dark1;
    }
  }
}

</style>
