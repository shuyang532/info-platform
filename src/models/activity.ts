import {User} from "./user";
import {Team} from "./team";

export class Activity {
  id: string = 'asg12bdrphs';
  name: string = '活动名称';
  coverUrl: string = "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg";
  startTime: string = '2020-12-02 12:30'; //活动开始时间
  endTime: string = '2020-12-02 14:30'; //活动结束时间
  place: string = '活动地点';
  limitOfPeople: number = 100; //报名人数上限
  numberOfPeople: number = 60; //已报名人数
  scope: any = {
    scopeId: '活动报名范围',
    name: '16级软件工程'
  };
  description: string = '活动简介';
  deadline: string = '2020-11-25 24:00'; //报名截止时间
  type: any = {
    typeId: '4fwq41',
    name: '活动类型名称'
  }

  creator: User = new User();  //活动发起人
  createTime: string = '';  //活动发起时间
  team: Team = new Team(); //活动发起组织

  top: boolean = false; //是否置顶
  join: boolean = false;  //当前用户是否已报名
  create: boolean = false;  //是否为当前用户创建
  status: string = '';  //活动状态：报名中、报名截止、正在进行、活动完成

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
}
