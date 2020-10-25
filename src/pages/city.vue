<template>
  <div class="city">
   <TopNav :menu="menutext"/>
    <van-search
      v-model="searchvalue"
      show-action
      clearable
      shape="round"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="adposwrap">
      <img src="../assets/images/adposs.png" class="adpossico" />
      <span class="adtext">当前位置:{{cityValue}}</span>
    </div>
    <van-index-bar>
      <div v-for="(item,index) in cityData" :key="index">
       <van-index-anchor :index="item.name" />
       <van-cell :title="sitem.name" v-for="(sitem,sindex) in item.cities" :key="sindex" />
      </div>
    </van-index-bar>

  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
import Data from '../utils/cityData.js'
export default {
  name:'City',
  components:{
    TopNav
  },
  data(){
    return {
      cityValue:'武汉市',
      searchvalue:'',
      cityData:Data.cityData,
      menutext:'选择城市'
    }
  },
  mounted(){
    if(localStorage.getItem('local')){
      var obj = JSON.parse(localStorage.getItem('local'))
      this.cityValue = obj.city
      this.$forceUpdate()
    }
  },
  methods:{
    onSearch(){

    }
  }
}
</script>

<style lang="scss" scoped>
.city{
  display: flex;
  flex-direction: column;
  min-height:100vh;
  background:white;
  /deep/ .van-search__action{
    padding-right:30px;
  }
  .adposwrap{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding:0 30px;
    box-sizing: border-box;
    height:80px;
    .adpossico{
      width:35px;
      height:35px;
      margin-right:15px;
    }
    .adtext{
      font-size: 30px;
      color:#333333;
    }
  }
}
</style>
