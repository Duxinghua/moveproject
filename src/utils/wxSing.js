import Api from '@/api/index'
import config from './config'
const wxSing = {

  init (title,description,shareUrl,image) {
    console.log('22')
    shareUrl = shareUrl || location.href
    var data = {
      url: location.href
    }
    const agent = navigator.userAgent
    const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isiOS) {
      data.url = config.shareurls
    }
    Api.userGetSignPackage(data).then((res) => {
      if (res.code === 1) {
        var wxpay = res.data
        wx.config({
          debug: false,
          appId: wxpay.appId,
          timestamp: wxpay.timestamp,
          nonceStr: wxpay.nonceStr,
          signature: wxpay.signature,
          jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'chooseImage',
            'uploadImage',
            'getLocalImgData'
          ]
        })
        wx.error(function (res) {
          console.log('出错了：' + res.errMsg)
        })
        // 在这里调用 API
        wx.ready(function () {
          wx.checkJsApi({
            jsApiList: [
              'checkJsApi',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'chooseImage',
              'uploadImage',
              'getLocalImgData'
            ],
            success: function (res) {

            }
          })

          // 点击分享到朋友圈
          // that.baseurl + '/detail?id=' + encodeURIComponent(that.goods_id)
          wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: description, // 分享描述
            link: config.gourl + encodeURIComponent(shareurl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: image, // 分享图标
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
          wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: description, // 分享描述
            link: config.gourl + encodeURIComponent(shareUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: image, // 分享图标
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
        })
      }
    })
  }
}
export default wxSing
