// pages/addplan/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})


Component({
  data: {
      showTopTips: false,
      isAgree: false,
      formData: {

      },

      rules: [{
          name: 'plan_title',
          rules: {required: true, message: 'plan_title必填'},
      }
    ]
  },
  methods: {
      formInputChange(e) {
          const {field} = e.currentTarget.dataset
          this.setData({
              [`formData.${field}`]: e.detail.value
          })
      },
      bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value,
          [`formData.date`]: e.detail.value
        })
      },
      formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value)
        var formvalue = e.detail.value;
        console.log(e.detail.value);
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.getUserInfo({
                success: function (res) {
                  
                  //提交计划
                  wx.request({
                    url: app.globalData.apiurl +'plan',
                    method:'post',
                    data: {
                      plan_title: formvalue.plan_title,
                      plan_desc: formvalue.plan_desc,
                      plan_etime: formvalue.plan_etime,
                      api_token: app.globalData.apitoken,
                      c_id:app.globalData.c_id
                    },
                    success: function (res) {
                      //console.log(res);
                      var result = res.data;
                      console.log(result);
                        if(result.status==201){
                          wx.showToast({
                            title: result.message
                          })
                        }
                        wx.navigateBack({
                          url: '/pages/grow/index',
                        })
                    }
                  })
                },fail(){
                  wx.showToast({
                    title: '请先登录'
                  })
                  wx.switchTab({
                    url: '/pages/my/index',
                  })
                  // wx.login({
                  //   success(res) {
                  //     if (res.code) {
                  //       wx.request({
                  //         url: app.globalData.apiurl + "custom",
                  //         method: 'post',
                  //         data: {
                  //           code: res.code,
                  //           api_token: app.globalData.apitoken,
                  //           //gender: e.detail.userInfo.gender,
                  //           //avatarurl: e.detail.userInfo.avatarurl,
                  //           //province: e.detail.userInfo.province,
                  //           //city: e.detail.userInfo.city,
                  //           //wxname: e.detail.nickName
                  //         },
                  //         header: {
                  //           'content-type': 'application/json' // 默认值
                  //         },
                  //         success(res) {
                  //           var data = res.data['data'];
                  //           console.log(res);

                  //           wx.setStorage({
                  //             key: "c_id",
                  //             data: data.id
                  //           })
                  //           that.setData({
                  //             hasUserInfo: true
                  //           });
                  //         }
                  //       })
                  //     } else {
                  //       console.log('登录失败！' + res.errMsg)
                  //     }
                  //   }
                  // })
                }
          
              })
            }
          }
        })
          
          
      },
      submitForm() {
        wx.getUserInfo({
          success: function (res) {
            this.selectComponent('#form').validate((valid, errors) => {
              //console.log('valid', valid, errors)
              if (!valid) {
                const firstError = Object.keys(errors)
                if (firstError.length) {
                  this.setData({
                    error: errors[firstError[0]].message
                  })

                }
              } else {
                wx.showToast({
                  title: '校验通过'
                })
              }
            })
          },fail(){
            // wx.showToast({
            //   title: '请先授权登录'
            // })
            wx.switchTab({
              url: '/pages/my/index',
            })
          },          
        })



        
          
      }
  }
});