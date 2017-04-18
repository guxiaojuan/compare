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
  onShow:function(options){
     if(wx.getStorageSync('username') && util.checkExpire(wx.getStorageSync('logintime'))){
      console.log('search/search:用户未过期');
    }else{
      wx.showModal({
        title:'您还未登陆',
        content:'请点击确定后先登陆',
        success:function(res){
          if(res.confirm === 1){
            wx.navigateTo({
            url: '../login/login',
           });
          }
          else{

          }
        }
      });
    }
  }
   
})