$(function () {
  // 验证密码
  var form = layui.form;
  form.verify({
    rpwd: function(value) {
      if ($(".newPwd").val() !== value) {
        return "两次输入的密码不一致"
      }
    }
    
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    ,pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] 
  });      
  // 修改密码
  $("#formPwd").on("submit",function(e){
    e.preventDefault();
    var data = form.val("formPwd");
    $.ajax({
      type: "POST",
      url:"/my/updatepwd",
      data: data,
      success:function(res) {
        if (res.status !==0) {
          return layer.msg("密码修改失败");
        }
        layer.msg("密码修改成功");
        localStorage.removeItem("token");
        setTimeout(function(){
          window.parent.location.replace("/login.html");
        },1000)
        
        
      }
    })
  })



})