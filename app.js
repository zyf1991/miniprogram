//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.checkSession({
      success () {
        console.log('未过期');
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        // 登录
          wx.login({
            success: res => {
              if(res.code){
                //console.log(res.code);
                  var globaldata =this.globalData;
                  console.log(globaldata);
                  //发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                    url: 'http://local.miniadmin.com/api/login',
                    data: {
                      code: res.code,
                      userinfo:globaldata
                    },
                    success: function (res) {
                      console.log(res);
                    }
                  })
              }else{
                console.log('login error');
              }
              
            }
          })
      }
    })
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              //console.log(res.userInfo);
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
           
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})