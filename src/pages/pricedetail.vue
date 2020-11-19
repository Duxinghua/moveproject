<template>
  <div class="pricedetail">
     <TopNav :menu="menutext"/>
    <div class="pricetop">
      <div class="price">
        <span>¥</span>
        {{content.payMoney}}
      </div>
      <div class="lc" v-if="content.routeKilometer">总里程{{content.routeKilometer}}公里</div>
      <div class="des" v-if="content.routeKilometer">
        若产生高速费、停车费和搬运费，请用户额外支付；<br/>
        若涉及逾时等侯费，请与司机按收费标准结算
      </div>
    </div>
    <div class="pricebot">
      <div class="priceitem">
        <div class="pricetitle">
          基础费用
        </div>
        <div class="pricew" v-for="(item,index) in content.list1" :key="index">
          <div class="pt">
            {{item.name}}({{item.name2}})
          </div>
          <div class="pr">
            ¥{{item.feeMoney}}
          </div>
        </div>
      </div>
      <div class="priceitem" v-if="orderType != 3">
        <div class="pricetitle">
          额外费用
        </div>
        <div class="pricew" v-for="(item,index) in content.list2" :key="index">
          <div class="pt">
           {{item.name}}({{item.name2}})
          </div>
          <div class="pr">
            ¥{{item.feeMoney}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  name:'Pricedetail',
  components:{
    TopNav
  },
  data(){
    return {
      detail:{},
      content:{},
      menutext:'价格明细',
      orderType:localStorage.getItem('orderType')
    }
  },
  methods:{
    getDetail(data){
      this.$api.orderHeadCalcPricePullDet(data).then((result) =>{
        if(result.code == 200){
          var c = result.data
          var list1 = []
          var  list2 = []
          Object.keys(c.map).forEach((value) => {
            if(value == '基础费用'){
              list1 = c.map[value]
            }else if(value == '额外费用'){
              list2 = c.map[value]
            }
          })
          result.data.list1 = list1
          result.data.list2 = list2
          this.content = result.data
        }
      })
    },
    getworkDetail(data){
      this.$api.orderHeadCalcHireWorkerDet(data).then((result) => {
        if(result.code == 200){
          var c = result.data
          var list1 = []
          var  list2 = []
          Object.keys(c.map).forEach((value) => {
            if(value == '基础费用'){
              list1 = c.map[value]
            }else if(value == '额外费用'){
              list2 = c.map[value]
            }
          })
          result.data.list1 = list1
          result.data.list2 = list2
          this.content = result.data
        }
      })
    }

  },
  mounted(){
    var index = this.$route.query.index
    console.log(index)
    var detail = localStorage.getItem('detail')
    if(detail){
      detail = JSON.parse(detail)
      this.detail = detail
      if(index != 3){
        this.getDetail(detail)
      }else{
        this.getworkDetail(detail)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.pricedetail{
  display: flex;
  flex-direction: column;
  padding:100px 40px 40px 40px;
  box-sizing: border-box;
  .pricetop{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .price{
      font-size: 50px;
      color:#333333;
      span{
        font-size: 40px;
        margin-right:5px;
      }
    }
    .lc{
      font-size: 40px;
      color:#333333;
      margin-top:10px;
    }
    .des{
      font-size: 24px;
      color:#999999;
      line-height: 50px;
      margin-top:25px;
      text-align: center;
      padding-bottom: 40px;
      border-bottom: 2px solid #e5e6e7;
    }
  }
  .pricebot{
    display: flex;
    flex-direction: column;
    padding-top:40px;
    box-sizing: border-box;
    .priceitem{
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      .pricetitle{
        font-size: 40px;
        color:#999999;
        margin-top:20px;
        margin-bottom: 20px;
      }
      .pricew{
        font-size: 35px;
        line-height: 52px;
        color:#333333;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
