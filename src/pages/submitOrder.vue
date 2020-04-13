<template>
    <div class="submit-order">
        <div class="order-site" @click="onLinkAddress">
            <div class="site-top"></div>
            <div class="order-not" v-if="!addressData.id">
                <div class="left">
                    <img src="../assets/images/site1.png" alt="">
                    <span>选择收货地址</span>
                </div>
                <van-icon name="arrow" />
            </div>
            <div class="site-data" v-if="addressData.id">
                <img src="../assets/images/site.png" alt="">
                <div class="site-info">
                    <div class="name">收货人：{{addressData.user_name}}<span>{{addressData.mobile}}</span></div>
                    <div class="location">{{addressData.address_name.replace(/[/]/g," ")}}&nbsp;&nbsp;{{addressData.address}}</div>
                </div>
                <van-icon name="arrow" />
            </div>
        </div>

        <div class="order-details">
            <div class="order-info" v-for="(item, index) in orderData.goods" :key="index">
                <div class="img">
                    <img :src="item.images" alt="">
                </div>
                <div class="info">
                    <div class="title">{{item.goods_name}}</div>
                    <div class="money" v-if="orderType != 1">￥<span>{{item.price}}</span> <em>{{item.specs}}</em></div>
                    <div class="money" v-if="orderType == 1">￥<span>{{orderData.goodsTuan && orderData.goodsTuan.goods_price}}</span> <em>{{item.specs}}</em></div>
                    <div class="num"><van-stepper disabled disable-input v-model="item.goods_num"/></div>
                </div>
            </div>
            <div class="order-item">
                <div class="left">商品合计</div>
                <div class="right">￥{{goodsTotal}}</div>
            </div>
             <div class="order-item">
                <div class="left">运费</div>
                <div class="right">￥{{orderData.express_price || '0.00'}}</div>
            </div>
             <div class="order-item">
                <div class="left">优惠活动</div>
                <div class="right">原价￥{{ priceCost }}</div>
            </div>
            <div class="order-item" @click="toggle" v-if="orderType != 1">
                <div class="left">您有<span>{{ orderData.scoreDeduction.data ? orderData.scoreDeduction.data.score : 0}}</span>花币，可用<span>{{orderData.scoreDeduction.data ? orderData.scoreDeduction.data.use_score : 0}}</span>花币抵扣<span>{{orderData.scoreDeduction.data ? orderData.scoreDeduction.data.money: 0}}</span>元</div>
                <van-checkbox  v-model="checked" ref="checkboxes" checked-color="#718063"></van-checkbox>
            </div>
        </div>

        <div class="buy-box">
            <div class="money">需支付<span>￥{{goodsTotal}}</span></div>
            <div class="submit" @click="onBuy">立即购买</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import config from '@/utils/config'

