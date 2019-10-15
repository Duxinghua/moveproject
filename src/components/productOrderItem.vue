<template>
  <div class="item">
    <router-link class="item-body" :to="'/productpaydetail?id='+avitem.order_id">
    <div class="item-head">
      <div class="item-head-title">{{avitem.create_time}}</div>
      <div class="item-head-status">{{statusName[avitem.status]}}</div>
    </div>
    <div class="item-content">
      <div class="item-content-img"><img :src="avitem.goods_image" /></div>
      <div class="item-content-info">
        <div class="item-content-info-title">{{avitem.goods_name}}</div>
        <div class="item-content-info-con">{{avitem.description}}</div>
      </div>
    </div>
    <div class="item-bottom">
      <div class="item-bottom-count">数量：{{avitem.count}}</div>
      <div class="item-bottom-money">支付金额：<span>￥{{avitem.price_pay}}</span></div>
    </div>
    </router-link>
    <div class="item-btn">
      <div @click="clickOrder" class="item-btn-close" v-if="avitem.status === 0">关闭订单</div>
      <div @click="keepPay" class="item-btn-repay" v-if="avitem.status === 0">立即支付</div>
      <div @click="receives" class="item-btn-delivery" v-if="avitem.status === 2">确认收货</div>
    </div>
  </div>
</template>

<script>
import {mallOrderKeepPay, mallCloseOrder, receiveOrder} from '@/api'
import getSitem from '@/utils/storage'
import config from '@/utils/config'
import Bus from '@/utils/bus'
export default {
  methods: {
    receives () {
      this.receiveOrderApi()
    },
    clickOrder () {
      this.mallCloseOrderApi()
    },
    keepPay () {
      this.mallOrderKeepPayApi()
      this.$emit('listrefresh')
    },
    onBridgeReady () {
      WeixinJSBridge.invoke(
        // 'getBrandWCPayRequest', {
        //   'appId': data.appId, // 公众号名称，由商户传入
        //   'timeStamp': data.timeStamp, // 时间戳，自1970年以来的秒数
        //   'nonceStr': data.nonceStr, // 随机串
        //   'package': data.package,
        //   'signType': data.signType, // 微信签名方式：
        //   'paySign': data.paySign // 微信签名
        // },
        'getBrandWCPayRequest', this.wxpay,
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            // this.$router.push({path: '/productorderlist'})

            Bus.$emit('refreshs')

          } else {
            Bus.$emit('refreshs')
          }
        })
    },
    async receiveOrderApi () {
      const data = {
        order_id: this.avitem.order_id,
        token: getSitem.getStr('token')
      }
      const result = await receiveOrder(data)
      if (result.code === 1) {
        this.$toast({message: result.msg, duration: 2000})
        this.$emit('listrefresh')
      }
    },
    async mallCloseOrderApi () {
      const data = {
        order_id: this.avitem.order_id,
        token: getSitem.getStr('token')
      }
      const result = await mallCloseOrder(data)
      if (result.code === 1) {
        this.$toast({message: result.msg, duration: 2000})
        this.$emit('listrefresh')
      }
    },
    async mallOrderKeepPayApi () {
      const data = {
        order_id: this.avitem.order_id,
        token: getSitem.getStr('token')
      }
      this.$toast.loading({
        mask: true,
        duration: 0,
        message: '加载中...'
      })
      const result = await mallOrderKeepPay(data)
      if (result.code === 1) {
        var p = new Promise((resolve, reject) => {
          this.wxpay = result.data.wxpay
          setTimeout(() => {
            console.log(1)
            resolve()
          }, 2000)
        })

        p.then(() => {
          this.$toast.clear()
          if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
            } else if (document.attachEvent) {
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
            }
          } else {
            this.onBridgeReady()
          }
        })
      } else {
        this.$toast.clear()
        this.$toast({message: result.msg, duration: 2000})
      }
    }
  },
  data () {
    return {
      statusName: {
        0: '待付款',
        1: '待发货',
        2: '待收货',
        99: '已关闭'
      },
      wxpay: {},
      keepflush: false
    }
  },
  props: {
    avitem: {
      type: Object,
      required: true
    }
  },
  computed: {

  },
  watch: {
    keepflush (n, o) {
      if (n === true) {
        this.$emit('listrefresh')
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.item{
  background: #fff;
  padding: 0 20px 20px 20px;
  margin-bottom: 30px;
  &-head{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    line-height:68px;
    font-size:30px;
    &-title{
      color: #000000;
    }
    &-status{
      color: #8C3B92;
    }
  }
  &-content{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    &-img{
      width: 194px;
      height: 150px;
      img{
        display: block;
        width: 194px;
        height: 150px;
      }
    }
    &-info{
      width: 450px;
      margin-left: 20px;
      line-height: 36px;
      &-title{
        font-size: 28px;
        color: #333;
      }
      &-con{
        margin-top: 10px;
        font-size: 24px;
        color: #999;
      }
    }
  }
  &-bottom{
    margin-top: 20px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    &-count{
      font-size: 24px;
      color: #333;
    }
    &-money{
      font-size: 28px;
      color: #333;
      span{
        font-size: 32px;
        color: #8C3B92;
      }
    }
  }
  &-btn{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    font-size: 32px;
    text-align: center;
    margin-top: 20px;
    &-close{
      width:187px;
      height:68px;
      line-height:68px;
      border-radius:6px;
      color: #a043a7;
      background: #eee3fd;
      margin-right: 20px;
    }
    &-repay{
      width:187px;
      height:68px;
      line-height:68px;
      border-radius:6px;
      color: #fff;
      background: #9C3FA2;
    }
    &-delivery{
      width:187px;
      height:68px;
      line-height:68px;
      border-radius:6px;
      color: #fff;
      background: #9C3FA2;
    }
  }
}
</style>
