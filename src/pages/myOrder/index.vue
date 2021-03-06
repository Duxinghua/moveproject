<template>
  <div class='index_wrap'>
    <TopNav :menu="menutext" page="my" />
    <div class="navbar">
      <div
        v-for="(item, index) in navList"
        :key="index"
        class="nav-item"
        :class="{ current: tabCurrentIndex === index }"
        @click="tabClick(index)"
      >
        {{ item.text }}
      </div>
    </div>
    <!-- 显示区域 -->
    <div class="scroll-wrap">
      <van-list
        v-model="loading"
        v-show="orderList.length > 0"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
      >
        <div class="list_wrap">
          <template>
            <div
              class="content_wrap"
              v-for="(item,index) in orderList"
              :key="index"
            >
              <div @click='goDetail(item.serverType,item.seqId)'>
                <div class="time">
                  <div>
                    <span class="typeName">{{item.serverType | serverType}}</span>
                    <span class="date">{{item.createDate}}</span>
                  </div>
                  <span
                    class="state"
                    v-if="item.serverType == 'HIRE_WORKER'"
                  >{{item.orderStatus | orderStatus_worker}}</span>
                  <span
                    class="state"
                    v-else
                  >{{item.orderStatus | orderStatus}}</span>
                </div>
                <div
                  class="address"
                  v-if="item.serverType == 'HIRE_WORKER'"
                >
                  <div class="left_wrap">
                    <div class="end">
                      <div class="lt-icon-box"></div>
                      <p class="addressName">{{item.workerRegion}}</p>
                      <p class="detailAddress">{{item.workerAddress}}</p>
                    </div>
                  </div>
                </div>
                <div
                  class="address"
                  v-else
                >
                  <div class="left_wrap">
                    <div
                      :class="item.orderRouteList.length == i+1 ? 'end' : 'start'"
                      v-for="(address,i) in item.orderRouteList"
                      :key="i"
                    >
                      <div class="lt-icon-box"></div>
                      <p class="addressName">{{address.address1}}</p>
                      <p class="detailAddress">{{address.address2}}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bottom_wrap">
                <span>￥{{item.payMoney}}</span>
                <span
                  class='cancel_btn'
                  v-if='item.orderStatus=="NOPAY"||item.orderStatus=="WAIT_REC" || item.orderStatus=="DRIVER_REC"  || item.orderStatus=="DRIVER_COME"|| item.orderStatus=="DRIVER_WORKING"|| item.orderStatus=="DRIVER_FINISH" || item.orderStatus=="NOPAY2" '
                  @click='cancel(item.seqId,item.sheetId)'
                >取消订单</span>
                <span
                  class='pay_btn'
                  v-if="item.orderStatus == 'FINISH'"
                  @click='remark(item.seqId,item.sheetId)'
                >立即评价</span>
                <span
                  class='pay_btn'
                  v-if="item.orderStatus == 'NOPAY' || item.orderStatus == 'NOPAY2'"
                  @click='pay(item.seqId,item.payMoney)'
                >去支付</span>
                <!-- 	<span class='cancel_btn'  v-if='item.orderStatus=="CANCEL"' @tap='del(item.seqId)'>删除订单</span> -->
              </div>
            </div>
          </template>

        </div>

      </van-list>
      <Nodata v-if="nodataflag" />
    </div>
              <!-- 弹框 -->
          <van-popup
            position='center'
            v-model="unline"
            ref="popup3"
            round
            :style="{'width':'82%'}"
          >
            <div class="uni-tip">
              <div class="uni-top">
                <p class='uni-text'>温馨提示</p>
                <p class='uni-content'>选择线下付款，平台不承担任何责任</p>
              </div>
              <div class='uni-btn'>
                <span
                  class="btns_cancel"
                  @click='unline = false'
                >取消</span>
                <span
                  class="btns"
                  @click='contact'
                >确定</span>
              </div>
            </div>
          </van-popup>

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
            <van-radio name="1" v-if="isWx != 1">
              <div class="payitem">
                <img
                  src="../../assets/images/alipay.png"
                  class="payico"
                />
                <span class="payname">支付宝支付</span>
              </div>
            </van-radio>
            <van-radio name="2" v-if="isWx == 1">
              <div class="payitem">
                <img
                  src="../../assets/images/weixin.png"
                  class="payico"
                />
                <span class="payname">微信支付</span>
              </div>
            </van-radio>
            <van-radio name="3" >
              <div class="payitem">
                <img
                  src="../../assets/img/xx.png"
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
    <van-popup
      type='center'
      round
      v-model="popshow"
      style="width:73%"
    >
      <div class="uni-tip">
        <div class="uni-top">
          <p class='uni-text'>温馨提示</p>
          <p class='uni-content'>选择线下付款，平台不承担任何责任</p>
        </div>
        <div class='uni-btn' >
          <span
            class="btns_cancel"
            @click='cal'
          >取消</span>
          <span
            class="btns"
            @click='contact'
          >确定</span>
        </div>
      </div>
    </van-popup>

  </div>
