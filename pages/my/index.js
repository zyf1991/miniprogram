// pages/my/index.js
const app = getApp();
console.log(wx.canIUse('button.open-type.getUserInfo'));
//https://www.jianshu.com/p/d37a23fda138
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    hasUserInfo: wx.getUserInfo({
      success:function(res){
        hasUserInfo: true
      },fail(){
        hasUserInfo: false
      }
    }),
    avatarUrl:'',
    nickName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 必须是在用户已经授权的情况下调用
    wx.getUserInfo({
      success: function(res) {
        
        var userInfo = res.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        that.setData({
          avatarUrl:avatarUrl,
          nickName:nickName,
          hasUserInfo:true
        })
      }
    })


    // wx.getStorage({
    //   key: 'c_id',
    //   success(res) {
    //     app.globalData.c_id = res.data;
    //     wx.switchTab({
    //       url: '/pages/index/index',
    //     })
    //   },
    //   fail() {

    //   }
    // })





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
      this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      //console.log(1);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    //console.log(2);
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

   /**
   * 我的目标链接到成长页面
   */
  grow: function (event) {
    wx.switchTab({
      url: '/pages/grow/index',
    })
  },

  /**
   * 帮助中心点击链接到客服
   */ 
  handleContact(e) {
    console.log(e.detail.path)
    console.log(e.detail.query)
  },

  /**
   * 绑定用户信息
   */
  bindGetUserInfo(e) {
    const that = this;
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.login({
        success(res) {
          if (res.code) {
            wx.request({
              url: app.globalData.apiurl + "custom",
              method: 'post',
              data: {
                code: res.code,
                api_token: app.globalData.apitoken,
                gender: e.detail.userInfo.gender,
                avatarurl: e.detail.userInfo.avatarurl,
                province: e.detail.userInfo.province,
                city: e.detail.userInfo.city,
                wxname: e.detail.userInfo.nickName
              },
              header: {
                'content-type': 'application/json' // 默认值
              },
              success(res) {
                var data = res.data['data'];
                console.log(res);

                wx.setStorage({
                  key: "c_id",
                  data: data.id
                })
                that.setData({
                  hasUserInfo: true
                });

                that.onShow();
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
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
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }

  }
})