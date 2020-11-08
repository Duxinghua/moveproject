<template>
<div class="list">
<TopNav :menu="menutext"/>
<div class="cartwrap">
  <div class="cartitem" v-for="(item,index) in carList" :key="index" @click="cartHandler(item)">
    <img :src="item.picUrl"  class="cartico" />
    <div class="carttext">
    {{item.carName}}
    </div>
  </div>
</div>
</div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  name:'Cart',
  components:{
    TopNav
  },
  data(){
    return {
      type:'',
      operCenter:'',
      carList:[],
      menutext:'全部车型'
    }
  },
  mounted(){
    this.type = this.$route.query.type
    this.operCenter = this.$route.query.operCenter
    this.getAllCart()

  },
  methods:{
    getAllCart(){
      var data = {
        serverType:this.type,
        operCenter:this.operCenter,
        pageno:1,
        pagesize:100
      }
      this.$api.carStyleFindPage(data).then((result)=>{
        this.carList = result.list
      })
    },
    cartHandler(item){
      localStorage.setItem('sCar',1)
      localStorage.setItem('cartObject',JSON.stringify(item))
      var orderType = localStorage.getItem('orderType')
      if(orderType == 1){
        this.$router.push('/')
      }else if(orderType == 2){
        this.$router.push('/confirmorder')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list{
  display: flex;
  flex-direction: column;
}
.cartwrap{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content:flex-start;
  min-height: 100vh;
  background: #f5f6f7;
  .cartitem{
    width:calc(33.1% - 2px);
    height:252px;
    background:white;
    border:2px solid  #f5f6f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .cartico{
      width:80%;
      height:auto;
    }
    .carttext{
      font-size: 16px;
      color:#333333;
    }
  }
}

</style>
