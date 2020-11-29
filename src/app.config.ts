export default {
  pages: [
    'pages/index/index',
    'pages/welcome/welcome',
    'pages/register/register',
    'pages/activity/activity',
    'pages/detail/detail',
    'pages/sign/sign',
    'pages/mine/mine',
    'pages/space/space',
    'pages/join/join',
    'pages/feedback/feedback'
  ],
  tabBar: {
    list: [
      {
        pagePath: 'pages/activity/activity',
        text: '',
        iconPath: 'assets/activity.png',
        selectedIconPath: 'assets/activity_selected.png'
      }, {
        pagePath: 'pages/sign/sign',
        text: '',
        iconPath: 'assets/sign.png',
        selectedIconPath: 'assets/sign_selected.png'
      }, {
        pagePath: 'pages/mine/mine',
        text: '',
        iconPath: 'assets/mine.png',
        selectedIconPath: 'assets/mine_selected.png'
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
