// pages/search/search.js
var util = require('../../utils/util');
var config = require('../../configs/config');

/*
function pushRecent(word){
  let recent=wx.getStorageSync('recent-select');
  if(!recent.some(item=>item===word)){
    recent.unshift(word);
    recent=recent.slice(0,9);
    wx.setStorageSync('recent-select',recent);
  }
};*/

Page({
  data:{
    list : [],
    recent:null,
    menuDisplay:false
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
        console.log(wd);
        console.log(res.data);
        console.log(res.data.list);
        if(res.data.status=='success'){
          that.setData({
            list:res.data.list.data
          });
          //pushRecent(wd);
        }
        else{
          wx.showToast({
            title:res.data.msg
          })
        }

      },
 
    })
  },
  showMenu:function(){
    let recent=wx.getStorageSync('recent-select');
    wx.setStorageSync('recent-select', recent);
    this.setData({menuDisplay:true});
  },
  onShow:function(e){
    this.setData({menuDisplay:flase});
    wx.showToast({
      title:'加载中',
      icon:'loading',
      duration:6000
    })
  }
 
})