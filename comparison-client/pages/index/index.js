//获取应用实例
var util   = require('../../utils/util');
var config =require('../../configs/config');
var app = getApp();
Page({
  data: {
    imgUrls:[
      '../../images/banner1.jpg',
      '../../images/banner2.png',
      '../../images/banner4.jpg',
   
    ],
    homeList:[]
       
  }, 

  onLoad:function(){
    var that=this;
    wx.request({
      url:config.server,
       header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      }, 
      method: 'GET', 
      success: function(res){
        // success
        console.log('成功从后台获取到主页信息')
        if(res.data.list.status==100){
          that.setData({
            homeList:res.data.list.data
          })
        }
        
      },
      fail: function() {
        wx.showToast({
          title:'正在加载中',
          icon:'loading'
        });
        console.log('没有获取到信息');
      },
      complete: function() {
        // complete
      }
    })
  } 
  
});
