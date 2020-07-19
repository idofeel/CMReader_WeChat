//index.js
// const {_get} = require('../../utils/request.js')
import create from '../../utils/create'
import store from '../../stroe'
import { _get } from '../../utils/request.js'
import API from '../API/index'
//获取应用实例
const app = getApp()

create(store, {
  use: ['menus'],
  // computed:{
  //   tabData(){
  //     console.log(this.menus.currentMenuIndex);
      
  //     return this.menus.currentMenuIndex
  //   }
  // },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    motto: 'Hi 开发者！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    currentPage: 0, // 当前页
    triggered: false, 
    loading:false,
    loadEnd:false,
    modelList:[],
    errMsg:'',
    cardCur: 0,
    swiperList: [],
},
  //事件处理函数
  bindViewTap:  function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad:async function () {
   await store.menus.getMenusData()
    this.getPageData()
  },
  async getPageData(){
    if(this.data.loading || this.data.loadEnd){
      return;
    }
    try {
      const {currentTabs, menusData,currentMenuIndex,currentTabIndex} = store.data.menus
      let reqID = menusData[currentMenuIndex].id
      if(currentTabs.length){
        reqID = currentTabs[currentTabIndex].id
      }
      // 请求数据
      const res = await _get(API.source.public,{ids:reqID,st: this.data.currentPage});
      if(res.success){
        let {currentPage,modelList,swiperList} = this.data;

        if(currentPage === 0){
            // 首页取几条数据做轮播展示
            if(currentMenuIndex === 0){
              swiperList = res.data.slice(0, 6)
            }else{
              swiperList = []
            }
            modelList = res.data

        }else{
          modelList.push(...res.data)
        }
        this.setData({
          modelList,
          swiperList,
          currentPage:currentPage+1,
          loadEnd:res.next === -1,
          loading:false,
          triggered:false,
        })
      }
    } catch (error) {
      this.setData({
        errorString:error.toString()
      })
    }
  
  },
  onRefresh(){
    this.setData({
      loadEnd:false,
      loading:false,
      currentPage:0,
      modelList:[]
    },this.getPageData)
  },
  loadMore(){
    this.getPageData();
  },
  scrolltolower(){
    console.log('scrolltolower');
  },
  getUserInfo(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  showModal(e) {
    console.log(e);
    
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  searchIcon(v) {
    console.log('12');
    wx.showToast({
      title: 'title',
    })
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeMenus(e){
    store.menus.updateMenus({
      currentMenuIndex: e.currentTarget.dataset.id,
      currentTabIndex: 0
    })
    this.onRefresh()
    let timer = setTimeout(() => {
      this.hideModal()
      clearTimeout(timer)
    }, 250);
  },
  tabSelect(e){
    store.menus.updateMenus({
      currentTabIndex: e.currentTarget.dataset.id,
    })
    this.onRefresh()

  },
  goCMWeb(e) {
    const {pid,name} = this.data.modelList[e.currentTarget.dataset.id]
    wx.navigateTo({
      url: `/pages/CMReader-WebView/CMReader-WebView?pid=${pid}&title=${name}`,
    })
  },
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
})
