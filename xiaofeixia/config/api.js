var app = getApp();
const baseUrl = app.globalData.serverDomin
// 获取学校列表
const login = baseUrl + 'auth/wechatminiapp/login';
const info = baseUrl + 'auth/wechatminiapp/info';
const sendCode = baseUrl + 'auth/verification_code';
const phonenumber = baseUrl + 'auth/wechatminiapp/phonenumber';
const normalLogin = baseUrl + 'auth/wechatminiapp/login';
const phoneLogin = baseUrl + 'auth/login';
const like = baseUrl + 'feed/like';
const comment = baseUrl +'feed/comment'
const replyComment = baseUrl +'feed/comment/reply'
const requestUserinfo = baseUrl +'user/info'
const getTaskHistory = baseUrl+'user/task_info/history'
const getRecentAdd = baseUrl+'user/recent_address'

module.exports = {
  login: login,
  info: info, 
  sendCode: sendCode,
  phoneLogin: phoneLogin,
  normalLogin: normalLogin,
  phonenumber: phonenumber,
  like: like,
  comment: comment,
  replyComment: replyComment,
  requestUserinfo: requestUserinfo,
  getTaskHistory: getTaskHistory,
  getRecentAdd: getRecentAdd
};