</template>

<script>
import config from "@/utils/config.js"
import TopNav from "@/components/topnav.vue";
import Nodata from "@/components/nodata.vue";
import listCard from "./components/list.vue";
export default {
  components: {
    listCard,
    TopNav,
    Nodata,
  },
  data() {
    return {
      popshow:false,
      payshow:false,
      unline: false,
      bianhao: "1",
      current_id: "",
      payMoney: "",
      nodataflag: false,
      menutext: "我的订单",
      orderList: [],
      tabCurrentIndex: 0,
      navList: [
        {
          state: 0,
          text: "进行中",
          orderStaus: `NOPAY,WAIT_REC,DRIVER_REC,DRIVER_COME,DRIVER_WORKING,DRIVER_FINISH,NOPAY2,CANCEL_APPLY`,
        },
        {
          state: 1,
          text: "已完成",
          orderStaus: `FINISH,EVALUATE`,
        },
        {
          state: 2,
          text: "已取消",
          orderStaus: `CANCEL,RETURN`,
        },
      ],
      finished: false,
      loading: false,
      page: {
        num: 1,
        size: 10,
      },
      total: 0,
      paytype: 1,
       isWx:2
    };
  },
  mounted() {
    if (
      window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) ==
      "micromessenger"
    ) {
      localStorage.setItem("isWeixin", 1);
      var data = {
        url: location.href
      }
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      if (isiOS) {
        data.url = config.shareurls
      }
      this.$api.workerApply(data).then((res) => {
        if (res.code == 200) {
          var wxpay = res.data
          wx.config({
            debug: true,
            appId: config.appid,
            timestamp: wxpay.timestamp,
            nonceStr: wxpay.noncestr,
            signature: wxpay.signature,
            jsApiList: [
              'checkJsApi',
              'chooseWXPay'
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
                'chooseWXPay'
              ],
              success: function (res) {

              }
            })
          })
        }
      })
    } else {
      localStorage.setItem("isWeixin", 2);
    }
    this.isWx = localStorage.getItem('isWeixin')
    this.upCallback();
  },
  filters: {
    serverType(value) {
      switch (value) {
        case "PULL_CARGO":
          return "拉货";
          break;
        case "CHANGE_HOUSE":
          return "搬家";
          break;
        case "HIRE_WORKER":
          return "劳务工";
          break;
        case "RENT_CAR":
          return "租车";
          break;
      }
    },
    orderStatus(value) {
      switch (value) {
        case "NOPAY":
          return "待支付";
          break;
        case "DRIVER_REC":
          return "司机已接单";
          break;
        case "WAIT_REC":
          return "等待接单";
          break;
        case "DRIVER_COME":
          return "司机到达";
        case "DRIVER_WORKING":
          return "司机工作中";
          break;
        case "DRIVER_FINISH":
          return "司机完成工作";
          break;
        case "NOPAY2":
          return "付尾款";
          break;
        case "FINISH":
          return "已完成";
          break;
        case "EVALUATE":
          return "已评价";
          break;
        case "CANCEL_APPLY":
          return "取消申请";
          break;
        case "CANCEL":
          return "已取消";
          break;
        case "RETURN":
          return "退款";
          break;
      }
    },
    orderStatus_worker(value) {
      switch (value) {
        case "NOPAY":
          return "待支付";
          break;
        case "DRIVER_REC":
          return "劳务工已接单";
          break;
        case "WAIT_REC":
          return "等待接单";
          break;
        case "DRIVER_COME":
          return "劳务工到达";
        case "DRIVER_WORKING":
          return "劳务工工作中";
          break;
        case "DRIVER_FINISH":
          return "劳务工完成工作";
          break;
        case "NOPAY2":
          return "付尾款";
          break;
        case "FINISH":
          return "已完成";
        case "EVALUATE":
          return "已评价";
          break;
        case "CANCEL_APPLY":
          return "取消申请";
          break;
        case "CANCEL":
          return "已取消";
          break;
        case "RETURN":
          return "退款";
          break;
      }
    },
  },
  methods: {
    cal(){
      this.popshow = false
        this.$toast('取消支付')
                this.page.num = 1;
                this.orderList = [];
                this.upCallback();
    },
    contact(){
      var that = this
          this.$api
            .orderPayOffLine({
              seqId: this.current_id,
              payType: "OFF_LINE",
            })
            .then((res) => {
              if (res.code == 200) {
                  that.popshow = false
                 that.$toast('支付成功')
                     that.page.num = 1;
                that.orderList = [];
                that.upCallback();
                that.payshow = false
              }else{
                 that.$toast('支付失败')
              }
            });
    },
    alipay() {

      //支付宝
      var that = this
      if (this.paytype == 1) {
        // this.$api.aliPayWapPay({orderHeadSeqId:this.detail.seqId}).then((result)=>{

        // })
        window.location.href =
          config.apiurl+"/aliPay/wapPay?orderHeadSeqId=" +
          this.current_id;
      }else if(this.paytype == 2){
        var data = {
          orderHeadSeqId:this.current_id,
          openId:localStorage.getItem('openid')
        }
        this.$api.wxWebpay(data).then((result)=>{
          if(result.code == 200){
            var paywx = result.data
            wx.chooseWXPay({
              timestamp: paywx.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
              nonceStr: paywx.nonceStr, // 支付签名随机串，不长于 32 位
              package: paywx.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
              signType: paywx.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
              paySign: paywx.paySign, // 支付签名
              success: function (res) {
                console.log(res)
                that.page.num = 1;
                that.orderList = [];
                that.upCallback();
                that.payshow = false
                alert(JSON.stringify(res))
                // 支付成功后的回调函数
              },
              fail: function(res){
                console.log(res)
                that.page.num = 1;
                that.orderList = [];
                that.upCallback();
                 that.payshow = false
              }
            });

          }else{
                that.page.num = 1;
                that.orderList = [];
                that.upCallback();
                 that.payshow = false
          }
        })
      }else if(this.paytype == 3){
         that.popshow = true
      }
    },
    changeHandler(){

    },
    onLoad() {
      if (this.orderList.length < this.total) {
        this.page.num++;
        this.upCallback(true);
      }else{
        this.finished = true
      }
    },
    tabClick(index) {
      if (this.tabCurrentIndex == index) return;
      this.tabCurrentIndex = index;
      this.orderList = [];
      this.upCallback();
    },
    downCallback() {
      this.orderList = [];
      this.upCallback();
    },
    upCallback(ismore) {
      this.$api
        .orderList({
          orderStatusList: this.navList[this.tabCurrentIndex].orderStaus,
          pageno: this.page.num,
          pagesize: this.page.size,
        })
        .then((res) => {
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.pages = res.total;
          this.$nextTick(() => {
            if (ismore) {
              this.orderList = this.orderList.concat(res.list);
            } else {
              this.orderList = res.list;
            }
            if (this.orderList.length) {
              this.nodataflag = false;
            } else {
              this.nodataflag = true;
            }
          });
        });
    },
    	goDetail(server,id) {
				let type;
				switch (server) {
					case 'PULL_CARGO':
						type = 'lahuo'
						break;
					case 'CHANGE_HOUSE':
						type = 'move'
						break;
					case 'HIRE_WORKER':
						type = 'worker'
						break;
					case 'RENT_CAR':
						type = 'rentCar'
						break;
				}
        this.$router.push({path:`/myOrder/${type}?id=${id}`})
			},
			cancel(id, sheetId) {
        this.$router.push({path:'/order/cancelOrder?seqId=' + id + "&sheetId=" + sheetId})
			},
			del(id){
				this.$api.order_delete({
					seqId:id
				}).then(res => {
					if(res.code==200){
            this.$toast('删除成功')
            this.upCallback()
					}
				})
			},
			pay(id,money){
				this.current_id=id
				this.payMoney=money
        this.payshow = true
			},
			submit() {
				if (this.bianhao == 1) {
					//微信支付
					this.$api.wx_pay({
						orderHeadSeqId: this.current_id
					}).then(res => {
						if (res.code == 200) {
							let paymentData = res.data;
							wx.chooseWXPay({
								timeStamp: paymentData.timeStamp,
								nonceStr: paymentData.nonceStr,
								package: paymentData.package,
								signType: paymentData.signType,
								paySign: paymentData.paySign,
								success: (res) => {
                  this.$toast('支付成功')
								},
								fail: (res) => {
                   this.$toast('支付成功')
								},
								complete: (res) => {
                   this.$router.push({path:'/myorder'})
								}
							})
						}

					})
				} else {
					// 线下支付
					this.unline = true
					this.$refs.popup_1.close()
				}
			},
			radio(e) {
				this.bianhao = e
			},
			remark(id, sheetId){
        this.$router.push({path:'/myOrder/evaluation?seqId=' + id + "&sheetId=" + sheetId})
			}
  },
};
</script>

