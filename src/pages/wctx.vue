<template>
  <div class="abtixians">
    <router-link class="tixianSuccesss"  :to="'/mysy?current=2'"  @click="finishw">

      <img class="sx" src="../assets/images/txsuccess.png" alt="" />
      <p>您的提现申请已成功</p>
      <p>我们将在三个工作日内处理您的申请</p>
      <!-- /@click="finishw" -->
      <p class="pbutton" @click="finishw" >完成提现</p>

    </router-link>
  </div>
</template>

<script>
export default {
  mounted () {
        this.$nextTick(() => {
          let bodycolors = document.documentElement || document.body
          bodycolors.style.background = '#ffffff'
        })
  },
  data () {
    return {
      current: 1,
      value: 0,
      banklist: [
        '网商银行',
        '建设银行',
        '农业银行'
      ],
      bankShow: false,
      bankname: '',
      apiresult: false,
      brokerage: 0,
      amount: '',
      mobile: '',
      bank_name: '',
      user_account: '',
      user_truename: '',
      amount: ''

    }
  },
  methods: {
    finishw () {
      this.$router.push({path: '/mysy', query: {current: 2}})
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
.tixianSuccesss{
    background:white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width:750px;
    height:750px;
    margin:0 auto;

}
.tixianSuccesss p:nth-child(2){
  font-size:36px;
  color:#333;
  padding-top:10px;
  padding-bottom: 10px;
}
.tixianSuccesss p:nth-child(3){
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
  font-size:30px;
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
.abtixians{
  display:flex;
  flex-direction: column;
  height:100vh;
  /* padding-bottom: 30px; */
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
