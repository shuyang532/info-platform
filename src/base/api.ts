const API = {
  baseURL: 'http://mock-api.com/7gPY2Pnl.mock/',

  checkLogin(): string {
    return `${this.baseURL}data/user`;
  },

  sentVerificationCode(): string {
    return `${this.baseURL}data/user/validate-code`;
  },

  getActivityDetail(): string {
    return `${this.baseURL}data/activity`;
  },
}

export default API
