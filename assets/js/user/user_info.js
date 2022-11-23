; (() => {
  // 自定义表单验证规则
  let form = layui.form
  let layer = layui.layer
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度应为1-6位'
      }
    }
  })
  getUserinfo()
  // 获取前用户信息，填充表单
  function getUserinfo() {
    $.ajax({
      method: 'get',
      url: '/my/userinfo',
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        form.val('userInfoForm', res.data)
      }
    })
  }
  // 将表单重置为用户初始信息
  $('#resetbt').click(function (e) {
    // 阻止重置默认行为
    e.preventDefault()
    // 重置
    getUserinfo()
  })
  // 提交更新用户信息
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    //发送更新请求
    $.ajax({
      method: 'post',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        } else {
          form.val('userInfoForm', res.data)
          window.parent.getUserInfo()
          layer.msg('更新用户信息成功')
        }
      }
    })
  })
})()