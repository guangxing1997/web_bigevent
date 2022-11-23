; (() => {
  let layer = layui.layer
  let form = layui.form
  renderTable()
  // 渲染表格函数
  function renderTable() {
    // 请求服务器数据
    $.ajax({
      method: 'get',
      url: '/my/article/cates',
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('获取列表信息失败！')
        }
        let htmlN = template('tpl-table', res)
        $('tbody').html(htmlN)
      }
    })
  }
  let addID
  $('#addCateBtn').click(() => {
    addID = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加类别',
      content: $('#addForm').html()
    })
  })

  // 为添加弹出框绑定提交事件
  // 因其是动态的，用代理为其绑定
  $('body').on('submit', '#addF', function (e) {
    e.preventDefault()
    //发送新增请求
    $.ajax({
      method: 'post',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          //数据库已满，一直添加失败
          layer.msg('添加类别失败！')
          return layer.close(addID)
        } else {
          layer.msg('添加类别成功')
          renderTable()
          // 成功后通过 layer.open()返回id关闭弹出层
          layer.close(addID)
        }
      }
    })
  })

  // 为编辑按钮绑定点击事件
  // 因其是动态的，用代理为其绑定
  let editID
  $('tbody').on('click', '.ediBtn', function () {
    editID = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改类别',
      content: $('#editForm').html()
    })
    let id = $(this).attr('id')
    // 获取编辑数据信息，渲染弹出层
    $.ajax({
      method: 'get',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('editForm', res.data)
        // localStorage.setItem('Id',res.data.Id)
      }
    })
  })

  // 编辑弹出层提交事件
  $('body').on('submit', '#editF', function (e) {
    e.preventDefault()
    //发送新增请求
    $.ajax({
      method: 'post',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        console.log(res)
        if (res.status !== 0) {
          //数据库已满，一直添加失败
          layer.msg('修改类别失败！')
          return layer.close(editID)
        } else {
          layer.msg('修改类别成功')
          renderTable()
          // 成功后通过 layer.open()返回id关闭弹出层
          layer.close(editID)
        }
      }
    })
  })

  // 删除事件
  $('tbody').on('click', '.scbt', function () {

    let id = $(this).attr('id')
    layer.confirm('is not?', { icon: 3, title: '提示' }, function (index) {

      // 发送删除数据请求
      $.ajax({
        method: 'get',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          // console.log(res);
          if (res.status !== 0) {
            layer.msg('删除类别失败！')
          } else {
            layer.msg('删除类别成功！')
          }
          // localStorage.setItem('Id',res.data.Id)
        }
      })
      renderTable()
      layer.close(index);
    })
  })
})()