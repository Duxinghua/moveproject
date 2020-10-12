<template>
  <div class="chooseaddress">
    <div class="menu">
      <div class="adleft">
        <div class="addr">
          武汉
        </div>
        <van-icon name="arrow-down" />
      </div>
      <div class="adright">
        <van-icon
          name="circle"
          color="#28ae3a"
        />
        <van-field v-model="address" readonly label="" placeholder="从哪儿发" />
      </div>
    </div>
    <div
      class="map"
      id="map"
    >
    </div>

  </div>
</template>

<script>
export default {
  name:'Chooseaddress',
  data () {
    return {
      LatLng:{
        lat:'39.916527',
        lng:'116.397128'
      },
      map:{},
      address:''
    }
  },
  mounted(){
    var LatLngobj = localStorage.getItem('local')
    if(LatLngobj){
      LatLngobj = JSON.parse(LatLngobj)
      this.LatLng.lat = LatLngobj.lat
      this.LatLng.lng = LatLngobj.lng
    }
    this.mapinit(this.LatLng)
    this.getLocation()
  },
  methods:{
    mapinit(lat,lng) {
        //div容器
        var that = this
        var container = document.getElementById("map");
        //初始化地图
       this.map = new qq.maps.Map(container, {
                // 地图的中心地理坐标
          center: new qq.maps.LatLng(this.LatLng.lat, this.LatLng.lng),
          zoom: 13
      });
        var anchor = new qq.maps.Point(6, 6),
        size = new qq.maps.Size(24, 24),
        origin = new qq.maps.Point(0, 0),
        icon = new qq.maps.MarkerImage('https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/center.gif', size, origin, anchor);
        var marker = new qq.maps.Marker({
        icon: icon,
        map: that.map,
        position:that.map.getCenter()});
        //当地图中心属性更改时触发事件
        qq.maps.event.addListener(that.map, 'center_changed', function() {
          that.LatLng = that.map.getCenter()
        });
        //绑定单击事件添加参数
        qq.maps.event.addListener(that.map, 'click', function(event) {
            console.log(event)
            that.LatLng = event.latLng
        });
    },
    getLocation(){
      $.ajax({
             type: "GET",
             url: "https://apis.map.qq.com/ws/geocoder/v1/?location="+this.LatLng.lat+','+this.LatLng.lng,
             data: {},
             dataType: "json",
             success: function(data){
               console.log(data)
             }
        });
    }
  },
  watch:{
    LatLng:{
        handler(newName) {
          this.mapinit(newName.lat,newName.lng)
        },
        deep:true,
        immediate:false
    }
  }
}
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
  .map{
    width:100%;
    height:600px;
  }
}
</style>