<style lang="scss" scoped>
.index_wrap {
  background: #f3f3f3;
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
.index_wrap {
  // padding-bottom: 30px;
  background-color: #f3f3f3;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  .navbar {
    display: flex;
    height: 100px;
    padding: 0 5px;
    z-index: 10;
    .nav-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #919192;
      position: relative;

      &.current {
        color: #7bcb85;
      }
    }
  }
  .scroll-wrap {
    height: calc(100vh-100px);
  }
}
  .uni-tip {
    background-color: #fff;
    width: 100%;
    margin: 0 auto;
    border-radius: 26px;

    .uni-top {
      padding: 20px 30px 50px 30px;

      .uni-text {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
      }

      .uni-content {
        padding: 0 50px;
        font-size: 32px;
        color: #4c4c4c;
        line-height: 48px;
      }
    }

    .uni-btn {
      overflow: hidden;
      border-radius: 0px 0px 13px 13px;
      border: none;
      text-align: center;
      display: flex;

      .btns {
        background-color: #28ae3a;
        color: #fff;
        width: 50%;
        height: 90px;
        line-height: 90px;
      }

      .btns_cancel {
        background-color: #f5f6f7;
        color: #888889;
        width: 50%;
        height: 90px;
        line-height: 90px;
      }
    }
  }
