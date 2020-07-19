// components/swiper-card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  
  },

  options: {
    addGlobalClass: true
  },

  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://www.featuremaker.xyz/rs/193/6f1a5c9c495002ecfa299137150b/68b0.jpg?38122'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },
  lifetimes:{
    created() {
    this.towerSwiper('swiperList');
    console.log("在组件实例刚刚被创建时执行",this)
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    swiperClick(e){
      console.log(e);
      
      this.triggerEvent('swiperClick', e);
    },
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    towerSwiper(name) {
      let list = this.data[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.setData({
        swiperList: list
      })
    },
  },

})
