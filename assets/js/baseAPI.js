$(function () {
  // 发送$.ajax请求时，自动添加根路径
  $.ajaxPrefilter(function(option) {
    option.url = "http://ajax.frontend.itheima.net" + option.url;
  })






  
})