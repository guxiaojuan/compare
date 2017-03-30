// pages/collect/collect.js
var util   = require('../../utils/util');
Page({
  data:{},
  regist:function(){
    wx.navigateTo({
      url: '../register/register',
      success: function(res){
        // success
      }
    
    })
  },
  onLoad:function(options){
     if(wx.getStorageSync('username') && util.checkExpire(wx.getStorageSync('logintime'))){
      console.log('search/search:用户未过期');
    }else{
      wx.showToast({
        title:'请先登录'
      });
    }
    wx.request({
      url: 'http://mrzzchao.com',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log('success')
      },
      fail: function() {
        // fail
        console.log('fail')
      },
      complete: function() {
        // complete
      }
    })

  }
})