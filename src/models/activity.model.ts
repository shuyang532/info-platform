import {UserModel} from "./user.model";
import {TeamModel} from "./team.model";
import {ACTIVITY_STATUS} from "../base/constant";

export class ActivityModel {
  id: string = '';
  name: string = '';
  coverUrl: string = '';
  startTime: string = ''; //活动开始时间
  endTime: string = ''; //活动结束时间
  place: string = '';
  limitOfPeople: number = 100; //报名人数上限
  numberOfPeople: number = 60; //已报名人数
  scope: any = {
    scopeId: '',
    name: ''
  };
  description: string = '';
  deadline: string = ''; //报名截止时间
  type: any = {
    typeId: '',
    name: ''
  }

  creator: UserModel = new UserModel();  //活动发起人
  createTime: string = '';  //活动发起时间
  team: TeamModel = new TeamModel(); //活动发起组织

  top: boolean = false; //是否置顶
  join: boolean = false;  //当前用户是否已报名
  create: boolean = false;  //是否为当前用户创建
  status: string = '';  //活动状态：报名中、报名截止、正在进行、活动结束

  constructor() {
  }

  public engrave(t: any) {
    this.id = t.activityId;
    this.name = t.name;
    this.coverUrl = t.imageUrl;
    this.startTime = t.startTime;
    this.endTime = t.endTime;
    this.place = t.place;
    this.limitOfPeople = t.limitOfPeople;
    this.numberOfPeople = t.numberOfPeople;

    this.scope.scopeId = t.scope.scopeId;
    this.scope.name = t.scope.name;

    this.description = t.description;
    this.deadline = t.deadline;

    this.type.typeId = t.type.typeId;
    this.type.name = t.type.name;

    this.creator.id = t.creatorId;
    this.creator.nickname = t.creatorName;
    this.team.id = t.teamId;
    this.team.name = t.teamName;

    this.top = t.top;
    this.join = t.join;
    this.create = t.create;
    this.status = t.status;
  }

  public isJoinOn(): boolean {
    return this.status === ACTIVITY_STATUS.JOIN_ON;
  }

  public isJoinEnd(): boolean {
    return this.status === ACTIVITY_STATUS.JOIN_END;
  }

  public isFinish(): boolean {
    return this.status === ACTIVITY_STATUS.FINISH;
  }

  public isFull(): boolean {
    return this.numberOfPeople >= this.limitOfPeople;
  }
}
