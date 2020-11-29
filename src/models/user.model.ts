import {TeamModel} from "./team.model";

export class UserModel {

  id: string = '';
  nickname: string = '';
  avatarUrl: string = '';
  openId: string = '';

  studentNumber: string = '';
  break: number = 0;

  teamAdmin: boolean = true;
  teams: TeamModel[] = [];

  constructor() {
  }

  public engrave(u: any): void {
    this.id = u.userId;
    this.nickname = u.nickname;
    this.avatarUrl = u.avatar;
    this.openId = u.openId;
    this.studentNumber = u.studentNumber;
    this.break = u.break;
    this.teamAdmin = u.teamAdmin;
    for (const t of u.teams){
      const team = new TeamModel();
      team.engrave(t);
      this.teams.push(team);
    }
  }


}

