<template>
  <view class="container">



  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {APP_ROUTES} from "../../base/constant";

@Component({
  name: 'Mine'
})
export default class Mine extends Vue{

}

</script>

<style>

.container {
  padding: 80px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
