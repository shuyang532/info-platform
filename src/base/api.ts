const API = {
  baseURL: 'http://mock-api.com/7gPY2Pnl.mock/',

  checkLogin(): string {
    return `${this.baseURL}data/user`;
  },
}

export default API
