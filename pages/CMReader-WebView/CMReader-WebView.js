// pages/CMReader-WebView.js
const url = 'https://www.featuremaker.xyz/web/scle.html#/'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url:url +`?pid=${options.pid}&title=${options.title}`
    })
    // wx.setNavigationBarColor({
    //   frontColor: '#000',
    //   backgroundColor: 'transparent',
    //   animation: {
    //     duration: 400,
    //     timingFunc: 'easeIn'
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