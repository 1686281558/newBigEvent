$(function () {
  // 获取用户的基本信息
  getUserInfo ()
  // 退出按钮注册点击事件
  $(".btnClose").on("click",function () {
    location.assign("/login.html");
    localStorage.removeItem("token");
  })
})
// 声明获取用户信息的函数
function getUserInfo () {
  $.ajax({
    type: "GET",
    url:"/my/userinfo",
    success: function (res) {
      if (res.status !== 0) {
        return layer.msg("用户信息获取失败");
      }
      console.log(res);
      var name = res.data.nickname || res.data.username;
      var avatar = res.data.user_pic;
      if (avatar == null) {
        avatar = name[0].toUpperCase();
        $(".layui-nav-img").hide();
        $(".pic").html(avatar).show();
      } else {
        $(".pic").hide();
        $(".layui-nav-img").prop("src",avatar);
      }
      $(".username").html(name);
    }
    
  })
}