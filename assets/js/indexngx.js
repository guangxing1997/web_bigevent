let layer = layui.layer
$(function(){
  // 隐藏用户字体头衔
  $('.textPhoto').hide()
  // 渲染用户头像及信息
  getUserInfo()
  // 主页退出部分
  $('#eixtA').click(()=>{
    layer.confirm(' 是否退出?', {icon: 3, title:'提示'}, function(index){
      //do something
      layer.close(index)
      if(localStorage.getItem('token') !== null){
      localStorage.removeItem('token')
      }
      location.href = '/loginngx.html'
    })
  })

})
// 封装获取用户信息的方法
function getUserInfo(){
  $.ajax({
    method:'get',
    url: '/my/userinfo',
    // headers:{
    //   Authorization:localStorage.getItem('token')
    // },
    success:function(res){
      // console.log(res)
      if(res.status!==0){
        return layer.msg('获取用户信息失败！')
      }else{
        // console.log(res)
        renderUserName(res)
        renderUserImg(res)
      }
    }
  })
}
// 封装渲染用户信息
function renderUserName({data}){
  if(data.nickname === ''){
    $('.welMes').html('欢迎&nbsp;&nbsp;' + data.username)
    $('.welMesr').html( data.username)
  }else{
    $('.welMes').html('欢迎&nbsp;&nbsp;' + data.nickname)
    $('.welMesr').html( data.nickname)
  }
}
// 渲染用户头像
function renderUserImg({data}){
  if(data.user_pic !== null){
    $('.layui-nav-img').attr('src',data.user_pic).show().next().hide()
  }else{
    let first = data.nickname[0].toUpperCase()
    $('.textPhoto').html(first).show().prev().hide()
  }
}

