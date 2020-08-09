$(function(){
  var form = layui.form;
  var q = {
    pagenum:1,
    pagesize:2,
    cate_id:"",
    state:""
  }
  // 获取文章类别
  function getClassify() {
    $.ajax({
      type: "GET",
      url:"/my/article/cates",
      success:function(res) {
        if (res.status !==0) {
          return layer.msg("文章类别获取失败");
        }
        var str = template("tempClassify",res);
        $("#cate_id").html(str);
        form.render();
      }
    })
  }
  getClassify();
  // 通过筛选按钮，筛选显示数据
  $("#formChoose").on("submit",function(e) {
    e.preventDefault();
    q.cate_id = $("#cate_id").val();
    q.state = $("#state").val();
    $.ajax({
      type:"GET",
      url:"/my/article/list",
      data:q,
      success:function(res) {
        if (res.status !== 0) {
          return layer.msg("文章列表获取失败");
        }
        var str = template("templist",res);
        $("tbody").html(str);
      }
    })
  })
  // 获取文章列表数据
  function getList () {
    $.ajax({
      type:"GET",
      url:"/my/article/list",
      data: q,
      success:function(res) {
        if (res.status !==0) {
          return layer.msg("文章列表数据获取失败");
        }
        var str = template("templist",res);
        $("tbody").html(str);
        renderPage (res.total);
      }
    })
  }
  // 定义美化日期过滤器
  template.defaults.imports.formData = function (value) {
    var d = new Date(value);
    var f = d.getFullYear();
    var m = d.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var dd = d.getDate() ;
    dd = dd < 10 ? '0' + dd : dd;
    var h = d.getHours();
    h = h < 10 ? '0' + h : h;
    var mm = d.getMinutes();
    mm = mm < 10 ? '0' + mm: mm;
    var s = d.getSeconds();
    s = s < 10 ? '0' + s : s;
    return f + '年' + m + '月' + dd + '日 ' + h + ':' + mm + ':' + s;
  }
  getList ()
  // 定义分页函数
  function renderPage (total) {
    var laypage = layui.laypage;
    laypage.render({
      elem: 'page' //注意，这里的 test1 是 ID，不用加 # 号
      ,count: total, //数据总数，从服务端得到
      limits:[2, 5, 10, 20],
      limit:q.pagesize,
      curr:q.pagenum,
      layout:['count','limit','prev', 'page', 'next','skip'],
      jump:function(obj,first){
       q.pagenum = obj.curr;
       q.pagesize = obj.limit;
       if (!first) {
        getList ()
       }
       
      }

    });
  }
  // 删除文章
  $("tbody").on("click",".del",function(){
    var id = $(this).prop("id");
    var len = $(".del").length;
    layer.confirm('确定删除吗?', {icon: 3, title:'提示'}, function(index){
      $.ajax({
        type: "GET",
        url:"/my/article/delete/" + id,
        success:function(res) {
          if (res.status !== 0) {
            return layer.msg("文章删除失败");
          }
          layer.msg("文章删除成功");
          if (len == 1) {
            q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1;
          }
          getList ()
        }
      })
      
      layer.close(index);
    });
  })
  // 编辑文章
  $("tbody").on("click",".edit",function() {
    var id = $(this).prop("id");
    localStorage.setItem("editId",id);
    window.parent.$("iframe").prop("src","/article/art_edit.html")
   
  })







});







