// pages/search/search.js
var util = require('../../utils/util');
var config = require('../../configs/config');

function pushRecent(word){
  var recent=wx.getStorageSync('recent-select');
  if(!recent.some(item=>item==word)){
    recent.unshift(word);
    recent=recent.slice(0,9);
    wx.setStorageSync('recent-select', recent);
  }
};
Page({
  data:{
    list : [],
    hotList:[],
    recentList:[],
    isDisplay:false,
    recentList:null,
    hotData:['洗衣液','毛巾','窗帘','水果','蔬菜']
  },
  doSearch:function(e){
    var wd = e.detail.value.wd;
    var that = this;
    wx.request({
      url: config.server + 'search/'+encodeURIComponent(wd),
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },  
      data: util.formatString({
        'word':wd
      }),
      method: 'GET', 
      success: function(res){    
        if(res.data.status=='success'){
          that.setData({
            list:res.data.list.data,
            isDisplay:true
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
  hotSearch:function(key){
    var that=this;
    wx.request({
      url: config.server+'search/'+encodeURIComponent(key),
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },
      data: util.formatString({
        'word':key
      }),
      method: 'GET', 
      success: function(res){
        if(res.data.status=='success'){
          that.setData({
            hotList:res.data.list.data
          })
        }
        else{
          wx.showToast({
            title:res.data.msg
          })
        }
      },
     
    })
  },
  recentSearch:function(key){
    var that=this;
    wx.request({
      url: config.server+'search/'+encodeURIComponent(key),
      header: {  
        "Content-Type": "application/x-www-form-urlencoded"  
      },
      data: util.formatString({
        'word':key
      }),
      method: 'GET', 
      success: function(res){
        if(res.data.status=='success'){
          that.setData({
            recentList:res.data.list.data
          })
        }
        else{
          wx.showToast({
            title:res.data.msg
          })
        }
      },
     
    })
  }
 
})