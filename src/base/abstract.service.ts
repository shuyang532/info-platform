import Taro from '@tarojs/taro';
import {Base} from "./base";

const base = Base.getInstance();

const Service = (url, method, data, header) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: url,
      data: data,
      method: method,
      header: header,
    }).then((res: any) => {
      // 响应拦截处理
      if (res.statusCode == 200) {// 确认用户登录，而不仅仅是有sessionId，还需要有登录的信息用户openId
        let loginData = Taro.getStorageSync('loginData');
        if(loginData){
          loginData = JSON.parse(loginData)
        }
        if(!loginData.openId){
          Taro.showModal({
            title:'提示',
            content:'请进行登录。',
            success:(res)=>{
              if(res.confirm){
                Taro.clearStorageSync();
                Taro.reLaunch({
                  url:'/subPages1/pages/login/login'
                });
                return;
              }
            }
          })
        }
        return resolve(res);
      } else if (res.statusCode == 404) {
        base.showToast('404 请求页面不存在');
      } else if (res.statusCode == 408) {
        base.showToast('请求超时');
      } else if (res.statusCode == 500) {
        base.showToast('服务器错误')
      } else if (res.statusCode == 0) {
        base.showToast('网络连接超时')
      } else if (res.statusCode == 501) {
        Taro.showModal({
          title:'提示',
          content:'请进行登录。',
          success:(res)=>{
            if(res.confirm){
              Taro.clearStorageSync();
              Taro.reLaunch({
                url:'/subPages1/pages/login/login'
              });
              return;
            }
          }
        })
      }
      reject(res);
    }).catch((error: any) => {
      base.showModel('服务器错误，请稍候再试 ！');
      return reject(error);
    }).finally(() => {
      Taro.hideLoading();
    })
  })
}

//将sessionId通过请求头传递给后台，用于判断是否登录以及登录是否过期超时
let get = (url, data, header) => {
  header = header ? header : {"Cookie": "JSESSIONID=" + Taro.getStorageSync("sessionId")};
  return Service(url, 'GET', data, header);
}

let post = (url, data, header) => {
  header = header ? header : {"Cookie": "JSESSIONID=" + Taro.getStorageSync("sessionId")};
  header['Content-Type'] = 'application/json';
  return Service(url, 'POST', data, header);
}


export default {get, post}
