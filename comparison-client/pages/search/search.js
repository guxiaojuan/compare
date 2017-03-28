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
        //console.log(res.data.list);
        //console.log(res.data.list.status);
        if(res.data.list.status==100){
          that.setData({
            list:res.data.list.data
          });

          wx.setStorageSync('search',wd);
        }

      }
 
    })
  }
 
})