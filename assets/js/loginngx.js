; (function () {

  $('.loginb a').click(function () {
    $('.loginb').hide()
    $('.regb').show()
  })
  $('.regb a').click(function () {
    $('.regb').hide()
    $('.loginb').show()
  })
  /*  $('.zhucebt').click(function(e){
     e.preventDefault()
   }) */
  // 自定义密码校验规则
  const form = layui.form
  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    re: function (value) {
      let pass = $('.regb [name="password"]').val()
      // console.log(pass)
      // console.log(value)
      if (pass !== value) {
        return '两次密码输入不一致'
      }
    }
  })
  // 监听注册事件
 /*  $('#regform').on('submit', function (e) {
    // let username = $('.regb [name=username]').val()
    // let password = $('.regb [name=password]').val()
    // console.log(username,password);
    e.preventDefault()
    axios({
      method: 'post',
      url: 'http://www.liulongbin.top:3007/api/reguser',
      data: {
        username:$('.regb [name=username]').val(),
        password:$('.regb [name=password]').val()
      }
    }).then(({data}) => {
      // console.log('请求成功')
      alert(data.message)
    })
    
  }) */
  const layer = layui.layer
  $('#regform').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('.regb [name=username]').val(),
      password: $('.regb [name=password]').val()
    }
    $.post('/api/reguser', data, function(res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功，请登录！')
      // 模拟人的点击行为
      $('.regb a').click()
    })
  })
  // 监听登录事件
  $('#logform').on('submit', function(e) {
    // 1. 阻止默认的提交行为
    e.preventDefault()
    // 2. 发起Ajax的POST请求
    var data = {
      username: $('.loginb [name=username]').val(),
      password: $('.loginb [name=password]').val()
    }
    $.post('/api/login', data, function(res) {
      console.log(res);
      if (res.status !== 0) {
        return layer.msg(res.message)
      }else{
      layer.msg('登录成功！')
      // console.log(res);
      // 存储 token
      localStorage.setItem('token',res.token)
      // 跳转 
      location.href = '/indexngx.html' 
      }
    })
  })




})()

