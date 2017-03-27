// pages/search/search.js
var util = require('../../utils/util');
var config = require('../../configs/config');
Page({
  data:{
    'username':'',
    'uservalid':0,
    'list' : []
  },
  doSearch:function(e){
    var wd = e.detail.value.wd;
    //console.log(wd);
    var that = this;
    wx.request({
      url: config.server + 'search',
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      data: util.formatString({
        'word':wd
      }),
      method: 'GET', 
      success: function(res){
        //console.log(res.data);
        //console.log(res.data.list.status);
        if(res.data.list.status==100){
          that.setData({
            list:res.data.list.data
          })
        }
      }
 
    })
  },
  onLoad:function(options){
    if(wx.getStorageSync('username') && util.checkExpire(wx.getStorageSync('logintime'))){
      console.log('search/search:用户未过期');
    }else{
      wx.navigateTo({
        url: '../login/login',
        success: function(res){
          console.log('search/search:成功进入登陆界面');
        },
        fail: function() {
          console.log('search/search:没有成功进入登陆页面');
        },
        complete: function() {
          console.log('search/search:未登陆或登陆过期，尝试进入登陆页面');
        }
      })
    }
  },
 
})