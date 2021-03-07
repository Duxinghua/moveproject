<template>
  <div class="confirmorder">
    <TopNav :menu="menutext" page="home" />
    <van-cell-group v-if="orderType == 1">
      <van-field
        label="额外需求"
        v-model="refer.needtext"
        input-align="right"
        readonly
        :placeholder="refer.need"
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
          placeholder="请输入姓名"
          @click="itemHandler('name')"
          maxlength="10"
          @blur="nameBlurHandler"
        />
        <van-field
          label="联系人电话"
          v-model="refer.phone"
          input-align="right"
          clearable
          maxlength="11"
          placeholder="请输入电话"
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
        <div
          class="itemdiy"
          @click="itemHandler('gohomecar')"
        >
          <span class="itemlabel">已选车型</span>
          <span class="itemvalue">{{refer.carType}}</span>
          <van-icon
            name="arrow"
            color="#999999"
          />
        </div>
        <div class="itemdiy ld">
          <span class="itemlabel lm">需要大件搬运服务</span>
          <van-switch
            v-model="refer.moveHelp"
            active-color="#28ae3a"
            size="14"
            inactive-color="#999999"
            @change="moveChangeHandler"
          />
        </div>
      </div>
    </div>
    <div
      class="orderwrap"
      v-if="orderType == 2 && refer.moveHelp"
    >
      <div class="itemtitle">
        搬运楼层
      </div>
      <van-cell-group>
        <van-field
          label="搬出楼层"
          v-model="refer.goodsend"
          input-align="right"
          readonly
          placeholder="请选择"
          right-icon="arrow"
          @click="itemHandler('goodsend')"
        />
        <van-field
          label="搬入楼层"
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
          <div
            class="addressitem"
            @click="itemHandler('chooseaddress',index)"
            v-for="(item,index) in adList"
            :key="index"
            v-if="index < 2"
          >
            <div :class="['ico',index == 1 ? 'red' :'']">
            </div>
            <div class="add">
              <span
                class="a1"
                v-if="!item.name"
              >请填写搬出地址</span>
              <span
                class="a2"
                v-if="item.name"
              >
                {{item.name}}
              </span>
              <span
                class="a3"
                v-if="item.name"
              >
                {{item.address}}
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
    <div
      class="orderwrap2"
      v-if="orderType == 2"
    >
      <van-field
        v-if="refer.moveHelp"
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
        placeholder="搬家物品及图片备注"
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
        maxlength="10"
        @blur="nameBlurHandler"
      />
      <van-field
        label="联系人电话"
        v-model="refer.phone"
        input-align="right"
        clearable
        maxlength="11"
        placeholder="请输入联系人电话"
        @click="itemHandler('phone')"
        @blur="phoneHandler"
      />

    </div>
    <div
      class="need"
      v-if="orderType == 4"
    >
      <div class="needtitle">
        计价方式
      </div>
      <div class="needprice">
        <van-radio-group
          v-model="priceType"
          checked-color="#28ae3a"
          @change="priceTypeChange"
        >
          <van-radio
            name="STANDARD"
            style="display:none"
          >
            <!--             @click="getPlatformHandler" -->
            <div class="payitem">
              <span class="payname">平台标准计价</span>
              <van-icon
                name="warning-o"
                color="#333333"
                size="18"
              />
            </div>
          </van-radio>
          <van-radio name="DISCUSS">
            <div class="payitem">
              <span class="payname">与司机协商计价</span>
            </div>
          </van-radio>
        </van-radio-group>
      </div>

    <div
      class="orderwrap" style="margin-top:0.6rem"
    >
      <div class="itemtitle" style="padding-left:0px!important">
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
          maxlength="10"
        />
        <van-field
          label="联系人电话"
          v-model="refer.phone"
          maxlength="11"
          input-align="right"
          clearable
          placeholder="请输入联系人电话"
          @click="itemHandler('phone')"
          @blur="phoneHandler"
        />
      </van-cell-group>
    </div>



      <div
        class="otherwrap"
        v-if="otherList.length"
      >
        <div class="needtitle needtitlefix">
          其他服务
        </div>
        <van-checkbox-group
          v-model="serverArr"
          @change="serverArrHandler"
        >
          <van-checkbox
            :name="item.seqId"
            checked-color="#28ae3a"
            v-for="(item,index) in otherList"
            :key="index"
          >
            <div class="severitem">
              <span>{{item.catItem}}</span>
              <div :class="['fee',item.price == 0 ? 'gray': '']">
                {{item.remarks ? item.remarks : '免费'}}
              </div>
            </div>
          </van-checkbox>
        </van-checkbox-group>
      </div>
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
        disabled
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
        @change="rulecheckHandler"
      >勾选即同意服从</van-checkbox>
      <span
        class="link"
        @click="linkHandler(1)"
      >《货搬搬用户协议》</span>
    </div>
    <div class="pricepay">
      <div class="priceb">
        <span>¥</span>
        {{money_total}}
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
      @close="changeHandler"
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
            <van-radio name="3" >
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
    <van-popup
      v-model="unitshow"
      round
      position="bottom"
      :style="{ 'min-height': '100px' }"
    >
      <van-picker
        show-toolbar
        title="选择楼层"
        :columns="columns"
        @cancel="cancelHandler"
        @confirm="confirmHandler"
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

  </div>
