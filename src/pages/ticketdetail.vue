<template>
  <div class="ticketdetail" v-if="ticketDetail">
    <div class="tdheader">
      <img :src="ticketDetail.goods_image" v-lazy="ticketDetail.goods_image" alt="" class="topimg"/>
      <div class="tddes">
        <h4>{{ticketDetail.goods_name}}</h4>
        <p class="tdpdes">{{ticketDetail.description}}</p>
        <div class="tdpf">
          <div class="tdpfl">
            <span>活动价</span><span>¥{{ticketDetail.price}}</span><span>¥{{ticketDetail.price_cost}}</span>
          </div>
          <div class="tdpfr sharebutton" @click="shareClick">
            <img src="../assets/images/share.png"/>
            <span>分享赚佣金</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tdsh">
      <div class="tdsheader">
        <router-link :to="'/shopdetail?id='+ticketDetail.goods_id">
        <span>商户</span>
        </router-link>
        <a :href="'tel:'+ticketDetail.shop_detail.contacts">
        <img src="../assets/images/call.png" />
        </a>
      </div>
     <router-link :to="'/shopdetail?id='+ticketDetail.goods_id">  <p>{{ticketDetail.shop_detail.shop_name}} </p> </router-link>
      <p class="tdshp"><img src="../assets/images/addressposition.png" />
        <a :href="'http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:'+ticketDetail.shop_detail.lat+','+ticketDetail.shop_detail.lng+';title:'+ticketDetail.shop_detail.shop_name+';addr:'+ticketDetail.shop_detail.address+'&key=R5PBZ-4LMWW-3W3RQ-OGHPU-UGOQ7-EIFRN&referer=search'"><span class="addressdeta">{{ticketDetail.shop_detail.address}}</span></a>
      </p>
    </div>
    <div class="tdescription" v-if="ticketDetail&&ticketDetail.content">
      <div class="tdesch">
        <span>详情</span>
      </div>
      <div class="tdescb" v-html="ticketDetail.content">
      </div>
    </div>
    <div class="paybutton">
      <span>在线支付：</span>
      <span>¥{{ticketDetail.price}}</span>
      <router-link class="button" :to="'/ticketpay?id='+ticketDetail.goods_id">立即购买</router-link>
    </div>
    <Sharepagestyle :sharePageStyle="sharePageStyle" @close="showshareclose"/>
  </div>
</template>

<script>
import Sharepagestyle from '../components/showSharePage.vue'
import {ticketDetailApi, weixinGetShare} from '@/api'
export default {
  components: {
    Sharepagestyle
  },
  data () {
    return {
      ticketDetail: null,
      goods_id: null,
      appid: 'wx505f185e9f5fcf57',
      wxpay: {},
      sharePageStyle: false
    }
  },
  mounted () {
    this.getTicketDetail()
    this.weixinGetShareApi()
  },
  methods: {
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
    },
    async getTicketDetail () {
      let formdata = {goods_id: this.$route.query.id}
      const data = await ticketDetailApi(formdata)
      if (data.code === 1) {
        this.ticketDetail = data.data
        this.goods_id = data.data.goods_id
      }
    }
  }

}
</script>

<style scoped>
  .tdsheader a{
    display: inherit;
  }
  .tdheader .topimg{
    width: 100%;
    height: auto;
  }
  .tddes h4{
    margin-bottom: 10px;
  }
  .tdpfl span:nth-child(1){
    font-size: 24px;
  }
  .tdpfl span:nth-child(2){
    color: #E52B2B;
    /* font-weight: bold; */
  }
  .tdpfl span:nth-child(3){
    text-decoration: line-through;
  }
  .tdpfr{
    line-height: 0.693333rem;
  }
  .addressdeta{
    width: 100%;
    color: #333333;
    font-size:26px;
  }
  .tdshp  .juli{
    margin-left: 20px;
    color: #999;
  }
  .tdescription{
    padding-top: 24px;
    margin-bottom: 15px;
  }
  .tdescb{
    /* font-size: 24px;
    color: #333333;
    text-align: left;
    line-height: 40px;
    margin-bottom: 34px;
    width: 100%;
    overflow-x: hidden; */
    font-size: initial;
  }
  .tdescb img{
    width:100% !important;
    height:auto !important;
  }
  .ticketdetail{
    padding-bottom: 98px;
  }
  .tdesch{
    border-bottom: 1px solid #F3F3F3;
    padding-bottom: 10px;
    margin-bottom: 39px;
  }
  .tdescb a{
    width: 100% !important;
  }
  .tdescb img{
    width: 100% !important;
  }
  .paybutton{
    padding-right:32px;
    padding-left:32px;
    display: flex;
    height:98px;
    width:100%;
    flex-direction: row;
    justify-content:space-between;
    align-items: center;
    position:fixed;
    z-index: 101;
    bottom: 0;
    left:0;
    color:#333333;
    font-size: 24px;
    background:white;
    box-shadow:0px 4px 9px 0px rgba(217,217,217,0.21);
  }

  .paybutton span:nth-child(2){
    flex:1 1 auto;
    color:#E52B2B;
    font-size: 34px;
    /* font-weight: bold; */
  }
  .paybutton .button{
    background:#943D93;
    padding:17px 51px;
    border-radius: 8px;
    color:white;
    font-size: 28px;
    line-height: 40px;
    text-align: center;
  }
</style>
