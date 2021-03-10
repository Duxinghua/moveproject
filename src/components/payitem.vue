<template>

    <!-- 支付 -->
    <van-popup
      v-model="payshow"
      closeable
      round
      position="bottom"
      :style="{'min-height':'100px'}"
      @close="changeHandler"
    >
      <div class="payClass">
        <div class="paytprice">
          <span>¥</span>
          {{payMoney}}
        </div>
        <div class="paytypes">
          <div class="paytips">选择支付方式</div>
          <van-radio-group
            v-model="paytype"
            checked-color="#28ae3a"
          >
            <van-radio
              name="1"
              v-if="isWx != 1"
            >
              <div class="payitem">
                <img
                  src="../assets/images/alipay.png"
                  class="payico"
                />
                <span class="payname">支付宝支付</span>
              </div>
            </van-radio>
            <van-radio
              name="2"
              v-if="isWx == 1"
            >
              <div class="payitem">
                <img
                  src="../assets/images/weixin.png"
                  class="payico"
                />
                <span class="payname">微信支付</span>
              </div>
            </van-radio>
            <van-radio name="3">
              <div class="payitem">
                <img
                  src="../assets/img/xx.png"
                  class="payico"
                />
                <span class="payname">线下支付</span>
              </div>
            </van-radio>
          </van-radio-group>
          <div
            class="paymoney"
            @click="alipay"
          >
            立即支付
          </div>
        </div>
      </div>


    </van-popup>
    <!-- 弹框 -->


</template>

<script>
import config from "@/utils/config.js"
export default {
  data() {
    return {
      payshow: false,
      payMoney: "",
      isWx: 2,
      paytype: 1,
      current_id: "",
      popshow: false,
    };
  },
  methods: {
    alipay() {
      //支付宝
      var that = this;
      if (this.paytype == 1) {
        // this.$api.aliPayWapPay({orderHeadSeqId:this.detail.seqId}).then((result)=>{

        // })
        window.location.href =
          config.apiurl + "/aliPay/wapPay?orderHeadSeqId=" + this.current_id;
      } else if (this.paytype == 2) {
        var data = {
          orderHeadSeqId: this.current_id,
          openId: localStorage.getItem("openid"),
        };
        this.$api.wxWebpay(data).then((result) => {
          if (result.code == 200) {
            var paywx = result.data;
            wx.chooseWXPay({
              timestamp: paywx.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: paywx.nonceStr, // 支付签名随机串，不长于 32 位
              package: paywx.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: paywx.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: paywx.paySign, // 支付签名
              success: function(res) {
                console.log(res);
                that.$toast("支付成功");
                that.$emit("update", 1);
                alert(JSON.stringify(res));
                // 支付成功后的回调函数
              },
              fail: function(res) {
                that.$toast("支付失败");
                that.$emit("update", 1);
              },
            });
          } else {
            that.$toast("支付失败");
            that.$emit("update", 1);
          }
        });
      } else if (this.paytype == 3) {
         that.payshow = true;
         that.$emit("unline",{seqId:that.current_id,payType:"OFF_LINE"});
      }
    },
    cal() {
      this.popshow = false;
      this.$toast("取消支付");
      this.$emit("update", 1);
    },
    contact() {
      var that = this;
      this.$api
        .orderPayOffLine({
          seqId: this.current_id,
          payType: "OFF_LINE",
        })
        .then((res) => {
          if (res.code == 200) {
            that.popshow = false;
            that.$toast("支付成功");
            that.$emit("update", 1);
          } else {
            that.$toast("支付失败");
          }
        });
    },
    changeHandler() {
      this.payshow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.uni-btn {
  font-size: 30px;
}
.payClass {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  padding-top: 100px;
  padding-bottom: 50px;
  .paytprice {
    font-size: 50px;
    color: #28ae3a;
    margin-right: 20px;
    text-align: center;
    margin-bottom: 40px;
    span {
      font-size: 34px;
    }
  }
  .paytypes {
    display: flex;
    flex-direction: column;
    padding: 0 40px;
    box-sizing: border-box;
    .paytips {
      font-size: 30px;
      color: #999999;
    }
    .paymoney {
      display: flex;
      justify-content: center;
      text-align: center;
      width: 100%;
      height: 90px;
      color: white;
      background: #28ae3a;
      border-radius: 45px;
      overflow: hidden;
      line-height: 90px;
      font-size: 40px;
      margin-top: 30px;
    }
  }
}
/deep/ .van-radio {
  display: flex;
  flex-direction: row-reverse;
  border-bottom: 2px solid #f5f6f7;
}
/deep/ .van-radio__label {
  display: flex;
  flex: 1;
  margin-left: 0px;
  .payitem {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex: 1;
    height: 130px;
    .payico {
      width: 80px;
      height: 80px;
      margin-right: 20px;
    }
    .payname {
      font-size: 28px;
      color: #333333;
    }
  }
}
/deep/ .van-picker__confirm {
  color: #28ae3a;
}
/deep/ .van-picker__cancel {
  color: #999999;
}
</style>
