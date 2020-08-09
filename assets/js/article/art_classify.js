$(function() {
  var form = layui.form;
  // 获取文章分类列表
  function getArticleList () {
    $.ajax({
      type: "GET",
      url:"/my/article/cates",
      success:function(res) {
        if (res.status !== 0) {
          return layer.msg("文章分类列表获取失败");
        }
        var str = template("tempClassify",res)
        $("tbody").html(str)
      }
    })
  }
  getArticleList ()

  // 添加类别按钮注册事件
  $(".add").on("click",function(){
    var index = layer.open({
      title: '添加文章分类',
      type: 1,
      area: ['500px', '250px'],
      content: $("#tempAddClassify").html()
    })
     // 添加文章分类
  $(".formAdd").on("submit",function(e){
    e.preventDefault();
    var data = $(this).serialize();
    $.ajax({
      type: "POST",
      url:"/my/article/addcates",
      data:data,
      success:function(res) {
        if (res.status !== 0) {
          return layer.msg("添加文章类别失败");
        }
        layer.msg("添加文章类别成功");
        layer.close(index)
        getArticleList ();
      }
    })
  })
  })
  // 编辑文章
  $("tbody").on("click",".edit",function(){
    var index = layer.open({
      title: '修改文章分类',
      type:1,
      area: ['500px', '250px'],
      content: $("#tempEdit").html()
    });
    // 根据id获取文章分类数据
    var id  = $(this).prop("id");
    $.ajax({
      type: "GET",
      url:"/my/article/cates/" + id,
      success:function(res) {
        if (res.status !== 0) {
          return layer.msg("获取文章信息失败");
        }
        form.val('tempEdit', res.data)
      }
    })
    // 修改文章分类信息
    $(".formEdit").on("submit",function(e){
      e.preventDefault();
      var data = form.val('tempEdit');
      $.ajax({
        type: "POST",
        url:"/my/article/updatecate",
        data: data,
        success:function(res) {
          if (res.status !== 0) {
            return layer.msg("修改文章分类信息失败");
          }
          layer.msg("修改文章分类信息成功");
          layer.close(index);
          getArticleList ();
        }
      })
    })
  })
  // 删除文章分类列表
  $("tbody").on("click",".del",function(){
    var id = $(this).prop("id");
    layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        type:"GET",
        url:"/my/article/deletecate/" + id,
        success:function(res) {
          if (res.status !== 0) {
            return layer.msg("删除失败");
          }
          layer.msg("删除成功");
          getArticleList ();
        }
      })
      
      layer.close(index);
    });
  })








})