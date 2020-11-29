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

    switch (t.status) {
      case ACTIVITY_STATUS.SIGN_UP:
        this.status = ACTIVITY_STATUS.SIGN_UP;
        break;
      case ACTIVITY_STATUS.SIGN_UP_END:
        this.status = ACTIVITY_STATUS.SIGN_UP_END;
        break;
      case ACTIVITY_STATUS.FINISH:
        this.status = ACTIVITY_STATUS.FINISH;
        break;
      default:
        break;
    }
  }

  public mock() {
    this.id = 'qwe123';
    this.coverUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg';
    this.name = '天文社观星活动';
    this.startTime = '2020-11-25 08:00';
    this.endTime = '2020-11-25 24:00';
    this.place = '南京市紫金山天文台';
    this.deadline = '2020-11-20 24:00';
    this.limitOfPeople = 50;
    this.numberOfPeople = 45;
    this.description = '无内容';
    this.status = ACTIVITY_STATUS.SIGN_UP;
  }

  public isSignUp(): boolean {
    return this.status === ACTIVITY_STATUS.SIGN_UP;
  }

  public isSignUpEnd(): boolean {
    return this.status === ACTIVITY_STATUS.SIGN_UP_END;
  }

  public isFinish(): boolean {
    return this.status === ACTIVITY_STATUS.FINISH;
  }

  public isFull(): boolean {
    return this.numberOfPeople >= this.limitOfPeople;
  }
}
