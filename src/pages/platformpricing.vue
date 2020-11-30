<template>
  <div class="platformpricing">
    <TopNav :menu="menutext" />
    <div class="itemtitle">
      工种选择
    </div>
    <van-cell-group>
      <van-field
        label="选择工种"
        v-model="worktype"
        input-align="right"
        :clearable="true"
        placeholder="请选择"
        right-icon="arrow"
        @click="itemHandler('worktype')"
      />
      <van-field
        label="订单备注"
        v-model="remark"
        input-align="right"
        readonly
        placeholder="填写订单备注需求"
        right-icon="arrow"
        @click="itemHandler('remark')"
      />
    </van-cell-group>
    <div class="itemtitle">
      需求填写
    </div>
    <van-cell-group>
      <div class="vanpos">
        <van-field
          label="请填写劳务工人数"
          v-model="workerUserCnt"
          type="number"
          input-align="right"
          placeholder="请填写人数"
          @input='helpInputHandler("workerUserCnt")'
          @click="itemHandler('workerUserCnt')"
        />
      </div>
      <van-field
        label="服务工期"
        v-model="worktimetype"
        input-align="right"
        readonly
        placeholder="请选择工期类型"
        right-icon="arrow"
        @input='helpInputHandler("worktimetype")'
        @click="itemHandler('worktimetype')"
      />
      <div class="vanposs">
      <van-field
        label="服务时间"
        v-if="worktimetype"
        v-model="workerTimeQty"
        input-align="right"
        type="number"
        placeholder="请填写服务时间"
        @input='helpInputHandler("workerTimeQty")'
        @click="itemHandler('workerTimeQty')"
      />
      <div class="vasss">{{worktimeobj.workUnit}}</div>
      </div>
      <van-field
        label="服务区域"
        v-model="areatext"
        input-align="right"
        readonly
        placeholder="请选择"
        right-icon="arrow"
        @click="itemHandler('area')"
      />
      <div class="adarea">
        <van-field
          v-model="address"
          rows="1"
          autosize
          clearable
          label="详细地址"
          type="textarea"
          @input='helpInputHandler("address")'
          placeholder="请输入详细地址"
        />
      </div>
    </van-cell-group>
    <div class="itemtitle">
      其他信息
    </div>
    <van-cell-group>
      <div class="vanpes">
        <van-field
          label="联系人"
          v-model="name"
          input-align="right"
          clearable
          placeholder="请输入联系人"
          @input='helpInputHandler("name")'
          @click="itemHandler('name')"
        />
        <van-field
          label="联系电话"
          v-model="phone"
          input-align="right"
          clearable
          placeholder="请输入联系电话"
          @input='helpInputHandler("phone")'
          @click="itemHandler('phone')"
        />
      </div>
      <van-field
        label="上门服务时间"
        v-model="time"
        input-align="right"
        clearable
        readonly
        right-icon="arrow"
        placeholder="请选择"
        @click="itemHandler('time')"
      />
      <div class="itemdiy">
        <span class="itemlabel lm">自定义价格</span>
        <van-switch
          v-model="diyprice"
          active-color="#28ae3a"
          size="14"
          inactive-color="#999999"
          @change="change"
        />
      </div>
      <div
        class="diyprice"
        v-if="diyprice"
      >
        <van-field
          label="¥"
          v-model="pricetext"
          input-align="left"
          clearable
          placeholder="请输入自定义价格"
          @input='helpInputHandler("diyprice")'
          @click="itemHandler('diyprice')"
          @change="change"
        />
      </div>
    </van-cell-group>
    <div class="couponwrap">
      <van-field
        label="选择优惠券"
        v-model="coupon"
        input-align="right"
        readonly
        placeholder="请选择优惠券"
        right-icon="arrow"
        @click="itemHandler('coupon')"
      />
    </div>
        <div class="safewrap">
      <div class="safetitle">号码保护</div>
      <van-switch
        v-model="safe"
        active-color="#28ae3a"
        size="14"
        inactive-color="#999999"
        @change="safeChangeHandler"
      />
    </div>
    <div class="number numberfix"   @click="itemHandler('goodrule')">
        <span>计费规则说明</span>
        <van-icon name="arrow" size="16" color="#999999" />
      </div>
    <div class="notice">具体上门时间以线下沟通为主</div>
    <div class="rulewrap">
      <van-checkbox
        v-model="rulechecked"
        icon-size="14"
        checked-color="#28ae3a"
        shape="square"
      >勾选即代理服从</van-checkbox>
      <span
        class="link"
        @click="linkHandler(1)"
      >《货搬搬用户协议》</span>
    </div>
    <div class="pricepay">
      <div class="priceb">
        <span>¥</span>
        {{money}}
      </div>
      <div
        class="priceinfo"
        @click="linkHandler(2)"
      >
        <span>价格明细</span>
        <van-icon
          name="arrow"
          color="#999999"
        />
      </div>
      <div
        class="paychoosebtn"
        @click="payTodo"
      >
        确认下单
      </div>
    </div>

    <!-- 选择工期 -->
    <van-popup
      v-model="worktimeShow"
      round
      position="bottom"
      :style="{ 'min-height': '100px' }"
    >
      <van-picker
        show-toolbar
        title="请选择工期类型"
        :columns="columns"
        @cancel="cancelHandler"
        @confirm="confirmHandler"
      />
    </van-popup>
    <!-- 选择区域 -->
    <van-popup
      v-model="areaShow"
      round
      position="bottom"
      :style="{ 'min-height': '100px' }"
    >
      <van-area
        title="选择区域"
        :area-list="areaList"
        :value="areavalue"
        @cancel="areacancelHandler"
        @confirm="areaconfirmHandler"
      />
    </van-popup>
    <!-- 时间 -->
    <van-popup
      v-model="timeshow"
      round
      position="bottom"
      :style="{'min-height':'100px'}"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择预约时间"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @cancel="timeCancel"
        @confirm="timeConfirm"
      />
    </van-popup>

    <!-- 优惠券 -->
    <van-popup
      v-model="couponshow"
      closeable
      position="bottom"
      :style="{'min-height':'100px'}"
    >
      <div class="couponlist">
        <div class="coupontitle">
          优惠券
        </div>
        <div class="couponwrap">
          <div
            class="couponitem"
            v-for="(item,index) in couponlist"
            :key="index"
            @click="couponHandler(item)"
          >
            <div class="couponleft">
              <div class="t1">
                <span>¥</span>
                <span>{{item.couponValue}}</span>
              </div>
              <div class="t2">
                满{{item.useCondition}}元减{{item.couponValue}}元
              </div>
            </div>
            <div class="couponright">
              <div class="c1">
               {{item.applicableName}}
              </div>
              <div class="c2">
                {{item.createDate}}
              </div>
            </div>
          </div>
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
    >
      <div class="payClass">
        <div class="paytprice">
          <span>¥</span>
          {{money_total}}
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
                  src="../assets/images/alipay.png"
                  class="payico"
                />
                <span class="payname">支付宝支付</span>
              </div>
            </van-radio>
            <van-radio name="2" v-if="isWx == 1">
              <div class="payitem">
                <img
                  src="../assets/images/weixin.png"
                  class="payico"
                />
                <span class="payname">微信支付</span>
              </div>
            </van-radio>
            <van-radio name="3" style="display:none">
              <div class="payitem">
                <img
                  src="../assets/images/bank.png"
                  class="payico"
                />
                <span class="payname">银联支付</span>
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

  </div>
