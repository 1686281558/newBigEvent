$(function () {
  // 获取用户的基本信息
  getUserInfo ()
  // 退出按钮注册点击事件
  $(".btnClose").on("click",function () {
    location.assign("/login.html");
    localStorage.removeItem("token");
  })
  $(".nav .layui-nav-item").on("click",function(){
    $(this).addClass("layui-nav-itemed").siblings().removeClass("layui-nav-itemed");
  })
  // 点击右上角个人中心的基本资料，显示对应页面，左侧导航栏也变化
  // 基本资料
  $(".user_info").on("click",function(){
    $(".user").addClass("layui-nav-itemed").siblings(".layui-nav-item").removeClass("layui-nav-itemed");
    // 模拟点击行为，但是不起作用，只能通过a链接添加地址才能在iframe中显示
    $("#info").click();
  })
  // 更换头像
  $(".user_avatar").on("click",function(){
    $(".user").addClass("layui-nav-itemed").siblings(".layui-nav-item").removeClass("layui-nav-itemed");
    $("#avatar").click();
  })
  // 重置密码
  $(".user_pwd").on("click",function(){
    $(".user").addClass("layui-nav-itemed").siblings(".layui-nav-item").removeClass("layui-nav-itemed");
    $("#pwd").click();
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