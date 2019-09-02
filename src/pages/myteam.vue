<template>
  <div class="toshare">
    <div class="toshareContent">
      <div class="toshareitem" v-for="(item, index) in teamList" :key="index">
          <img :src="item.avatar" v-lazy="item.avatar" alt="">
          <span>{{item.user_nickname}}</span>
          <span>{{item.create_time_desc}}</span>
      </div>
      <NoData v-if="teamList.length==0&&hasGetData"/>
    </div>
    <Sharepagestyle :sharePageStyle="sharePageStyle" @close="showshareclose"/>
    <div class="tosharebut" @click="shareClick">
        邀请好友
    </div>
  </div>
</template>

<script>
import {userMyteam, weixinGetShareApi, weixinGetShare} from '@/api'
import NoData from '@/components/nodata.vue'
import Sharepagestyle from '@/components/showSharePage.vue'

export default {
  components: {
    NoData,
    Sharepagestyle
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfunction, false)
  },
  data () {
    return {
      page: 1,
      page_size: 8,
      totalPage: 0,
      teamList: [],
      hasMoreData: false,
      hasGetData: false,
      inBottom: false,
      wxpay: {},
      sharePageStyle: false
    }
  },
  methods: {
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
          title: detail.goods_name, // 分享标题
          desc: detail.description, // 分享描述
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
          title: detail.goods_name, // 分享标题
          desc: detail.description, // 分享描述
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
    shareClick () {
      // this.sharePageStyle = true
      this.$router.push({path: '/toshare'})
    },
    showshareclose () {
      this.sharePageStyle = false
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
    scrollfunction () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      console.log(scrollHeight, scrollTop, windowHeight)
      if (scrollHeight < (scrollTop + windowHeight) + 1) {
        if (!this.inBottom && this.hasMoreData) {
          console.log('加载更多')
          this.page++
          this.inBottom = true
          this.hasMoreData = false
          this.userMyteamApi()
        }
      } else {
        this.inBottom = false
        console.log(111)
      }
    },
    async userMyteamApi () {
      const data = {
        page: this.page,
        page_size: this.page_size
      }
      const result = await userMyteam(data)
      if (result.code === 1) {
        this.teamList = this.teamList.concat(result.data.list)
        this.totalPage = result.data.totalPage
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          this.hasMoreData = true
        }
      }
    }
  },
  mounted () {
    let bodycolors = document.documentElement || document.body
    bodycolors.style.background = '#f3f3f3'
    this.userMyteamApi()
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollfunction, false)
    })
  }
}
</script>

<style scoped>
.toshareitem span:nth-child(2){
  color:#333;
  font-size: 28px;
  margin-bottom: 17px;
}
.toshareitem span:nth-child(3){
  color:#666;
  font-size: 24px;
}
.toshareitem img{
  width:77px;
  height:77px;
  margin-bottom: 29px;
  border-radius: 50%;
}
.toshareitem{
  display: flex;
  flex-direction: column;
  padding-top:37px;
  padding-bottom: 37px;
  border-radius: 20px;
  background:white;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-right:20px;
  width:calc(50% - 10px);
}
.toshareitem:nth-child(2n){
  margin-right:0px !important;
}

.toshareContent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 98px;
}
.toshare{
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  padding-left:32px;
  padding-right:32px;
  padding-top:20px;
}
.tosharebut{
  position: fixed;
  bottom: 0;
  left:0;
  background:#9C3FA2;
  height:98px;
  width:100%;
  color:white;
  text-align: center;
  line-height: 98px;
  font-size:32px;
}
</style>
