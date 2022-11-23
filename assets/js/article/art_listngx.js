; (() => {
  // 定义请求参数默认值 
  /* 页码值
  每页显示多少条数据
  文章分类的 Id
  文章的状态，可选值有：已发布、草稿
 */
  let p = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state:''
  }
  let form = layui.form
  let layer = layui.layer
  initTable()
  // 渲染列表方法
  function initTable(){
    // 请求数据
    $.ajax({
      method:'get',
      url:'/my/article/list',
      data:p,
      success:function(res){
        console.log(res);
        let htmlN = template('tpl-table', res)
        $('tbody').html(htmlN)
      }
    })
  }













})()