</template>

<script>
import config from "@/utils/config.js"
import TopNav from "@/components/topnav.vue";
import areaList from "../utils/area.js";
export default {
  name: "platformpricing",
  components: {
    TopNav,
  },
  data() {
    return {
      isWx:2,
      name: "",
      time: "",
      phone: "",
      workerUserCnt: "",
      remark: "",
      worktype: "",
      areaShow: false,
      worktimetype: "",
      worktimeShow: false,
      timeshow: false,
      diyprice: false,
      rulechecked: false,
      pricetext: "",
      coupon: "",
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2050, 10, 1),
      address: "",
      areatext: "",
      areavalue: "",
      workerRegion: "",
      areaObj: [],
      areaList: areaList,
      money: 0,
      workerTimeQty: "",
      columns: [
      ],
      menutext: "发布需求",
      timetype: "",
      detail: {},
      couponshow: false,
      payshow: false,
      money_total:0,
      paytype:1,
      couponlist:[],
      payload:{},
      money_total_s:0,
      couponObj:{},
      safe:false,
      worktimeobj:{}
    };
  },
  created(){
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
    var detail = localStorage.getItem("detail");
    if (detail) {
      detail = JSON.parse(detail);
      this.name = detail.receiverName;
      this.phone = detail.receiverMobileNo;
      this.remark = detail.orderDescribe;
      this.workerUserCnt = detail.workerUserCnt;
      this.workerTimeQty = detail.workerTimeQty;
      this.worktimetype = detail.workTypeUnit;
      this.timetype = detail.workTypeUnit;
      this.address = detail.workerAddress;
      this.time = detail.orderDate;
      this.safe = detail.mobileProtected
      this.areatext = detail.areatext;
      this.workerRegion = detail.workerRegion;
      this.worktype = detail.workTypeName + "-" + detail.workTypeName2;
      this.getorderHeadCalcPrice();
    }
    this.payload = JSON.parse(localStorage.getItem('payload'))

    var worktype1 = localStorage.getItem("workTypeName");
    var worktype2 = localStorage.getItem("workTypeName2");
    console.log(worktype2,'works2')
    var remarks = localStorage.getItem("remarks");

    if (worktype1 && worktype2) {
      this.worktype = worktype1 + "-" + worktype2;
      this.getwork()
    } else {
      this.worktype = "请选择";
    }

    this.remark = remarks;
  },
  methods: {
    getwork(){
      var data = {
        workName:localStorage.getItem("workTypeName"),
        workName2:localStorage.getItem("workTypeName2")
      }
      this.$api.custWorkTypeFindPage(data).then((result) => {
        var s = result.list
        if(s.length){
          s.map((item) => {
            item.diy = item.workUnit
            item.text = item.workUnitDesc
          })
          this.columns = s
        }
      })
    },
    getCoupon(cb) {
      var orderType = localStorage.getItem("orderType");
      var data = {
        userId: this.payload.userId,
        applicableType: 'HIRE_WORKER',
        useCondition: this.money_total_s,
        pageno: 1,
        pagesize: 100,
      };
      this.$api.orderFindUserCoupon(data).then((result) => {
        this.couponlist = result.list

        cb(result.list)
      });
    },
    change() {
      if(!this.diyprice){
        this.pricetext = ''
        this.getorderHeadCalcPrice();
      }

    },
    getorderHeadCalcPrice() {
      console.log(this.worktype)
      var data = {
        orderDate: this.DateFormat(this.currentDate, "yyyy-MM-dd hh:mm:ss"),
        orderType: "ACTUAL_TIME",
        serverType: "HIRE_WORKER",
        ownerCity: localStorage.getItem("city"),
        priceType: this.diyprice ? "DISCUSS" : "STANDARD",
        receiverName: this.name,
        receiverMobileNo: this.phone,
        mobileProtected: this.safe,
        couponSeqId: null,
        couponName: null,
        couponMoney: 0,
        orderDescribe: this.remark,
        workTypeName: localStorage.getItem("workTypeName"),
        workTypeName2: localStorage.getItem("workTypeName2"),
        workTypeUnit: this.timetype,
        workerUserCnt: this.workerUserCnt,
        workerTimeQty: this.workerTimeQty,
        workerRegion: this.workerRegion,
        workerAddress: this.address,
      };
      if (data.priceType == "DISCUSS") {
        data.totalMoney = this.pricetext;
      }
      if(this.couponObj.seqId){
        data.couponSeqId = this.couponObj.seqId
        data.couponName = this.couponObj.applicableName
        data.couponMoney = this.couponObj.couponValue
      }
      this.detail = data;
      this.detail.areavalue = this.areavalue;
      this.detail.areatext = this.areatext;
      localStorage.setItem("detail", JSON.stringify(data));
      this.$api.orderHeadCalcPrice(data).then((result) => {
        if (result.code == 200) {
          this.money = result.data;
          this.money_total = result.data
          this.money_total_s = result.data
        }
      });
    },
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      } else if (type === "hour") {
        return `${val}时`;
      } else if (type == "minute") {
        return `${val}分`;
      }
      return val;
    },
    timeCancel() {
      this.timeshow = false;
    },
    timeConfirm(e) {
      this.time = this.DateFormat(e, "yyyy-MM-dd hh:mm:ss");
      this.timeshow = false;
      this.getorderHeadCalcPrice();
    },
    phoneFocusHandler(arg) {
      if (arg == "phone") {
        if (!/^1[0-9]{10}$/.test(this.phone)) {
          this.phone = "";
          return this.$toast("请输入正确的手机号");
        }
      }
    },
    helpInputHandler(tag) {

      if (tag == "workerUserCnt") {
        var worktype1 = localStorage.getItem("workTypeName");
        var worktype2 = localStorage.getItem("workTypeName2");
        if (!worktype1 || !worktype2) {
          this.workerUserCnt = "";
          return this.$toast("请选择工种");
        } else {
          this.workerUserCnt = this.workerUserCnt > 0 ? this.workerUserCnt : "";
          this.getorderHeadCalcPrice()
        }
      } else if (tag == "address") {
        if (!this.areatext) {
          this.address = "";
          return this.$toast("请选择省市区");
        }
        if (!this.workerTimeQty) {
          this.address = "";
          return this.$toast("请输入服务时间");
        }
      } else if (tag == "name") {
        if (!this.address) {
          this.name = "";
          return this.$toast("请输入详情地址");
        }
      } else if (tag == "phone") {
        if (!this.name) {
          this.phone = "";
          return this.$toast("请输入联系人");
        }
      }else if(tag == 'workerTimeQty'){
        if(!this.worktimetype){
          this.workerTimeQty = ''
          return this.$toast("请选择服务工期类型");
        }else{
          this.getorderHeadCalcPrice()
        }
      }else if(tag == 'diyprice'){
        this.getorderHeadCalcPrice()
      }
    },
    itemHandler(tag) {
      if (tag == "worktimetype") {
        if (this.workerUserCnt) {
          this.worktimeShow = true;
        } else {
          return this.$toast("请输入劳工人数");
        }
      } else if (tag == "area") {
        if (this.worktimetype) {
          this.areaShow = true;
        } else {
          return this.$toast("请选择服务工期");
        }
      } else if (tag == "time") {
        if (!this.phone) {
          return this.$toast("请输入联系方式");
        } else {
          if (!/^1[0-9]{10}$/.test(this.phone)) {
            this.phone = "";
            return this.$toast("请输入正确的手机号");
          } else {
            this.timeshow = true;
          }
        }
      } else if (tag == "worktype") {
        this.$router.push("/selectwork");
      } else if (tag == "remark") {
        var worktype1 = localStorage.getItem("workTypeName");
        var worktype2 = localStorage.getItem("workTypeName2");
        if (worktype1 && worktype2) {
          this.$router.push({ path: "/ordernote" });
        } else {
          return this.$toast("请先选择工种");
        }
      }else if(tag == "coupon"){
        this.getCoupon((data)=>{
         if(data.length){
           this.couponshow = true
         }else{
           return this.$toast("暂无优惠券");
         }
        })
      }else if(tag == 'goodrule'){
        this.$router.push({ path: "/priceinfo" });
      }
    },
    couponHandler(item){
      this.couponshow = false
      this.couponObj = item
      this.coupon = '已选优惠券'
      this.getorderHeadCalcPrice()
    },
    areacancelHandler() {
      this.areaShow = false;
    },
    cancelHandler() {
      this.worktimeShow = false;
    },
    areaconfirmHandler(e) {
      this.workerRegion = e[2].name;
      this.areavalue = e[0].code + "-" + e[1].code + "-" + e[2].code;
      this.areatext = e[0].name + "-" + e[1].name + "-" + e[2].name;
      this.areaObj = e;
      this.areaShow = false;
    },
    confirmHandler(e) {
      this.timetype = e.diy;
      this.worktimetype = e.text;
      this.worktimeShow = false;
      this.worktimeobj = e
      this.getorderHeadCalcPrice()
    },
    linkHandler(index) {
      if (index == 2) {
        localStorage.setItem("detail", JSON.stringify(this.detail));
        this.$router.push({ path: "/pricedetail", query: { index: 3 } });
      }
    },
    payTodo() {
      if (!this.rulechecked) {
        return this.$toast("请勾选货搬搬用户协议");
      } else {
        var data = this.detail;
        data.payMoney = this.money_total;
        data.refundMoney = 0;
        this.$api.orderHeadInsert(data).then((result) => {
          if (result.code == 200) {
            this.detail = result.data;
            this.payshow = true;
          }
        });
      }
    },
    alipay() {
      //支付宝
      var that = this
      localStorage.removeItem('detail')
      localStorage.removeItem("workTypeName");
      localStorage.removeItem("workTypeName2");
      localStorage.removeItem("remarks")
      if (this.paytype == 1) {
        window.location.href =
          config.apiurl+"/aliPay/wapPay?orderHeadSeqId=" +
          this.detail.seqId;
      }else if(this.paytype == 2){
        var data = {
          orderHeadSeqId:this.detail.seqId,
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
                  that.$router.push({ path: "/paysuccess" });
                console.log(res)
                // 支付成功后的回调函数
              },
              fail: function(res){
                console.log(res)
              }
            });

          }
        })
      }
    },
    safeChangeHandler() {
      this.getorderHeadCalcPrice();
    },
  },
};
</script>

