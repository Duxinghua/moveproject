<template>
  <div class="activitydetail" v-if="ticketDetail">
    <div class="activityheader">
      <div class="accontenty">
        <p>{{ticketDetail.goods_name}}</p>
        <p class="syyouxi">使用有效期</p>
        <p class="tdshp"><span class="addressdeta1">{{ticketDetail.end_time}}</span> <span class="pricetick">¥{{ticketDetail.price}}</span></p>
        <p class="goumai">
          <span class="goumaisl">购买数量</span>
        <span @click="minusnum()" class="minus"><i class="row"></i></span>
          <span class="shownum">{{number}}</span>
        <span  @click="addnum()" class="plus" ><i class="row"></i><i class="col"></i></span>
        </p>
      </div>
    </div>
    <div class="activityheader">
      <div class="accontenty">
        <p>游客信息 <span class="tip">需填<i>1</i>位，用于入园身份证</span> </p>
        <p class="info">
          <label for="cstname">姓名</label>
          <input v-model="true_name" id="cstname" type="text" placeholder="必填，输入证件上的姓名">
        </p>
        <p class="info"  v-if="ticketDetail.identity === 2">
          <label for="csttype">证件号</label>
          <input v-model="idcard" id="csttype" type="text" placeholder="必填，输入联系人证件号">
        </p>
        <p class="info">
          <label for="csttel">手机号</label>
          <input v-model="mobile" maxlength="11" id="csttel" type="text" placeholder="必填，输入联系人手机号">
        </p>
      </div>
    </div>
    <Paybutton :price="orderMoney" @pay="handlepay"/>
  </div>
</template>

<script>
import {ticketPaylApi, mallticketOrderBuy} from '@/api'
import getSitem from '@/utils/storage'
import config from '@/utils/config'
import Paybutton from '../components/paybutton.vue'
const BigNumber = require('bignumber.js')
export default {
  data () {
    return {
      goods_id: null,
      ticketDetail: null,
      number: 1,
      price: 0,
      total: 0,
      mobile: '',
      true_name: '',
      idcard: '',
      identity: null,
      wxpay: {}
    }
  },
  components: {
    Paybutton
  },
  mounted () {
    this.getTicketDetail()
  },
  computed: {
    orderMoney () {
      var price = new BigNumber(this.price)
      return price.multipliedBy(this.number).toFixed()
    }
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
          if (new String(res.err_msg).trim() === 'get_brand_wcpay_request:ok') {
            // 使用以上方式判断前端返回,微信团队郑重提示：
            // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
            window.location.href = config.baseurl + '/tickOrderList'
          } else {
            window.location.href = config.baseurl + '/tickOrderList'
          }
        })
    },
    async getTicketDetail () {
      let formdata = {goods_id: this.$route.query.id}
      let token = getSitem.getStr('token')
      formdata.token = token
      const data = await ticketPaylApi(formdata)
      if (data.code === 1) {
        console.log(data.data.identity)
        this.ticketDetail = data.data
        this.price = data.data.price
        this.goods_id = data.data.goods_id
        this.identity = data.data.identity
      }
    },
    async mallOrderBuyApi () {
      const data = {
        goods_id: this.goods_id,
        num: this.number,
        token: getSitem.getStr('token'),
        mobile: this.mobile,
        true_name: this.true_name,
        idcard: this.idcard
      }
      if (!this.checkName(this.true_name)) { return }
      if (this.identity === 2) {
        if (!this.checkCard(this.idcard)) { return }
      }
      if (!this.checkTel(this.mobile)) { return }
      const result = await mallticketOrderBuy(data)
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
          this.wxpay = result.data
          this.onBridgeReady()
        }
      } else {
        this.$toast({message: result.msg, duration: 2000})
      }
    },
    handlepay (e) {
      this.mallOrderBuyApi()
    },
    addnum () {
      this.number++
    },
    minusnum () {
      if (this.number === 1) {
        return
      }
      this.number--
    },
    checkTel (str) {
      let reg = /^\d{11,15}$/
      if (!reg.test(str)) {
        this.$toast({message: '电话号码不规范，请修改！', duration: 2000})
      }
      return reg.test(str)
    },
    checkCard (str) {
      let reg = /^[\d|x]{17}[\d|X|x]$/
      if (!reg.test(str)) {
        this.$toast({message: '身份证格式不正确，请修改！', duration: 2000})
      }
      return reg.test(str)
    },
    checkName (str) {
      let reg = /\S/
      if (!reg.test(str)) {
        this.$toast({message: '请输入姓名！', duration: 2000})
      }
      return reg.test(str)
    }
  }
}
</script>

<style lang="scss" scoped>
  .activitydetail{
    padding: 44px 30px 0;
    padding-bottom: 98px;
    .activityheader{
      border-radius: 12px;
      margin-bottom: 20px;
      .accontenty{
        padding-bottom: 12px;
        p{
          line-height: 44px;
          padding: 22px 0 22px 0;
          margin-bottom: 0;
          border-bottom: 1px solid #F3F3F3;
          width: 100%;
          .tip{
            margin-left: 24px;
            font-size: 24px;
            color: #666666;
            i{
              color: #F4781D;
              font-style: normal;
            }
          }
        }
        .syyouxi{
          padding: 16px 0 0 0 ;
          font-size:30px;
          border: none;
        }
        .tdshp{
          border: none;
          padding: 0;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -webkit-flex-direction: row;
          flex-direction: row;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          .addressdeta1{
            color: #666666;
            font-size: 24px;
            padding: 0;
            width: 100%;
          }
          .pricetick{
            margin-left: 20px;
            color: #999;
            color: #F4781D;
            font-size: 28px;
            font-weight: bold;
          }
        }
        .goumai{
          padding: 20px 0 20px 0 ;
          font-size:30px;
          border: none;
          width: 100%;
          border: none;
          display: -webkit-box;
          display: -webkit-flex;
          display: flex;
          -webkit-box-orient: horizontal;
          -webkit-box-direction: normal;
          -webkit-flex-direction: row;
          flex-direction: row;
          -webkit-box-align: center;
          -webkit-align-items: center;
          align-items: center;
          .goumaisl{
            width: 100%;
            border: none;
            padding: 0;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -webkit-flex-direction: row;
            flex-direction: row;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
          }
          .minus,.plus,.shownum{
            position: relative;
            max-width: 40px;
            min-width: 40px;
            height: 40px;
            line-height: 40px;
            background: #F3EEFB;
            text-align: center;
            border-radius: 6px;
            text-align: center;
            .row{
              display: inline-block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              width: 20px;
              height: 2px;
              background-color: #8C3B92;
            }
            .col{
              display: inline-block;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%,-50%);
              width: 2px;
              height: 20px;
              background-color: #8C3B92;
            }
          }
          .shownum{
            background: #fff;
            max-width: 80px;
            width: 80px;
          }
          .text{
            text-align: center;
            width: 80px;
            border: none;
          }
        }
        .info{
          padding: 17px 0;
          line-height:40px;
          label{
            font-size: 26px;
            color: #666666;
            width: 100px;
            display: inline-block;
          }
          input{
            line-height: 40px;
            border: none;
            height: 40px;
          }
          ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
            color: #C1C1C1;
            font-size: 26px;
          }
          :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            color: #C1C1C1;
            font-size: 26px;
          }
          ::-moz-placeholder { /* Mozilla Firefox 19+ */
            color:#C1C1C1;
            font-size: 26px;
          }
          :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #C1C1C1;
            font-size: 26px;
          }
        }
        .info:last-child{
          border: none;
          padding-bottom: 25px;
        }
      }
    }
  }
</style>
