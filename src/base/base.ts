import Taro from "@tarojs/taro";

export class Base {

  public static getInstance(): Base {
    if (!Base.instance) {
      Base.instance = new Base();
    }
    return Base.instance;
  }

  private static instance: Base;

  private constructor() {
  }

  public showLoading() {
    Taro.showLoading({
      title: '加载中',
      mask: true
    }).then();
  }

  public showToast(msg: string) {
    Taro.showToast({
      title: msg,
      duration: 3000,
      icon: 'none',
      mask: true
    }).then();
  }

  public showModel(msg: string) {
    Taro.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    }).then();
  }

}
