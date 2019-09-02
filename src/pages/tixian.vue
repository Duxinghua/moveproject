<template>
  <div class="abtixian">
    <div class="abtixiancon" v-if="!apiresult">
      <div class="tixiantab">
        <span :class="{active: current === 1}" @click="clickTab(1)">支付宝提现</span>
        <span :class="{active: current === 2}" @click="clickTab(2)">银行提现</span>
      </div>
      <div class="tixiancontent">
        <div class="tixianitem">
          <span>请输入姓名</span>
          <input type="text">
        </div>
        <div class="tixianitem">
          <span>请输入{{type}}账号</span>
          <input type="text">
        </div>
        <div class="tixianitem bankc" v-if="current === 2">
          <span>请选填开户银行</span>
          <input type="text" v-model="bankname" readonly @click="clickSbank" />
          <ul class="bankclist" v-show="bankShow">
            <li @click="listClick(item)"  v-for="(item,index ) in banklist" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="tixianitem">
          <span>请输入手机号码</span>
          <input type="text">
        </div>
        <div class="tixianitem">
          <span>请输入金额</span>
          <div class="jeinput">
            <span>¥</span>
            <input type="text">
          </div>
        </div>

      </div>
    </div>
    <div class="tixianSuccess" v-if="apiresult">
      <img class="sx" src="../assets/images/txsuccess.png" alt="" />
      <p>您的提现申请已成功</p>
      <p>我们将在三个工作日内处理您的申请</p>
      <p class="pbutton">完成提现</p>
    </div>
    <div class="tixianbutton" v-if="!apiresult">确认提现</div>
  </div>
</template>

<script>
export default {
  computed:{
    type () {
      if(this.current === 1){
        return '支付宝'
      }else if(this.current === 2){
        return '银行卡'
      }
    }
  },
  data(){
    return {
      current: 1,
      value: 0,
      banklist: [
        '网商银行',
        '建设银行',
        '农业银行'
      ],
      bankShow:false,
      bankname:'',
      apiresult:true
    }
  },
  methods:{
    listClick(item){
      this.bankname = item
      this.bankShow = false;
    },
    clickSbank(){
      this.bankShow = !this.bankShow
    },
    clickTab(arg){
      this.current = arg
    }
  }
}
</script>

<style scoped>
.pbutton{
  height:88px;
  font-size:36px;
  background: #9C3FA2;
  color:white;
  width:600px;
  border-radius: 8px;
  line-height: 88px;
  text-align: center;
  margin-top:100px;
}
.sx{
  width:446px;
  height:326px;
  margin-bottom: 20px;
}
.tixianSuccess{
    position: fixed;
    top: calc(100% - 700px);
    left:50%;
    transform: translate(-50%,-50%);
    width:600px;
    height:700px;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.tixianSuccess p:nth-child(2){
  font-size:36px;
  color:#333;
  padding-top:10px;
  padding-bottom: 10px;
}
.tixianSuccess p:nth-child(3){
  font-size:30px;
  color:#666;
}
.bankc{
  position: relative;
}
.bankclist{
  position: absolute;
  top:150px;
  left:0;
  width:100%;
  background: #fafafa;
  border:1px solid #9C3FA2;
  box-shadow:1px 1px 3px white;
  border-radius: 8px;
}
.bankclist li{
  font-size: 26px;
  height:44px;
  line-height: 44px;
  padding-left:32px;
}
.jeinput{
  background:#fafafa;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top:26px;
}
.jeinput span{
  font-size: 60px;
  display: flex;
  height:88px;
  align-items: center;
  padding-left:37px;
  padding-right:10px;
}
.jeinput input{
  background: #fafafa;
  border:none !important;
  margin-top:0px !important;
}
.tixianbutton{
  position: fixed;
  bottom: 0;
  left:0;
  height:88px;
  width:100%;
  color:#FFFFFF;
  font-size: 36px;
  text-align: center;
  line-height: 88px;
  background:#9C3FA2;
}
.tixianitem{
  display: flex;
  flex-direction: column;
  margin-top:30px;
}
.tixianitem input{
  margin-top:26px;
  border:1px solid #e3e3e3;
  height:88px;
  border-radius: 6px;
  font-size:26px;
}
.tixianitem span{
  font-size:26px;
  color:#666;
}
.active{
  color:white !important;
  background:linear-gradient(135deg,rgba(156,64,162,1) 0%,rgba(66,44,148,1) 100%) !important;
}
.tixiantab{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.tixiantab span{
  color:#9C3FA2;
  width:309px;
  height:88px;
  background:white;
  text-align: center;
  line-height: 88px;
  border:1px solid #9C3FA2;
}
.tixiantab span:nth-child(1){
  border-radius: 8px 0 0 8px;
}
.tixiantab span:nth-child(2){
  border-radius: 0px 8px 8px 0px;
}
.abtixian{
  display:flex;
  flex-direction: column;
}
.abtixiancon{
  display: flex;
  flex-direction: column;
  padding-left:32px;
  padding-right:32px;
  padding-top:45px;
  margin-top:40px;
}
.tixiancontent{
  margin-top:40px;
}
</style>
