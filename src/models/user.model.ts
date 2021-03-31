import {TeamModel} from "./team.model";

export class UserModel {
  id: string = '';

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
    this.username = '王天天';
    this.studentNumber = '18638472207';
    this.break = 2;
  }


}

