// pages/open/index.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //从数据库获取用户信息
              that.queryUsreInfo();
              //用户已经授权过
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  //
  bindGetUserInfo:function(e){
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      //获取code
      wx.login({
        success: res => {
          if (res.code) {
            //插入登录的用户的相关信息到数据库
            wx.request({
              url: app.globalData.apiurl + 'custom',
              data: {
                wxname: e.detail.userInfo.nickName,
                avatarurl: e.detail.userInfo.avatarUrl,
                province: e.detail.userInfo.province,
                city: e.detail.userInfo.city,
                gender: e.detail.userInfo.gender,
                code:res.code,
                api_token: app.globalData.apitoken
              },
              method: 'post',
              header: {
                'content-type': 'application/json'
              },
              success: function (res) {
                var data = res.data['data'];
                //从数据库获取用户信息
                console.log(data);
                app.globalData.session_key=data['session_key'];
                app.globalData.openid = data['openid'];
                //console.log(res);
                that.queryUsreInfo();
                //console.log("插入小程序登录用户信息成功！");
              }
            });
            //授权成功后，跳转进入小程序首页
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        }
      })
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }


    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
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
    //           console.log('c_id===='+app.globalData.c_id);
    //           // if (!app.globalData.c_id){
    //           //   //接口保存用户数据
    //           //   wx.request({
    //           //     url: app.globalData.apiurl + 'custom',
    //           //     method: 'post',
    //           //     data: {
    //           //       userinfo: app.globalData.userInfo,
    //           //       api_token: app.globalData.apitoken
    //           //     },
    //           //     success: function (res) {
    //           //       var result = res.data;
    //           //       consoel.log(result[data]);
    //           //       //app.globalData.c_id = result[data]['c_id'];
                    
    //           //     }
    //           //   })
    //           // }else{
    //           //   wx.switchTab({
    //           //     url: '/pages/index/index',
    //           //   })
    //           // }
              

    //           // //跳转首页
    //           wx.switchTab({
    //             url: '/pages/index/index',
    //           })
              
    //         }
    //       })
    //     }else{
    //       console.log("用户没授权");
    //     }
    //   }
    // })
  },
  //获取用户信息接口
  queryUsreInfo: function () {
    wx.request({
      url: app.globalData.apiurl + 'custom',
      method:'post',
      data: {
        openid: app.globalData.openid,
        session_key: app.globalData.session_key,
        api_token: app.globalData.apitoken
      },
      success: function (res) {
       var data = res.data['data'];
        console.log(data);
        //app.globalData.userInfo = res.data;
        app.globalData.hasUserInfo=true;
      }
    })
  }
})