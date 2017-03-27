// pages/register/register.js
var config=require('../../configs/config');
var util=require('../../utils/util');
Page({
  data:{},
  doRegister:function(e){
    var username = e.detail.value.username;
    var password = e.detail.value.password;
    var confirm = e.detail.value.confirm;
    var that = this;
    wx.request({
      url: config.server + 'register',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      data: util.formatString({
        'username':username,
        'password':password,
        'confirm':confirm
      }),
      method: 'POST', 
      success: function(res){
        console.log('register/register:请求发送成功');
        var data = res.data;
        if(data.status){
          wx.showToast({
            title : '登陆成功',
            icon  : 'success',
            duration : 2000,
            success:function(){
              wx.navigateBack({
                url: '../login/login',
                success: function(res){
                  console.log('register/register:注册成功，成功跳转登陆页面');
                },
                fail: function() {
                  console.log('register/register:注册成功，未成功跳转登陆页面');
                },
                complete: function() {
                 console.log('register/register:注册成功，尝试跳转登陆页面');
                }
              })
            }
          });
        }
      }
    });
  }
})