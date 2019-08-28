<template>
  <div calss="prdetail">
    <div class="productdetail">
      <div class="prheader">
        <img class="prbanner" :src="detail.goods_image"  />
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
      <div class="prcontent">
        <div class="prdetaion">
          <span class="prdetaiontitle">详情</span>
        </div>
        <div class="prdetaioncontent" v-html="detail.content">
        </div>
      </div>
    </div>
    <Paytab :price="detail.price" @pay="handlepay" />
  </div>
</template>

<script>
// import Pagetab from '../components/pagetab.vue'
import Paytab from '../components/paybutton.vue'
import { mallGoodDetail,weixinGetShare } from '@/api'
export default {
  data () {
    return {
      detail: {
        goods_image: null
      },
      goods_id: null,
      appid:'wx505f185e9f5fcf57',
      wxpay:null
    }
  },
  mounted () {
    this.mallGoodDetailApi()
    this.weixinGetShareApi()
  },
  components: {
    Paytab
  },
  methods: {
    shareClick(){
      console.log('ss')
      const data = {
        img: 'https://xinbr.qixiuu.com/upload/default/logo.png'
      }

    },
    wxs(wxpay) {
            wx.config({
                debug: true,
                appId: wxpay.appId,
                timestamp: wxpay.timestamp,
                nonceStr: wxpay.nonceStr,
                signature: wxpay.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ]
            });
            wx.error(function (res) {
                console.log('error',res)
            });
            // 在这里调用 API
            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage'
                    ],
                    success: function (res) {
                        //alert(JSON.stringify(res));
                    }
                });

                //点击分享到朋友圈
                wx.onMenuShareTimeline({
                    title: '无人茶社邀您喝好茶！', // 分享标题
                    desc: '邀您喝好茶、邀您体验无人值守！', // 分享描述
                    link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: wxpay.logo, // 分享图标
                    trigger: function (res) {
                        // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                        alert('用户点击分享到朋友圈');
                    },
                    success: function () {
                        // 用户确认分享后执行的回调函数
                        alert('分享成功');

                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                        alert('分享取消');
                    },
                    fail: function (res) {
                        alert(JSON.stringify(res));
                    }
                });
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
                });
				    })

		},
    async weixinGetShareApi () {
      const data = {
        appid: this.appid,
        current_url: location.href
      }
      const result = await weixinGetShare(data)
      if(result.code === 1){
        this.wxpay = result.data
        this.wxs(result.data)
      }
    },
    async mallGoodDetailApi () {
      const data = {
        id: this.$route.query.id
      }
      const result = await mallGoodDetail(data)
      if (result.code === 1) {
        this.detail = result.data
        this.goods_id = result.data.goods_id
      }
    },
    handlepay (e) {
      this.$router.push({path: 'payorder', query: {goods_id: this.goods_id}})
    }
  }
}
</script>

<style>

</style>
