<template>
  <view>

    <view class="tf-feedback-image-part">
      <image src="../../assets/images/feedback.png" mode="scaleToFill" class="tf-feedback-image"></image>
    </view>

    <view class="tf-feedback-contact-part">
      <view class="tf-feedback-contact">
        <view class="tf-feedback-contact-title">联系邮箱</view>
        <view class="tf-feedback-contact-email">{{ serviceEmail }}</view>
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

<style lang="scss">
@import "src/assets/variables.scss";


.tf-feedback-image-part {
  background-color: $tf-color-grey2;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 128px 48px 96px;

  .tf-feedback-image {
    width: 128px;
    height: 128px;
  }
}

.tf-feedback-contact-part {
  padding: 48px;

  .tf-feedback-contact {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2px $tf-color-grey4 solid;
    padding-bottom: 32px;

    .tf-feedback-contact-title {
      font-size: 28px;
      color: $tf-color-dark1;
      flex: 1;
    }

    .tf-feedback-contact-email {
      font-size: 28px;
      color: $tf-color-dark3;
      flex: 3;
    }
  }
}

</style>
