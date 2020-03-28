// pages/grow/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'c_id',
      success: function(res) {
        app.globalData.c_id = res.data['id'];
        console.log(res);
      },
    })

    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            
            success: function (res) {
              wx.request({
                url: app.globalData.apiurl + 'plan',
                data: {
                  c_id: app.globalData.c_id
                },
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success(res) {
                  console.log(res);
                  that.setData({
                    planlist: res.data['data']
                  });

                 
                }
              })
              
            },
            fail(){
              //login
            }
          })
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
  /**
   * 用户添加计划
   */
  addPlan: function (event) {
    wx.navigateTo({ url: '/pages/addplan/index'})
  },
  //打卡
  addSign: function (event) {
    var id = event.currentTarget.dataset.elementId;
    var c_id = event.currentTarget.dataset.elementCid;
    wx.request({
      url: app.globalData.apiurl + 'sign',
      method:'post',
      data: {
        c_id: app.globalData.c_id,
        plan_id: id,
        api_token: app.globalData.apitoken,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        //console.log(res);
        var result = res.data;
        wx.showToast({
          title: result.message
        })


      }
    })
  }
})