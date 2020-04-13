<template>
  <div class="huabangd">
    <div class="huabangd-top">
      <div class="huabangd-top-detail">
        <div class="detail-top">
          <div class="detail-top-img">
              <van-image :src="tzDetail.image? tzDetail.image[0]:require('../assets/images/hgdi.png')">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
          </div>
          <!-- <img  class="detail-top-img" :src="tzDetail.image? tzDetail.image[0]:require('../assets/images/hgdi.png')" alt=""> -->
          <div class="detail-top-center">
            <span class="detail-title">{{tzDetail.group_name}}</span>
            <div class="detail-avatar" @click="userContClick">
              <img src="../assets/images/hgdp.png" alt="">
              <span>{{tzDetail.user_count}}成员</span>
            </div>
          </div>
          <img class="detail-top-imgmore" :src="tzDetail.is_join === 0 ? require('../assets/images/hgdg.png') : require('../assets/images/ggz.png')" alt="" @click="joinGroupHandler">
        </div>
        <span class="detail-bottom">
          {{tzDetail.description}}
        </span>
      </div>

    </div>
    <div class="huabangd-tzdl">
      <TitleItem title="贴子讨论" />
      <div class="huabangd-tzdl-wrap">
        <van-list
              v-model="loading"
              v-show="huabantzlist.length > 0"
              :finished="finished"
              finished-text="没有更多了"
              :immediate-check="false"
              @load="onLoad"
        >
        <HuabantzItem v-for="(item,index) in huabantzlist" :key="index" :item="item" />
        </van-list>
        <div class="tzdl-btn" @click="fptzClickHandler">
          <img src="../assets/images/jiahaoico.png" class="jiahaoico" alt="">
          <span>发表话题</span>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import TitleItem from '@/components/titleItem.vue'
import HuabantzItem from '@/components/huabantzItem.vue'
import WxSing from '@/utils/wxSing'
import config from '@/utils/config'
export default {
  name: 'HuabanGroupDetail',
  data () {
    return {
      tzDetail: {},
      id: null,
      huabantzlist: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0

    }
  },
  methods: {
    userContClick () {
      this.$router.push({name: 'HuabanGroupMember', query: {id: this.id}})
    },
    init (title, description, image) {
      console.log('22')
      var shareUrl = config.baseurl + '/huabangroupdetail?id=' + this.id
      var data = {
        url: location.href
      }
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        data.url = config.shareurls
      }
      this.$api.userGetSignPackage(data).then((res) => {
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
    },
    fptzClickHandler () {
      if (this.tzDetail.is_join === 1) {
        this.$router.push({name: 'HuabanTzfp', query: {id: this.id}})
      } else {
        this.$toast('请先加入小组才可以发贴')
      }
    },
    joinGroupHandler () {
      var is_join = this.tzDetail.is_join
      var group_id = this.tzDetail.group_id
      if (is_join === 0) {
        this.$api.groupGroupUser({group_id: group_id}).then((res) => {
          if (res.code === 1) {
            this.$toast({
              message: res.msg,
              onClose: () => {
                this.huabanList = []
                this.finished = false
                this.loading = false
                this.getGroupIndex()
              }
            })
          } else {
            this.$toast(res.msg)
          }
        })
      } else if (is_join === 1) {
        this.$api.groupGroupUserDel({group_id: group_id}).then((res) => {
          if (res.code === 1) {
            this.$toast({
              message: res.msg,
              onClose: () => {
                this.huabanList = []
                this.finished = false
                this.loading = false
                this.getGroupIndex()
              }
            })
          } else {
            this.$toast(res.msg)
          }
        })
      }
    },
    getGroupIndex () {
      this.$api.groupIndex({id: this.id}).then((result) => {
        console.log(result, 'tz')
        if (result.code === 1) {
          this.tzDetail = result.data
          var link = config.baseurl + '/huabangroupdetail?id=' + this.id
          // WxSing.init(result.data.group_name,result.data.description,link,result.data.image[0])
        }
      })
    },
    getTzLists () {
      const param = {
        page: this.current,
        pageSize: 10,
        group_id: this.id
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.postsLists(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false
          console.log(res, 'list')
          if (this.huabantzlist.length == 0) {
            // 第一次加载
            var list = res.data.data
            list.map((item) => {
              item.image = item.images ? item.images[0] : ''
              item.nickname = item.user ? item.user.nickname : ''
              item.avatar = item.user ? item.user.avatar : ''
            })

            this.huabantzlist = list || []
            this.total = res.data.total
          } else if (this.huabantzlist.length < this.total) {
            // 加载更多
            var list = res.data.data
            list.map((item) => {
              item.image = item.images ? item.images[0] : ''
              item.nickname = item.user ? item.user.nickname : ''
              item.avatar = item.user ? item.user.avatar : ''
            })
            this.huabantzlist = this.huabantzlist.concat(list)
          }
          if (this.huabantzlist.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.huabantzlist.length < this.total) {
        this.current++
        this.getTzLists()
      }
    }
  },
  mounted () {
    console.log(this.$route.query.id)
    this.id = this.$route.query.id
    this.getGroupIndex()
    this.getTzLists()
  },
  beforeRouteEnter (to, from, next) {
    console.log('log start')
    console.log(to, from, next)
    next()
  },
  components: {
    TitleItem,
    HuabantzItem
  }
}
</script>

<style lang="scss" scoped>
.huabangd{
  display: flex;
  flex-direction: column;
  background:#FBF8F4;
  width:100%;
  min-height: 100vh;
  &-top{
    width:100%;
    height:297px;
    background:url('../assets/images/groupbackgorund.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    &-detail{
      padding:26px;
      display: flex;
      flex-direction: column;
      .detail-top{
        display: flex;
        flex-direction: row;
        color:white;
        align-items: flex-start;
        margin-bottom: 15px;
        &-img{
          width:117px;
          height:117px;
          border-radius: 8px;
          margin-right:26px;
          overflow: hidden;
          .van-image{
            width:100%;
            height:100%;
          }
        }
        &-center{
          display: flex;
          flex-direction: column;
          width:444px;
          margin-right:26px;
          .detail-title{
            font-size:32px;
            line-height: 36px;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .detail-avatar{
            display: flex;
            flex-direction: row;
            margin-top:17px;
            img{
              width:35px;
              height:29px;
              margin-right:17px;
            }
            span{
              font-size: 26px;
              line-height: 36px;
              color:#F3D995;
            }
          }
        }
        &-imgmore{
          width:85px;
          height:85px;
        }
      }
      .detail-bottom{
        font-size:26px;
        font-weight:500;
        line-height:36px;
        color:white;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3

      }
    }
  }
  &-tzdl{
    padding-bottom: 126px;
    display: flex;
    flex-direction: column;
    &-wrap{
     width:calc(100% - 52px);
     margin:0 auto;
     display: flex;
     flex-direction: column;
     background:white;
     border-radius: 8px;
     padding:20px 20px 80px 20px;
     position: relative;
     .tzdl-btn{
       position: absolute;
       bottom: -20px;
       height: 88px;
       width: 268px;
       left: 50%;
       transform: translateX(-50%);
       background: #6F8263;
       color:#F3D995;
       font-size: 36px;
       border-radius:44px;
       display: flex;
       justify-content: center;
       align-items: center;
       flex-direction: row;
       .jiahaoico{
         width:35px;
         height:35px;
         margin-right:9px;
       }
     }
    }
  }
}
</style>
