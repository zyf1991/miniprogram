//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    courselist:null,
    courselistbtm:null,
    inputShowed: false,
    inputVal: ""
  },
  onLoad() {
    console.log(123);
    const that=this;
    // this.setData({
    //     search: this.search.bind(this)
    // })

    wx.request({
      url: app.globalData.apiurl + "getcourse",
      method: 'post',
      data: {
        api_token: app.globalData.apitoken
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data['data'].free1);
        that.setData({
          courselist: res.data['data'].free1,
          courselistbtm: res.data['data'].free2,
        });
      }

    })

    
  },
  search: function (value) {
      return new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve([{text: '搜索结果', value: 1}, {text: '搜索结果2', value: 2}])
          }, 200)
      })
  },
  selectResult: function (e) {
      console.log('select result', e.detail)
  },

 
  detailPlay: function (event){
    var id = event.currentTarget.dataset.elementId;
    console.log(id);
    wx.navigateTo({
      url: '/pages/videoDetail/index?id=' + id,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})
