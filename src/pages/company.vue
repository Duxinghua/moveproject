<template>
  <div class="company">
    <div class="comitem">
      <img src="../assets/images/car.png" class="carico" />
      <div class="comdes">
        <div class="comnamewrap">
          <span class="comico">直营</span>
          <span class="comname">贡贡搬家(汉口分部)</span>
        </div>
        <div class="ratewrap">
          <van-rate v-model="value" readonly :count="5" color="#ff561e" size="10" />
          <span>5分</span>
        </div>
        <div class="phonewrap">
          <img src="../assets/images/phone.png" class="phoneico" />
          <span>18771821655</span>
        </div>
        <div class="adresswrap">
          <img src="../assets/images/ceadicoa.png" class="ceadico" />
          <span>湖北省武汉市武昌区洪山路2号</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Company',
  data(){
    return {
      value:5
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.company{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #e5e6e7;
  .comitem{
    padding:30px;
    box-sizing: border-box;
    background: white;
    width:100%;
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #cdcdcd;
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
            font-size: 14px;
            color:white;
            background: #28ae3a;
          }
          .comname{
            font-size: 16px;
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
          font-size: 14px;
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
            font-size: 14px;
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
            font-size: 18px;
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
