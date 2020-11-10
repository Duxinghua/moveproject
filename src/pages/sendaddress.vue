<template>
  <div class="sendaddress">
    <TopNav :menu="menutext"/>
    <AddressMenu
      :adretext="adretext"
      :adreadonly="adreadonly"
      :addressplaceholder="addressplaceholder"
      @addressInput="addressInput"
    />
    <div class="addresswrap">
      <div
        class="addressitem"
        v-for="(item,sindex) in adList"
        :key="sindex"
        @click="adItemHandler(item,sindex)"
        v-if="item.address"
      >
        <div class="addresstop">
          {{item.address}}
        </div>
        <div class="addressbottom">
          <div class="ad1">
            {{item.address}}
          </div>
          <div class="ad2">
            {{item.juli}}
          </div>
        </div>
      </div>
    </div>
    <div
      class="map"
      id="map"
    ></div>
  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
import AddressMenu from "@/components/addressMenu";
export default {
  components: {
    AddressMenu,
    TopNav
  },
  data() {
    return {
      map: {},
      adretext: "武汉",
      addressplaceholder:'从哪儿发',
      adreadonly: false,
      menutext:'',
      adList: [
      ],
      result:{},
      index: 0
    };
  },
  mounted() {
    this.index = this.$route.query.index;
    if(this.$route.query.index == 0){
      this.addressplaceholder = '从哪儿发'
      this.menutext= '发货地信息'
    }else{
      this.addressplaceholder = '到达哪儿'
      this.menutext= '收货地址'
    }
  },
  methods: {
    addressInput(e) {
      var that = this;
      this.map = new AMap.Map("map", {
        resizeEnable: true,
      });
      AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 100, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: that.adretext, // 兴趣点城市
        });
        //关键字查询
        placeSearch.search(e,(s,res)=>{
          console.log(res)
          if(s == 'complete' && res.info == 'OK'){
            that.result = res.poiList
            that.adList = res.poiList.pois
          }
        })

      });
    },
    adItemHandler(item,index) {
      console.log(item)
      var list = localStorage.getItem("adList");
      if (list) {
        list = JSON.parse(list);
      }else{
        list = []
      }
      list[this.index] = item
      list[this.index]['center'] = JSON.stringify([item.location.lng,item.location.lat])
      localStorage.setItem("adList", JSON.stringify(list));
      this.$router.push({
        path: "/chooseaddress",
        query:{index:this.index}
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sendaddress {
  display: flex;
  flex-direction: column;
  background: #f5f6f7;
  min-height: 100vh;
  .addresswrap {
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    .addressitem {
      display: flex;
      flex-direction: column;
      padding: 30px;
      box-sizing: border-box;
      background: white;
      border-bottom: 2px solid #f5f6f7;
      .addresstop {
        display: flex;
        flex-direction: row;
        position: relative;
        padding-left: 60px;
        box-sizing: border-box;
        font-size: 32px;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .addresstop::after {
        position: absolute;
        content: "";
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 32px;
        height: 32px;
        background: url("../assets/images/adposa.png") no-repeat;
        background-size: 100% 100%;
      }
      .addressbottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left: 60px;
        box-sizing: border-box;
        font-size: 24px;
        margin-top: 10px;
        color: #b5b5b5;
        .ad1 {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ad2 {
          margin-left: 30px;
        }
      }
    }
    .addressitem:last-child {
      border-bottom: 2px solid transparent;
    }
  }
}
</style>
