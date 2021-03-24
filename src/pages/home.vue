<template>
  <div class="home">
    <div class="topmenu">
      <div
        class="address"
        @click="goPos"
      >
        <div class="city">{{city}}</div>
        <van-icon
          color="#bbbbbb"
          name="arrow-down"
        />
      </div>
      <div class="brana">货搬搬</div>
    </div>
    <div class="servermenu">
      <div class="submenus" @click="logout">
        <img
          src="../assets/images/homeico.png"
          class="homeico"
          v-if="!userInfo.avatarUrl"
        />
                <img
          :src="userInfo.avatarUrl"
          class="homeico"
          v-if="userInfo.avatarUrl"
        />
      </div>
      <div
        :class="['submenu', serverIndex == 1 ? 'active' : '']"
        @click="serverHandler(1)"
      >
        拉货
      </div>
      <div
        :class="['submenu', serverIndex == 2 ? 'active' : '']"
        @click="serverHandler(2)"
      >
        搬家
      </div>
      <div
        class="submenu"
        @click="serverHandler(3)"
      >
        劳务工
      </div>
      <div
        :class="['submenu', serverIndex == 4 ? 'active' : '']"
        @click="serverHandler(4)"
      >
        租车
      </div>
    </div>
    <div
      class="serverlh"
      v-if="serverIndex == 1 || serverIndex == 4"
    >
      <div class="carwrap">
        <div
          :class="['caritem',cartIndex == index ? 'cartActive' : '' ,serverIndex == 4 ? 'caritemed' : '']"
          v-for="(item,index) in carList"
          :key="index"
          @click="cartHandler(index)"
        >
          {{item.carName}}
        </div>
        <div
          class="cateicowrap"
          @click="cateHandler"
        >
          <img
            src="../assets/images/cateico.png"
            class="cateico"
          />
        </div>
      </div>
      <div
        class="carinfo"
        @click="carInfo(cartObject)"
      >
        <img
          :src="cartObject.picUrl"
          class="carsico"
        />
        <div class="carinfowrap">
          <div class="c1 cline">载重:{{cartObject.carCapacity}}公斤</div>
          <div class="c2 cline">长宽高:{{cartObject.carLwh}}</div>
          <div class="c3 cline">载货体积:{{cartObject.carVolume}}方</div>
        </div>
        <van-icon
          name="arrow"
          color="#bbbbbb"
        />
      </div>
    </div>
    <div
      class="addresssearch"
      v-if="serverIndex == 1 || serverIndex == 4"
    >
      <van-steps
        direction="vertical"
        :active="active"
        active-icon="circle"
        inactive-icon="circle"
      >
        <van-step
          v-for="(item,index) in adList"
          :key="index"
        >
          <div
            class="addressdiy"
            @click.stop="setaddHandler(index)"
          >
            <div
              class="a1"
              v-if="item.name"
            >{{item.name}}</div>
            <div
              class="a2"
              v-if="item.name"
            >{{item.address}}</div>
            <div
              class="a3"
              v-if="!item.name"
            >{{index == 0 ? '请写发货地址' : '请写收货地址'}}</div>
            <div
              class="a4"
              @click.stop="deleAddHandler(index)"
            >
              <img
                v-if="index > 0 && adList.length > 2"
                src="../assets/images/delete.png"
                class="delete"
              />
            </div>
          </div>
        </van-step>
      </van-steps>
      <div
        class="addbtn"
        @click="addHandler"
      >
        <van-icon name="plus" />
        <span>添加收货地址</span>
      </div>
    </div>
    <div
      class="movelist"
      v-if="serverIndex == 2"
    >
      <div
        class="moveitem"
        v-for="(item,index) in carList"
        :key="index"
        @click.stop="carInfo(item)"
      >
        <img
          :src="item.picUrl"
          class="carico"
        />
        <div class="carinfo">
          <div class="carnamewrap">
            <div class="carname">{{item.carName}}</div>
            <div
              class="cartag"
              v-if="item.label"
            >{{item.label}}</div>
          </div>
          <div class="cardes">
            {{item.remarks}}
          </div>
          <div class="cardes">
            车厢长宽高：{{item.carLwh}}
          </div>
          <div class="pricewrap">
            <div class="pr">
              ¥{{item.minPrice}}<span>起</span>
            </div>
            <div
              class="btnw"
              @click.stop="mevohome(item)"
            >
              立即下单
            </div>
          </div>
        </div>
        <van-icon
          name="arrow"
          color="#999999"
          size="16"
        />
      </div>

      <div
        class="moveitem"
        @click="comHandler"
      >
        <img
          src="../assets/images/enpng.png"
          class="carico"
        />
        <div class="carinfo">
          <div class="carnamewrap">
            <div class="carname">企业搬家</div>
            <div
              class="cartag"
            >企业搬家</div>
          </div>
          <div class="cardes">
            有大型办公家具人群
          </div>
          <div class="cardes">
             各种车型应有尽有
          </div>
        </div>
        <van-icon
          name="arrow"
          color="#999999"
          size="16"
        />
      </div>
    </div>
    <div
      class="paybtn"
      v-if="serverIndex == 1 || serverIndex == 4"
    >
      <div
        class="paytop"
        style="display:none"
      >
        <div class="pay1">
          <span>¥</span>200
        </div>
        <div
          class="payinfo"
          @click="priceDetail"
        >
          <span>价格明细</span>
          <van-icon
            name="arrow"
            color="#666666"
          />
        </div>
      </div>
      <div class="paybot">
        <!-- orderType (string, optional): 订单类型，实时，预约 = ['APPOINTMENT', 'ACTUAL_TIME'] -->
        <div
          class="yuyue"
          @click="orderTodo('ACTUAL_TIME')"
        >
          预约
        </div>
        <div
          class="order"
          @click="orderTodo('APPOINTMENT')"
        >
          立即下单
        </div>
      </div>
    </div>
    <div id='container'></div>
    <!-- 退出处理 -->
    <van-popup v-model="logoutshow" position="center" :round="true">
      <div class="logoutwrap">
        <div class="title">
          退出确认
        </div>
        <div class="des">
          确定要退出货搬搬吗？
        </div>
        <div class="btns">
          <div class="cancel" @click.stop="logoutshow = false">
            取消
          </div>
          <div class="confrim" @click.stop="confirmhandler">
            确认
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      serverIndex: 1,
      serverType: {
        1: "PULL_CARGO",
        2: "CHANGE_HOUSE",
        3: "HIRE_WORKER",
        4: "RENT_CAR",
      },
      cartObject: {},
      cartIndex: 0,
      cartPageNum: 1,
      cartPageSize: 4,
      carList: [],
      active: 0,
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
      city: "武汉",
      logoutshow:false,
      userInfo:{
        avatarUrl:''
      }
    };
  },
  mounted() {
    var orderType = localStorage.getItem('orderType')
    if(orderType){
      orderType = orderType
      this.serverIndex = orderType
      if(orderType == 3){
        this.serverIndex = 1
        localStorage.setItem("orderType", this.serverIndex);
        localStorage.setItem("sCar", 0);
      }
    }else{
       orderType = this.serverIndex

      localStorage.setItem("orderType", this.serverIndex);

    }
    var that = this;

    var map = new AMap.Map("container", {
      resizeEnable: true,
    });
    if(this.$route.query.name){
      this.city = this.$route.query.name
      this.selectCity()
    }else{
      that.$toast.loading({
          message: '定位中...',
          forbidClick: true,
          loadingType: 'spinner',
      });
      AMap.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonPosition: "RB", //定位按钮的停靠位置
          buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status, result) {
          console.log(result, "result");
          console.log(status, "status");
          if (status == "complete") {
            that.$toast.clear()
            var obj = {};
            obj.lng = result.position.lng;
            obj.lat = result.position.lat;
            obj.addressComponent = result.addressComponent;
            obj.formattedAddress = result.formattedAddress;
            // that.city = obj.addressComponent.city;
            that.city = "武汉"
            localStorage.setItem("locations", JSON.stringify(obj));
            that.serverHandler(that.serverIndex);
          } else {
            that.$toast.clear()
            that.city = "武汉";
            that.selectCity()
          }
          localStorage.setItem("city", that.city);
        });
      });

    }
    var list = localStorage.getItem("adList");
    if (list) {
      list = JSON.parse(list);
      this.adList = list;
      this.adList.map((item)=>{
        if(item.obj){
          item.name = item.obj.formattedAddress
          item.address = item.obj.infos
        }
      })
      this.active = this.adList.length;
    }
    console.log(this.cartIndex,'cartindex')
    this.getinfo()
  },
  computed: {},
  methods: {
    //处理头像
    async getinfo(){
          //处理头像
          if(localStorage.getItem('payload')){
                let userId = await JSON.parse(localStorage.getItem('payload')).userId
                console.log(userId)
                let data = await this.$api.getUserDataBySeqId({ customerSeqId: userId });
                this.userInfo = data.data;
          }
    },
    //退出处理
    logout(){
      // this.logoutshow = true
      if(!this.userInfo.avatarUrl){
        this.$router.push({
          path: "/login",
          query: {}
        });
      }else{
       this.$router.push({
          path: "/my",
          query: {}
        });
      }
    },
    confirmhandler(){
      localStorage.clear()
      setTimeout(()=>{
        this.$router.push({
          path: "/login",
          query: {}
        });
      },500)
    },
    //选择城市调用
    selectCity(){
          var that = this
        that.$toast.loading({
          message: '定位中...',
          forbidClick: true,
          loadingType: 'spinner',
        });
          AMap.plugin('AMap.Geocoder', function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: that.city
              })
              geocoder.getLocation( that.city, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                  console.log('ss')
                  that.$toast.clear()
                  var s = result.geocodes[0]
                  var obj = {};
                    obj.lng = s.location.lng;
                    obj.lat = s.location.lat;
                    obj.addressComponent = s.addressComponent;
                    obj.formattedAddress = s.formattedAddress;
                  }
                  localStorage.setItem("locations", JSON.stringify(obj));
                  that.serverHandler(that.serverIndex);
              })

          })
    },
    // 获取车型
    getAllCart() {
      var data = {
        serverType: this.serverType[this.serverIndex],
        operCenter: this.city.replace('市',''),
        pageno: this.cartPageNum,
        pagesize: this.cartPageSize,
      };
      this.$api.carStyleFindPage(data).then((result) => {
        console.log(result,'result')
        if(result.code != 401){
          this.carList = result.list;
          console.log(result.list,'list',localStorage.getItem("sCar"))
        if (localStorage.getItem("cartIndex")) {
              this.cartIndex = localStorage.getItem('cartIndex')
              this.cartObject = this.carList[this.cartIndex]
              localStorage.setItem("cartObject", JSON.stringify(this.cartObject));
            }else{
              this.cartObject = result.list[0];
              localStorage.setItem("cartObject", JSON.stringify(this.cartObject));
            }

        }
      });
       console.log( this.cartIndex,'index')
    },
    //切换类型
    serverHandler(index) {
      console.log(index,'indexser')
      this.carList = [];
      localStorage.removeItem('refer')
      localStorage.removeItem('detail')
      localStorage.removeItem('platform')
      // localStorage.setItem('adList',JSON.stringify(this.adList))
      localStorage.removeItem('cartObject')
      this.serverIndex = index;
      var orderType = localStorage.getItem('orderType')
      if(orderType != index){
        localStorage.setItem("sCar",0)
      }else{
        localStorage.setItem("sCar",1)
      }
      localStorage.setItem("orderType", this.serverIndex);
      localStorage.removeItem("otherList")
      localStorage.removeItem("serverArr")
      if (index == 1) {
        this.cartPageSize = 4;
        this.getAllCart();
      } else if (index == 2) {
        this.cartPageSize = 100;
        this.getAllCart();
      } else if (index == 4) {
        this.getAllCart();
        // this.carList = this.carList2
      } else if (index == 3) {
        this.$router.push("/platformpricing");
      }
    },
    mevohome(item) {
      localStorage.setItem("cartObject", JSON.stringify(item));
      this.$router.push("/confirmorder");
    },
    //
    cartHandler(index) {
      this.cartIndex = index;
      this.cartObject = this.carList[index];
      localStorage.setItem("cartObject", JSON.stringify(this.cartObject));
      localStorage.setItem("cartIndex", this.cartIndex);
      localStorage.setItem("sCar",1)
    },
    goPos() {
      this.$router.push({path:"/city",query:{type:1}});
    },
    cateHandler() {
      var type = this.serverType[this.serverIndex];
      this.$router.push({
        path: "/cart",
        query: { type: type, operCenter: this.city },
      });
    },
    carInfo(item) {
      this.$router.push({
        path: "/cartinfo",
        query: { seqId: item.seqId },
      });
    },
    comHandler(){
      this.$router.push({
        path: "/company",
        query: { },
      });
    },
    orderTodo(ordertype) {
      //priceType (string, optional): 计价方式 = ['STANDARD', 'DISCUSS']
      localStorage.setItem("placeOrder", ordertype);

        var list = localStorage.getItem("adList");
        if(list){
          list = JSON.parse(list);
          var arr = [];
          list.map((item) => {
            console.log(item,'item')
            if(item.center && item.center.length > 2){
              var il = JSON.parse(item.center);
              if (il.length) {
                if(il[0]){
                  arr.push({
                    longitude:il[0],
                    latitude:il[1]
                  });
                }
              }
            }
          });

          if (arr.length < 2) {
            return this.$toast("请认真选择发货或收货地址");
          }
          if(this.adList.length == arr.length){
            this.todoHandlers(arr)
          }else{
             return this.$toast("请认真选择发货或收货地址");
          }
        }else{
          return this.$toast("请认真选择发货或收货地址");
        }
        // var dis = AMap.GeometryUtil.distanceOfLine(arr);



    },
    todoHandlers(arr){

        this.$api.getDistance(arr).then((result)=>{
          if(result.code == 200){
            console.log(result.data)
              localStorage.setItem("routeKilometer", result.data);
              setTimeout(()=>{
                this.$router.push("/confirmorder");
              },100)
          }else{
            return this.$toast(result.msg);
          }

        })

    },
    priceDetail() {
      this.$router.push("/pricedetail");
    },
    addHandler() {
      var obj = {
        name: "",
        address: "",
        center:""
      };
      var len = this.adList.length
      var r = 0
      this.adList.map((item) => {
        console.log(item.center)
        if(item.center != 0 ){
          r += 1
        }
      })
      if(r == len){
        this.adList.push(obj);
      }else{
        return this.$toast('请填写好现有的发货地址或收货地址')
      }
    },
    setaddHandler(index) {
      localStorage.setItem("adList", JSON.stringify(this.adList));
      this.$router.push({ path: "/chooseaddress", query: { index: index } });
    },
    deleAddHandler(index) {
      if(this.adList.length > 2){
        this.adList.splice(index, 1);
        localStorage.setItem("adList", JSON.stringify(this.adList));
      }
    },
  },
  components: {},
  computed: {},
};
</script>

