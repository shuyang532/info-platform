<template>
  <view class="tf-space-container">

    <view class="tf-space-info">
      <view class="tf-space-avatar">
        <AtAvatar circle :open-data="{type: 'userAvatarUrl'}" class="tf-space-avatar-size"></AtAvatar>
      </view>

      <view class="tf-space-list">
        <view class="tf-space-list-item">
          <view class="tf-space-list-item-title">昵称</view>
          <view class="tf-space-list-item-content">
            <open-data type="userNickName"></open-data>
          </view>
        </view>
        <view class="tf-space-list-item">
          <view class="tf-space-list-item-title">姓名</view>
          <view class="tf-space-list-item-content">{{ user.username }}</view>
        </view>
        <view class="tf-space-list-item">
          <view class="tf-space-list-item-title">学号</view>
          <view class="tf-space-list-item-content">{{ user.studentNumber }}</view>
        </view>
        <view class="tf-space-list-item">
          <view class="tf-space-list-item-title">诚信记录</view>
          <view class="tf-space-list-item-break-text1" v-if="user.break===0">本月无不良记录</view>
          <view class="tf-space-list-item-break-text2" v-else>本月有{{ user.break }}次不良记录</view>
          <view class="tf-space-list-item-break-hint" @tap="onShowHint">
            <AtIcon value='alert-circle' class="tf-space-list-item-break-hint-icon"></AtIcon>
          </view>
        </view>

      </view>
    </view>

    <AtActionSheet cancelText='取消' :isOpened="showHint" :on-cancel="onHideHint" :on-close="onHideHint">
      <AtActionSheetItem>
        <view class="tf-space-action-hint">报名活动后不参加（取消报名除外）将会被记为违规</view>
        <view class="tf-space-action-hint">三次以上违规将在一个月内不能报名任何活动</view>
      </AtActionSheetItem>
      <AtActionSheetItem :on-click="onShowAppeal" style="color: #d32f2f;">申诉</AtActionSheetItem>
    </AtActionSheet>

    <view class="tf-space-mask" v-if="showAppeal"></view>

    <view class="tf-space-dialog" v-if="showAppeal">
      <view class="tf-space-dialog-card">
        <view class="tf-space-dialog-title">申诉理由</view>
        <view class="tf-space-dialog-context">
          <AtTextarea :value="appealContext" :onChange="handleChange" placeholder='请在此填写'  placeholderStyle="font-size: 14px;" style="background-color: #f7f7f7; font-size: 14px; border: none;"/>
        </view>
        <view class="tf-space-dialog-action">
          <view class="tf-space-dialog-cancel" @tap="cancelAppeal">取消</view>
          <view class="tf-space-dialog-confirm" @tap="confirmAppeal">提交申请</view>
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
import {postFeedback} from "../../base/servers/servers";
import {Base} from "../../base/base";

@Component({
  name: 'Space'
})
export default class Space extends Vue{
  base: Base = Base.getInstance();

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
    this.showHint = false;
  }

  onShowAppeal() {
    this.showHint = false;
    this.showAppeal = true;
    this.appealContext = '';
  }

  handleChange(val: string) {
    this.appealContext = val;
  }

  cancelAppeal() {
    this.showAppeal = false;
  }

  confirmAppeal() {
    postFeedback(this.appealContext).then((res: any) => {
      if (res.success) {
        this.base.showToast("申诉提交成功");
      } else {
        this.base.showToast("申诉提交失败");
      }
    })
    this.showAppeal = false;
  }


}

</script>

<style lang="scss">
@import "src/assets/variables.scss";


.tf-space-container {
  position: relative;
  height: 100%;
}

.tf-space-info {
  position: absolute;
  z-index: 0;
  width: 100%;
}

.tf-space-avatar {
  background-color: $tf-color-grey2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 128px 48px 96px;

  .tf-space-avatar-size {
    width: 128px;
    height: 128px;
  }
}

.tf-space-list {
  padding: 24px;

  .tf-space-list-item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2px $tf-color-grey4 solid;
    padding: 32px 0;

    .tf-space-list-item-title {
      font-size: 28px;
      color: $tf-color-dark1;
      flex: 1;
    }

    .tf-space-list-item-content {
      font-size: 28px;
      color: $tf-color-dark3;
      flex: 3;
    }

    .tf-space-list-item-break-text1 {
      font-size: 28px;
      color: $tf-color-green;
      flex: 2.5;
    }

    .tf-space-list-item-break-text2 {
      font-size: 28px;
      color: $tf-color-warning;
      flex: 2.5;
    }

    .tf-space-list-item-break-hint {
      font-size: 28px;
      color: $tf-color-dark1;
      flex: 0.5;

      .tf-space-list-item-break-hint-icon {
        font-size: 32px;
        color: $tf-color-primary;
        line-height: normal;
      }
    }

  }
}

.tf-space-action-hint {
  font-size: 28px;
  color: $tf-color-dark3;
  text-align: center;
}

.tf-space-mask {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: $tf-color-dark1;
  opacity: 0.78;
}

.tf-space-dialog {
  position: absolute;
  z-index: 99;
  top: 240px;
  width: 100%;
  display: flex;
  justify-content: center;

  .tf-space-dialog-card {
    width: 560px;
    border-radius: 8px;
    background-color: $tf-color-white;

    .tf-space-dialog-title {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 32px;
      border-bottom: 2px $tf-color-grey4 solid;
      font-size: 28px;
    }

    .tf-space-dialog-context {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 32px;
      border-bottom: 2px $tf-color-grey4 solid;
    }

    .tf-space-dialog-action {
      display: flex;
      align-items: center;

      .tf-space-dialog-cancel {
        flex: 1;
        padding: 32px;
        text-align: center;
        font-size: 28px;
        color: $tf-color-dark1;
      }

      .tf-space-dialog-confirm {
        flex: 1;
        padding: 32px;
        border-left: 2px $tf-color-grey4 solid;
        text-align: center;
        font-size: 28px;
        color: $tf-color-warning;
      }
    }

  }

}

</style>
