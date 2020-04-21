<template>
  <div class="orderList">
    <div class="orderList-tab">
      <div class="orderList-tab-item" v-for="(item,index) in tabList" :key="index" @click="tabClickHandler(index,item.status)">
         <span :class="{active: currentIndex === index ? true : false}">{{item.name}}</span>
      </div>
    </div>
    <div class="orderList-content">
      <van-list
            v-model="loading"
            v-show="orderList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
      <div class="orderList-content-item" v-for="(item,index) in orderList" :key="index">
        <div class="ordertop">
          <span>订单编号：{{item.order_code}}</span>
          <span v-if="item.status != 4 && item.t_id == 0">{{item.status_text}}</span>
          <span v-if="item.status == 4" class="sharetext">待分享，差{{item.need}}人</span>
          <span  v-if="item.t_id !== 0 && item.status !== 4">拼团{{goodsTuanText[item.t_status]}}</span>

        </div>
        <div class="orderclist" @click="orderDetailHandler(item)">
          <div class="ordercontent" v-for="(goodsitem,index) in item.goods" :key="goodsitem.goods_id">
            <div class="ordercontentimg">
              <van-image :src="goodsitem.images">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
            <div class="ordercenter">
              <div class="ol">
                <span class="s1">{{goodsitem.goods_name}}</span>
                <span class="s1 s2">{{goodsitem.specs}}</span>
                <div><span class="s3">¥</span><span class="s4">{{goodsitem.price}}</span></div>
              </div>
              <span class="s5">x {{goodsitem.goods_num}}</span>
            </div>
          </div>
        </div>
        <div class="orderfooter">
          <span>合计: ¥{{item.price_pay}}</span>
          <div class="btns">
            <span class="cancel" v-if="item.status === 0" @click="cancelClickHandler(item.order_id)">取消订单</span>
            <span class="share" v-if="item.status === 0" @click="replayClickHandler(item.order_id)">去付款</span>
            <span class="share" v-if="item.status === 1" @click="sendClickHandler(item.order_id)">提醒发货</span>
            <span class="share" v-if="item.is_aftersale == 1 || item.is_aftersale == 2" @click="afterClickHandler(item)">售后</span>
            <span class="share" v-if="item.status === 2" @click="confirmClickHandler(item.order_id)">确认收货</span>
            <span  class="share" v-if="item.status === 3 && item.is_comment === 0 " @click="commentClickHandler(item.order_id)">评论</span>
            <span class="share" v-if="item.status === 4" @click="shareClickHandler(item.t_id)">邀请拼团</span>
          </div>
        </div>
      </div>
      </van-list>
      <NoData v-if="orderList.length === 0" />
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata.vue'
export default {
  name: 'OrderList',
  components: {
    NoData
  },
  data () {
    return {
      currentIndex: 0,
      tabList: [
        {name: '全部', status: ''},
        {name: '待付款', status: 0},
        {name: '待分享', status: 4},
        {name: '待发货', status: 1},
        {name: '待收货', status: 2},
        {name: '评价', status: 3}
      ],
      goodsTuanText: [
        '进行中',
        '成功',
        '解散'
      ],
      orderList: [],
      finished: false,
      loading: false,
      status: '',
      current: 1,
      total: 0,
      wxpay: {}
    }
  },
  methods: {
    onBridgeReady () {
      var _this = this
      WeixinJSBridge.invoke(
        // 'getBrandWCPayRequest', {
        //   'appId': data.appId, // 公众号名称，由商户传入
        //   'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
        //   'nonceStr': data.nonceStr, // 随机串
        //   'package': data.package,
        //   'signType': data.signType, // 微信签名方式：
        //   'paySign': data.paySign // 微信签名
        // },
        'getBrandWCPayRequest', _this.wxpay,
        function (res) {
          console.log(res)
          if (new String(res.err_msg).trim() === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            // window.location.href = config.baseurl + '/tickOrderList'
            // alert(1)
          } else {
            // window.location.href = config.baseurl + '/tickOrderList'
            // alert(2)
          }
        })
    },
    confirmClickHandler (order_id) {
      var _this = this
      this.$api.goodsOrderReceiveGoods({order_id: order_id}).then((res) => {
        if (res.code == 1) {
          _this.$toast({
            message: res.msg,
            onClose: () => {
              _this.orderList = []
              _this.finished = false
              _this.loading = false
              _this.current = 1
              _this.getOrderList()
            }
          })
        } else {
          _this.$toast(res.msg)
        }
      })
    },
    sendClickHandler (order_id) {
      var _this = this
      this.$api.goodsOrderHastenOrder({order_id: order_id}).then((res) => {
        if (res.code === 1) {
          _this.$toast({
            message: res.msg,
            onClose: () => {
              _this.orderList = []
              _this.finished = false
              _this.loading = false
              _this.current = 1
              _this.getOrderList()
            }
          })
        } else {
          _this.$toast(res.msg)
        }
      })
    },
    commentClickHandler (order_id) {
      this.$router.push({name: 'OrderComment', query: {id: order_id}})
    },
    afterClickHandler (item) {
      this.$router.push({name: 'afterOrder', query: {id: item.order_id, is_aftersale: item.is_aftersale}})
    },
    replayClickHandler (order_id) {
      var _this = this
      this.$api.goodsOrderPayOrder({order_id: order_id}).then((res) => {
        if (res.code === 1) {
          //  _this.$toast({
          //    message: res.msg,
          //    onClose: () => {
          //      _this.orderList = []
          //      _this.finished = false
          //      _this.loading = false
          //      _this.current = 1
          //      _this.getOrderList()
          //    }
          //  })
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady)
            }
          } else {
            _this.wxpay = res.data.pay_data
            _this.onBridgeReady()
          }
        } else {
          _this.$toast(res.msg)
        }
      })
    },
    cancelClickHandler (order_id) {
      var _this = this
      this.$api.goodsOrderDel({order_id: order_id}).then((res) => {
        if (res.code === 1) {
          _this.$toast({
            message: res.msg,
            onClose: () => {
              _this.orderList = []
              _this.finished = false
              _this.loading = false
              _this.current = 1
              _this.getOrderList()
            }
          })
        } else {
          _this.$toast(res.msg)
        }
      })
    },
    tabClickHandler (index, status) {
      this.currentIndex = index
      this.status = status
      this.orderList = []
      this.current = 1
      this.finished = false
      this.loading = false
      this.getOrderList()
    },
    orderDetailHandler (obj) {
      if (obj.express.length < 4) {
        this.$router.push({name: 'OrderDetail', query: {id: obj.order_id, t_status: obj.t_status}})
      } else {
        this.$router.push({
          name: 'OrderDetail',
          query: {
            id: obj.order_id,
            express: obj.express,
            t_status: obj.t_status
          }
        })
      }
    },
    shareClickHandler (t_id, tuanStatus) {
      this.$router.push({
        path: '/groupDetails',
        query: {
          id: t_id,
          tuanStatus: tuanStatus
        }
      })
    },
    getOrderList () {
      const param = {
        page: this.current,
        pageSize: 10,
        status: this.status
      }
      if (this.status === 3) {
        param.is_comment = 0
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.goodsOrderLists(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.orderList.length == 0) {
            // 第一次加载
            this.orderList = res.data.data || []
            this.total = res.data.total
          } else if (this.orderList.length < this.total) {
            // 加载更多
            this.orderList = this.orderList.concat(res.data.data)
          }
          if (this.orderList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.orderList.length < this.total) {
        this.current++
        this.getOrderList()
      }
    }

  },
  mounted () {
    this.getOrderList()
  }
}
</script>