<style lang="scss" scoped>
.platformpricing {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6f7;
  padding: 0 30px 200px 30px;
  box-sizing: border-box;
    .safewrap {
    width: 690px;
    height: 90px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: white;
    border-radius: 20px;
    overflow: hidden;
    padding: 0 30px;
    box-sizing: border-box;
    // margin-top: 30px;
    .safetitle {
      font-size: 28px;
      color: #333333;
    }
  }
  .itemtitle {
    font-size: 26px;
    color: #666666;
    margin-top: 30px;
    margin-bottom: 20px;
  }
  /deep/ .van-cell-group {
    border-radius: 20px;
    overflow: hidden;
  }
  /deep/ .van-cell {
    padding-right: 15px;
    display: flex;
    align-items: center;
  }
  /deep/ .van-field__label {
    width: 3.5rem;
  }
  /deep/ .van-button--small {
    width: 100%;
    height: 80px;
  }
  /deep/ .van-picker__cancel {
    color: #999999;
  }
  /deep/ .van-picker__confirm {
    color: #28ae3a;
  }
  .vanpos {
    /deep/ .van-cell {
      padding-right: 25px;
      display: flex;
      align-items: center;
    }
    /deep/ .van-field__body {
      position: relative;
    }
    /deep/ .van-field__control {
      padding-right: 24px;
    }
    /deep/ .van-field__body::after {
      position: absolute;
      content: "人";
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 28px;
      color:#333333;
    }
  }
  .vanposs{
    position: relative;
    display: flex;
    /deep/ .van-cell {
      padding-right: 90px;
      display: flex;
      align-items: center;
    }
    .vasss{
      position: absolute;
      right:28px;
      top:50%;
      transform: translateY(-50%);
       font-size: 28px;
      color:#333333;
    }
  }

  .adarea {
    /deep/ .van-field__control {
      text-align: right;
      padding-right: 14px;
    }
  }
  .vanpes {
    /deep/ .van-cell {
      padding-right: 28px;
    }
  }
  .itemdiy {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 90px;
    padding: 0 30px;
    box-sizing: border-box;
    border-bottom: 2px solid #f5f6f7;
    .itemlabel {
      font-size: 28px;
      color: #333333;
    }
    .lm {
      margin-right: auto;
    }
    .itemvalue {
      font-size: 28px;
      color: #333333;
      margin-left: auto;
    }
    /deep/ .van-icon {
      font-size: 34px;
    }
  }
  .diyprice {
    /deep/ .van-field__label {
      width: fit-content;
      margin-right: 15px;
    }
  }
  .couponwrap {
    width: 690px;
    margin: 30px auto;
    /deep/ .van-cell {
      border-radius: 20px;
      overflow: hidden;
    }
  }
  .notice {
    color: #999999;
    font-size: 28px;
    margin-top: 30px;
    text-align: center;
  }
  .rulewrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    /deep/ .van-checkbox__label {
      font-size: 28px;
      color: #999999;
    }
    .link {
      font-size: 28px;
      color: #28ae3a;
    }
  }
  .pricepay {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: white;
    height: 100px;
    box-shadow: 0 -2px 5px #f5f6f7;
    padding: 0 30px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 900;
    .priceb {
      font-size: 50px;
      color: #28ae3a;
      margin-right: 20px;
      span {
        font-size: 34px;
      }
    }
    .priceinfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 18px;
      color: #999999;
      justify-content: center;
      padding: 5px 15px;
      border-radius: 25px;
      border: 2px solid #999999;
    }
    .paychoosebtn {
      width: 250px;
      height: 70px;
      border-radius: 35px;
      overflow: hidden;
      background: #28ae3a;
      color: white;
      font-size: 35px;
      text-align: center;
      line-height: 70px;
      margin-left: auto;
    }
  }
  .couponlist {
    display: flex;
    flex-direction: column;
    .coupontitle {
      height: 100px;
      line-height: 100px;
      padding-left: 40px;
      width: 100%;
      font-size: 30px;
      color: #333333;
    }
    .couponwrap {
      width: 100%;
      height: 650px;
      background: #f5f6f7;
      padding: 30px;
      box-sizing: border-box;
      overflow-y: scroll;
      overflow-x: hidden;
      .couponitem {
        height: 200px;
        display: flex;
        flex-direction: row;
        border-radius: 20px;
        overflow: hidden;
        background: white;
        margin-bottom: 15px;
        .couponleft {
          width: 252px;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: 2px dashed #f5f6f7;
          .t1 {
            display: flex;
            flex-direction: row;
            align-items: flex-end;
            color: #ff561e;
            span:first-child {
              font-size: 25px;
              margin-right: 5px;
              margin-bottom: 5px;
            }
            span:last-child {
              font-size: 30px;
              font-weight: bold;
            }
          }
          .t2 {
            font-size: 25px;
            color: #888888;
          }
        }
        .couponright {
          flex: 1;
          height: 100%;
          padding: 0 30px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .c1 {
            font-size: 30px;
            color: #333333;
          }
          .c2 {
            font-size: 25px;
            color: #888888;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .payClass {
    min-height: 500px;
    display: flex;
    flex-direction: column;
    padding-top: 100px;
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
        font-size: 20px;
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
      .number{
      width:100%;
      height:90px;
      padding:0 30px;
      box-sizing: border-box;
      border-radius: 20px;
      overflow: hidden;
      background: white;
      margin-top:15px;
      font-size: 28px;
      color:#333333;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .labelwrap{
        display: flex;
        flex-direction: row;
        align-items: center;
        span{
          margin-right: 10px;
        }
      }
    }
    .numberfix{
      padding-right:10px;
      margin-top:30px;
    }
}
</style>
