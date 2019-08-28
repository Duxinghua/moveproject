<template>
  <div class="payprorder">
    <div class="addressItem">
      <img src="../assets/images/addresstop.png" />
      <div class="addresscontent">
        <img class="a1" src="../assets/images/addressposition.png" />
        <div class="addressinfo">
          <p><span class="addresspan">收货人：{{buyview.address.username}}</span><span>{{buyview.address.mobile}}</span></p>
          <p class="">{{buyview.address.province_name}}{{buyview.address.city_name}}{{buyview.address.area_name}}{{buyview.address.address}}</p>
        </div>
        <img class="a2" src="../assets/images/addressnext.png" />
      </div>
    </div>
    <div class="productorder">
      <div class="productoinfo">
        <img  :src="buyview.goods_image" />
        <div class="productodes">
            <p>{{buyview.goods_name}}</p>
            <p>¥{{buyview.price}}</p>
            <p class="productpc"><span class="orderbutton" @click="sub">-</span><span class="ordernum">{{buyview.num}}</span><span class="orderbutton jiaohao" @click="add">+</span></p>
        </div>
      </div>
      <div class="productosum">
        <span>商品总价</span>
        <span>¥{{orderMoney}}</span>
      </div>
      <div class="productosum">
        <span>运费</span>
        <span>¥{{buyview.send_fee}}</span>
      </div>
      <!-- <div class="productosum">
        <span>优惠活动</span>
        <span>¥{{buyview.favour}}</span>
      </div> -->
    </div>
    <Paytab :price="orderMoney" @pay="handlepay" />
    <!-- <Pagetab /> -->
  </div>
</template>

<script>
import Pagetab from '../components/pagetab.vue'
import Paytab from '../components/paybutton.vue'
import { mallOrderBuyView, mallOrderBuy } from '@/api'
import getSitem from '@/utils/storage'
const BigNumber = require('bignumber.js')
export default {
  data () {
    return {
      goods_id: null,
      address_id: null,
      wxpay: {},
      buyview: {
        address: {
          username: null
        }
      }
    }
  },
  components: {
    Pagetab,
    Paytab
  },
  computed: {
    orderMoney () {
      var price = new BigNumber(this.buyview.price)
      return price.multipliedBy(this.buyview.num).toFixed()
    }

  },
  mounted () {
    this.goods_id = this.$route.query.goods_id
    this.mallOrderBuyViewApi()
    var a = new BigNumber(123.4567)
    var c = a.multipliedBy(2)
    console.log(c.toFixed())
  },
  methods: {
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
          console.log(res)
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          }
        })
    },
    async mallOrderBuyApi () {
      const data = {
        goods_id: this.goods_id,
        address_id: this.goods_id,
        num: this.buyview.num,
        token: getSitem.getStr('token')
      }
      const result = await mallOrderBuy(data)
      if (result.code === 1) {
        console.log(result)
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady)
          }
        } else {
          this.wxpay = result.data.wxpay
          this.onBridgeReady()
        }
      } else {
        this.$toast({message: result.msg, duration: 2000})
      }
    },
    async mallOrderBuyViewApi () {
      const data = {
        goods_id: this.$route.query.goods_id,
        token: getSitem.getStr('token')
      }
      const result = await mallOrderBuyView(data)
      if (result.code === 1) {
        this.buyview = result.data
        this.address_id = result.data.address.address_id
        console.log(this.buyview, 'buyview')
      }
    },
    handlepay (e) {
      this.mallOrderBuyApi()
    },
    add () {
      this.buyview.num++
    },
    sub () {
      if (this.orderNum === 1) {
        this.buyview.num = 1
      } else {
        this.buyview.num--
      }
    }
  }
}
</script>

<style>

</style>
