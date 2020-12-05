import Taro from "@tarojs/taro";

// 获取当前页URL
export const getCurrentPageUrl = () => {
  let pages = Taro.getCurrentPages();
  let currentPage = pages[pages.length - 1];
  return currentPage.route;
}

// 跳转到注册页
export const pageToRegister = () => {
  let path = getCurrentPageUrl();
  if (!path.includes('register')) {
    Taro.navigateTo({
      url: "/pages/register/register"
    });
  }
}
