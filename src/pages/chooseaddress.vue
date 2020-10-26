<template>
  <div class="chooseaddress">
    <TopNav :menu="menutext"/>
    <div class="menu">
      <div class="adleft">
        <div class="addr">
          武汉
        </div>
        <van-icon name="arrow-down" />
      </div>
      <div class="adright"  @click="targetHandler">
        <van-icon
          name="circle"
          color="#28ae3a"
        />
        <van-field
          v-model="address"
          readonly
          label=""
          :placeholder="addressplaceholder"
        />
      </div>
    </div>
    <div
      class="map"
      id="map"
    >
    </div>
    <div class="confirmInformation">
      <div class="addresswrap" @click="targetHandler">
        <img src="../assets/images/pos.png" class="icoa" />
        <div class="adinfo">
          <div class="name">{{regeocode.formattedAddress}}</div>
          <div class="infos">{{regeocode.infos}}</div>
        </div>
      </div>
      <div class="addresswrap unitwrap">
        <img src="../assets/images/unit.png" class="icoa" />
          <van-field
          v-model="unit"
          label=""
          placeholder="请输入楼层及门牌号"
        />
      </div>
      <div class="addresswrap unitwrap">
         <img src="../assets/images/concat.png" class="icoa" />
          <van-field
          v-model="name"
          label=""
          placeholder="请输入联系人姓名"
        />
      </div>
      <div class="addresswrap unitwrap">
         <img src="../assets/images/mobile1.png" class="icoa" />
          <van-field
          v-model="phone"
          label=""
          placeholder="请输入联系号码"
        />
      </div>
      <div class="addresswrap ad">
        <div class="adbtn" @click="confirmHandler">
          确定
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  name: "Chooseaddress",
  components:{
    TopNav
  },
  data() {
    return {
      map: null,
      marker: null,
      city: "",
      address: "",
      unit:"",
      name:"",
      phone:"",
      center: [114.660358, 30.489513], //经度+纬度
      search_key: "", //搜索值
      lists: [], //地点列表
      search_list: [], //搜索结果列表
      noSearchShow: false, //无搜索结果提示，无搜索结果时会显示暂无搜索结果
      regeocode:{},
      addressplaceholder:'从哪儿发',
      index:0,
      menutext:''
    };
  },
  mounted() {
    var cityobj = localStorage.getItem('locations')
    if(cityobj){
      cityobj = JSON.parse(cityobj)
      this.center = [cityobj.lng,cityobj.lat]
    }
    if(this.$route.query.index == 0){
      this.addressplaceholder = '从哪儿发'
      this.menutext= '发货地信息'
    }else{
      this.addressplaceholder = '到达哪儿'
      this.menutext= '收货地址'
    }
    this.index = this.$route.query.index
    var list = localStorage.getItem('adList')
    list = JSON.parse(list)
    list.map((item,index) =>{
      if(index == this.index){
        if(item.location){
          var location = item.location
          this.center = [location.lng,location.lat]
          this.name = item.obj.name
          this.phone = item.obj.phone
          this.unit = item.obj.unit
        }
      }
    })
    this.adMap();
  },
  methods: {
    confirmHandler(){
      var obj = this.regeocode
      if(!this.unit){
        return this.$toast('请输入楼层及门牌号')
      }else{
        obj.unit = this.unit
      }
      if(!this.name){
        return this.$toast('请输入联系人姓名')
      }else{
        obj.name = this.name
      }
      if(!this.phone){
        return this.$toast('请输入联系号码')
      }else{
        obj.phone = this.phone
      }
      var list = localStorage.getItem('adList')
      list = JSON.parse(list)
      list[this.index]['obj'] = obj
      localStorage.setItem('adList',JSON.stringify(list))
      var orderType = localStorage.getItem('orderType')
      if(orderType == 1){
        this.$router.push({path:'/',query:{}})
      }else if(orderType == 2){
        this.$router.push({path:'/confirmorder',query:{}})
      }
    },
    targetHandler(){
       this.$router.push({path:'/sendaddress',query:{index:this.index}})
    },
    adMap() {
      var that = this;
      //初始化地图
      this.map = new AMap.Map("map", {
        zoom: 15, //缩放级别
        center: this.center, //设置地图中心点
        //resizeEnable: true,  //地图初始化加载定位到当前城市
      });
      //获取初始中心点并赋值
      var currentCenter = this.map.getCenter(); //此方法是获取当前地图的中心点
      this.center = [currentCenter.lng, currentCenter.lat]; //将获取到的中心点的纬度经度赋值给data的center
      //根据地图中心点查附近地点，此方法在下方
      this.centerSearch();
      //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      this.marker = new AMap.Marker({
        icon: new AMap.Icon({
          image: require("../assets/images/adposa.png"),
          size: new AMap.Size(48, 48),
          imageSize: new AMap.Size(24, 24),
        }),
        position: this.center,
        offset: new AMap.Pixel(-13, -30),
      });
      this.marker.setMap(this.map);
      var moveendFun = (e) => {
        // 获取地图中心点
        currentCenter = that.map.getCenter();

        this.center = [currentCenter.lng, currentCenter.lat];
        //根据地图中心点查附近地点
        this.centerSearch();
      };
      // 绑定事件移动地图事件
      this.map.on("moveend", moveendFun);
      this.map.on('click', function(e){
        that.center = [e.lnglat.lng,e.lnglat.lat];
        that.centerSearch();
      });
    },
    centerSearch() {
      var that = this;
      AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: that.city,
        });
        geocoder.getAddress(that.center, function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // result为对应的地理位置详细信息
            that.marker.setMap(null);
            that.marker = null;
            that.marker = new AMap.Marker({
              icon: new AMap.Icon({
                image: require("../assets/images/adposa.png"),
                size: new AMap.Size(48, 48),
                imageSize: new AMap.Size(24, 24),
              }),
              position: that.center,
              offset: new AMap.Pixel(-13, -30),
            });
            that.marker.setMap(that.map);
            //that.marker.setAnimation('AMAP_ANIMATION_BOUNCE');
            that.regeocode = result.regeocode
            var addressComponent = result.regeocode.addressComponent
            that.regeocode.infos = addressComponent.district+addressComponent.township+addressComponent.street+addressComponent.streetNumber
            console.log(result)
          }
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chooseaddress {
  display: flex;
  flex-direction: column;
  .menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 0 30px;
    box-sizing: border-box;
    background: white;
    .adleft {
      width: 160px;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .addr {
        font-size: 18px;
      }
      /deep/ .van-icon {
        font-size: 28px;
      }
    }
    .adright {
      display: flex;
      flex-direction: row;
      align-items: center;
      /deep/ .van-icon {
        font-size: 28px;
        font-weight: bold;
      }
    }
  }
  .map {
    width: 100%;
    height: 600px;
  }
  .confirmInformation{
    width: 100%;
    min-height: 300px;
    display: flex;
    flex-direction: column;
    border-radius: 40px;
    background: white;
    margin-top:20px;
    .addresswrap{
      height: 140px;
      border-bottom: 2px solid #f2f2f2;
      padding:0 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      /deep/ .van-cell{
        padding-right:0px;
        padding-left:0px;
      }
      .icoa{
        width:40px;
        height:40px;
        margin-right: 30px;
      }
      .adinfo{
        display: flex;
        flex-direction: column;
        flex:1;
        .name{
          font-size: 30px;
          color:#000000;
          // display: inline-block;
          // overflow: hidden;
          // text-overflow: ellipsis;
          // white-space: nowrap;
        }
        .infos{
          font-size: 16px;
          color:#929292;
        }
      }
    }
    .unitwrap{
      height:90px;
    }
    .ad{
      height:100px;
      display: flex;
      justify-content: center;
      align-items: center;
      .adbtn{
        width:100%;
        height:80px;
        border-radius: 40px;
        background:#28ae3a;
        color:white;
        line-height: 80px;
        text-align: center;
        font-size: 35px;
        font-weight: bold;
      }
    }
  }
}
</style>
