<template>
  <view style="background-color: #f8f8f8; min-height: 100%; position: fixed;">
    <AtNoticebar>学号与微信绑定后不可更改，请确认是本人学号和微信。</AtNoticebar>
    <view style="padding: 16px 24px;">

      <view style="background-color: white; padding: 80px 24px;">

        <view>
          <view style="color: #6190E8; font-size: 24px">注册</view>
          <view style="background-color: #6190E8; height: 2px; width: 64px; margin: 12px 0;"></view>
        </view>

        <view style="margin: 80px 0 24px;">
          <AtInput
            name="number"
            title="学号"
            type="text"
            clear
            :border="false"
            placeholder="请输入学号"
            placeholder-style="font-size: 12px;"
            style="margin: 0; padding: 8px 16px; background-color: #f7f7f7;"
            :value="studentNumber"
            :on-change="handleInputNumber"
          />
        </view>

        <view style="margin: 24px 0;">
          <AtInput
            name="code"
            title="验证码"
            type="text"
            clear
            :border="false"
            :placeholder="verificationCodeHint"
            placeholder-style="font-size: 12px;"
            style="margin: 0; padding: 8px 16px; background-color: #f7f7f7;"
            :value="verificationCode"
            :on-change="handleInputCode"
          >
            <AtButton size="small" style="font-size: 12px; border: none; padding: 0; margin-left: 8px;"
                      :on-click="sentVerificationCode" v-if="remainedTime<=0">发送验证码
            </AtButton>
            <view style="font-size: 12px; margin-left: 8px; display: flex; align-items: center; color: #E93B3D; height: 60rpx;" v-else>
              {{ remainedTime }}s后重发
            </view>
          </AtInput>
        </view>

      </view>

      <AtButton type="primary" style="margin-top: 24px;" :on-click="onRegister">创建账户</AtButton>

    </view>

    <AtActionSheet
      :isOpened="openAuthorize"
      cancelText="取消"
      :on-cancel="handleCancel"
    >

      <AtActionSheetItem style="display: flex; flex-direction: column; align-items: center; padding: 32px 0;">

        <AtAvatar circle :open-data="{type: 'userAvatarUrl'}" style="width: 72px; height: 72px;"></AtAvatar>
        <view style="margin-top: 24px; font-size: 16px;">
          <open-data type="userNickName"></open-data>
        </view>

      </AtActionSheetItem>

      <AtActionSheetItem>
        <AtButton type="secondary" open-type="getUserInfo" :on-get-user-info="bindGetUserInfo" style="border: none;">
          微信授权
        </AtButton>
      </AtActionSheetItem>


    </AtActionSheet>

  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import APP_ROUTES from "../../base/constant";

@Component({
  name: "Register"
})

export default class Register extends Vue {
  studentNumber: string = '';
  verificationCode: string = '';
  openAuthorize: boolean = false;

  verificationCodeHint: string = '点击发送验证码'
  remainedTime: number = 0;

  mounted() {
    const _this = this;
    Taro.getSetting({
      success: (res: any) => {
        if (!res.authSetting["scope.userInfo"]) {
          console.log('dd');
          _this.openAuthorize = true;
        }
      }
    })
  }

  onRegister() {
    console.log('注册');
    Taro.redirectTo({
      url: APP_ROUTES.WELCOME
    })
  }

  bindGetUserInfo(e: any) {
    console.log(e);
    this.openAuthorize = false;
  }

  handleCancel() {
    Taro.navigateBack();
  }

  handleInputNumber(val: string) {
    this.studentNumber = val;
  }

  handleInputCode(val: string) {
    this.verificationCode = val;
  }

  sentVerificationCode() {
    console.log('发送验证码')
    this.verificationCodeHint = "已发送至学邮";
    this.remainedTime = 60;
    this.countdownTime();
    console.log('结束倒计时')
  }

  countdownTime() {
    if (this.remainedTime <= 0) {
      this.verificationCodeHint = "点击发送验证码";
    } else {
      this.remainedTime--;
      setTimeout(() => {
        this.countdownTime();
      }, 1000);
    }
  }

}
</script>

<style>

.at-input__title {
  font-size: 24px;
  width: 102px;
}

.at-input input {
  font-size: 24px;
}

.at-action-sheet__footer {
  font-size: 32px;
}

</style>