export default {
  data () {
    return {
      num: 1,
      radio: '2',
      checked: false,
      orderData: {
        scoreDeduction: {
          data: {}
        }
      },
      goodsTotal: 0,
      orderMoney: 0,
      orderType: 0,
      wx: null,
      wxConfig: {},
      priceCost: 0,
      specs: {},
      goods_id: null,
      deduction: '',
      oldGoodsTotal: 0,
      score: 0,
      payScore: false
    }
  },
  watch: {
    orderData: {
      deep: true,
      handler (data) {
        let goodsTotal = 0
        let priceCost = 0
        if (data.goods && data.goods.length > 0) {
          if (this.orderType == 1) {
            this.goodsTotal = this.orderData.goodsTuan ? this.orderData.goodsTuan.goods_price : '0.00'
            return
          }
          data.goods.forEach((item) => {
            goodsTotal += item.goods_num * item.price
          })
          data.goods.forEach((item) => {
            priceCost += item.goods_num * item.price_cost
          })
        }
        this.goodsTotal = goodsTotal.toFixed(2)
        this.oldGoodsTotal = goodsTotal.toFixed(2)
        this.priceCost = priceCost.toFixed(2)
      }
    }
  },
  computed: {
    ...mapState('shop', ['addressData'])
  },
  created () {
    const config = {
      url: location.href.split('#')[0]
    }
    // 请求api返回sdk配置参数
    this.$api.userGetSignPackage(config).then(res => {
      if (res.code === 1) {
        var wxConfig = res.data
        this.wxConfig = wxConfig
        wx.config({
          appId: wxConfig.appId, // 必填，公众号的唯一标识
          timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
          nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
          signature: wxConfig.signature, // 必填，签名
          jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
        })
      }

      wx.ready(() => {
        this.wx = wx
      })
    })
  },
  mounted () {
    const {goods_id, specs, type} = this.$route.query
    this.orderType = type
    this.goods_id = goods_id
    this.specs = specs
    console.log(this.specs, this.goods_id)
    this.getAddressList()
    this.goodsOrderCreate()
  },
  methods: {
    ...mapMutations('shop', ['saveAddressData']),
    goodsOrderCreate () {
      const param = this.$route.query
      this.$toast.loading({
        duration: 0,
        forbidClick: true
      })
      this.$api.goodsOrderCreate(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.orderData = res.data
          this.deduction = res.data.scoreDeduction.data.money
          this.score = res.data.scoreDeduction.score
        } else {
          this.$toast(res.msg)
        }
      })
    },
    accSub (arg1, arg2) {
      if (isNaN(arg1)) {
        arg1 = 0
      }
      if (isNaN(arg2)) {
        arg2 = 0
      }
      arg1 = Number(arg1)
      arg2 = Number(arg2)

      var r1, r2, m, n
      try {
        r1 = arg1.toString().split('.')[1].length
      } catch (e) {
        r1 = 0
      }
      try {
        r2 = arg2.toString().split('.')[1].length
      } catch (e) {
        r2 = 0
      }
      m = Math.pow(10, Math.max(r1, r2)) // last modify by deeka //动态控制精度长度
      n = (r1 >= r2) ? r1 : r2
      return ((arg1 * m - arg2 * m) / m).toFixed(n)
    },
    goodsOrderStore () {
      var that = this
      // 微信支付
      let param = {}
      if (this.orderType == 0) {
        // 购物车购买
        let cart_id = []
        this.orderData.goods.forEach((item) => {
          cart_id.push(item.cart_id)
        })
        param = {
          cart_id: cart_id.join(','),
          type: this.orderType,
          address_id: this.addressData.id
        }
        if (this.payScore) {
          param.payscore = 1
        } else {
          param.payscore = 0
        }
      } else if (this.orderType == 1) {
        // 拼团购买
        param = {
          t_id: this.orderData.t_id,
          type: this.orderType,
          address_id: this.addressData.id,
          goods_id: this.goods_id,
          specs: this.specs
        }
      } else {
        // 单个商品购买
        param = {
          goods_id: this.orderData.goods[0].goods_id,
          specs: JSON.stringify(this.orderData.specs),
          goods_num: this.orderData.goods[0].goods_num,
          address_id: this.addressData.id,
          type: this.orderType
        }
        if (this.payScore) {
          param.payscore = 1
        } else {
          param.payscore = 0
        }
      }
      this.$api.goodsOrderStore(param).then((res) => {
        if (res.code == 1) {
          if (res.data.pay_type != 3) {
            const pay_data = res.data.pay_data
            this.wxPay(pay_data, res.data.order_id)
          } else {
            this.$toast({
              message: res.msg,
              onClose: () => {
                that.$router.push({
                  path: '/orderlist'
                })
              }
            })
          }
        } else {
          this.$toast(res.msg)
        }
      })
    },
    onLinkAddress () {
      this.$router.push({
        path: '/addressList',
        query: {
          type: 'select'
        }
      })
    },
    onBuy () {
      if (!this.addressData.mobile) {
        this.$toast('请填写收货地址')
        return false
      }
      this.goodsOrderStore()
    },
    toggle () {
      this.$refs.checkboxes.toggle()
      // 使用花币
      if (!this.checked) {
        this.payScore = true
        var lenr1 = this.deduction.toString().indexOf('.') > -1 ? this.deduction.toString().split('.')[1].length : 0
        var lenr2 = this.goodsTotal.toString().indexOf('.') > -1 ? this.goodsTotal.toString().split('.')[1].length : 0
        var l = lenr1 > lenr2 ? lenr1 : lenr2
        if (this.deduction * Math.pow(10, l) > this.goodsTotal * Math.pow(10, l)) {
          this.goodsTotal = 0
        } else {
          this.goodsTotal = this.accSub(this.goodsTotal, this.deduction)
        }
      } else {
        this.payScore = false
        this.goodsTotal = this.oldGoodsTotal
      }
    },
    getAddressList () {
      const param = {
        page: 1,
        pageSize: 100
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.addressList(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          if (res.data.data.length > 0) {
            if (!this.addressData.id) {
              this.saveAddressData(res.data.data[0])
            }
          }
        }
      })
    },
    wxPay (wxmsg, order_id) {
      const _this = this
      // _this.tuanInfo(order_id)
      this.wx.chooseWXPay({
        appId: wxmsg.appId,
        timestamp: wxmsg.timeStamp,
        nonceStr: wxmsg.nonceStr, // 支付签名随机串，不长于 32 位
        package: wxmsg.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: wxmsg.paySign, // 支付签名
        success: function (res) {
          // 支付成功的回调函数
          if (_this.orderType == 1) {
            _this.tuanInfo(order_id)
          } else {
            _this.$router.push({
              path: '/orderlist'
            })
          }
        },
        cancel: function (res) {
          // 支付取消的回调函数
          _this.$router.push({
            path: '/orderlist'
          })
        },
        error: function (res) {
          // 支付失败的回调函数
          _this.$router.push({
            path: '/orderlist'
          })
        }
      })
    },
    tuanInfo (order_id) {
      this.$api.tuanInfo({order_id}).then((res) => {
        if (res.code == 1) {
          this.$router.push({
            path: '/groupDetails',
            query: {
              id: res.data.t_id,
              tuanStatus: res.data.success
            }
          })
        }
      })
    }
  }

}
</script>

