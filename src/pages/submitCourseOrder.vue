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
    <div class="submit-order-msg" v-if="courseType == 'online'">
      <div class="title">订单信息</div>
      <div class="msg-info">
        <div class="lf">姓名</div>
        <div class="rg">{{detail.nickname}}</div>
      </div>
      <div class="msg-info">
        <div class="lf">手机号码</div>
        <div class="rg">{{detail.mobile}}</div>
      </div>
    </div>
    <div class="order-commit" v-if="courseType == 'off'">
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
    <!-- <van-overlay :show="overlayStatus" @click="hideOverlay">
            <div class="wrapper" @click.stop>
                <div class="tuan-wrapper">
                    <div class="tuan-status"><img src="../assets/images/select.png" alt=""><span>{{tuanStatus == 0 ? '已支付' : '拼团成功'}}</span></div>
                    <div :class="['group-list',{'list-active1':groupDetails.user_number == 2,'list-active':groupDetails.user_number == 3}]">
                        <div class="group-item" v-for="(item, index) in groupDetails.users" :key="index">
                            <div class="img"><img :src="item.avatar" alt=""></div>
                            <div class="tag" v-if="index == 0">团长</div>
                        </div>
                        <div class="group-item active" v-for="(item, index) in ((groupDetails.user_number - groupDetails.users.length) || [])" :key="'active' + index">
                            <img src="../assets/images/doubt.png" alt="">
                        </div>
                    </div>
                    <div class="goods-time" v-if="tuanStatus == 0">
                        <img src="../assets/images/remind.png" alt="">拼团中，还差<span>{{(groupDetails.user_number - groupDetails.current_number) || 0}}人</span>，<van-count-down v-if="groupDetails.t_id" :time="groupDetails.expire_time * 1000" />后结束
                    </div>
                    <div class="tuan-share" @click="onLink">{{tuanStatus == 0 ? '邀请好友拼团' : '继续逛逛'}}</div>
                    <div class="tuan-link" @click="onLinkOrder"><span>查看订单</span><van-icon name="arrow" /></div>
                </div>
            </div>
    </van-overlay> -->
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
      wxpay:{},
      courseType:null,
      wx:null,
      overlayStatus:false,
      popupStatus:false,
      tuanStatus:1,//1是拼团成功 0 是支付成功
    }
  },
  created() {
        const config = {
            url:location.href.split('#')[0]
        }
        // 请求api返回sdk配置参数
        this.$api.userGetSignPackage(config).then(res => {
            if (res.code === 1) {
                var wxConfig = res.data;
                this.wxConfig = wxConfig;
                wx.config({
                    appId: wxConfig.appId, // 必填，公众号的唯一标识
                    timestamp: wxConfig.timestamp, // 必填，生成签名的时间戳
                    nonceStr: wxConfig.nonceStr, // 必填，生成签名的随机串
                    signature: wxConfig.signature,// 必填，签名
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
                });
            }

            wx.ready(() => {
                this.wx = wx;
            });
        });
  },
  mounted () {
    const {type,courseId,courseType} = this.$route.query
    this.type = type
    this.course_id = courseId
    this.courseType = courseType
    this.$api.courseOrderPreview({course_id:this.course_id,type:this.type}).then((res)=>{
        if(res.code == 1){
          this.detail = res.data
        }
    })
  },
  methods: {
    hideOverlay () {

    },
    onBuy () {
      this.reShow = true;
    },
    wxPay(wxmsg,order_id){
            const _this = this;
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
                    if(_this.type == 2){
                        _this.tuanInfo(order_id)
                    }else{
                        _this.$router.push({
                            path:'/orderlist'
                        })
                    }
                },
                cancel: function (res) {
                    // 支付取消的回调函数
                    _this.$router.push({
                        path:'/orderlist'
                    })
                },
                error: function (res) {
                    // 支付失败的回调函数
                    _this.$router.push({
                        path:'/orderlist'
                    })
                }
            })
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
      if(this.type == 1){
        params.type = 1
      }
      this.$api.courseOrderStore(params).then((res)=>{
        if(res.code == 1){
          _this.wxPay(pay_data,res.data.order_id)
        }else{
          _this.$toast(res.msg)
        }
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .tuan-wrapper{
    width: 600px;
    height: 585px;
    background-color: #fff;
    border-radius: 15px;
    padding: 40px;
    .tuan-status{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
        img{
            width: 40px;
            height: 40px;
        }
        span{
            color: #6D8160;
            font-size: 30px;
            margin-left: 10px;
        }
    }
    .tuan-share{
        width: 435px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        border-radius: 50px;
        color: #F3D995;
        font-size: 36px;
        margin: 0 auto;
        margin-top: 70px;
        margin-bottom: 35px;
        background: #6B8162;
    }
    .tuan-link{
        color: #333333;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  }
}
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
