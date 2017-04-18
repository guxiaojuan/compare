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
    homeList:[],
       
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
        if(res.data.status=='success'){
          that.setData({
            homeList:res.data.list.data
          })
        }else{
          ws.showToast({
            title:res.data.msg
          })
        }
        
      }
    })
  },
  goCollect:function(e){
    if(wx.getStorageSync('username') && util.checkExpire(wx.getStorageSync('logintime'))){
      console.log('search/search:用户未过期');
      let obj={
        logo:e.target.dataset.logo,
        name:e.target.dataset.name,
        price:e.target.dataset.price,
      }  
      let that=this;
      wx.showToast({  
        title:"收藏成功",
        icon:'success',
        success:function(){
          let tmp=wx.getStorageSync('collect') || [];
          tmp.unshift(obj);
          wx.setStorageSync('collect', tmp);
        }
      })
    }else{
      wx.showModal({
        title:'提示',
        content:'您还未登陆',
        success:function(res){
          if(res.confirm){
            wx.navigateTo({
            url: '../login/login',
            })
          }
        }
      });

    }

  } 
  
});