<style lang="scss" scoped>
.orderList{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FBF8F4;
  &-tab{
    height: 98px;
    display:flex;
    flex-direction: row;
    width:100%;
    background:white;
    align-items: center;
    position: fixed;
    z-index: 100;
    &-item{
      width:16.67%;
      font-size: 32px;
      color:#999999;
      text-align: center;
      position: relative;
      .active{
        font-size:36px;
        color:#6D8160;
      }
      .active::before{
        position: absolute;
        content: '';
        width:45px;
        height:4px;
        left:50%;
        background:#6D8160;
        transform: translateX(-50%);
        bottom: -25px;
      }
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    margin-top: 98px;
    &-item{
      background:white;
      margin-top:20px;
      padding:26px;
      font-size: 30px;
      color:#333;
      display: flex;
      flex-direction: column;
      .ordertop{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .sharetext{
          color:rgba(205, 168, 113, 1)
        }
      }
      .orderclist{
        width:100%;
        display: flex;
        flex-direction: column;
        .ordercontent{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding:30px 0px;
          width:100%;
          border-bottom:1px solid #F3F3F3;
          .ordercontentimg{
            width:156px;
            height:130px;
            border-radius: 8px;
            margin-right:15px;
            overflow: hidden;
            .van-image{
              width:100%;
              height:100%;
            }
          }
          .ordercenter{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: calc(100% - 171px);
            .ol{
              display: flex;
              flex-direction: column;
              width:400px;
              .s1{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .s2{
                font-size: 26px;
                color:#999999;
                margin-top:10px;
              }
              .s3{
                color:#995258;
                font-size: 24px;
              }
              .s4{
                color:#995258;
                font-size: 34px;
              }
            }
          }
          .s5{
            font-size: 28px;
            color:#333;
          }
        }
      }
      .orderfooter{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-top:15px;
        height:62px;
        align-items: center;
        .btns{
          display: flex;
          flex-direction: row;
          span{
            width:168px;
            height:62px;
            line-height:62px;
            text-align: center;
            border:2px solid rgba(205, 168, 113, 1);
            border-radius:31px;
            margin-right:16px;
            margin-left:16px;
          }
          .cancel{
            color:#666666;
            border:2px solid #E3E3E3;
          }
          .share{
            color:rgba(205, 168, 113, 1)
          }
        }
      }
    }
  }
}
</style>
