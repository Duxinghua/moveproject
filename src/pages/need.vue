<template>
  <div class="need">
    <div class="needtitle">
      计价方式
    </div>
    <div class="needprice">
      <van-radio-group
        v-model="priceType"
        checked-color="#28ae3a"
      >
        <van-radio name="STANDARD" @click="getPlatformHandler">
          <div class="payitem">
            <span class="payname">平台标准计价</span>
            <van-icon name="warning-o" color="#333333" size="18"/>
          </div>
        </van-radio>
        <van-radio name="DISCUSS">
          <div class="payitem">
            <span class="payname">与司机协商计划</span>
          </div>
        </van-radio>
      </van-radio-group>
    </div>
    <div class="otherwrap" v-if="otherList.length">
      <div class="needtitle needtitlefix">
        其他服务
      </div>
      <van-checkbox-group v-model="serverArr">
        <van-checkbox :name="item.seqId"  checked-color="#28ae3a" v-for="(item,index) in otherList" :key="index">
          <div class="severitem">
            <span>{{item.catItem}}</span>
            <div :class="['fee',item.price == 0 ? 'gray': '']">
              {{item.remarks}}
            </div>
          </div>
        </van-checkbox>
      </van-checkbox-group>
    </div>
    <div class="fixedbtn">
      <van-button type="primary" color="#28ae3a" round block size="small" @click="needHandler">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Need",
  data() {
    return {
      priceType:"DISCUSS",
      serverArr:[],
      otherList:[]
    };
  },
  mounted(){
    this.getOther()
    var platformstandard = localStorage.getItem('platformstandard')
    if(platformstandard){
      this.priceType = 'STANDARD'
    }
  },
  methods: {
    getPlatformHandler(){
       this.$router.push('/platformstandard')
    },
    getOther(){
      var data = {
        headSeqId:JSON.parse(localStorage.getItem('cartObject')).seqId,
        attachType:'OTHER'
      }
      this.$api.carStyleDetFindMap(data).then((result)=>{
        if(result.code == 200){
          var obj = result.data
          var list = []
          Object.keys(obj).forEach((value)=>{
            var o = obj[value][0]
            o.keyValue = value
            list.push(o)
          })
          this.otherList = list
        }
      })
    },
    needHandler(e){
      var obj = {}
      obj.priceType = this.priceType
      var otherServer = []
      this.serverArr.forEach((value) => {
        for(var a in this.otherList){
          if(this.otherList[a].seqId == value){
            otherServer.push(this.otherList[a])
          }
        }
      })
      obj.otherServer = otherServer
      localStorage.setItem('need',JSON.stringify(obj))
      var platformstandard = localStorage.getItem('platformstandard')
      if(this.priceType == 'STANDARD'){
        if(!platformstandard){
           this.$router.push('/platformstandard')
        }else{
           this.$router.push('/confirmorder')
        }
      }else{
         this.$router.push('/confirmorder')
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.need {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6f7;
  padding:0 30px 30px 30px;
  box-sizing: border-box;
  .otherwrap{
    display: flex;
    flex-direction: column;
  }
  .needtitle{
    font-size: 18px;
    color:#999999;
    margin-top: 30px;
  }
  .needtitlefix{
    margin-bottom: 30px;
  }
  .needprice{
    width:100%;
    min-height: 100px;
    background:white;
    border-radius: 20px;
    overflow: hidden;
    padding:0 30px;
    box-sizing: border-box;
    margin-top:20px;
  }
  /deep/ .van-radio{
    display: flex;
    flex-direction: row-reverse;
    border-bottom: 1px solid #f5f6f7;
  }
  /deep/ .van-radio__label {
    display: flex;
    flex:1;
    margin-left:0px;
    .payitem {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex:1;
      height: 100px;
      .payname {
        font-size: 20px;
        color: #333333;
        margin-right:20px;
      }
    }
  }
  /deep/ .van-checkbox-group{
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 20px;
    overflow: hidden;
  }
  /deep/ .van-checkbox{
    display: flex;
    flex-direction: row-reverse;
    padding:0 30px;
    box-sizing: border-box;
  }
  /deep/ .van-checkbox__label{
    flex:1;
    margin-left:0px!important;
    .severitem{
      display: flex;
      flex-direction: row;
      height:100px;
      align-items: center;
      font-size: 18px;
      color:#333333;
      span{
        margin-right:20px;
      }
      .fee{
        height:40px;
        line-height: 40px;
        text-align: center;
        padding-left:20px;
        padding-right:20px;
        border-radius: 20px;
        border:1px solid #ff561e;
        color: #ff561e;
        background:#ffeee8;
        font-size: 24px;
      }
      .gray{
        border:1px solid #888888;
        background:white;
        color:#888888;
      }
    }
  }
  .fixedbtn{
    display: flex;
    padding:0 30px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width:100%;
    height:100px;
    position: fixed;
    left:0;
    bottom: 0;
    z-index: 2000;
    background: white;
  }
  /deep/ .van-button--small{
    width:100%;
    height:80px;
  }
}
</style>