</template>

<script>
import config from "@/utils/config.js"
import TopNav from "@/components/topnav.vue";
export default {
  name: "Confirmorder",
  components: {
    TopNav,
  },
  data() {
    return {
      isWx:2,
      priceType: "DISCUSS",
      types:'datetime',
      refer: {
        need: "请选择计价方式和服务",
        remarks: "",
        time: "",
        name: "",
        phone: "",
        coupon: "",
        largeGoods: "请选择",
        carType: "请选择",
        safe: true,
        rulechecked: false,
        goodsend: "",
        goodsendobj: {},
        goodreceive: "",
        goodreceiveobj: {},
        moveHelp: false,
        couponObj:{}
      },
      cartObject: {},
      orderType: 1,
      payshow: false,//
      paytype: 1,
      timeshow: false,
      currentDate: new Date(),
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2050, 10, 1),
      unitshow: false,
      flag: 1,
      columns: [],
      goodWidthList: [],
      goodHeightList: [],
      housefloorList: [],
      attachPriceObj: {},
      phonepattern: /^1[3456789]\d{9}$/,
      serverType: {
        1: "PULL_CARGO", //拉货
        2: "CHANGE_HOUSE", //搬家
        3: "HIRE_WORKER", //劳务工
        4: "RENT_CAR", //租车
      },
      money_total: 0,
      money_total_s:0,
      adList: [
        {
          name: "",
          address: "",
          center:"",
          obj:""
        },
        {
          name: "",
          address: "",
          center:"",
          obj:""
        },
      ],
      platform: {
        attachType: "STAND1",
        goodwidth: "",
        goodwidthobj: {},
        goodheight: "",
        goodheightobj: {},
        goodsend: "",
        goodsendobj: {},
        goodreceive: "",
        goodreceiveobj: {},
        goodnumber: 1,
        attachPriceObj: {},
      },
      serverArr: [],
      otherList: [],
      detail: {},
      menutext: "确认订单",
      couponshow: false,
      popshow:false,
      payload: {},
      couponlist:[],
      current_id:''
    };
  },
  created(){

  },
  watch:{
    refer:{
      handler(data){
        localStorage.setItem("refer", JSON.stringify(data));
      },
      deep:true
    }
  },
  mounted() {
    //处理时间
    var placeOrder = localStorage.getItem('placeOrder')
    var orderType = localStorage.getItem('orderType')
    if(orderType == 1 || orderType == 4){
      if(placeOrder == 'APPOINTMENT'){
         var Dates = new Date()
         var year = Dates.getFullYear()
         var month = Dates.getMonth()
         var day = Dates.getDate()
         this.minDate = new Date(year, month, day)
         this.maxDate = new Date(year, month, day,23,59,59)
      }else{
                var Dates = new Date()
         var year = Dates.getFullYear()
         var month = Dates.getMonth()
         var day = Dates.getDate()
         this.minDate = new Date(year, month, day)
      }
    }else{
              var Dates = new Date()
         var year = Dates.getFullYear()
         var month = Dates.getMonth()
         var day = Dates.getDate()
         this.minDate = new Date(year, month, day)
    }
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
        }else{

        }
      })
    } else {
      localStorage.setItem("isWeixin", 2);
    }
    this.isWx = localStorage.getItem('isWeixin')
    this.payload = JSON.parse(localStorage.getItem("payload"));
    if (localStorage.getItem("refer")) {
      this.refer = JSON.parse(localStorage.getItem("refer"));
    }
    //租车用
    var serverArr = localStorage.getItem('serverArr')
    if(serverArr){
      serverArr = JSON.parse(serverArr)
      this.serverArr = serverArr
    }
    if (this.$route.query.remarks) {
      this.refer.remarks = this.$route.query.remarks;
    }else{
      this.refer.remarks = localStorage.getItem('remarks')
    }
    //计算距离 不计算
    // var adList = localStorage.getItem("adList");
    // if (adList) {
    //   adList = JSON.parse(adList);
    //   this.adList = adList;
    //   var arr = [];
    //   adList.map((item) => {
    //     if (item.center) {
    //       var il = JSON.parse(item.center);
    //       console.log(il);
    //       arr.push(il);
    //     }
    //   });
    //   console.log(arr);
    //   if (arr.length > 1) {
    //     // return this.$toast("请认真选择发货或收货地址");
    //     var dis = AMap.GeometryUtil.distanceOfLine(arr);
    //     localStorage.setItem("routeKilometer", dis);
    //   }
    // }
    this.orderType = localStorage.getItem("orderType");
    if (this.orderType == 1) {
      var need = localStorage.getItem("need");
      if (need) {
        this.refer.need = "已选择";
        this.refer.needtext = "已选择"
      }else{
        this.refer.need = "请选择计价方式和服务";
      }
    } else if (this.orderType == 1) {
      this.cartObject = localStorage.getItem("cartObject")
        ? JSON.parse(localStorage.getItem("cartObject"))
        : {};
      this.refer.carType = this.cartObject ? this.cartObject.carName : "请选择";
      localStorage.setItem("refer", JSON.stringify(this.refer));
      this.getOther(true, "HOUSE_FLOOR");
      var large_goods = localStorage.getItem("large_goods");
      if (large_goods) {
        large_goods = JSON.parse(large_goods);
        this.refer.largeGoods = "已选择";
        localStorage.setItem("refer", JSON.stringify(this.refer));
      }
    } else if (this.orderType == 2) {
      this.cartObject = localStorage.getItem("cartObject")
        ? JSON.parse(localStorage.getItem("cartObject"))
        : {};

      this.refer.carType = this.cartObject ? this.cartObject.carName : "请选择";

      this.getOther(true, "STAND1");
      this.getjs()
      var large_goods = localStorage.getItem("large_goods");
      if (large_goods) {
        large_goods = JSON.parse(large_goods);
        if (large_goods.total) {
          this.refer.largeGoods = "已选择";
        } else {
          this.refer.largeGoods = "";
        }
      }
    }else if (this.orderType == 4){
      this.priceType = 'DISCUSS'
    }
    this.getOther(false, "OTHER");
    if(this.orderType != 2 || this.orderType != 3){
      this.CalcSimplePrice();
    }

  },
  methods: {
        cal(){
      this.popshow = false
        this.$toast('取消支付')
        this.$router.push({path:'/myorder'})

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
                 that.$router.push({path:'/myorder'})

              }else{
                 that.$toast('支付失败')
                 that.$router.push({path:'/myorder'})
              }
            });
    },
    changeHandler(){
      this.$router.push({path:'/myorder'})
    },
    clearLo(){
      localStorage.removeItem('otherList')
      localStorage.removeItem('platform')
      localStorage.removeItem('serverArr')
      localStorage.removeItem('need')
      localStorage.removeItem('adList')
      localStorage.removeItem('refer')
      localStorage.removeItem('remarks')
      localStorage.removeItem('routeKilometer')
      localStorage.removeItem('cartObject')
      localStorage.removeItem('sCar')
      localStorage.removeItem('large_goods')
      localStorage.removeItem('fileList')
    },
    getjs(){
      var list = localStorage.getItem("adList");
      if (list) {
        var indexs = 0;
        var arr = [];
        list = JSON.parse(list);
        console.log(list,'list')
        this.adList = list;
        this.adList.map((item)=>{
          if(item.obj){
            item.name = item.obj.formattedAddress
            item.address = item.obj.infos
          }
          if(item.center.length > 2){
            var il = JSON.parse(item.center)
            if(il.length){
              indexs += 1
              arr.push({
                longitude:il[0],
                latitude:il[1]
              });
            }
          }
        })
        if(indexs == 2){
          this.$api.getDistance(arr).then((result)=>{
            if(result.code == 200){
                localStorage.setItem("routeKilometer", result.data);
                this.CalcSimplePrice()
            }else{
               this.$toast(result.msg);
            }

          })
        }
      }
    },
    getCoupon(cb) {
      var orderType = localStorage.getItem("orderType");
      var data = {
        userId: this.payload.userId,
        applicableType: this.serverType[orderType],
        useCondition: this.money_total_s,
        pageno: 1,
        pagesize: 100,
      };
      this.$api.orderFindUserCoupon(data).then((result) => {
        this.couponlist = result.list

        cb(result.list)
      });
    },
    priceTypeChange(e) {},
    serverArrHandler(e) {
      if(!this.refer.time){
        return this.$toast('请选择预约服务时间')
      }
      if(!this.refer.name){
        return this.$toast('请输入姓名')
      }
      if(!this.refer.phone){
        return this.$toast('请输入手机号')
      }else{
        if (!/^1[0-9]{10}$/.test(this.refer.phone)) {
          this.refer.phone = "";
          return this.$toast("请输入正确的手机号");
        }
      }


      localStorage.setItem("serverArr", JSON.stringify(e));
      var otherList = localStorage.getItem("otherList");
      if (otherList) {
        otherList = JSON.parse(otherList);
        otherList.map((item) => {
          e.map((sitem) => {
            console.log(item.seqId,'sitem')
            if (sitem == item.seqId) {
              item.checked = true;
            }else{
              item.checked = false;
            }
          });
        });
        //localStorage.setItem("otherList", JSON.stringify(otherList));
      }
      // this.CalcSimplePrice();
    },
    rulecheckHandler(){
      this.CalcSimplePrice()
    },
    //获取优惠券
    CalcSimplePrice() {
      //订单类型
      var orderType = localStorage.getItem("orderType");
      //已选车型
      var cartObject = JSON.parse(localStorage.getItem("cartObject"));
      //开通地区
      var city = localStorage.getItem("city");
      //距离
      var routeKilometer = parseFloat(localStorage.getItem("routeKilometer"));
      //地址列表
      var adlist = localStorage.getItem("adList");
      if(adlist){
        adlist = JSON.parse(adlist)
        console.log(adlist,'adlist')
        var orderRouteList = [];
        if(adlist.length){
          adlist.map((item, index) => {
            if(item.center.length > 2){
              var locations = JSON.parse(item.center);
              if (locations) {
                var obj = {
                  address1: item.obj.formattedAddress,
                  address2: item.obj.infos,
                  longitude: locations[0],
                  latitude: locations[1],
                  sort: index + 1,
                };
                orderRouteList.push(obj);
              }
            }else{
              return
            }
          });
        }else{
          return
        }
      }
      //大物件
      var largeGoodsCnt = 0;
      var attachPrice = 0;
      var attachType = "";
      var priceType = "";
      var orderPriceList = [];
      //其他服务
      var otherListServer = localStorage.getItem("otherList");
      //平台类型选择
      //标准及协商选择
      var need = localStorage.getItem("need");
      if (need) {
        need = JSON.parse(need);
        var need_type = Object.keys(need);
        if (need_type.length) {
          priceType = need.priceType;
        }
      }
      if(localStorage.getItem('orderType') == 4){
        priceType = 'DISCUSS'
      }

      if(localStorage.getItem('orderType') == 2){
        priceType = 'STANDARD'
      }

      if (otherListServer) {
        otherListServer = JSON.parse(otherListServer);
        otherListServer.map((item) => {
          var obj = {
            refSeqId: item.seqId,
            propName: item.catItem,
            checked: item.checked,
          };
          orderPriceList.push(obj);
        });
      }
      //平台服务
      var platform = localStorage.getItem("platform");
      if (platform) {
        platform = JSON.parse(platform);
        console.log(platform, "goodheightobj");
        if (priceType == "STANDARD") {
          //货物高度
          var k1 = Object.keys(platform.goodheightobj);
          console.log(k1, "k1");
          if (k1.length) {
            var obj = {
              refSeqId: platform.goodheightobj.seqId,
              propName: platform.goodheightobj.catType,
            };
            orderPriceList.push(obj);
          }
          //货物宽度
          var k2 = Object.keys(platform.goodwidthobj);
          if (k2.length) {
            var obj = {
              refSeqId: platform.goodwidthobj.seqId,
              propName: platform.goodwidthobj.catType,
            };
            orderPriceList.push(obj);
          }
          //发货楼层
          var k3 = Object.keys(platform.goodsendobj);
          if (k3.length) {
            var obj = {
              refSeqId: platform.goodsendobj.seqId,
              propName: platform.goodsendobj.catType,
            };
            orderPriceList.push(obj);
          }
          //接收楼层
          var k4 = Object.keys(platform.goodreceiveobj);
          if (k4.length) {
            var obj = {
              refSeqId: platform.goodreceiveobj.seqId,
              propName: platform.goodreceiveobj.catType,
            };
            orderPriceList.push(obj);
          }
        }
        //大物件
        largeGoodsCnt = platform.goodnumber;
        //基础搬运费
        var k5 = Object.keys(platform.attachPriceObj);
        if (k5.length) {
          attachPrice = platform.attachPriceObj.price;
        }
        //标准选车 大小 platformstandard
        attachType = platform.attachType;
      }else{
        if(localStorage.getItem('orderType') == 1){
            priceType = 'DISCUSS'
            if(this.serverArr.length){
              this.refer.need = "已选择";
               this.refer.needtext = "已选择"
            }else{
               this.refer.need = "请选择计价方式和服务";
            }
        }
      }

      //根据时间分订单类型
      var placeOrder = localStorage.getItem("placeOrder");

      var data = {
        orderType: placeOrder,
        serverType: this.serverType[orderType],
        carTypeSeqId: cartObject.seqId ? cartObject.seqId :'',
        carType: cartObject.carType,
        priceType: priceType,
        ownerCity: city,
        routeKilometer: routeKilometer,
        orderRouteList: orderRouteList,
        orderPriceList: orderPriceList,
        largeGoodsCnt: largeGoodsCnt,
        attachPrice: attachPrice,
        orderDescribe: this.refer.remarks,
        couponSeqId: null,
        couponName: null,
        couponMoney: 0,
        mobileProtected: this.refer.safe,
        receiverName: this.refer.name,
        receiverMobileNo: this.refer.phone,
        orderDate: this.refer.time,
      };
      if(this.refer.couponObj){
        data.couponSeqId = this.refer.couponObj.seqId
        data.couponMoney = this.refer.couponObj.couponValue
      }
      if (data.serverType == "PULL_CARGO") {
        data.needTransfer = false;
      }
      if (attachType) {
        data.attachType = attachType;
      }
      if (data.serverType == "CHANGE_HOUSE") {
        data.orderType = "ACTUAL_TIME";
        var orderPicList = localStorage.getItem("fileList");
        if (orderPicList) {
          var imglist = [];
          orderPicList = JSON.parse(orderPicList);
          orderPicList.map((item) => {
            var obj = {
              picUrl: item.viewUrl,
            };
            imglist.push(obj);
          });
        }
        data.orderDate = this.refer.time;
        data.orderPicList = imglist;
        data.needTransfer = this.refer.moveHelp ? true : false;
        if (data.needTransfer) {
          var s = this.refer.goodsendobj;
          var s1 = Object.keys(s);
          if (s1.length) {
            var obj = {
              refSeqId: s.seqId,
              propName: s.catType,
            };
            data.orderPriceList.push(obj);
          }
          var r = this.refer.goodreceiveobj;
          var r1 = Object.keys(r);
          if (r1.length) {
            var obj = {
              refSeqId: r.seqId,
              propName: r.catType,
            };
            data.orderPriceList.push(obj);
          }
          var large_goods = localStorage.getItem("large_goods");
          if (large_goods) {
            large_goods = JSON.parse(large_goods).resObj;
            Object.keys(large_goods).map((item) => {
              large_goods[item].map((sitem) => {
                if (sitem.number) {
                  var obj = {
                    refSeqId: sitem.seqId,
                    propName: sitem.catType,
                    qty: sitem.number,
                  };
                  data.orderPriceList.push(obj);
                }
              });
            });
          }
        }

      }
      this.detail = data;
      this.$api.orderHeadCalcPrice(data).then((result) => {
        if (result.code == 200) {
          this.money_total = result.data;
          this.money_total_s = result.data
        }
      });
    },
    phoneHandler() {
      var orderType = localStorage.getItem('orderType')
      if(orderType == 2 || orderType == 1){
        if(!this.refer.name){
          return this.$toast("请输入姓名");
        }
        if(!this.refer.time){
          return this.$toast("请选择预约时间");
        }
      }
      if (!/^1[3456789]\d{9}$/.test(this.refer.phone)) {
        return this.$toast("请输入正确的手机号");
      } else {
        localStorage.setItem("refer", JSON.stringify(this.refer));
       // this.CalcSimplePrice();
      }

    },
    nameBlurHandler() {
      var orderType = localStorage.getItem('orderType')
      var adList = localStorage.getItem('adList')
      if(orderType == 2){
        if(adList){
          adList = JSON.parse(adList)
          var flag = false
          adList.map((item) => {
            if(item.center.length == 0){
              flag = true
            }
          })
          if(flag){
            return this.$toast('请选择搬家信息中的地址')
          }
        }
        if(!this.refer.time){
          return this.$toast('请输入预约时间')
        }
      }
      localStorage.setItem("refer", JSON.stringify(this.refer));
      //this.CalcSimplePrice();
    },
    moveChangeHandler(){
      if(this.moveHelp){
        this.flag = 1
      }
    },
    safeChangeHandler() {
      localStorage.setItem("refer", JSON.stringify(this.refer));
      this.CalcSimplePrice();
    },
    getOther(flag, attachType) {
      if(!localStorage.getItem("cartObject")){
        return
      }
      var data = {
        headSeqId: JSON.parse(localStorage.getItem("cartObject")).seqId,
        attachType: attachType,
      };
      var that = this;
      this.$api.carStyleDetFindMap(data).then((result) => {
        if (result.code == 200) {
          var obj = result.data;
          var list1 = [];
          var list2 = [];
          var list3 = [];
          var list4 = {};
          var list5 = [];
          // attachType != "OTHER"
          if (flag) {
            Object.keys(obj).forEach((value) => {
              if (value == "货物最长") {
                var o = obj[value][0];
                o.keyValue = value;
                o.text = o.catItem;
                list1.push(o);
              } else if (value == "货物最高") {
                var o = obj[value][0];
                o.keyValue = value;
                o.text = o.catItem;
                list2.push(o);
              } else if (value == "楼层") {
                var o = obj[value];
                var lists = [];
                o.map((item) => {
                  item.text =
                    item.remarks +
                    " " +
                    item.catItem +
                    "楼 " +
                    (item.price == 0 ? "免费" : "¥" + item.price);
                  lists.push(item);
                });
                list3 = lists;
              } else if (value == "基础帮运费") {
                var o = obj[value][0];
                o.keyValue = value;
                o.text = o.catItem;
                list4 = o;
              }
            });
          } else {
            var obj = result.data;
            var list = [];
            Object.keys(obj).forEach((value) => {
              var o = obj[value][0];
              o.keyValue = value;
              o.checked = false;
              list.push(o);
            });
            this.otherList = list;
            var serverArr = localStorage.getItem("serverArr")
            if(serverArr){
              serverArr = JSON.parse(serverArr)
              this.otherList.map((item) => {
                serverArr.map((sitem) => {
                  if(item.seqId == sitem){
                    item.checked = true
                  }else{
                    item.checked = false
                  }
                })
              })
               localStorage.setItem("otherList", JSON.stringify(this.otherList));
            }else{
              localStorage.setItem("otherList", JSON.stringify(this.otherList));
            }
          }
          if (flag) {
            that.goodWidthList = list1;
            that.goodHeightList = list2;
            that.housefloorList = list3;
            console.log(list3,'s')
          }

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
    itemHandler(tag, index) {
      var orderType = localStorage.getItem('orderType')
      var platform = localStorage.getItem('platform')
      var adList = localStorage.getItem('adList')
      if (tag == "time") {
        if(orderType == 1){
          if(this.priceType == 'STANDARD'){
            if(platform){
              platform = JSON.parse(platform)
              if(!platform.goodwidth){
                return this.$toast('请选择货物最长')
              }
              if(!platform.goodheight){
                return this.$toast('请选择货物最高')
              }
              if(!platform.goodsend){
                return this.$toast('请选择搬运楼层发货地')
              }
              if(!platform.goodreceive){
                return this.$toast('请选择搬运楼层收货地')
              }
            }

          }
        }else if(orderType == 2){

          this.getjs()
        }else if(orderType == 4){
         var Dates = new Date()
         var year = Dates.getFullYear()
         var month = Dates.getMonth()
         var day = Dates.getDate()
         this.minDate = new Date(year, month, day)
        }
        this.timeshow = true;
      } else if (tag == "remarks") {
        this.$router.push({ path: "/ordernote" });
      } else if (tag == "need") {
        this.$router.push({ path: "/need" });
      } else if (tag == "goodsend") {
        this.flag = 1;
        this.unitshow = true;
        console.log(this.housefloorList,'sss11')
        this.columns = this.housefloorList;
      } else if (tag == "goodreceive") {
        this.columns = this.housefloorList;
        this.flag = 2;
        this.unitshow = true;
      } else if (tag == "changecar") {
        this.$router.push({
          path: "/cart",
          query: {
            type: "CHANGE_HOUSE",
            operCenter: JSON.parse(localStorage.getItem("local")).city,
          },
        });
      } else if (tag == "largeGoods") {
        this.$router.push({ path: "/bigitem" });
      } else if (tag == "gohomecar") {
        this.$router.push({ path: "/" });
      } else if (tag == "chooseaddress") {
        this.$router.push({ path: "/chooseaddress", query: { index: index ,path:"chooseaddress"} });
      } else if(tag == "coupon"){
        this.getCoupon((data)=>{
          if(data.length){
            this.couponshow = true
          }else{
            return this.$toast('暂无优惠券')
          }
        })
      }
    },
    couponHandler(item){
      this.refer.couponObj = item
      this.couponshow = false
      this.refer.coupon = '已选优惠券'
      this.CalcSimplePrice()
    },
    cancelHandler() {
      this.unitshow = false;
    },
    confirmHandler(e) {
      if (this.flag == 1) {
        this.refer.goodsend = e.text;
        this.refer.goodsendobj = e;
        localStorage.setItem("refer", JSON.stringify(this.refer));
      } else if (this.flag == 2) {
        this.refer.goodreceive = e.text;
        this.refer.goodreceiveobj = e;
        localStorage.setItem("refer", JSON.stringify(this.refer));
      }
      this.unitshow = false;
      this.CalcSimplePrice()
    },
    linkHandler(index) {
      if (index == 1) {
        this.$router.push({ path: "/agreement" });
      } else if (index == 2) {
        if(this.money_total != 0){
          localStorage.setItem("detail", JSON.stringify(this.detail));
          this.$router.push({
            path: "/pricedetail"
          });
        }
      }
    },
    timeCancel() {
      this.timeshow = false;
    },
    timeConfirm(e) {
      this.refer.time = this.DateFormat(e, "yyyy-MM-dd hh:mm:ss");
      localStorage.setItem("refer", JSON.stringify(this.refer));
      this.timeshow = false;
      //this.CalcSimplePrice();
    },
    payTodo() {
      var orderType = localStorage.getItem('orderType')
      if(orderType == 2){
        this.getjs()
      }
      this.CalcSimplePrice()
      setTimeout(()=>{

      if(orderType == 1 || orderType == 4 || orderType == 2){
        if(!this.detail.receiverName){
          return this.$toast('请输入姓名')
        }
        if(!this.detail.receiverMobileNo){
          return this.$toast('请输入手机号')
        }else{
          if(!/^1[3456789]\d{9}$/.test(this.detail.receiverMobileNo)){
            this.refer.phone = ''
            this.detail.receiverMobileNo = ''
             return this.$toast('请输入正确的手机号')
          }
        }

      }
      if(orderType == 1){
         if(this.refer.needtext != "已选择"){
           return this.$toast('请选择额外需求')
         }
        if(!this.detail.orderDate){
          return this.$toast('请选择预约服务时间')
        }
      }
      if(orderType == 2){
        var adList = localStorage.getItem('adList')
        if(adList){
          adList = JSON.parse(adList)
          var flag = false
          adList.map((item) => {
            if(item.center.length == 0){
              flag = true
            }
          })
          if(flag){
            return this.$toast('请选择搬家信息中的地址')
          }
        }
        if(!this.refer.time){
          return this.$toast('请输入预约时间')
        }
        if(!this.detail.routeKilometer){
           return this.$toast('请选择搬家信息中的地址')
        }
        if(this.refer.moveHelp){
          if(this.detail.orderPriceList.length == 0){
            return this.$toast('请选择搬运楼层')
          }
        }
      }
      if(orderType == 4){
        if(!this.detail.orderDate){
          return this.$toast('请选择预约服务时间')
        }
      }
      var ot =  localStorage.getItem('time')
      if(ot){
        var diff = new Date().getTime() - 60*1000 > ot
        if(!diff){
            return this.$toast('一分钟之内只能下一单')
        }
      }
      if(!this.refer.rulechecked){
        return this.$toast('请勾选货搬搬用户协议')
      }


        var data = this.detail;
        data.payMoney = this.money_total;
        this.$api.orderHeadInsert(data).then((result) => {
          if (result.code == 200) {
            localStorage.setItem('time',new Date().getTime())
            this.clearLo()
            this.detail = result.data;
            this.payshow = true;
          }
        });


      },1000)

    },
    // onBridgeReady(data){
    //   WeixinJSBridge.invoke(
    //       'getBrandWCPayRequest', {
    //         "appId":data.appId,     //公众号名称，由商户传入
    //         "timeStamp":data.timeStamp,         //时间戳，自1970年以来的秒数
    //         "nonceStr":data.nonceStr, //随机串
    //         "package":data.package,
    //         "signType":data.signType,         //微信签名方式：
    //         "paySign":data.paySign //微信签名
    //       },
    //       function(res){
    //       if(res.err_msg == "get_brand_wcpay_request:ok" ){
    //       // 使用以上方式判断前端返回,微信团队郑重提示：
    //             //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
    //             console.log(1,res)
    //       }else{
    //          console.log(res)
    //       }
    //   });
    // },
    alipay() {

      //支付宝
      var that = this
      if (this.paytype == 1) {
        // this.$api.aliPayWapPay({orderHeadSeqId:this.detail.seqId}).then((result)=>{

        // })
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
                console.log(res)
                that.$router.push({ path: "/myorder" });
                alert(JSON.stringify(res))
                // 支付成功后的回调函数
              },
              fail: function(res){
                console.log(res)
                          alert(JSON.stringify(res))
                            that.$router.push({ path: "/myorder" });
              }
            });

          }else{
                    alert(JSON.stringify(result))
                      that.$router.push({ path: "/myorder" });
          }
        })
      }else if(this.paytype == 3){
        that.popshow = true
        that.current_id = this.detail.seqId
          // this.$api
          //   .orderPayOffLine({
          //     seqId: this.detail.seqId,
          //     payType: "OFF_LINE",
          //   })
          //   .then((res) => {
          //     if (res.code == 200) {
          //       this.$router.push({ path: "/myorder" });
          //     }
          //   });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
.confirmorder {
  display: flex;
  flex-direction: column;
  background: #f5f6f7;
  min-height: 100vh;
  padding-bottom: 250px;
  box-sizing: border-box;
  .need {
    display: flex;
    flex-direction: column;
    background: #f5f6f7;
    padding: 0 30px 30px 30px;
    box-sizing: border-box;
    .otherwrap {
      display: flex;
      flex-direction: column;
    }
    .needtitle {
      font-size: 18px;
      color: #999999;
      margin-top: 30px;
    }
    .needtitlefix {
      margin-bottom: 30px;
    }
    .needprice {
      width: 100%;
      min-height: 100px;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      padding: 0 30px;
      box-sizing: border-box;
      margin-top: 20px;
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
        height: 100px;
        .payname {
          font-size: 28px;
          color: #333333;
          margin-right: 20px;
        }
      }
    }
    /deep/ .van-checkbox-group {
      display: flex;
      flex-direction: column;
      background: white;
      border-radius: 20px;
      overflow: hidden;
    }
    /deep/ .van-checkbox {
      display: flex;
      flex-direction: row-reverse;
      padding: 0 30px;
      box-sizing: border-box;
    }
    /deep/ .van-checkbox__label {
      flex: 1;
      margin-left: 0px !important;
      .severitem {
        display: flex;
        flex-direction: row;
        height: 100px;
        align-items: center;
        font-size: 18px;
        color: #333333;
        span {
          margin-right: 20px;
        }
        .fee {
          height: 40px;
          line-height: 40px;
          text-align: center;
          padding-left: 20px;
          padding-right: 20px;
          border-radius: 20px;
          border: 2px solid #ff561e;
          color: #ff561e;
          background: #ffeee8;
          font-size: 24px;
        }
        .gray {
          border: 2px solid #888888;
          background: white;
          color: #888888;
        }
      }
    }
    .fixedbtn {
      display: flex;
      padding: 0 30px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
      height: 100px;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 2000;
      background: white;
    }
    /deep/ .van-button--small {
      width: 100%;
      height: 80px;
    }
  }
  /deep/ .van-uploader__upload {
    background-color: white !important;
    background: white !important;
  }
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
    margin-top:20px;
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
    .itemdiy:last-child {
      border-bottom: 2px solid transparent;
    }
    .ld {
      padding-right: 12px;
    }
    .addresswrap {
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 2;
      .addressitem {
        display: flex;
        flex-direction: row;
        align-items: center;
        min-height: 90px;
        position: relative;
        .ico {
          width: 10px;
          height: 10px;
          background: white;
          border-radius: 50%;
          border: 4px solid #28ae3a;
          margin-right: 30px;
        }
        .red {
          border: 4px solid #ff561e;
        }
        .add {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .a1 {
            font-size: 18px;
            color: #999999;
          }
          .a2 {
            font-size: 34px;
            color: #333333;
            padding-top: 30px;
          }
          .a3 {
            font-size: 18px;
            color: #999999;
            padding-bottom: 30px;
          }
        }
      }
      .addressitem::after {
        position: absolute;
        right: 0;
        bottom: 0;
        content: "";
        height: 2px;
        width: calc(100% - 60px);
        background: #f2f2f2;
      }
      .addressitem:nth-of-type(2) ::after {
        background: transparent;
      }
    }
    .addresswrap:after {
      position: absolute;
      content: "";
      top: 25%;
      left: 8px;
      width: 1px;
      height: 50%;
      z-index: -1;
      border-left: 1px dashed #f2f2f2;
    }
    .addresstime {
      display: flex;
      position: relative;
      /deep/ .van-cell {
        padding-left: 0px !important;
        padding-right: 15px !important;
      }
    }
    .addresstime:after {
      position: absolute;
      top: 0;
      left: -30px;
      height: 1px;
      width: calc(100% + 46px);
      content: "";
      background: #f2f2f2;
    }
  }
  .itemwrapsmb {
    margin-bottom: 0px !important;
  }
  .orderwrap2 {
    width: 690px;
    margin: 30px auto 0 auto;
    display: flex;
    flex-direction: column;
    /deep/ .van-cell {
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
      font-size: 28px;
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

}
</style>