.list_wrap {
  padding: 0 24px;


  .btn {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 30px 30px 20px 30px;
    z-index: 2;
    width: 100%;

    span {
      background-color: #28ae3a;
      height: 76px;
      border-radius: 40px;
      line-height: 76px;
      text-align: center;
      color: #fff;
    }
  }
  .popup-content_1 {
    padding-top: 70px;

    h6 {
      text-align: center;
      padding-bottom: 70px;
      font-size: 48px;
      color: #28ae3a;
    }

    & > p {
      font-size: 30px;
      color: #888;
      margin-left: 40px;
      margin-bottom: 20px;
    }

    .payType {
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px 10px 30px;
        border-bottom: 1px solid #fafafa;

        & > div {
          display: flex;
          align-items: center;
          font-size: 28px;

          image {
            width: 90px;
            height: 80px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .content_wrap {
    background-color: #fff;
    border-radius: 18px;
    padding-top: 28px;
    overflow: hidden;
    margin-bottom: 24px;
    .time {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
      padding-right: 26px;
      & > div {
        .typeName {
          padding: 3px 26px;
          background: #2b2e3c;
          color: #d3d4d6;
          border-radius: 0 30px 30px 0;
          font-size: 28px;
        }

        .date {
          background: #f5f6f7;
          padding: 5px 25px;
          font-size: 28px;
          border-radius: 0 27px 27px 0;
        }
      }
      .state {
        font-size: 28px;
        color: #7b7b7b;
      }
    }

    .laowu {
      display: flex;
      justify-content: space-between;
      padding: 0 26px 35px 26px;

      .left_wrap {
        flex: 1;

        .start {
          position: relative;
          padding-left: 60px;
          padding-bottom: 36px;

          .addressName {
            font-size: 32px;
            font-family: PingFang SC;
          }

          .detailAddress {
            font-size: 24px;
            color: #c3c3c3;
            margin-top: 6px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
            word-break: break-all;
          }

          .dingwei {
            position: absolute;
            width: 36px;
            height: 36px;
            left: -2px;
            top: 12px;
          }
        }
      }
    }

    .address {
      display: flex;
      justify-content: space-between;
      padding: 0 26px 45px 26px;

      .left_wrap {
        flex: 1;

        .start {
          position: relative;
          padding-left: 60px;
          padding-bottom: 36px;

          .lt-icon-box {
            position: absolute;
            border: 2px solid #7ccd87;
            background: #fff;
            border-radius: 50%;
            width: 13px;
            height: 13px;
            left: -3px;
            top: 12px;
          }

          .addressName {
            font-size: 26px;
            font-family: PingFang SC;
          }

          .detailAddress {
            font-size: 12px;
            color: #c3c3c3;
            margin-top: 6px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
            word-break: break-all;
          }
        }

        .end {
          position: relative;
          padding-left: 60px;

          .lt-icon-box {
            position: absolute;
            border: 2px solid #ff6a39;
            background: #fff;
            border-radius: 50%;
            width: 13px;
            height: 13px;
            left: -2px;
            top: 12px;
          }

          .addressName {
            font-size: 26px;
            font-family: PingFang SC;
          }

          .detailAddress {
            font-size: 12px;
            color: #c3c3c3;
            margin-top: 6px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: normal;
            word-break: break-all;
          }
        }
      }
    }

    .bottom_wrap {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      border-top: 1px solid #f7f7f7;

      span:first-child {
        font-family: PingFang SC;
        width: 32%;
        height: 80px;
        font-size: 40px;
        line-height: 80px;
        color: #090909;
      }

      .cancel_btn {
        font-family: PingFang SC;
        border: 1px solid #e5e5e5;
        height: 54px;
        line-height: 54px;
        text-align: center;
        color: #949494;
        width: 180px;
        border-radius: 30px;
        font-size: 13px;
      }
      .pay_btn {
        background-color: #28ae3a;
        color: #fff;
        font-family: PingFang SC;
        height: 54px;
        line-height: 54px;
        text-align: center;
        width: 180px;
        border-radius: 30px;
        font-size: 13px;
      }
    }
  }
}
</style>
