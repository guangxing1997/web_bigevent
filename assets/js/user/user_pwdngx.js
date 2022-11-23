let layer = layui.layer
let form = layui.form
$(()=>{
  form.verify({
    pwd:[
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    npwd:function(value){
      if(value === $('[name="oldPwd"]').val()){
        return '新旧密码一致'
      }
    },
    rpwd:function(value){
      if(value !== $('[name="newPwd"]').val()){
        return '确认密码与新密码不一致'
      }
    },
  })
  // 提交重置密码
  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    //发送更新请求
    $.ajax({
      method: 'post',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('更新密码失败！')
        } else {
          layer.msg('更新密码成功')
          $('.layui-form')[0].reset()
        }
      }
    })
  })
})