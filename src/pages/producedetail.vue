<template>
  <div calss="prdetail">
    <div class="productdetail">
      <div class="prheader">
        <img class="prbanner" :src="detail.goods_image" v-lazy="detail.goods_image"/>
        <div class="prdes">
          <p>{{detail.goods_name}}</p>
          <p>{{detail.description}}</p>
          <div class="moneyShare">
            <span>¥{{detail.price}}</span>
            <span>¥{{detail.price_cost}}</span>
            <div class="sharebutton" @click="shareClick">
              <img src="../assets/images/share.png" />
              <span>分享赚佣金</span>
            </div>
          </div>
        </div>

      </div>
      <!-- <button @click="btn" >imj</button> -->
      <div class="prcontent">
        <div class="prdetaion">
          <span class="prdetaiontitle">详情</span>
        </div>
        <div class="prdetaioncontent" v-html="detail.content">
        </div>
      </div>
    </div>
    <!-- <div class="sharePageStyle" v-if="sharePageStyle" @click="showshareclose">
      <img src="../assets/images/sharewxico.png" alt="">
    </div> -->
    <Sharepagestyle :sharePageStyle="sharePageStyle" @close="showshareclose"/>
    <Paytab :price="detail.price" @pay="handlepay" />
  </div>
</template>

<script>
import Sharepagestyle from '../components/showSharePage.vue'
import Paytab from '../components/paybutton.vue'
import { mallGoodDetail, weixinGetShare } from '@/api'
import getSitem from '@/utils/storage'
import config from '@/utils/config'
export default {
  data () {
    return {
      detail: {
        goods_image: null
      },
      goods_id: null,
      appid: 'wx505f185e9f5fcf57',
      wxpay: {},
      sharePageStyle: false
    }
  },
  created () {

  },
  mounted () {
    this.mallGoodDetailApi()
    if (this.$route.query.openid) {
      getSitem.setStr('pudd', this.$route.query.openid)
      // alert(getSitem.getStr('pudd'))
    }
  },
  components: {
    Paytab,
    Sharepagestyle
  },
  methods: {
    btn () {
      localStorage.removeItem('token')
      localStorage.clear()
    },
    showshareclose () {
      this.sharePageStyle = false
    },
    shareClick () {
      this.sharePageStyle = true
    },
    wxs (wxpay, title, description, image) {
      let that = this
      console.log(title)
      console.log(description)
      let shareurl = config.baseurl + '/detail?id=' + that.goods_id + '&openid=' + that.detail.openid
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
        appid: this.appid,
        current_url: location.href
      }
      if (isiOS) {
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
    async mallGoodDetailApi () {
      // this.$toast.loading({
      //   mask: true,
      //   duration: 0,
      //   message: '加载中...'
      // })
      const data = {
        id: this.$route.query.id,
        token: getSitem.getStr('token')
      }
      const result = await mallGoodDetail(data)
      if (result.code === 1) {
        this.detail = result.data
        this.goods_id = result.data.goods_id
        console.log(this.detail.goods_name)
        console.log(this.detail.description)
        this.weixinGetShareApi(result.data.goods_name, result.data.description, result.data.goods_image)
      } else {
        this.$toast.clear()
      }
    },
    handlepay (e) {
      this.$router.push({path: 'payorder', query: {goods_id: this.goods_id}})
    }
  }
}
</script>

<style scoped>
.prdetaioncontent{
  font-size: initial
}
.prdetaioncontent img{
  width:100% !important;
  height:auto !important;
}

</style>
