<template>
  <view class="tf-activity-container">

    <AtSearchBar
      placeholder="搜索"
      show-action-button
      :value="searchTerm"
      :on-change="handleInputSearch"
      :on-action-click="onSearchClick"
    />

    <view class="tf-activity-select-part">

      <view class="tf-activity-select-options">

        <view class="tf-activity-select-option">
          <view class="tf-activity-select-option-text">时间</view>
          <view v-if="!showSelectedDate" @tap="onShowSelectDate" class="tf-activity-select-option-icon">
            <AtIcon value="chevron-right" size="16" color="#6190E8"></AtIcon>
          </view>
          <view v-else @tap="showSelectedDate = false" class="tf-activity-select-option-icon">
            <AtIcon value="chevron-down" size="16" color="#6190E8"></AtIcon>
          </view>
        </view>

        <view class="tf-activity-select-option">
          <view class="tf-activity-select-option-text">活动类型</view>
          <view v-if="!showSelectedTags" @tap="onShowSelectTags" class="tf-activity-select-option-icon">
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
          <AtTag :name="tag.typeId" circle :active="tag.active" :on-click="onSelectTags">{{ tag.name }}</AtTag>
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

<!--  TODO 分页
    <view class="tf-activity-pagination">
      <AtPagination :total="pages" :page-size="pageItems" :current="currentPage"/>
    </view>
-->

  </view>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import Taro from '@tarojs/taro';
import {APP_ROUTES} from "../../base/constant";
import {ActivityModel} from "../../models/activity.model";
import {getActivity, getActivityTypes} from "../../base/servers/servers";
import {Base} from "../../base/base";
import {TagModel} from "../../models/tag.model";

@Component({
  name: 'Activity',
})
export default class Activity extends Vue {
  base: Base = Base.getInstance();
  // 搜索框
  searchTerm: string = '';
  // 日期筛选
  showSelectedDate: boolean = false;
  selectedDate: string = '';
  // 标签筛选()
  showSelectedTags: boolean = false;
  selectedTagId: string = '';
  // 标签列表
  tags: TagModel[] = [];
  // 活动列表
  activities: ActivityModel[] = [];
  // 分页相关
  currentPage: number = 0;
  pageItems: number = 20;
  pages: number = 5;

  mounted() {
    this.getActivities();
    this.getTypes();
  }

  // 获取活动类型列表
  getTypes() {
    getActivityTypes().then((res: any) => {
      if (res.success) {
        this.base.showToast("活动类型列表获取成功");
        this.tags = res.data.map((item: any) => {
          const tag =  new TagModel();
          tag.engrave(item);
          return tag;
        });
      } else {
        this.base.showToast("活动类型列表获取失败");
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  // 获取所有的活动列表（可能有分页处理）
  getActivities() {
    getActivity("all", this.currentPage, this.pageItems).then((res: any) => {
      if (res.success) {
        this.base.showToast("活动列表获取成功");
        this.activities = res.data.activities.map((item: any) => {
          const am =  new ActivityModel();
          am.engrave(item);
          return am;
        });
        this.pages = res.data.pages;
      } else {
        this.base.showToast("活动列表获取失败");
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  // 获取搜索+筛选后的活动列表
  getFilterActivities() {
    getActivity("filter", this.currentPage, this.pageItems, this.searchTerm, this.selectedDate, this.selectedTagId).then((res: any) => {
      if (res.success) {
        this.base.showToast("获取搜索+筛选后的活动列表成功");
        this.activities = res.data.activities.map((item: any) => {
          const am =  new ActivityModel();
          am.engrave(item);
          return am;
        });
        this.pages = res.data.pages;
      } else {
        this.base.showToast("获取搜索+筛选后的活动列表失败");
      }
    }).catch((err: any) => {
      console.log(err);
    });
  }

  handleInputSearch(val: string) {
    this.searchTerm = val;
  }

  onShowSelectDate() {
    this.showSelectedTags = false;
    this.showSelectedDate = true;
  }

  onSelectDate(val: string) {
    this.selectedDate = val;
    this.getFilterActivities();
  }

  onShowSelectTags(){
    this.showSelectedDate = false;
    this.showSelectedTags = true;
  }

  onSelectTags(val: any) {
    for (const tag of this.tags) {
      tag.active = tag.typeId === val.name;
    }
    this.selectedTagId = val.name;
    this.getFilterActivities();
  }

  onSearchClick() {
    this.getFilterActivities();
  }

  onViewDetail(activity: any) {
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

.tf-activity-pagination {
  padding: 24px 0 36px;
}


</style>
