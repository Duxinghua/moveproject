<template>
  <div class="confirmorder">

    <van-cell-group v-if="orderType == 1">
      <van-field
        label="额外需求"
        v-model="refer.need"
        input-align="right"
        readonly
        placeholder="是否需要搬运服务"
        right-icon="arrow"
        @click="itemHandler('need')"
      />
      <van-field
        label="订单备注"
        v-model="refer.remarks"
        input-align="right"
        readonly
        placeholder="填写订单备注需求"
        right-icon="arrow"
        @click="itemHandler('remarks')"
      />
    </van-cell-group>
    <div
      class="orderwrap"
      v-if="orderType == 1"
    >
      <div class="itemtitle">
        订单联系人资料
      </div>
      <van-cell-group>
        <van-field
          label="预约服务时间"
          v-model="refer.time"
          input-align="right"
          readonly
          placeholder="请选择时间"
          right-icon="arrow"
          @click="itemHandler('time')"
        />
        <van-field
          label="姓名"
          v-model="refer.name"
          input-align="right"
          clearable
          placeholder="请输入联系人姓名"
          @click="itemHandler('name')"
          @blur="nameBlurHandler"
        />
        <van-field
          label="联系人电话"
          v-model="refer.phone"
          input-align="right"
          clearable
          placeholder="请输入联系人电话"
          @click="itemHandler('phone')"
          @blur="phoneHandler"
        />
      </van-cell-group>
    </div>
    <div
      class="orderwrap"
      v-if="orderType == 2"
    >
      <div class="itemtitle">
        基础服务
      </div>
      <div class="itemwraps">
        <div class="itemdiy"  @click="itemHandler('changecar')">
          <span class="itemlabel">已选车型</span>
          <span class="itemvalue">{{refer.carType}}</span>
          <van-icon
            name="arrow"
            color="#999999"
          />
        </div>
        <div class="itemdiy ld">
          <span class="itemlabel lm">需要搬运服务</span>
          <van-switch
            v-model="refer.moveHelp"
            active-color="#28ae3a"
            size="14"
            inactive-color="#999999"
            @change="safeChangeHandler"
          />
        </div>
      </div>
    </div>
    <div class="orderwrap" v-if="orderType == 2 && refer.moveHelp">
    <div class="itemtitle" >
        搬运楼层
      </div>
      <van-cell-group>
        <van-field
          label="发货地"
          v-model="refer.goodsend"
          input-align="right"
          readonly
          placeholder="请选择"
          right-icon="arrow"
          @click="itemHandler('goodsend')"
        />
        <van-field
          label="收货地"
          v-model="refer.goodreceive"
          input-align="right"
          readonly
          placeholder="请选择"
          right-icon="arrow"
          @click="itemHandler('goodreceive')"
        />
      </van-cell-group>
    </div>
    <div
      class="orderwrap"
      v-if="orderType == 2"
    >
      <div class="itemtitle">
        搬家信息
      </div>
      <div class="itemwraps itemwrapsmb">
        <div class="addresswrap">
          <div class="addressitem">
            <div class="ico">
            </div>
            <div class="add">
              <span class="a1" v-if="true">请填写搬出地址</span>
              <span class="a2" v-if="false">
                光谷鼎创国际
              </span>
              <span class="a3" v-if="false">
                湖北武汉
              </span>
            </div>
          </div>
          <div class="addressitem">
            <div class="ico red">
            </div>
            <div class="add">
              <span class="a1" v-if="true">请填写搬入地址</span>
              <span class="a2" v-if="false">
                光谷鼎创国际
              </span>
              <span class="a3" v-if="false">
                湖北武汉
              </span>
            </div>
          </div>
        </div>
        <div class="addresstime">
        <van-field
          label="预约时间"
          v-model="refer.time"
          input-align="right"
          readonly
          placeholder="请选择时间"
          right-icon="arrow"
          @click="itemHandler('time')"
        />
        </div>
      </div>
    </div>
    <div class="orderwrap2" v-if="orderType == 2">
      <van-field
        label="大件物品"
        v-model="refer.largeGoods"
        input-align="right"
        readonly
        placeholder="请选择"
        right-icon="arrow"
        @click="itemHandler('largeGoods')"
      />
      <van-field
        label="订单备注"
        v-model="refer.remarks"
        input-align="right"
        readonly
        placeholder="填写订单备注需求"
        right-icon="arrow"
        @click="itemHandler('remarks')"
      />
        <van-field
          label="姓名"
          v-model="refer.name"
          input-align="right"
          clearable
          placeholder="请输入联系人姓名"
          @click="itemHandler('name')"
          @blur="nameBlurHandler"
        />
        <van-field
          label="联系人电话"
          v-model="refer.phone"
          input-align="right"
          clearable
          placeholder="请输入联系人电话"
          @click="itemHandler('phone')"
          @blur="phoneHandler"
        />

    </div>
    <div class="couponwrap">
      <van-field
        label="选择优惠券"
        v-model="refer.coupon"
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
        v-model="refer.safe"
        active-color="#28ae3a"
        size="14"
        inactive-color="#999999"
        @change="safeChangeHandler"
      />
    </div>
    <div class="notice">具体上门时间以线下沟通为主</div>
    <div class="rulewrap">
      <van-checkbox
        v-model="refer.rulechecked"
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
        200
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
          200
        </div>
        <div class="paytypes">
          <div class="paytips">选择支付方式</div>
          <van-radio-group
            v-model="paytype"
            checked-color="#28ae3a"
          >
            <van-radio name="1">
              <div class="payitem">
                <img
                  src="../assets/images/alipay.png"
                  class="payico"
                />
                <span class="payname">支付宝支付</span>
              </div>
            </van-radio>
            <van-radio name="2">
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
                  src="../assets/images/bank.png"
                  class="payico"
                />
                <span class="payname">银联支付</span>
              </div>
            </van-radio>
          </van-radio-group>
          <div class="paymoney">
            立即支付
          </div>
        </div>
      </div>
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
    <!-- 楼层选择 -->
    <van-popup v-model="unitshow" round position="bottom" :style="{ 'min-height': '100px' }">
      <van-picker show-toolbar title="选择楼层" :columns="columns"  @cancel="cancelHandler" @confirm="confirmHandler" />
    </van-popup>

  </div>
