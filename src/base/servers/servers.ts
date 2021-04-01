import HttpRequest from "./http";

// 登录
export const getLogin = (code: string) => {
  return HttpRequest.get('/data/user', { code });
}

// 注册
export const postRegister = (studentNumber: string, validateCode: string) => {
  return HttpRequest.post('/data/user', { studentNumber, validateCode });
}

// 发送验证码
export const postValidateCode = (studentNumber: string) => {
  return HttpRequest.post('/data/user/validate-code', { studentNumber });
}

// 违规申诉
export const postFeedback = (content: string) => {
  return HttpRequest.post('/data/user/feedback', { content });
}

// 获取活动类型列表
export const getActivityTypes = () => {
  return HttpRequest.get('/data/activity/type');
}

// 获取活动范围列表
export const getActivityScopes = () => {
  return HttpRequest.get('/data/activity/scope');
}

// 获取活动列表(包含搜索、筛选、我参与的、我创建的)
// option: all, filter, relatedPeople
export const getActivity = (
  option: string,
  currentPage: number,
  pageItems: number,
  name?: string,
  timeOption?: string,
  typeId?: string,
  userId?: string,
  relation?: string,
  order?: string,
) => {
  return HttpRequest.get('/data/activity', {
    option,
    currentPage,
    pageItems,
    order,
    name,
    timeOption,
    typeId,
    userId,
    relation
  });
}

// 获取活动详情
export const getActivityDetail = (
  activityId: string
) => {
  return HttpRequest.get('/data/activity/detail', {
    activityId
  });
}

// 活动报名
export const postJoin = (activityId: string) => {
  return HttpRequest.post('/data/activity/join', { activityId });
}

// 取消报名
export const deleteJoin = (activityId: string) => {
  return HttpRequest.delete('/data/activity/join', { activityId });
}

// 生成二维码
export const getQRCode = (activityId: string) => {
  return HttpRequest.get('/data/activity/qr-code', { activityId });
}

// 扫描二维码
export const postQRCode = (activityId: string, qr: string) => {
  return HttpRequest.post('/data/activity/qr-code', { activityId, qr });
}

