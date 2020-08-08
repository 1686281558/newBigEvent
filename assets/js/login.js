$(function () {
  // 点击去登录按钮，切换到登录表单
  $(".linkLogin").on("click", function () {
    $(".reg").hide();
    $(".login").show();
  })
  // 点击去注册账号按钮，切换到注册表单
  $(".linkReg").on("click", function () {
    $(".reg").show();
    $(".login").hide();
  })
  // 验证注册、登录密码
  var form = layui.form;
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    rpwd:function (value) {
      if ($("#password").val() !== value) {
        return "两次密码输入不一致";
      }
    }
  });
  // 注册表单
  $("#formReg").on("submit",function (e) {
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      type: "POST",
      url:"/api/reguser",
      data: data,
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg("注册失败");
        }
        layer.msg("注册成功");
        $(".reg").hide();
        $(".login").show();
        $("#formReg")[0].reset();
      }
    })
  })
  // 登录表单
  $("#formLogin").on("submit",function(e) {
    e.preventDefault();
    let data = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "/api/login",
      data: data,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("登录失败");
        }
        layer.msg("登录成功");
        localStorage.setItem("token",res.token);
        location.href = "/index.html";
      }
    })
  })







})