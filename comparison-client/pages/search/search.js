// pages/search/search.js
var util = require('../../utils/util');
var config = require('../../configs/config');

function pushRecent(word){
  var recent=wx.getStorageSync('recent-select') || [];
  if(!recent.some(item=>item==word)){
    recent.unshift(word);
  }
  if(recent.length>5)
    recent=recent.slice(0,5);
  wx.setStorageSync('recent-select', recent);
};

Page({
  data:{
    list : [],
    isDisplay:false,
    recentList:null,
    hotData:[
      {'A':'手机','B':'电脑','C':'电视'},
      {'A':'洗衣液','B':'毛巾','C':'窗帘'},
      {'A':'水果','B':'蔬菜','C':''}
    ]
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
          pushRecent(wd);
          that.setData({
            list:res.data.list.data,
            isDisplay:true,
            recentList:wx.getStorageSync('recent-select') || null
          });
        }
        else{
          wx.showToast({
            title:res.data.msg
          })
        }

      },
 
    })
  },
  hotSearch:function(e){
    var that=this;
    var key=e.target.dataset.shop;
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
        pushRecent(key);
        if(res.data.status=='success'){
          that.setData({
            list:res.data.list.data,
            isDisplay:true,
            recentList:wx.getStorageSync('recent-select') || null
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
            list:res.data.list.data,
            isDisplay:true
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

 },
 onShow:function(){
   this.setData({
     isDisplay:false,
     recentList:wx.getStorageSync('recent-select') || null
   })
 } 
 
})