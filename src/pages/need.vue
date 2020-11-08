<template>
  <div class="need">
      <TopNav :menu="menutext"/>
    <div class="needtitle">
      计价方式
    </div>
    <div class="needprice">
      <van-radio-group
        v-model="priceType"
        checked-color="#28ae3a"
        @change="priceTypeChange"
      >
        <van-radio name="STANDARD" @click="getPlatformHandler" >
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
      <van-checkbox-group v-model="serverArr" @change="serverArrHandler">
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
import TopNav from '@/components/topnav.vue'
export default {
  name: "Need",
  components:{
    TopNav
  },
  data() {
    return {
      priceType:"DISCUSS",
      serverArr:[],
      otherList:[],
      menutext:'额外需求'
    };
  },
  mounted(){
    this.getOther()
    var need = localStorage.getItem('need')
    if(need){
      need = JSON.parse(need)
      this.priceType = need.priceType
    }
  },
  methods: {
    priceTypeChange(e){
      var obj = {}
      obj.priceType = e
      localStorage.setItem('need',JSON.stringify(obj))
    },
    serverArrHandler(e){
      localStorage.setItem('serverArr',JSON.stringify(e))
      var otherList = localStorage.getItem('otherList')
      if(otherList){
        otherList = JSON.parse(otherList)
        otherList.map((item) => {
           e.map((sitem) => {
             if(sitem == item.seqId){
               item.checked = true
             }
           })
        })
        localStorage.setItem('otherList',JSON.stringify(otherList))
      }
    },
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
            o.checked = false
            list.push(o)
          })
          this.otherList = list
          var serverArr = localStorage.getItem('serverArr')
          if(serverArr){
            serverArr = JSON.parse(serverArr)
            this.otherList.map((item) => {
              serverArr.map((sitem) => {
                if(item.seqId == sitem){
                  item.checked = true
                }
              })
            })
            localStorage.setItem('otherList',JSON.stringify(this.otherList))
            this.serverArr = serverArr
          }else{
            localStorage.setItem('otherList',JSON.stringify(this.otherList))
          }
        }
      })
    },
    needHandler(e){
        if(this.priceType == 'STANDARD'){
          var platform = localStorage.getItem('platform')
          if(platform){
            platform = JSON.parse(platform)
            if(!platform.goodwidth){
              return this.$toast('请选择货物最长')
            }
            if(!platform.goodheight){
              return this.$toast('请选择货物最高')
            }
            if(!platform.goodsend){
              return this.$toast('请选择搬运楼层发货地')
            }
            if(!platform.goodreceive){
              return this.$toast('请选择搬运楼层收货地')
            }
          }

        }
        this.$router.push('/confirmorder')
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
    border-bottom: 2px solid #f5f6f7;
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
        border:2px solid #ff561e;
        color: #ff561e;
        background:#ffeee8;
        font-size: 24px;
      }
      .gray{
        border:2px solid #888888;
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
