// 为url拼接同公共前缀
;(function(){
  $.ajaxPrefilter( function( options ) {
    // console.log(options.url)
    options.url = 'http://www.liulongbin.top:3007' + options.url

    // 判断url是否含有 /my/ ，有则统一添加请求头
    if(options.url.indexOf('/my/') !== -1){
      options.headers  = {
        // 防止程序直接崩溃
        Authorization:localStorage.getItem('token') || ''
      }
    }
    // 全局设置请求complete函数，用于阻止异常跳转
    options.complete= function(res){
      // console.log(res);
      if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败 '){
        localStorage.removeItem('token')
        location.href = '/loginngx.html'
      }
    }
  })
})()
