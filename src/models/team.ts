export class Team {
  id: string = '';
  name: string = '';

  constructor() {
  }

  public engrave(t: any) {
    this.id = t.teamId;
    this.name = t.teamName;
  }

}
