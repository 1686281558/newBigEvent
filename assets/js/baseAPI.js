$(function () {
  $.ajaxPrefilter(function(option) {
    // 发送$.ajax请求时，自动添加根路径
    option.url = "http://ajax.frontend.itheima.net" + option.url;
    // 发送请求时，自动添加请求头信息
    option.headers ={
      Authorization: localStorage.getItem("token")
    };
    option.complete = function (res) {
      if (res.responseJSON.status !==0 &&res.responseJSON.message !=="获取用户基本信息成功！") {
        localStorage.removeItem("token");
        location.href = "/login.html";
      }
    }


  })






  
})