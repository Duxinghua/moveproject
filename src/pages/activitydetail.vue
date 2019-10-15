<template>
  <div class="activitydetail">
    <div class="activityheader" v-if="activeDetail">
      <img class="" mode="aspectFit" :src="activeDetail.image"  v-lazy="activeDetail.image" alt="">
      <div class="accontenty">
        <p>{{activeDetail.title}}</p>
        <div class="activityditem">
          <img src="../assets/images/avtime.png" alt="">
          <span>活动时间:</span>
          <span>{{activeDetail.start_time}} 至 {{activeDetail.end_time}}</span>
        </div>
        <div class="activityditem">
          <img src="../assets/images/avmoney.png" alt="">
          <span>活动费用:</span>
          <span>{{activeDetail.money}}元</span>
        </div>
        <div class="activityditem">
          <img src="../assets/images/avpersion.png" alt="">
          <span>参与人群:</span>
          <span>{{activeDetail.member}}</span>
        </div>
        <div class="activityditem">
          <img src="../assets/images/views.png" class="views" alt="">
          <span>浏览量:</span>
          <span>{{activeDetail.hits}}</span>
        </div>
      </div>
    </div>
    <div class="activityinfodes" v-if="activeDetail">
      <span class="aidst">活动介绍</span>

      <div class="aids" v-html="activeDetail.content">

      </div>
      <!-- <span class="aidsb">报名请加入社区群，群号：L54120013</span> -->
    </div>
  </div>
</template>

<script>
import tool from '@/assets/js/tool'
import {activeDetailApi, weixinGetShare} from '@/api'
import getSitem from '@/utils/storage'
import config from '@/utils/config'
export default {
  data () {
    return {
      activeDetail: null,
      id: null
    }
  },
  mounted () {
    this.getActiveDetail()
    if (this.$route.query.id) {
      this.id = this.$route.query.id
    }
  },
  methods: {
    wxs (wxpay, title, description, image) {
      let that = this
      console.log(title)
      console.log(description)
      let shareurl = config.baseurl + '/activitydetail?id=' + this.id
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      console.log(shareurl, 'shareurl')
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
          link: config.gourl + encodeURIComponent(shareurl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
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
      setTimeout(() => {
        this.$toast.clear()
      }, 2000)
    },
    async weixinGetShareApi (title, description, image) {
      //
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

      const data = {
        appid: config.appid,
        current_url: location.href
      }
      if (isiOS) {
        // alert('iosurl')
        // alert(getSitem.getStr('iosurl'))
        // alert(location.href)
        // data.current_url = getSitem.getStr('iosurl')
        data.current_url = config.shareurls
      }
      const result = await weixinGetShare(data)
      if (result.code === 1) {
        this.wxpay = result.data
        // alert('weixingetshare')
        this.wxs(result.data, title, description, image)
      } else {
        this.$toast.clear()
      }
    },
    async getActiveDetail () {
      let formdata = {activity_id: this.$route.query.id}
      const data = await activeDetailApi(formdata)
      if (data.code === 1) {
        this.activeDetail = data.data
        this.activeDetail.start_time = this.autoTime(data.data.start_time)
        this.activeDetail.end_time = this.autoTime(data.data.end_time)
        this.weixinGetShareApi(data.data.title, data.data.description, data.data.image)
      }
    },
    autoTime (input) {
      var timer = new Date(input * 1000)
      var year = timer.getFullYear()
      var Months = timer.getMonth() + 1
      Months = new String(Months)
      Months = Months.length === 1 ? '0' + Months : Months
      var Days = new String(timer.getDate())
      Days = Days.length === 1 ? '0' + Days : Days
      var Hours = new String(timer.getHours())
      Hours = Hours.length === 1 ? '0' + Hours : Hours
      var Minutes = new String(timer.getMinutes())
      Minutes = Minutes.length === 1 ? '0' + Minutes : Minutes
      // var Seconds = new String(timer.getSeconds())
      // Seconds = Seconds.length === 1 ? '0' + Seconds : Seconds
      console.log(timer.getSeconds().length)
      return Months + '-' + Days + ' ' + Hours + ':' + Minutes
    }
  }
}
</script>

<style scoped>
  .activitydetail{
    display: flex;
  }
  .activityinfodes{
    padding-bottom: 60px;
  }

.acbanner{
  height: auto;
}
.accontenty{
  padding-bottom: 12px;
}
  .activitydetail .accontenty p{
    line-height: 44px;
    padding: 18px 0 0 0;
    margin-bottom: 0;
  }
.activityditem{
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: 1px solid #F3F3F3;
  line-height:60px;
}
.activityditem:last-child{
  border-bottom: none;
}
.aids{
  /* font-size: 24px;
  color: #333333;
  text-align: left;
  line-height: 40px;
  margin-bottom: 34px; */
  font-size: initial;
  word-wrap: break-word;
  word-break: break-all;
}
.aids img{
  width:100% !important;
  height:auto !important;
}
img[lazy="loading"]{
  transform: scale(0.2);
  /* opacity: 0; */
  /* zoom:0.2 */
}
</style>
