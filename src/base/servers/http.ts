import Taro from '@tarojs/taro';
import getBaseUrl from './baseUrl';
import interceptors from './interceptors';

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem));

class httpRequest {

  baseOptions(url, data, method = "GET") {
    const BASE_URL = getBaseUrl();
    const contentType = "application/json";

    const option: any = {
      url: BASE_URL + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        'Authorization': Taro.getStorageSync('Authorization')
      }
    };
    return Taro.request(option);
  }

  get(url: string, data?: any) {
    return this.baseOptions(url, data);
  }

  post(url: string, data: any) {
    return this.baseOptions(url, data, "POST");

  }

  put(url: string, data: any) {
    return this.baseOptions(url, data, "PUT");
  }

  delete(url: string, data: any) {
    return this.baseOptions(url, data, "DELETE");
  }

}

export default new httpRequest();
