<template>
  <div class="myYq">
    <img class="myYq-top" src="../assets/images/myyq.png" alt="">
    <img class="myYq-qrcode" src="../assets/images/qrcodewrap.png" alt="">
    <div class="myYq-wrap">
      <div class="content">
        <span>长按识别 立即体验</span>
        <img :src="qrurl" alt="" />
      </div>
    </div>
    <div class="myYq-content">
      <span>分享规则：{{description}}</span>
    </div>
    <div class="myYq-btn" @click="shareOpen">
      分享邀请好友
    </div>
    <WxShare :show="wxShare" @toShare="toShare" />
  </div>
</template>

<script>
import WxShare from '@/components/wxshare.vue'
import config from '@/utils/config'
export default {
  data () {
    return {
      wxShare: false,
      qrurl: '',
      description: '',
      logo: require('../assets/images/logo.jpg')
    }
  },
  mounted () {
    this.$api.wechatQrcode().then((result) => {
      console.log(result)
      if (result.code === 1) {
        this.qrurl = result.data.ticket
        this.description = result.data.description
        this.openid = result.data.openid
        this.logo = result.data.logo
        this.wxs()
      }
    })
  },
  methods: {
    shareOpen () {
      // this.wxShare = true
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果
        scanType: [ 'qrCode', 'barCode' ], // 可以指定扫二维码还是一维码，默认二者都有 */
        /*   desc : 'scanQRCode desc', */
        success: function (res) {
          alert(JSON.stringify(res))
          // var url = res.resultStr;//扫码后获取结果
          // location.href =  url;
          console.log(res)
        },
        error: function (res) {
          alert(JSON.stringify(res))
        }
      })
    },
    toShare () {
      this.wxShare = false
    },
    wxs () {
      var data = {
        url: location.href
      }
      var that = this
      let shareUrl = config.baseurl + '/invite?openid=' + this.openid
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        data.url = config.shareurls
      }
      this.$api.userGetSignPackage(data).then((res) => {
        if (res.code === 1) {
          var wxpay = res.data
          wx.config({
            debug: true,
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
              'getLocalImgData',
              'scanQRCode'
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
                'getLocalImgData',
                'scanQRCode'
              ],
              success: function (res) {

              }
            })
          })

          // 点击分享到朋友圈
          wx.onMenuShareTimeline({
            title: '邀请好友，一起赚钱', // 分享标题
            desc: that.description, // 分享描述
            link: config.gourl + encodeURIComponent(shareUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.logo, // 分享图标
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
            title: '邀请好友，一起赚钱', // 分享标题
            desc: that.description, // 分享描述
            link: config.gourl + encodeURIComponent(shareUrl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.logo, // 分享图标
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
      })
    }
  },
  components: {
    WxShare
  }
}
</script>

<style lang="scss" scoped>
.myYq{
  background:#FBF8F4;
  display: flex;
  flex-direction: column;
  min-height:100vh;
  &-content{
    position: fixed;
    width:90%;
    top: calc(40% + 440px);
    left:50%;
    transform: translate(-50%,-40%);
    span{
      display: inline-flex;
      font-size: 26px;
      color:#333;
      line-height: 36px;
    }
  }
  &-top{
    width:750px;
    height:586px;
  }
  &-qrcode{
    position: fixed;
    top:40%;
    left:50%;
    transform:translate(-50%,-40%);
    width:448px;
    height:440px;
    z-index: 1;
  }
  // 432px;
  &-wrap{
    position: fixed;
    top:40%;
    left:50%;
    transform: translate(-50%,-40%);
    width:448px;
    height:440px;
    z-index: 2;
    .content{
      display: flex;
      flex-direction: column;
      span{
        height:58px;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 29px;
        color:white;
      }
      img{
        width:262px;
        height:260px;
        margin-top:64px;
        margin-left:93px
      }
    }
  }
  &-btn{
    background:#718464;
    width:683px;
    height:88px;
    border-radius: 44px;
    color:#F3D995;
    text-align: center;
    line-height: 88px;
    font-size:36px;
    position: fixed;
    left:50%;
    bottom:5%;
    transform: translateX(-50%)

  }
}

</style>
