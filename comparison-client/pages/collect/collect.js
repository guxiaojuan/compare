// pages/collect/collect.js
var util   = require('../../utils/util');
Page({
  data:{},
  onShow:function(options){
     if(wx.getStorageSync('username') && util.checkExpire(wx.getStorageSync('logintime'))){
      console.log('search/search:用户未过期');
    }else{
      wx.showToast({
        title:'您还未登录，请先登录',
        success:function(){
         wx.navigateTo({
           url: '../login/login',
           success: function(res){
             // success
           },
           fail: function() {
             // fail
           },
           complete: function() {
             // complete
           }
         })
        }
      });

    }

  }
})