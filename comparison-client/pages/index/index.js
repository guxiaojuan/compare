//获取应用实例
var util   = require('../../utils/util');
var config =require('../../configs/config');
var app = getApp();
Page({
  data: {
    imgUrls:[
      '../../images/banner1.jpg',
      '../../images/banner2.png',
      '../../images/banner3.jpg'
    ],

       
  }, 
  goRegist:function(){
    wx.navigateTo({
      url: '../register/register',
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
  },
  onload:function(){
    wx.request({
      url:config.server+'home',
      data: {},
      method: 'GET', 
      success: function(res){
        // success
        var data=res.data;
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  } 
  
})