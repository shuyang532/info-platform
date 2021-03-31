export class TagModel {
  typeId: string = '';
  name: string = '';
  active: boolean = false; // 是否为选中态

  constructor() {
  }

  public engrave(t: any) {
    this.typeId = t.typeId;
    this.name = t.name;
    this.active = false;
  }
}
