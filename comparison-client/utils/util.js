function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function formatString(json){
  var str=[];
  for(var i in json){
    str.push(encodeURIComponent(i)+"="+encodeURIComponent(json[i]));
  }
  return str.join("&");
}

function checkExpire(date){
  var now=Date.now();
  var days=1000*24*60*60;    //毫秒
  if(now-date>days*7){
    return false;
  }
  return true;
}

module.exports = {
  formatTime: formatTime,
  formatString:formatString,
  checkExpire:checkExpire
}
