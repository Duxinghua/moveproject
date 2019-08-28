const weixifx = {
  config (data) {
    wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp,
      nonceStr: data.nonceStr,
      signature: data.signature,
      jsApiList: [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage'
      ]
    })
  },
  error () {
    wx.error(function (res) {
      // layer.msg("出错了：" + res.errMsg);
    })
  },
  // 在这里调用 API
  ready () {
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ],
        success: function (res) {
          // alert(JSON.stringify(res));
        }
      })
    })
  },
  // 点击分享到朋友圈
  onMenuShareTimeline () {
    wx.onMenuShareTimeline({
      title: '无人茶社邀您喝好茶！', // 分享标题
      desc: '邀您喝好茶、邀您体验无人值守！', // 分享描述
      link: baseUrl + "{:url('tea/center/share',array('id'=>$user['id'],'appid'=>$appid))}", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: httpBaseUrl + '/themes/simpleboot3/tea/public/img/logo2.jpg?t=6', // 分享图标
      trigger: function (res) {
        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
        alert('用户点击分享到朋友圈')
      },
      success: function () {
        // 用户确认分享后执行的回调函数
        alert('分享成功')
      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        alert('分享取消')
      },
      fail: function (res) {
        alert(JSON.stringify(res))
      }
    })
  },
  onMenuShareAppMessage () {
    wx.onMenuShareAppMessage({
      title: '无人茶社邀您喝好茶！', // 分享标题
      desc: '邀您喝好茶、邀您体验无人值守！', // 分享描述
      link: baseUrl + "{:url('tea/center/share',array('id'=>$user['id'],'appid'=>$appid))}", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: httpBaseUrl + '/themes/simpleboot3/tea/public/img/logo2.jpg?t=1.1', // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        // 用户确认分享后执行的回调函数
        // alert('分享成功');

      },
      cancel: function () {
        // 用户取消分享后执行的回调函数
        // alert('分享取消');
      }
    })
  }
}
export default weixifx