</template>

<script>
export default {
  name: "Confirmorder",
  data() {
    return {
      refer:{
        need: "",
        remarks: "",
        time: "",
        name: "",
        phone: "",
        coupon: "",
        largeGoods:"请选择",
        carType: "请选择",
        safe: false,
        rulechecked: false,
        goodsend:'',
        goodsendobj:{},
        goodreceive:'',
        goodreceiveobj:{},
        moveHelp: false
      },
      cartObject:{},
      orderType: 1,
      payshow: false,
      paytype: 1,
      timeshow: false,
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2050, 10, 1),
      unitshow:false,
      flag:1,
      columns: [],
      goodWidthList:[],
      goodHeightList:[],
      housefloorList:[],
      phonepattern:/^1[3456789]\d{9}$/
    };
  },
  mounted() {
    if(localStorage.getItem('refer')){
      this.refer = JSON.parse(localStorage.getItem('refer'))
    }

    if (this.$route.query.remarks) {
      this.refer.remarks = this.$route.query.remarks;
    }
    this.orderType = localStorage.getItem('orderType')
    if(this.orderType == 1){
      var need = localStorage.getItem('need')
      if(need){
        this.refer.need = '是'
      }
    }else if(this.orderType == 2){
      this.cartObject = localStorage.getItem('cartObject') ? JSON.parse(localStorage.getItem('cartObject')) : {}
      this.refer.carType = this.cartObject ? this.cartObject.carName : '请选择'
      localStorage.setItem('refer',JSON.stringify(this.refer))
      this.getOther(false,'HOUSE_FLOOR')
      var large_goods = localStorage.getItem('large_goods')
      if(large_goods){
        large_goods = JSON.parse(large_goods)
        this.refer.largeGoods = '已选择'
        localStorage.setItem('refer',JSON.stringify(this.refer))
      }
    }

  },
  methods: {
    phoneHandler(){
      if(!/^1[3456789]\d{9}$/.test(this.refer.phone)){
        return this.$toast('请输入正确的手机号')
      }else{
        localStorage.setItem('refer',JSON.stringify(this.refer))
      }
    },
    nameBlurHandler(){
       localStorage.setItem('refer',JSON.stringify(this.refer))
    },
    safeChangeHandler(){
       localStorage.setItem('refer',JSON.stringify(this.refer))
    },
    getOther(flag,attachType){
      var data = {
        headSeqId:JSON.parse(localStorage.getItem('cartObject')).seqId,
        attachType:attachType
      }
      this.$api.carStyleDetFindMap(data).then((result)=>{
        if(result.code == 200){
          var obj = result.data
          var list1 = []
          var list2 = []
          var list3 = []
          Object.keys(obj).forEach((value)=>{
            if(value == '货物最长'){
              var o = obj[value][0]
              o.keyValue = value
              o.text = o.catItem
              list1.push(o)
            }else if(value == '货物最高'){
              var o = obj[value][0]
              o.keyValue = value
              o.text = o.catItem
              list2.push(o)
            }else if(value == '楼层'){
              var o = obj[value][0]
              o.keyValue = value
              o.text = o.catItem
              list3.push(o)
            }
          })
          if(flag){
            this.goodWidthList = list1
            this.goodHeightList = list2
          }else{
            this.housefloorList = list3
          }
        }
      })
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
    itemHandler(tag) {
      if (tag == "time") {
        this.timeshow = true;
      } else if (tag == "remarks") {
        this.$router.push({ path: "/ordernote" });
      } else if (tag == "need") {
        this.$router.push({ path: "/need" });
      } else if(tag == "goodsend"){
        this.flag = 1
        this.unitshow = true
        this.columns = this.housefloorList
      } else if(tag == 'goodreceive'){
        this.columns = this.housefloorList
        this.flag = 2
        this.unitshow = true
      } else if(tag == 'changecar'){
        this.$router.push({ path: "/cart",query:{type:'CHANGE_HOUSE',operCenter:JSON.parse(localStorage.getItem('local')).city}});
      } else if(tag == 'largeGoods'){
        this.$router.push({ path: "/bigitem" });
      }
    },
    cancelHandler(){
      this.unitshow = false
    },
    confirmHandler(e){
      if(this.flag == 1){
        this.refer.goodsend = e.text
        this.refer.goodsendobj = e
        localStorage.setItem('refer',JSON.stringify(this.refer))
      }else if(this.flag == 2){
        this.refer.goodreceive = e.text
        this.refer.goodreceiveobj = e
        localStorage.setItem('refer',JSON.stringify(this.refer))
      }
      this.unitshow = false
    },
    linkHandler(index) {
      if (index == 1) {
        this.$router.push({ path: "/agreement" });
      } else if (index == 2) {
        this.$router.push({ path: "/pricedetail" });
      }
    },
    timeCancel() {
      this.timeshow = false;
    },
    timeConfirm(e) {
      this.refer.time = this.DateFormat(e, "yyyy-MM-dd hh:mm:ss");
      localStorage.setItem('refer',JSON.stringify(this.refer))
      this.timeshow = false;
    },
    payTodo() {
      this.payshow = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.confirmorder {
  display: flex;
  flex-direction: column;
  background: #f5f6f7;
  min-height: 100vh;
  /deep/ .van-cell-group {
    width: 690px;
    margin: 30px auto;
    border-radius: 20px;
    overflow: hidden;
  }
  /deep/ .van-cell {
    border-radius: 20px;
    overflow: hidden;
  }
  /deep/ .van-field__right-icon {
    padding: 0px !important;
  }
  .orderwrap {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .itemwraps {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    overflow: hidden;
    background: white;
    padding: 0 18px 0 30px;
    box-sizing: border-box;
    width: 690px;
    margin: 30px auto;
    .itemdiy {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 90px;
      border-bottom: 1px solid #f5f6f7;
      .itemlabel {
        font-size: 18px;
        color: #333333;
      }
      .lm {
        margin-right: auto;
      }
      .itemvalue {
        font-size: 18px;
        color: #333333;
        margin-left: auto;
      }
      /deep/ .van-icon {
        font-size: 34px;
      }
    }
    .itemdiy:last-child {
      border-bottom: 1px solid transparent;
    }
    .ld {
      padding-right: 12px;
    }
    .addresswrap{
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 2;
      .addressitem{
        display: flex;
        flex-direction: row;
        align-items: center;
        min-height:90px;
        position: relative;
        .ico{
          width:10px;
          height:10px;
          background: white;
          border-radius: 50%;
          border:4px solid #28ae3a;
          margin-right:30px;
        }
        .red{
          border:4px solid #ff561e;
        }
        .add{
          display: flex;
          flex-direction: column;
          justify-content: center;
          .a1{
            font-size: 18px;
            color:#999999;
          }
          .a2{
            font-size: 34px;
            color:#333333;
            padding-top:30px;
          }
          .a3{
            font-size: 18px;
            color:#999999;
            padding-bottom: 30px;
          }
        }
      }
      .addressitem::after{
        position: absolute;
        right: 0;
        bottom: 0;
        content:'';
        height:2px;
        width:calc(100% - 60px);
        background: #f2f2f2;
      }
      .addressitem:nth-of-type(2) ::after{
        background: transparent;
      }
    }
    .addresswrap:after{
      position: absolute;
      content: '';
      top:25%;
      left:8px;
      width:1px;
      height:50%;
      z-index: -1;
      border-left:1px dashed #f2f2f2;
    }
    .addresstime{
      display: flex;
      position: relative;
      /deep/ .van-cell{
        padding-left:0px!important;
        padding-right:15px!important;
      }
    }
    .addresstime:after{
      position: absolute;
      top:0;
      left:-30px;
      height:1px;
      width:calc(100% + 46px);
      content:'';
      background:#f2f2f2;
    }
  }
  .itemwrapsmb{
    margin-bottom: 0px!important;
  }
  .orderwrap2{
    width:690px;
    margin:30px auto 0 auto;
    display: flex;
    flex-direction: column;
    /deep/ .van-cell{
      margin-bottom: 30px;
    }
  }
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
    margin-top: 30px;
    .safetitle {
      font-size: 18px;
      color: #333333;
    }
  }
  .couponwrap {
    width: 690px;
    margin: 0 auto;
  }
  .itemtitle {
    font-size: 18px;
    color: #999999;
    padding: 0 30px;
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
    z-index: 11111;
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
      border: 1px solid #999999;
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
  .payClass {
    height: 700px;
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
    border-bottom: 1px solid #f5f6f7;
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
}
</style>
