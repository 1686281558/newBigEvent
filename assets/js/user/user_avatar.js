$(function () {
  // 1.1 获取裁剪区域的 DOM 元素 
  var $image = $('#image') 
  const options = { 
    preview: '.img-preview' } 
  $image.cropper(options);
  // 更换裁剪图片
  $("#btnUpload").on("click",function () {
    $("#file").click();
  })
  // 监听file表单事件
  $("#file").on("change",function () {
    var file = $("#file")[0].files;
    if (file.length <= 0) {
      return layer.msg("请选择上传的头像");
    }
    var newImgURL = URL.createObjectURL(file[0]);
    $image .cropper('destroy') 
   .attr('src', newImgURL) 
    .cropper(options)
  })
  // 上传头像
  $("#sure").on("click",function () {
    var dataURL = $image .cropper('getCroppedCanvas', { 
      width: 100, height: 100 }).toDataURL('image/png')
      $.ajax({
        type:"POST",
        url:"/my/update/avatar",
        data: {
          avatar:dataURL
        },
        success:function(res) {
          if (res.status !== 0) {
            return layer.msg("头像更新失败");
          }
          layer.msg("头像更新成功");
          window.parent.getUserInfo ();
        }
      })
  })


})