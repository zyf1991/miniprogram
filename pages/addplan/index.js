// pages/addplan/index.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '计划完成时间',
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      url: 'http://local.miniadmin.com/api/plan',
      method:'post',
      data: {
        formvalue: e.detail.value
      },
      success: function (res) {
        console.log(res);
      }
    })
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
      },
      {
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
      submitForm() {
          this.selectComponent('#form').validate((valid, errors) => {
              console.log('valid', valid, errors)
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
      }
  }
});