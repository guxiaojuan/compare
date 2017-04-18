// pages/login/login.js
var util   = require('../../utils/util');
var config =require('../../configs/config');
Page({
  data:{
    username : '',
    status   : 0
  },
  formSubmit:function(e){
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var that = this;
    wx.request({
      url: config.server + 'login', 
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      }, 
  
      data: util.formatString({
        'username':username,
        'password':password
      }),
      
      method: 'POST', 
      success: function(res){
        console.log('login/login:请求发送成功');
    
        if(res.data.status){
          that.setData({
            username : username
          });
          wx.showToast({
            title : '登陆成功',
            icon  : 'success',
            duration : 2000,
            success : function(){
              wx.setStorageSync('username', username);
              wx.setStorageSync('logintime', Date.now());
              
              wx.navigateBack({
                url: '../collect/collect',
                success: function(res){
                  console.log('login/login:登陆成功，成功跳转收藏页面');
                }
              });
            }
          })
        }else{
          wx.showModal({
            title : '提示',
            content : '账号或密码错误',
            success : function(res){
              if(res.confirm){
                console.log('用户确认');
              }
            }
          })
        }
      },
      fail: function() {
        console.log('login/login:请求发送失败');
      },
      complete: function() {
        console.log('尝试向'+this.url+'发送请求完成');
      }
    })
  }
})