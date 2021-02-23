import { wx_pay,orderPayOffLine, } from '@/api'
import jwt_decode from "jwt-decode";
export default {
  data() {
    return {
      payType: 'on',
      isAgree: false,
      orderId: '',
      serverType: ''
    }
  },
  onLoad(){
    try {
      const token = uni.getStorageSync('token');
      if (token) {
        let { mobile } = jwt_decode(token);
        this.orderForm.receiverMobileNo = mobile;
      }
    } catch (e) {
      // error
    }
  },
  methods: {
    submitPayment(){
      if (this.payType == 'on') {
        uni.showLoading({ title: '请稍后',mask: true });
        //微信支付
        wx_pay({
          orderHeadSeqId: this.orderId
        }).then(res => {
          if (res.code == 200) {
            let paymentData = res.data;
            uni.requestPayment({
              timeStamp: paymentData.timeStamp,
              nonceStr: paymentData.nonceStr,
              package: paymentData.package,
              signType: paymentData.signType,
              paySign: paymentData.paySign,
              success: (res) => {
                uni.showToast({
                  title: "支付成功"
                })
              },
              fail: (res) => {
                uni.showModal({
                  content: "支付失败",
                  showCancel: false
                })
              },
              complete: (res) => {
                uni.hideLoading();
                uni.redirectTo({
                  url: `/myOrder/${this.serverType}?id=${this.orderId}&from=confirm`
                })
              }
            })
          }
        })
      } else {
        // 线下支付
        this.$refs.popup3.open()
        this.$refs.popup_1.close()
      }
    },
    selectPay(e){
      this.payType = e;
    },
    checkboxChange(e){
      this.isAgree = e.detail.value.length > 0;
    },
    rules(){
      uni.navigateTo({
        url: '/personalCenter/rules'
      })
    },
    contact() {
      uni.showLoading({ title: '请稍后'});
      orderPayOffLine({
        seqId: this.orderId,
        payType: 'OFF_LINE'
      }).then(res => {
        if (res.code == 200) {
          uni.hideLoading();
          uni.redirectTo({
            url: `/myOrder/${this.serverType}?id=${this.orderId}&from=confirm`
          })
        }
      })
    },
    cal() {
      this.$refs.popup3.close()
    },
  },
}