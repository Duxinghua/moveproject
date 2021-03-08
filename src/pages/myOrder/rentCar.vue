<template>
  <div class='rent'>
     <TopNav :menu="menutext" />
    <h4>{{orderDetail.orderStatus | orderStatus}}</h4>
    <div
      class='calling'
      v-if="orderDetail.custDriverInfoSimpleVo && orderDetail.orderStatus!='WAIT_REC' && orderDetail.orderStatus!='NOPAY' && orderDetail.orderStatus!='NOPAY2' && orderDetail.orderStatus!='CANCEL_APPLY'"
    >
      <div v-if="orderDetail.custDriverInfoSimpleVo">
        <img :src="orderDetail.custDriverInfoSimpleVo.avatarUrl"></img>
        <div class='rates'>
          <p><span v-if='orderDetail.custDriverInfoSimpleVo'>{{formatName(orderDetail.custDriverInfoSimpleVo.plateNumber || "")}}</span><span>{{orderDetail.carType | carType}}</span></p>
          <div>
            <span>{{orderDetail.custDriverInfoSimpleVo.name}}</span>
            <div class="rate">
              <div
                v-for="(item,index) in num"
                :key="index"
                :class="{'selected' :index <=orderDetail.custDriverInfoSimpleVo.score-1}"
                class='li'
              ></div>
            </div>
            <span style='margin-left:10px'>{{orderDetail.custDriverInfoSimpleVo.score || 0}}分</span>
          </div>
        </div>
      </div>
      <a :href="'tel:'+orderDetail.driverMobilno">
        <img src='../../assets/img/calling.png'></img>
      </a>
    </div>
    <div class='modelCar'>
      <div class='date'>
        <p><span class='minute'>{{orderDetail.orderDateStr}}</span></p>
        <p>{{orderDetail.carType | carType}}</p>
      </div>
    </div>
    <div class="address">
      <div class="left_wrap">
        <div
          class="start"
          v-for='(item,i) in orderDetail.orderRouteList'
          :key='i'
          :class="i==orderDetail.orderRouteList.length-1?'end':''"
        >
          <div class="lt-icon-box"></div>
          <p class="addressName">{{item.address1}}</p>
          <p class="detailAddress">{{item.address2}}</p>
        </div>
      </div>
    </div>
    <h5 v-if="orderDetail.orderOtherList.length>0">额外需求</h5>
    <div
      class='demand'
      v-if="orderDetail.orderOtherList.length>0"
    >
      <div>
        <p class='other'><span>其它服务</span></p>
        <div class='ul'>
          <div
            class='li'
            v-for="(item,index) in orderDetail.orderOtherList"
            :key="index"
          >
            <span v-if="item.checked">{{item.catItem}}</span><span v-if="item.checked">{{item.remarks}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class='remark'>
			<p>订单备注</p>
			<p>{{orderDetail.orderDescribe ? orderDetail.orderDescribe : '无'}}</p>
		</div> -->
    <div
      class="name"
      style='margin-top: 20px;'
    >
      <span>姓名</span><span>{{orderDetail.receiverName}}</span>
    </div>
    <div class='contact'>
      <span>联系电话</span><span>{{orderDetail.receiverMobileNo}} <span
          v-if='orderDetail.mobileProtected'
          class='protect'
        >号码保护中</span></span>
    </div>
    <div
      class='particulars'
      @click='gocost'
    >
      <span>费用明细</span><span>
        <img
          src='../../assets/img/right_gray.png'
          class='pic'
        ></img>
      </span>
    </div>
    <div class='paid'>
      <p><span>已支付</span><span>￥{{orderDetail.payMoney}}</span></p>
      <p><span>订单金额</span><span>￥{{orderDetail.payMoney}}</span></p>
      <p><span>已优惠</span><span>-￥{{orderDetail.couponMoney}}</span></p>
      <p><span>订单总额</span><span>￥{{orderDetail.totalMoney}}</span></p>
    </div>
    <div class='orderNember'>
      <p><span>订单编号</span><span>{{orderDetail.sheetId}}</span></p>
      <p><span>下单时间</span><span>{{orderDetail.createDate}}</span></p>
      <p><span>支付时间</span><span>{{orderDetail.payDate || ""}}</span></p>
    </div>
    <div class='block'>

    </div>
    <div class='foot'>
      <span
        class="back_order"
        v-if="orderDetail.orderStatus == 'WAIT_REC' && isFromConfirm"
        @click="goOrder()"
      >确定</span>
      <span
        class='cancel_order'
        v-if='orderDetail.orderStatus=="NOPAY"||orderDetail.orderStatus=="WAIT_REC" || orderDetail.orderStatus=="DRIVER_REC"  || orderDetail.orderStatus=="DRIVER_COME"|| orderDetail.orderStatus=="DRIVER_WORKING"|| orderDetail.orderStatus=="DRIVER_FINISH" || orderDetail.orderStatus=="NOPAY2" '
        @click='cancel(orderDetail.seqId,orderDetail.sheetId)'
      >取消订单</span>
      <span
        class='pay'
        v-if='orderDetail.orderStatus=="NOPAY"||orderDetail.orderStatus=="NOPAY2"'
        @click='pay(orderDetail)'
      >立即支付</span>
      <span
        class='cancel_order'
        v-if='orderDetail.orderStatus=="FINISH"'
        @click='remark(orderDetail.seqId,orderDetail.sheetId)'
      >立即评价</span>
      <!-- <span class='cancel_order' v-if='orderDetail.orderStatus=="CANCEL"' @click='del(orderDetail.seqId)'>删除订单</span> -->
    </div>

    <!-- 弹框 -->
    <van-popup
      type='center'
      ref="popup3"
    >
      <div class="uni-tip">
        <div class="uni-top">
          <p class='uni-text'>温馨提示</p>
          <p class='uni-content'>选择线下付款，平台不承担任何责任</p>
        </div>
        <div class='uni-btn'>
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
        <PayItem ref="pays"  @update="update"/>
  </div>
</template>

<script>
import config from "@/utils/config.js";
import PayItem from '@/components/payitem.vue';
import TopNav from "@/components/topnav.vue";
export default {
  props: {
    state: {
      type: String,
    },
  },
  components: {
    TopNav
  },
  data() {
    return {
      list: [1, 2, 3],
      num: 5,
      values: 3,
      bianhao: "1",
            orderDetail: {
        custDriverInfoSimpleVo: {
          avatarUrl: "",
        },
        orderPicList: [],
        orderRouteList: [],
        orderOtherList:[]
      },
      menutext:'租车订单详情',
      isFromConfirm:false,
      paytype: 1,
      isWx:2
    };
  },
    filters: {
    carType(value) {
      switch (value) {
        case "MINI_JEEP":
          return "小面包车";
          break;
        case "MIDDLE_JEEP":
          return "中面包车";
          break;
        case "KYW_JEEP":
          return "依维科";
          break;
        case "SMALL_CAR":
          return "小货车";
          break;
        case "MIDDLE_CAR":
          return "中货车";
          break;
        case "FIVE_METER_CAR":
          return "5米2";
          break;
        case "SIX_METER_CAR":
          return "6米8";
          break;
        case "SEVEN_METER_CAR":
          return "7米6";
          break;
        case "NINE_METER_CAR":
          return "9米6";
          break;
        case "THIRTEEN_METER_CAR":
          return "13米";
          break;
        case "SEVENTEEN_METER_CAR":
          return "17米5";
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
  mounted(){
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
            debug: false,
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
    this.getOrderDetail()
  },
  methods: {
    async getOrderDetail() {
      let data = await this.$api.orderSheet({ seqId: this.$route.query.id });
      if (data.code == 200) {
        console.log(data.data);
        this.orderDetail = data.data;
      }
    },
    gocost() {
      var that = this;
      that.$router.push({
        path: "/order/cost?seqId=" + this.orderDetail.seqId,
      });
    },

    cancel(id, sheetId) {
      this.$router.push({
        path: "/order/cancelOrder?seqId=" + id + "&sheetId=" + sheetId,
      });
    },
    del(id) {
      var that = this;
      this.$api
        .order_delete({
          seqId: id,
        })
        .then((res) => {
          if (res.code == 200) {
            that.$router.push({
              path: "/myOrder/index",
            });
          }
        });
    },

          goOrder(){
     this.$router.push({path: '/myorder'})
    },
      update(e){

        this.$refs.pays.payshow = false
        this.getOrderDetail()
      },
			pay(item){
        this.$refs.pays.paytype = this.paytype
        this.$refs.pays.isWx = this.isWx
        this.$refs.pays.payMoney = item.payMoney
        this.$refs.pays.current_id = item.seqId
        this.$refs.pays.payshow = true
			},
    submit() {

    },
    contact() {
      this.$api
        .orderPayOffLine({
          seqId: this.orderDetail.seqId,
          payType: "OFF_LINE",
        })
        .then((res) => {
          if (res.code == 200) {
            this.$router.push({
              path: "/myorder",
            });
          }
        });
    },
    cal() {
      this.$refs.popup3.close();
    },
    radio(e) {
      this.bianhao = e;
    },
    remark(id, sheetId) {
      this.$router.push({
        path: "/myOrder/evaluation?seqId=" + id + "&sheetId=" + sheetId,
      });
    },
    formatName(name) {
      if (!name) {
        return;
      }
      let newStr;
      newStr =
        name.substr(0, 2) + "***" + name.substr(5, name.split("").length);
      return newStr;
    },
  },
};
</script>

<style lang='scss'>
.rent {
  background: #f8f8f8;
  padding: 0px 0px 30px 0px;

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
      font-size: 30px;
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
      font-size: 24px;
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

          img {
            width: 90px;
            height: 80px;
            margin-right: 10px;
          }
        }
      }
    }
  }
  h4 {
    font-size: 32px;
    font-weight: 600;
    margin-bottom: 24px;
    margin-left: 24px;
  }

  .calling {
    background: #fff;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 17px;
    margin: 0 24px;
    margin-bottom: 20px;
    & > div {
      display: flex;
      align-items: center;
      flex: 1;
      & > img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      .rates {
        flex: 1;
        margin-left: 18px;

        & > p {
          span:first-child {
            font-weight: 600;
            font-size: 28px;
          }

          span:last-child {
            background-color: #e9eaeb;
            padding: 2px 26px;
            border-radius: 30px;
            color: #7d7e7e;
            margin-left: 10px;
            font-size: 28px;
          }
        }

        & > div {
          display: flex;
          margin-top: 11px;
          & > span {
            font-size: 28px;
          }
          .rate {
            margin-left: 7px;
            display: flex;
            align-items: center;
            .li {
              width: 23px;
              height: 22px;
              background: url("https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604296122378bc6n.png")
                no-repeat;
              background-size: cover;
              margin-right: 26px;
            }

            .selected {
              background: url("https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604295577891vxth.png");
              margin-right: 26px;
              width: 23px;
              height: 22px;
              background-size: cover;
            }
          }
        }
      }
    }

    & > img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }

  .modelCar {
    background: #fff;
    padding: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 17px;
    margin: 0 24px;
    .date {
      flex: 1;

      p:first-child {
        margin: 10px 0;
        .minute {
          position: relative;
          font-size: 28px;
        }
      }

      p:last-child {
        margin-top: 26px;
        font-size: 28px;
        color: #888888;
      }
    }
  }

  .address {
    display: flex;
    justify-content: space-between;
    padding: 30px 30px 18px 30px;
    background: #fff;
    border-radius: 17px;
    margin: 24px 24px 20px 24px;
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
          width: 12px;
          height: 12px;
          left: -2px;
          top: 12px;
        }

        .addressName {
          font-size: 32px;
          font-family: PingFang SC;
          padding:0;
          margin:0;
        }

        .detailAddress {
          font-size: 28px;
          color: #c3c3c3;
          margin-top: 6px;
          white-space: normal;
          word-break: break-all;
        }
      }

      .end {
        .lt-icon-box {
          border: 2px solid #ff6a39 !important;
        }
      }

      .start:before {
        content: "";
        position: absolute;
        height: 97%;
        border: 1px dashed #ebe9e9;
        display: block;
        left: 7px;
        top: 18px;
      }

      .start:last-child:before {
        height: 0;
      }
    }
  }

  h5 {
    color: rgba(124, 122, 122, 1);
    font-size: 26px;
    font-family: PingFang SC;
    margin-bottom: 20px;
    margin-left: 24px;
  }

  .demand {
    background: #fff;
    padding: 20px 30px;
    border-radius: 17px;
    margin: 0 24px;
    .way {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 28px;
    }

    .other {
      margin-top: 10px;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .ul .li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #888;
      font-size: 28px;
      margin-bottom: 12px;

      span:first-child {
        flex: 1;
      }

      span:last-child {
        text-align: right;
      }
    }
  }

  .remark {
    background: #fff;
    padding: 20px 30px;
    border-radius: 17px;
    margin: 20px 24px;
    p:last-child {
      font-size: 28px;
      color: #888888;
      margin-top: 20px;
      word-break: break-all;
    }
  }

  .name,
  .contact,
  .particulars {
    background: #fff;
    padding: 20px 30px;
    border-radius: 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 24px 20px 24px;
    font-size: 25px;
    span:first-child {
      width: 30%;
    }

    span:last-child {
      font-size: 24px;
      color: #363636;
            display: flex;
      flex-direction: row;
      align-items: center;
      text-align: right;
    }

    img {
      width: 20px;
      height: 20px;
      margin-left:auto;
    }
    .protect {
      padding: 1px 25px;
      border: 1px solid #88d292;
      color: #88d292 !important;
      border-radius: 30px;
      font-size: 28px;
          width: fit-content!important;
      margin-left: 10px;
    }
  }

  .paid {
    background: #fff;
    padding: 20px 30px;
    border-radius: 17px;
    margin: 0 24px 20px 24px;
    p:first-child {
      font-size: 28px;
      color: #333;
    }

    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28px;
      color: #888;
      margin-bottom: 24px;
    }
  }

  .orderNember {
    background: #fff;
    padding: 20px 30px;
    border-radius: 17px;
    margin: 0 24px;
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28px;
      color: #888;
      margin-bottom: 24px;
    }
  }
  .block {
    margin-bottom: 100px;
  }
  .foot {
    background-color: #fff;
    height: 90px;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    .cancel_order {
      font-family: PingFang SC;
      border: 1px solid #e5e5e5;
      height: 54px;
      line-height: 54px;
      text-align: center;
      color: #949494;
      width: 180px;
      border-radius: 30px;
      font-size: 28px;
      margin-right: 24px;
    }
    .pay {
      background-color: #28ae3a;
      color: #fff;
      font-family: PingFang SC;
      height: 54px;
      line-height: 54px;
      text-align: center;
      width: 180px;
      border-radius: 30px;
      font-size: 28px;
      margin-right: 24px;
    }
    .back_order {
      border: 1px solid #28ae3a;
      color: #28ae3a;
      font-family: PingFang SC;
      height: 54px;
      line-height: 54px;
      text-align: center;
      width: 180px;
      border-radius: 30px;
      font-size: 28px;
      left: 24px;
      position: absolute;
    }
  }
}
</style>
