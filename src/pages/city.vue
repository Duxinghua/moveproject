<template>
  <div class="city">
    <TopNav :menu="menutext" />
    <van-search
      v-model="searchvalue"
      show-action
      clearable
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @clear="clearHandler"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <view class="">
    </view>
    <div class="adposwrap">
      <img
        src="../assets/images/adposs.png"
        class="adpossico"
      />
      <span class="adtext">当前位置:{{cityValue}}</span>
    </div>
    <van-index-bar>
      <div
        v-for="(item,index) in cityData"
        :key="index"
      >
        <van-index-anchor :index="item.name" />
        <van-cell
          :title="sitem.name"
          v-for="(sitem,sindex) in item.cities"
          :key="sindex"
          @click.stop="targetHandler(sitem)"
        />
      </div>
    </van-index-bar>

  </div>
</template>

<script>
import TopNav from "@/components/topnav.vue";
import Data from "../utils/cityData.js";
import cityData from '../utils/cityData.js';
export default {
  name: "City",
  components: {
    TopNav,
  },
  data() {
    return {
      cityValue: "武汉市",
      searchvalue: "",
      cityData: Data.cityData,
      menutext: "选择城市",
      urltype: "",
      serverType: {
        1: "PULL_CARGO",
        2: "CHANGE_HOUSE",
        3: "HIRE_WORKER",
        4: "RENT_CAR",
      },
      saveindex:2,
      searchFlag:true
    };
  },
  mounted() {
    if (localStorage.getItem("local")) {
      var obj = JSON.parse(localStorage.getItem("local"));
      this.cityValue = obj.city;
      this.$forceUpdate();
    }
    if (this.$route.query.type) {
      this.urltype = this.$route.query.type;
    }
    if(this.$route.query.index){
      this.saveindex = this.$route.query.index
    }
  },
  methods: {
    clearHandler(){
      this.cityData = Data.cityData
    },
    getAllCart(city) {
      if (this.urltype == 1) {
        var ordertype = localStorage.getItem('orderType')
        var data = {
          serverType: this.serverType[ordertype],
          operCenter: city.replace("市", ""),
          pageno: this.cartPageNum,
          pagesize: this.cartPageSize,
        };
        this.$api.carStyleFindPage(data).then((result) => {
          if (result.total > 0) {
            if (this.urltype == 1) {
              this.$router.push({
                path: "/",
                query: {
                  name: item.name,
                },
              });
            }
          } else {
            this.$toast("此运营中心暂时没有开通");
            setTimeout(()=>{
              this.$router.push({
                path: "/",
                query: {},
              });
            },1000)

          }
        });
      } else if(this.urltype == 2){
        var data = {
          index:this.saveindex,
          city:city
        }
        this.$router.push({
              path: "/chooseaddress",
              query: data,
        });
      }
    },
    onSearch() {
      if(!this.searchvalue){
        this.searchFlag = true
        return this.$toast('请输入关键字')
      }else{
        this.searchFlag = false
      }
      var list = []
      Data.cityData.map((item)=>{
        var arr = []
        var obj = []
        item.cities.map((sitem) => {
          if(sitem.name.indexOf(this.searchvalue) > -1){
            obj.push(sitem)
          }
        })
        if(obj.length){
          var s = {
            name:item.name,
            cities:obj
          }
          list.push(s)
        }
      })
      this.cityData = list
      this.$forceUpdate()
    },
    targetHandler(item) {
      this.getAllCart(item.name)
    }
  },
};
</script>

<style lang="scss" scoped>
.city {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: white;
  /deep/ .van-search__action {
    padding-right: 30px;
  }
  .adposwrap {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;
    height: 80px;
    .adpossico {
      width: 35px;
      height: 35px;
      margin-right: 15px;
    }
    .adtext {
      font-size: 30px;
      color: #333333;
    }
  }
}
</style>
