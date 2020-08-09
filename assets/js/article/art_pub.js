$(function(){
  var form = layui.form;
  // 初始化富文本编辑器
  initEditor();
  // 裁剪区
  // 1. 初始化图片裁剪器 
  var $image = $('#image') 
  // 2. 裁剪选项 
  var options = { aspectRatio: 400 / 280, preview: '.img-preview' }
  // 3. 初始化裁剪区域 
  $image.cropper(options)
  // 渲染文章类别
  $.ajax({
    type:"GET",
    url:"/my/article/cates",
    success:function(res) {
      if (res.status !== 0) {
        return layer.msg("获取文章类别失败");
      }
      var str = template("temp_cate",res);
      $("#cate_id").html(str);
      form.render();
    }
  })
  // 文章封面
  $(".btnChoose").on("click",function() {
    $("#file").click();
  })
  $("#file").on("change",function(e) {
    var file = e.target.files;
    if (file.length <= 0) {
      return layer.msg("请选择封面图片");
    }
    var newImgURL = URL.createObjectURL(file[0]);
    $image .cropper('destroy') 
     .attr('src', newImgURL) 
    .cropper(options) 
  })
  var state = "已发布";
  $(".btnDraft").on("click",function () {
    state = "草稿";
  })
  $("#formArt").on("submit",function (e) {
    e.preventDefault();
    var fd = new FormData($("#formArt")[0]);
    fd.append("state",state);
    $image .cropper('getCroppedCanvas', { 
       width: 400, 
       height: 280 
      })
       .toBlob(function(blob) { 
       fd.append("cover_img",blob) ;
       $.ajax({
         type: "POST",
         url: "/my/article/add",
         data: fd,
         contentType: false,
         processData: false,
         success:function(res) {
           if(res.status !== 0) {
             return layer.msg("文章发布失败");
           }
           layer.msg("文章发布成功");
           location.href = "/article/art_list.html";
           window.parent.$("#artList").click();
         }
       })
  }) 
  })
})