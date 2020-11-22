import {Team} from "./team";

export class User {

  id: string = '';
  nickname: string = '';
  avatarUrl: string = '';
  openId: string = '';

  studentNumber: string = '';
  break: number = 0;

  teamAdmin: boolean = true;
  teams: Team[] = [];

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
      const team = new Team();
      team.engrave(t);
      this.teams.push(team);
    }
  }


}

