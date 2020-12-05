<template>
  <view>

    <view class="tf-mine-info">
      <view class="tf-mine-avatar">
        <AtAvatar circle :image="user.avatarUrl" class="tf-mine-avatar-size"></AtAvatar>
        <view class="tf-mine-nickname">{{ user.nickname }}</view>
      </view>
      <view class="tf-mine-guide">
        <view class="tf-mine-guide-text">个人主页</view>
        <view @tap="toSpace">
          <AtIcon value="chevron-right" class="tf-mine-guide-icon"></AtIcon>
        </view>
      </view>
    </view>

    <view class="tf-mine-list">
      <view class="tf-mine-list-item">
        <view class="tf-mine-list-item-text">我参与的</view>
        <view @tap="toJoin">
          <AtIcon value="chevron-right" class="tf-mine-list-item-icon"></AtIcon>
        </view>
      </view>
      <view class="tf-mine-list-item">
        <view class="tf-mine-list-item-text">意见反馈</view>
        <view @tap="toFeedback">
          <AtIcon value="chevron-right" class="tf-mine-list-item-icon"></AtIcon>
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

<style lang="scss">
@import "src/assets/variables.scss";


.tf-mine-info {
  background-color: $tf-color-grey2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 128px 48px 96px;

  .tf-mine-avatar {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .tf-mine-avatar-size {
      width: 128px;
      height: 128px;
    }

    .tf-mine-nickname {
      font-size: 32px;
      color: $tf-color-dark1;
      margin-left: 32px;
    }
  }

  .tf-mine-guide {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .tf-mine-guide-text {
      font-size: 24px;
      color: $tf-color-dark3;
    }

    .tf-mine-guide-icon {
      font-size: 32px;
      color: $tf-color-primary;
      line-height: normal;
      margin-left: 8px;
    }
  }
}


.tf-mine-list {
  padding: 48px;

  .tf-mine-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px $tf-color-grey4 solid;
    padding: 32px 0;

    .tf-mine-list-item-text {
      font-size: 28px;
      color: $tf-color-dark1;
    }

    .tf-mine-list-item-icon {
      font-size: 32px;
      color: $tf-color-dark3;
      line-height: normal;
      margin-left: 8px;
    }
  }
}

</style>