<style lang='scss' scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 220px;
  box-sizing: border-box;
  background: #f5f6f7;
  .topmenu {
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    padding: 0 30px;
    background: white;
    .address {
      display: flex;
      flex-direction: row;
      align-items: center;
      /deep/ .van-icon {
        font-size: 32px;
      }
      .city {
        font-size: 28px;
        margin-right: 10px;
      }
    }
    .brana {
      position: absolute;
      font-size: 32px;
      font-weight: bold;
      color: #333333;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .servermenu {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 90px;
    width: 100%;
    padding: 0 30px;
    box-sizing: border-box;
    overflow: hidden;
    .submenus {
      width: 12%;
      display: flex;
      .homeico {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: auto;
      }
    }
    .submenu {
      display: flex;
      width: 22%;
      font-size: 34px;
      .homeico {
        width: 40px;
        height: 40px;
        margin-right: auto;
      }
    }
    .active {
      color: #28ae3a;
      position: relative;
    }
    .active::after {
      position: absolute;
      width: 30px;
      height: 30px;
      content: "";
      background: white;
      bottom: -50px;
      left: 15px;
      transform: rotate(-45deg);
    }
  }
  .serverlh {
    width: 690px;
    margin: 0 auto;
    height: 350px;
    border-radius: 20px;
    background: white;
    padding: 30px;
    box-sizing: border-box;
    border-top: 2px solid transparent;
    display: flex;
    flex-direction: column;
    .carwrap {
      display: flex;
      flex-direction: row;
      position: relative;
      .caritem {
        font-size: 28px;
        width: 25%;
        text-align: left;
        position: relative;
      }
      .cateicowrap {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        .cateico {
          width: 40px;
          height: 40px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
      .caritemed {
        width: 20%;
      }
      .cartActive {
        color: #28ae3a;
      }
    }
    .carinfo {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 70px;
      margin-bottom: 70px;
      /deep/ .van-icon {
        font-size: 32px;
      }
      .carsico {
        width: 282px;
        // height: 128px;
        margin-right: 30px;
      }
      .carinfowrap {
        display: flex;
        flex-direction: column;
        font-size: 28px;
        line-height: 42px;
        color: #333333;
        flex: 1 1 auto;
        .cline {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
  .addresssearch {
    width: 690px;
    margin: 20px auto;
    background: white;
    border-radius: 20px;
    padding: 30px 30px 130px 30px;
    box-sizing: border-box;
    position: relative;
    /deep/ .van-step__line {
      background: #e5e6e7 !important;
    }
    /deep/ .van-hairline:last-of-type .van-icon-circle {
      color: #ff561e;
    }
    /deep/ .van-hairline:not(:first-child):not(:last-child) .van-icon {
      font-size: 0.2rem !important;
      color: #333333;
    }
    /deep/
      .van-hairline:not(:first-child):not(:last-child)
      .van-icon-circle::before {
      background: #333333;
      border-radius: 50%;
      font-size: 0.2rem !important;
    }
    /deep/ .van-hairline:nth-of-type(1) .van-icon-circle {
      color: #28ae3a;
    }
    /deep/ .van-icon-circle::before {
      background: white;
    }
    /deep/ .van-step--vertical .van-step__circle-container {
      top: 70px;
    }
    /deep/ .van-step--vertical .van-step__line {
      top: 70px;
    }
    /deep/ .van-step--vertical {
      padding-right: 0px !important;
    }
    .addressdiy {
      display: flex;
      flex-direction: column;
      height: 100px;
      justify-content: center;
      position: relative;
      .a1{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .a2{
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .a4 {
        width: 100px;
        height: 100px;
        position: absolute;
        right: 0;
        top: 0;
        .delete {
          width: 32px;
          height: 32px;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
    .addbtn {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 50px;
      width: 250px;
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      border: 2px solid #e8e8e8;
      font-size: 18px;
    }
  }
  .movelist {
    width: 690px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    .moveitem {
      width: 100%;
      background: white;
      height: 305px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 30px;
      box-sizing: border-box;
      border-radius: 20px;
      overflow: hidden;
      margin-bottom: 20px;
      .carico {
        width: 240px;
        height: 220px;
        margin-right: 20px;
      }
      .carinfo {
        display: flex;
        flex-direction: column;
        width: 340px;
        .carnamewrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 10px;
          .carname {
            font-size: 30px;
            color: #333333;
            margin-right: 5px;
          }
          .cartag {
            padding: 0 4px;
            font-size: 26px;
            white-space: nowrap;
            color: #ff561e;
            height: 35px;
            line-height: 35px;
            border-radius: 15px;
            border: 2px solid #ff561e;
            background: #ffeee8;
          }
        }
        .cardes {
          font-size: 28px;
          line-height: 50px;
          padding-right: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          display: inline-block;
          width: 100%;
        }
        .pricewrap {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top: 15px;
          .pr {
            font-size: 28px;
            color: #28ae3a;
            span {
              color: #999999;
            }
          }
          .btnw {
            margin-left: auto;
            width: 170px;
            height: 60px;
            border-radius: 30px;
            overflow: hidden;
            line-height: 60px;
            text-align: center;
            background: #28ae3a;
            font-size: 32px;
            color: white;
          }
        }
      }
    }
  }
  .paybtn {
    width: 100%;
    min-height: 100px;
    background: white;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 800;
    -moz-box-shadow: -1px 0px 5px -2px #b9b8b8;
    -webkit-box-shadow: -1px 0px 5px -2px #b9b8b8;
    box-shadow: -1px 0px 5px -2px#b9b8b8;
    display: flex;
    flex-direction: column;
    .paytop {
      height: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 30px;
      box-sizing: border-box;
      border-bottom: 2px solid #f4f3f3;
      .pay1 {
        font-size: 50px;
        color: #28ae3a;
        span {
          font-size: 30px;
        }
      }
      .payinfo {
        font-size: 16px;
        color: #666666;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: auto;
        /deep/ .van-icon {
          font-size: 16px;
        }
      }
    }
    .paybot {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0 30px;
      box-sizing: border-box;
      height: 100px;
      .yuyue {
        width: 270px;
        height: 80px;
        border-radius: 40px;
        background: #186823;
        line-height: 80px;
        font-size: 30px;
        text-align: center;
        color: white;
        margin-right: 30px;
      }
      .order {
        flex: 1;
        height: 80px;
        line-height: 80px;
        text-align: center;
        color: white;
        font-size: 30px;
        background: #28ae3a;
        border-radius: 40px;
      }
    }
  }
  .logoutwrap{
    width:520px;
    height:300px;
    padding:40px 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title{
      font-size: 36px;
      font-weight: bold;
      color:#333333;
    }
    .des{
      font-size: 30px;
      color:#333333;
      margin-top:30px;
    }
    .btns{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top:30px;
      .cancel{
        width:180px;
        height:68px;
        line-height: 68px;
        text-align: center;
        border-radius: 35px;
        font-size: 28px;
        background: #28ae3a;
        border:2px solid  #28ae3a;
        color:white;
        margin-right:30px;

      }
      .confrim{
        width:180px;
        height:68px;
        line-height: 68px;
        border-radius: 35px;
        font-size: 28px;
        text-align: center;
        border:2px solid  #28ae3a;
        color:#28ae3a;
      }
    }
  }
}
</style>
