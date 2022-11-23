$(function () {
  let layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  // 实现上传按钮选择文件功能
  $('#upBtn').click(function () {
    $('#ChoBtn').click()
  })
  // 文件选择按钮绑定change事件,提交服務器
  $('#ChoBtn').on('change', function (e) {
    // console.log(e.target.files.length);
    if (e.target.files.length === 0) {
      return layer.msg('未选择文件')
    }
    let file = e.target.files[0]
    let newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  })
  // 上传头像
  $('#confBtn').click(function () {

    let dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      
    // 提交修改头像
    $.ajax({
      method: 'post',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: function (res) {
        // console.log(res)
        if (res.status !== 0) {
          return layer.msg('头像修改失败！')
        }
        layer.msg('头像修改成功')
        window.parent.getUserInfo()
      }
    })
  })
})