<template>
  <view class="tf-activity-container">

    <AtSearchBar
      placeholder="搜索"
      show-action-button
      :value="searchTerm"
      :on-change="handleInputSearch"
      :on-action-click="onActionClick"
    />

    <view class="tf-activity-select-part">

      <view class="tf-activity-select-options">

        <view class="tf-activity-select-option">
          <view class="tf-activity-select-option-text">时间</view>
          <view v-if="!showSelectedDate" @tap="showSelectedDate = true" class="tf-activity-select-option-icon">
            <AtIcon value="chevron-right" size="16" color="#6190E8"></AtIcon>
          </view>
          <view v-else @tap="showSelectedDate = false" class="tf-activity-select-option-icon">
            <AtIcon value="chevron-down" size="16" color="#6190E8"></AtIcon>
          </view>
        </view>

        <view class="tf-activity-select-option">
          <view class="tf-activity-select-option-text">活动类型</view>
          <view v-if="!showSelectedTags" @tap="showSelectedTags = true" class="tf-activity-select-option-icon">
            <AtIcon value="chevron-right" size="16" color="#6190E8"></AtIcon>
          </view>
          <view v-else @tap="showSelectedTags = false" class="tf-activity-select-option-icon">
            <AtIcon value="chevron-down" size="16" color="#6190E8"></AtIcon>
          </view>
        </view>

      </view>

      <AtCalendar :on-day-click="onSelectDate" v-if="showSelectedDate" class="tf-activity-select-calender"/>

      <view v-if="showSelectedTags" class="tf-activity-select-scope">
        <view v-for="tag in tags" class="tf-activity-select-scope-item">
          <AtTag :name="tag.name" circle :active="tag.active" :on-click="onSelectTags">{{ tag.title }}</AtTag>
        </view>
      </view>

    </view>

    <view class="tf-activity-list">

      <view v-for="activity in activities" class="tf-activity-list-item">
        <image :src="activity.coverUrl" mode="scaleToFill" class="tf-activity-list-item-image"></image>
        <view class="tf-activity-list-item-icon-part" @tap="onViewDetail(activity)">
          <AtIcon value="chevron-right" size="32" class="tf-activity-list-item-icon"></AtIcon>
        </view>
      </view>

    </view>


  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {APP_ROUTES} from "../../base/constant";
import {ActivityModel} from "../../models/activity.model";

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
  ];

  activities: ActivityModel[] = [];

  mounted() {
    const am = new ActivityModel();
    am.mock();
    for(let i = 0; i<=9; i++) {
      this.activities.push(am);
    }
  }


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
      url: APP_ROUTES.DETAIL+'?id='+activity.id
    })
  }
}
</script>

<style lang="scss">
@import "src/assets/variables.scss";

.tf-activity-container {
  display: flex;
  flex-direction: column;
}

.tf-activity-select-part {
  background-color: $tf-color-grey2;
  padding: 16px 0;

  .tf-activity-select-options {
    display: flex;
    align-items: center;
    background-color: $tf-color-white;

    .tf-activity-select-option {
      display: flex;
      align-items: center;
      padding: 16px 24px;
    }

    .tf-activity-select-option-text {
      font-size: 32px;
      color: $tf-color-grey3;
    }

    .tf-activity-select-option-icon {
      display: flex;
      margin-left: 8px;
    }
  }

  .tf-activity-select-calender {
    background-color: $tf-color-white;
    border-top: 2px #f8f8f8 solid;
  }

  .tf-activity-select-scope {
    background-color: $tf-color-white;
    border-top: 2px $tf-color-grey2 solid;
    padding: 32px;
    display: flex;
    flex-wrap: wrap;

    .tf-activity-select-scope-item {
      padding: 4px 8px;
    }
  }
}

.tf-activity-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $tf-color-grey2;

  .tf-activity-list-item {
    width: 90%;
    height: 400px;
    border-radius: 12px;
    box-shadow: 16px 16px 24px $tf-color-grey3;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 32px 0;

    .tf-activity-list-item-image {
      width: 100%;
      height: 100%;
      border-radius: 12px;
      position: absolute;
    }

    .tf-activity-list-item-icon-part {
      position: absolute;
      z-index: 99;
      padding-right: 32px;

      .tf-activity-list-item-icon {
        background-color: $tf-color-primary;
        color: $tf-color-white;
        padding: 8px;
        border-radius: 50%;
      }
    }
  }
}


</style>
