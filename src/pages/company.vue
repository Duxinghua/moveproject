<template>
  <div class="company">
    <TopNav :menu="menutext" />
    <div class="comitem" v-for="(item,index) in list" :key="index" :index="index">
      <img :src="item.log" class="carico" />
      <a class="comdes"  :href="'tel:'+item.urgeLinkMobile">
        <div class="comnamewrap">
          <span class="comico" v-if="item.operSelf">直营</span>
          <span class="comname">{{item.enterpriseName}}</span>
        </div>
        <div class="ratewrap">
          <van-rate v-model="value" readonly :count="item.score ? item.score : 5" color="#ff561e" size="10" />
          <span>{{item.score ? item.score : 5}}分</span>
        </div>
        <div class="phonewrap">
          <img src="../assets/images/phone.png" class="phoneico" />
          <span>{{item.urgeLinkMobile}}</span>
        </div>
        <div class="adresswrap">
          <img src="../assets/images/ceadicoa.png" class="ceadico" />
          <span>{{item.ownerCity+item.region+item.address}}</span>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import TopNav from "@/components/topnav.vue";
export default {
  name:'Company',
  components:{
    TopNav
  },
  data(){
    return {
      value:5,
      menutext:'企业展示',
      pageno:1,
      pagesize:100,
      city:localStorage.getItem('city'),
      list:[]
    }
  },
  mounted(){
    this.custEnterpriseApplyFindPage()
  },
  methods:{
    custEnterpriseApplyFindPage(ismore){
      var data = {
        pagesize:this.pagesize,
        pageno:this.pageno,
        ownerCity:new String(this.city).replace('市','')
      }
      this.$api.custEnterpriseApplyFindPage(data).then((result)=>{
        this.list = result.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.company{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6f7;
  .comitem{
    padding:30px;
    box-sizing: border-box;
    background: white;
    width:100%;
    display: flex;
    flex-direction: row;
    border-bottom:2px solid #f5f6f7;;
    .carico{
      width:210px;
      height:160px;
      border-radius: 20px;
      overflow: hidden;
      margin-right:30px;
    }
    .comdes{
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex:1;
        .comnamewrap{
          display: flex;
          flex-direction: row;
          align-items: center;
          width:100%;
          .comico{
            padding:0 15px;
            height:30px;
            border-radius: 15px;
            margin-right:20px;
            overflow: hidden;
            line-height: 30px;
            text-align: center;
            font-size: 28px;
            color:white;
            background: #28ae3a;
          }
          .comname{
            font-size: 32px;
            color:#333333;
            font-weight: bold;
            width:340px;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .ratewrap{
          display: flex;
          flex-direction: row;
          align-items: center;
          font-size: 28px;
          color:#999999;
          margin-top:3px;
          span{
            margin-left:10px;
          }
        }
        .phonewrap{
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top:3px;
          .phoneico{
            width:25px;
            height:25px;
            margin-right:10px;
          }
          span{
            font-size: 28px;
            color:#28ae3a;
          }
        }
        .adresswrap{
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-top:3px;
          .ceadico{
            width:35px;
            height:35px;
            margin-right: 10px;
          }
          span{
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width:425px;
            font-size: 28px;
            color:#b2b1b2;
          }
        }
    }
  }
  .comitem{
    border-bottom: 2px solid transparent;
  }
}
</style>
