import {TeamModel} from "./team.model";

export class UserModel {

  id: string = '';
  nickname: string = '';
  avatarUrl: string = '';
  openId: string = '';

  username: string = '';

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

  public mock(): void {
    this.id = '1232';
    this.nickname = '小雏菊';
    this.avatarUrl = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605983591981&di=b075a1308a8228ac2e016f0b04c44e63&imgtype=0&src=http%3A%2F%2Fp6.itc.cn%2Fmpbp%2Fpro%2F20200927%2Ffc5dd7d801304fdb83b9f37c07ae97ae.jpeg';
    this.username = '王天天';
    this.studentNumber = '18638472207';
    this.break = 2;
  }


}

