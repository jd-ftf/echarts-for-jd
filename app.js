//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = jd.getStorageSync('logs') || []
    logs.unshift(Date.now())
    jd.setStorageSync('logs', logs)
  },
  globalData: {
    userInfo: null
  }
})