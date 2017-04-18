// pages/collect/collect.js
var util   = require('../../utils/util');
var config = require('../../configs/config');
Page({
  data:{
    collectList:'',
    list:[],
    isdisplay:false,
  },
  onShow:function(options){
     if(wx.getStorageSync('username') && util.checkExpire(wx.getStorageSync('logintime'))){
        console.log('search/search:用户未过期');
        let tmp=wx.getStorageSync('collect');
        console.log(tmp);
        this.setData({
          collectList:tmp,
          isdisplay:false
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
              else{
                wx.navigateTo({
                  url:'../search/search'
                })
              }
          }
      });

    }
  },
  goSearch:function(e){
    let wd=e.target.dataset.wd;
    console.log(wd);
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
            isdisplay:true
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

  del:function(e){
    let tmp=wx.getStorageSync('collect');
    let name=e.target.dataset.name;
    let that=this;
    //console.log(name);
    for(let i=0,j=tmp.length;i<j;i++){
      console.log(tmp[i].name);
      if(tmp[i].name == name){
        tmp.splice(i,1);
        wx.setStorageSync('collect', tmp);
        wx.showToast({
          title:'删除成功',
          success:function(){
            that.setData({
             collectList:tmp,
             isdisplay:false
            })
          }
        })
      }
    }

  }
   
})