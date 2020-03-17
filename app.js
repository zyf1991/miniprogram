//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    

    // 获取用户信息
    // wx.getSetting({
    //   //withSubscriptions: true,
    //   success: res => {
    //     console.log(res.authSetting);
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           console.log('给全局赋值');
    //           app.globalData.userInfo = res.userInfo
    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }

    //           wx.login({
    //             success: res => {
    //               if (res.code) {
    //                 console.log(res.code);
    //                 //var userInfo = this.globalData.userInfo;
    //                 console.log("全局值");
    //                 console.log(globaldata);
    //                 //发送 res.code 到后台换取 openId, sessionKey, unionId
    //                 wx.request({
    //                   url: "http://local.miniadmin.com/api/custom",
    //                   data: {
    //                     code: res.code,
    //                     userinfo: res.userInfo
    //                   },
    //                   success: function (res) {
    //                     console.log(res);
    //                   }
    //                 })
    //               } else {
    //                 console.log('login error');
    //               }

    //             }
    //           })
    //         },
    //         fail(){
    //           console.log('error');
    //         }
           
    //       })
    //     }else{
    //       console.log("用户没有授权");
    //     }
    //   }
    // })


  },
  globalData: {
    userInfo: null,
    apiurl:'http://local.miniadmin.com/api/',
    apitoken:'aabbccdd'
  }
})