export default {
  pages: [
    'pages/index/index', // 默认页
    'pages/register/register', // 注册页
    'pages/welcome/welcome', // 欢迎页
    'pages/activity/activity', // 活动列表页
    'pages/detail/detail', // 活动详情页
    'pages/sign/sign', // 签到页
    'pages/mine/mine', // 我的页
    'pages/space/space', // 个人主页
    'pages/join/join', // 我参与的活动列表页面
    'pages/feedback/feedback' // 意见反馈页
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/activity/activity',
        text: '',
        iconPath: 'assets/images/activity.png',
        selectedIconPath: 'assets/images/activity_selected.png'
      }, {
        pagePath: 'pages/sign/sign',
        text: '',
        iconPath: 'assets/images/sign.png',
        selectedIconPath: 'assets/images/sign_selected.png'
      }, {
        pagePath: 'pages/mine/mine',
        text: '',
        iconPath: 'assets/images/mine.png',
        selectedIconPath: 'assets/images/mine_selected.png'
      }
    ]
  },
  window: {
    navigationStyle: 'default',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#6190E8',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'white'
  }
}
