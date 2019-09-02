<template>
  <div class="invite">
    <div class="inviteitem">
      <img :src="detail.fx_qrcode_img" v-lazy="detail.fx_qrcode_img"  class="wxcode"/>
      <p>分享二维码邀请好友</p>
    </div>
    <!-- <div class="invitebutton"  @click="shareClick">
      分享好友
    </div> -->
    <!-- <Sharepagestyle :sharePageStyle="sharePageStyle" @close="showshareclose"/> -->

  </div>

</template>

<script>
import Sharepagestyle from '../components/showSharePage.vue'
import {weixinGetShare, userShare} from '@/api'
import getSitem from '@/utils/storage'
export default {
  data () {
    return {
      sharePageStyle: false,
      openid: null,
      detail: {

      }
    }
  },
  components: {
    Sharepagestyle
  },
  mounted () {
    this.openid = this.$route.query.openid
    // this.weixinGetShareApi()

    this.userShareApi()
  },
  methods: {
    async userShareApi () {
      const data = {
        udd: this.$route.query.openid
      }
      const result = await userShare(data)
      if (result.code === 1) {
        this.detail = result.data
        getSitem.setStr('pudd', result.data.openid)
      }
    },
    showshareclose () {
      this.sharePageStyle = false
    },
    shareClick () {
      this.sharePageStyle = true
    },
    wxs (wxpay) {
      wx.config({
        debug: false,
        appId: wxpay.appId,
        timestamp: wxpay.timestamp,
        nonceStr: wxpay.nonceStr,
        signature: wxpay.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage'
        ]
      })
      wx.error(function (res) {
        console.log('error', res)
      })
      // 在这里调用 API
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

        // 点击分享到朋友圈
        wx.onMenuShareTimeline({
          title: '无人茶社邀您喝好茶！', // 分享标题
          desc: '邀您喝好茶、邀您体验无人值守！', // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: wxpay.logo, // 分享图标
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
          title: '无人茶社邀您喝好茶！', // 分享标题
          desc: '邀您喝好茶、邀您体验无人值守！', // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: wxpay.logo, // 分享图标
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
    },
    async weixinGetShareApi () {
      const data = {
        appid: this.appid,
        current_url: location.href
      }
      const result = await weixinGetShare(data)
      if (result.code === 1) {
        this.wxpay = result.data
        this.wxs(result.data)
      }
    }
  }

}
</script>

<style scoped>
.invitebutton{
  position: fixed;
  bottom: 0;
  left:0;
  width:100%;
  height:98px;
  background:#9C3FA2;
  text-align: center;
  line-height: 98px;
  font-size: 36px;
  color:white;
  cursor: pointer;
}
.invite{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background:url('../assets/images/invitebackground.png');
  background-size: 100% 100%;
  width:100vw;
  height:100vh;
}
.inviteitem{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    width:448px;
    height:428px;
    background:url('../assets/images/inviteitem.png');
    background-size:100% 100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.inviteitem .wxcode{
  margin-top:36px;
  width:227px;
  height:225px;
}
.inviteitem p {
  font-size:23px;
  margin-top:36px;
  color:#666
}
</style>
