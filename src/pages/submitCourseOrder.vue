<template>
  <div class="submit-order">
    <div class="submit-order-info">
      <div class="order-detail">
        <div class="order-detail-item">
          <div class="img"><img :src="detail.image ? detail.image[0] : ''" alt=""></div>
          <div class="info">
            <div class="title">{{detail.title}}</div>
            <div class="name">{{detail.admin_name}}</div>
            <div class="price">¥{{detail.price}}</div>
          </div>
        </div>
        <span>x 1</span>
      </div>
      <div class="order-item">
        <div class="left">课程合计</div>
        <div class="right">¥{{detail.price}}</div>
      </div>
      <div class="order-item">
        <div class="left">优惠活动</div>
        <div class="right">¥{{detail.discount}}</div>
      </div>
      <div class="order-item">
        <div class="left">合计</div>
        <div class="right">¥{{detail.total}}</div>
      </div>
    </div>
    <div class="submit-order-msg" v-if="this.type == 1">
      <div class="title">订单信息</div>
      <div class="msg-info">
        <div class="lf">姓名</div>
        <div class="rg">{{detail.nickname}}</div>
      </div>
      <div class="msg-info">
        <div class="lf">手机号码</div>
        <div class="rg">{{detail.mobile}}</div>
      </div>
      <!-- <div class="msg-info">
        <div class="lf">订单编号</div>
        <div class="rg">201910291689</div>
      </div> -->
      <!-- <div class="msg-info">
        <div class="lf">身份证号</div>
        <div class="rg">420980199412309098</div>
      </div> -->
      <!-- <div class="msg-info">
        <div class="lf">下单时间</div>
        <div class="rg">2019-10-29 16:50</div>
      </div> -->
    </div>
    <div class="order-commit" v-if="this.type == 2">
      <div class="order-commit-notice">本活动为实名制活动，如填写有误，您将无法参与所报名的活动。为保障您的自身利益，请仔细核对身份信息。</div>
      <div class="order-commit-content">
        <div>
          <input type="text" placeholder="请输入真实姓名">
          <img src="../assets/images/ordername.png" alt="">
        </div>
        <div>
          <input type="tel" placeholder="请输入您的手机号码">
          <img src="../assets/images/ordertel.png" alt="">
        </div>
        <div>
          <input type="text" placeholder="请输入身份证号">
          <img src="../assets/images/ordercard.png" alt="">
        </div>
      </div>
    </div>
    <div class="buy-box">
      <div class="money">需支付<span>￥{{detail.total}}</span></div>
      <div class="submit" @click="onBuy">立即购买</div>
    </div>
    <div class="submit-order-reconfirm" v-if="reShow">
      <div class="re-mb"></div>
      <div class="re-body">
        <div class="pt">提示</div>
        <div class="pb">确定要购买此课程吗？</div>
        <div  class="btns">
          <span @click="cancelHandler">取消</span>
          <span @click="onHandler">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubmitCourseOrder',
  data () {
    return {
      reShow: false,
      type: null,
      course_id: null,
      detail:{},
      wxpay:{}
    }
  },
  mounted () {
    // const param = {
    //   course_id: this.$route.query.courseId,
    //   type: 0
    // }
    // if()
    // this.$api.courseOrderStore(param).then((res) => {
    //   if(res.code == 1) {
    //     console.log(res.data)
    //   }
    // })
    this.type = this.$route.query.type
    this.course_id = this.$route.query.courseId
    if(this.type == 1) {
      this.$api.courseOrderPreview({course_id:this.course_id}).then((res)=>{
        if(res.code == 1){
          this.detail = res.data
        }
      })
    }else if(this.type == 2){
      this.$api.courseOrderPreview({course_id:this.course_id}).then((res)=>{
        if(res.code == 1){
          this.detail = res.data
          console.log(res.data)
        }
      })
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
            window.location.href = config.baseurl + '/courseorderlist'
          } else {
            window.location.href = config.baseurl + '/courseorderlist'
          }
        })
    },
    onBuy () {
      this.reShow = true;
    },
    cancelHandler () {
      this.reShow = false;
    },
    onHandler () {
      var _this = this
      var params = {
        course_id: this.course_id,
        type: 0
      }
      this.$api.courseOrderStore(params).then((res)=>{
        if(res.code == 1){
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

        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.submit-order{
  width: 100%;
  min-height: 100vh;
  padding: 25px;
  padding-bottom: 100px;
  background: #FBF8F4;
  &-info{
    background-color: #fff;
    border-radius: 12px;
    padding: 55px 25px;
    margin-bottom: 17px;
    .order-detail{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      &-item{
        display: flex;
        .img{
          width: 156px;
          height: 115px;
          border-radius: 4px;
          overflow: hidden;
          margin-right: 15px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .info{
          max-width: 400px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .title{
            font-size: 30px;
            color: #333333;
            display: inline;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
          }
          .name{
            font-size: 26px;
            color: #999999;
          }
          .price{
            font-size: 24px;
            color: #995258;
            font-weight: bold;
          }
        }
      }
      span{
        font-size: 28px;
        color: #333333;
        margin-right: 8px;
      }
    }
    .order-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #333333;
      font-size: 26px;
      padding: 25px 0px;
      border-top: 1px solid #F3F3F3;
      &:last-child{
        font-size: 36px;
        .right{
          color: #6D8160;
        }
      }
    }
  }
  &-msg{
    background-color: #fff;
    border-radius: 12px;
    padding: 40px 30px;
    .title{
      font-size: 36px;
      color: #6D8160;
      margin-bottom: 30px;
    }
    .msg-info{
      display: flex;
      align-items: center;
      color: #333333;
      font-size: 26px;
      padding: 25px 0;
      border-bottom: 1px solid #F3F3F3;
      &:last-child{
        border-bottom: none;
      }
      .lf{
        display: inline-block;
        width: 104px;
        margin-right: 36px;
        color: #999999;
        text-align: justify;
        text-align-last: justify;
      }
    }
  }
  .order-commit{
    // background: #F6F3EE;
    // padding-bottom: 100px;
    // height: 100vh;
    overflow-x: hidden;
    overflow: auto;
    &-notice{
      // width: 650px;
      // height: 65px;
      margin: 40px auto;
      font-size: 26px;
      color: #333333;
      line-height: 38px;
    }
    &-content{
      // width: 700px;
      // height: 460px;
      background-color: #fff;
      border-radius: 12px;
      // margin: 0 25px;
      padding: 46px 34px;
      // padding-top: 38px;
      // padding-bottom: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      div{
        width: 100%;
        height: 73px;
        border: 1px solid #F1F1F1;
        border-radius: 36px;
        font-size: 26px;
        position: relative;
        margin-bottom: 25px;
        input{
          width: 100%;
          height: 100%;
          padding-left: 90px;
          border-radius: 36px;
          background-color: #F8F8F8;
          color: #999999;
          border: none;
        }
        img{
          width: 34px;
          height: 34px;
          position: absolute;
          top:50%;
          transform: translateY(-50%);
          left: 30px;
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
  &-reconfirm{
    .re-mb{
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      background: rgba(1,1,1,0.6);
      width: 100%;
      height: 100%;
    }
    .re-body{
      position: fixed;
      margin: auto;
      left: 0;
      right: 0;
      top: 345px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      // transform: translate(-30%,-50%);
      width: 578px;
      height: 350px;
      padding: 47px 0;
      background: #FFFFFF;
      border-radius: 12px;
      z-index: 1000;
      .pt,.pb{
        font-size: 32px;
        color: #333333;
      }
      .pb{
        font-weight: Bold;
      }
      .btns{
        display: flex;
        flex-direction: row;
        justify-content: center;
        span{
          width: 209px;
          height: 72px;
          line-height: 72px;
          text-align: center;
          font-size: 30px;
          border-radius: 36px;
          border: 2px solid #E3E3E3;
          color: #999999;
          background-color: #fff;
          margin: 0 13px;
        }
        :last-child{
          border: 2px solid #738666;
          background-color: #738666;
          color: #F3D995;
        }
      }
    }
  }
}
</style>