<style lang='scss' scoped>
.submit-order{
    width: 100%;
    min-height: 100vh;
    padding: 25px;
    padding-bottom: 95px;
    background: #FBF8F5;
    .order-site{
        background: #fff;
        .site-top{
            width: 100%;
            height: 10px;
            background: url('../assets/images/site-bg.png') 100%/100% no-repeat;
        }
        .order-not{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 35px;
            .left{
                display: flex;
                justify-content: space-between;
                align-items: center;
                img{
                    width: 90px;
                    height: 90px;
                }
                span{
                    font-size: 30px;
                    color: #333333;
                    margin-left: 20px;
                }
            }
            i{
                font-size: 30px;
                color: #888888;
            }
        }
        .site-data{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 40px 30px 50px 30px;
            img{
                width: 30px;
                height: 40px;
                margin-bottom: 30px;
            }
            .site-info{
                flex: 1;
                margin-left: 30px;
                .name{
                    color: #333333;
                    font-size: 28px;
                    font-weight: 500;
                    span{
                        margin-left: 40px;
                    }
                }
                .location{
                    color: #333333;
                    font-size: 24px;
                }
            }
            i{
                font-size: 30px;
                color: #888888;
            }
        }
    }
    .order-details{
        padding: 25px 30px;
        background: #fff;
        margin-top: 20px;
        .order-info{
            display: flex;
            margin-bottom: 30px;
            .img{
                width: 200px;
                height: 150px;
                border-radius: 5px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                height: 100%;
                margin-left: 30px;
                .title{
                    width: 400px;
                    color: #333333;
                    font-size: 32px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;

                }
                .money{
                    color: #995258;
                    font-size: 24px;
                    margin-bottom: 10px;
                    margin-top: 5px;
                    span{
                        font-size: 30px;
                    }
                    em{
                        font-style: normal;
                        color: #333;
                        margin-left: 10px;
                    }
                }
                .num{
                    /deep/ .van-stepper{
                        .van-stepper__minus, .van-stepper__plus{
                            width: 40px;
                            height: 40px;
                            background: #FBF8EF;
                            border-radius: 5px;
                            &::before{
                                width: 10Px;
                                height: 1Px;
                            }
                            &::after{
                                width: 1Px;
                                height: 10Px;
                            }
                        }
                        input{
                            width: 75px;
                            margin: 0px;
                            height: 100%;
                            background: #fff;
                            font-size: 24px;
                        }
                        input[disabled]{
                            color: #333333;
                            -webkit-text-fill-color:#333333;
                            -webkit-opacity: 1;
                        }
                    }
                }
            }
        }
        .order-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #333333;
            font-size: 26px;
            padding: 25px 0px;
            border-top: 1Px solid #F6F6F6;
            .left{
                span{
                    color: #995258;
                }
            }
            /deep/ .van-checkbox{
                .van-checkbox__icon{
                    height: auto;
                    line-height: normal;
                    i{
                        width: 30px;
                        height: 30px;
                        font-size: 28px;
                    }
                }

            }
        }

    }
    .buy-box{
        position: fixed;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 95px;
        background: #fff;
        box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 25px;
        .money{
            color: #333333;
            font-size: 30px;
            span{
                color: #995258;
                font-size: 36px;
            }
        }
        .submit{
            width: 280px;
            height: 80px;
            background: #738266;
            text-align: center;
            line-height: 80px;
            color: #F3D995;
            font-size: 36px;
            border-radius: 50px;
        }
    }
}
</style>
