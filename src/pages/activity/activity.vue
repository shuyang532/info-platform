<template>
  <view style="display: flex; flex-direction: column;">
    <AtSearchBar
      placeholder="搜索"
      show-action-button
      :value="searchTerm"
      :on-change="handleInputSearch"
      :on-action-click="onActionClick"
    />

    <view style="background-color: #f8f8f8; padding: 8px 0;">

      <view style="display: flex; align-items: center; background-color: white;">
        <view style="display: flex; align-items: center; padding: 8px 12px;">

          <view style="font-size: 16px; color: #cccccc;">时间</view>
          <view v-if="!showSelectedDate" @tap="showSelectedDate = true" style="display: flex; margin-left: 4px;">
            <AtIcon value="chevron-right" size="16" color="#6190E8"></AtIcon>
          </view>
          <view v-else @tap="showSelectedDate = false" style="display: flex; margin-left: 4px;">
            <AtIcon value="chevron-down" size="16" color="#6190E8"></AtIcon>
          </view>

        </view>

        <view style="display: flex; align-items: center; padding: 8px 12px;">

          <view style="font-size: 16px; color: #cccccc;">活动类型</view>
          <view v-if="!showSelectedTags" @tap="showSelectedTags = true" style="display: flex; margin-left: 4px;">
            <AtIcon value="chevron-right" size="16" color="#6190E8"></AtIcon>
          </view>
          <view v-else @tap="showSelectedTags = false" style="display: flex; margin-left: 4px;">
            <AtIcon value="chevron-down" size="16" color="#6190E8"></AtIcon>
          </view>

        </view>
      </view>

      <AtCalendar :on-day-click="onSelectDate" v-if="showSelectedDate"
                  style="background-color: white; border-top: 1px #f8f8f8 solid;"/>

      <view v-if="showSelectedTags" style="background-color: white; border-top: 1px #f8f8f8 solid; padding: 16px; display: flex; flex-wrap: wrap;">
        <view v-for="tag in tags" style="padding: 2px 4px;">
          <AtTag :name="tag.name" circle :active="tag.active" :on-click="onSelectTags">{{ tag.title }}</AtTag>
        </view>
      </view>

    </view>

    <view style="flex: 1; display: flex; flex-direction: column; align-items: center; background-color: #f8f8f8;">

      <view v-for="activity in activities" style="width: 90%; height: 200px; border-radius: 6px; box-shadow: 8px 8px 12px #cccccc; position: relative; display: flex; align-items: center; justify-content: flex-end; margin: 16px 0;">
        <image :src="activity.coverUrl" mode="scaleToFill" style="width: 100%; height: 100%; border-radius: 6px; position: absolute;"></image>
        <view style="position: absolute; z-index: 99; padding-right: 16px;" @tap="onViewDetail(activity)">
          <AtIcon value="chevron-right" size="32" style="background-color: #6190E8; color: white; padding: 4px; border-radius: 50%;"></AtIcon>
        </view>
      </view>

    </view>


  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {APP_ROUTES} from "../../base/constant";

@Component({
  name: 'Activity',
})
export default class Activity extends Vue {
  searchTerm: string = '';

  showSelectedDate: boolean = false;
  selectedDate: string = '';

  showSelectedTags: boolean = false;
  selectedTags: any [] = [];
  tags: any[] = [
    {
      id: 0,
      name: "tag1",
      title: "标签",
      active: false
    },
    {
      id: 1,
      name: "tag2",
      title: "标签",
      active: true
    },
    {
      id: 2,
      name: "tag3",
      title: "标签",
      active: false
    },
    {
      id: 3,
      name: "tag4",
      title: "标签",
      active: true
    },
    {
      id: 4,
      name: "tag5",
      title: "标签",
      active: false
    },
    {
      id: 5,
      name: "tag6",
      title: "标签",
      active: false
    },
    {
      id: 6,
      name: "tag7",
      title: "标签",
      active: false
    }
  ]

  activities: any[] = [
    {
      coverUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg"
    },
    {
      coverUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg"
    },
    {
      coverUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg"
    },
    {
      coverUrl: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg"
    }
  ]


  handleInputSearch(val: string) {
    this.searchTerm = val;
  }

  onSelectDate(val: string) {
    console.log(val);
  }

  onSelectTags(val: any) {
    console.log(val);
  }

  onActionClick() {
    console.log('点击了搜索按钮')
  }

  onViewDetail(activity: any) {
    console.log("点击进入详情页");
    console.log(activity);
    Taro.navigateTo({
      url: APP_ROUTES.DETAIL
    })
  }
}
</script>

<style>

</style>
