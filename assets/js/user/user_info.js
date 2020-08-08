$(function () {
  var form = layui.form;
  // 获取用户的基本信息
  function getUserInfo () {
    $.ajax({
      type:"GET",
      url:"/my/userinfo",
      success:function (res) {
        form.val('formInfo', res.data);
      }
    })
  }
  getUserInfo ();
  // 更新用户信息
  $("#formUserInfo").on("submit",function (e) {
    e.preventDefault();
    var data = form.val("formInfo");
    $.ajax({
      type: "POST",
      url:"/my/userinfo",
      data: data,
      success:function (res) {
        if (res.status !== 0) {
          return layer.msg("信息修改失败");
        }
        layer.msg("信息修改成功");
        window.parent.getUserInfo ();
      }
    })
  })





})