<template>
  <div class="abtixian">
    <div class="abtixiancon">
      <div class="tixiantab">
        <span :class="{active: current === 1}" @click="clickTab(1)">支付宝提现</span>
        <span :class="{active: current === 2}" @click="clickTab(2)">银行提现</span>
      </div>
      <div class="tixiancontent">
        <div class="tixianitem">
          <span>请输入姓名</span>
          <input type="text" v-model="user_truename">
        </div>
        <div class="tixianitem">
          <span>请输入{{type}}账号</span>
          <input type="text" v-model="user_account">
        </div>
        <div class="tixianitem bankc" v-if="current === 2">
          <span>请填写开户银行</span>
          <input type="text" v-model="bank_name"  />
          <ul class="bankclist" v-show="bankShow">
            <li @click="listClick(item)"  v-for="(item,index ) in banklist" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="tixianitem">
          <span>请输入手机号码</span>
          <input type="text" v-model="mobile">
        </div>
        <div class="tixianitem">
          <span>请输入金额</span>
          <div class="jeinput">
            <span>¥</span>
            <input v-model="amount" type="text" :placeholder="'最大可提现'+brokerage">
          </div>
        </div>

      </div>
    </div>
    <router-link class="tixianSuccess" v-show="apiresult" :to="'/mysy?current=2'"  @click="finishw">
    <div class="tixss"  @click="finishw">
      <img class="sx" src="../assets/images/txsuccess.png" alt="" />
      <p>您的提现申请已成功</p>
      <p>我们将在三个工作日内处理您的申请</p>
      <!-- /@click="finishw" -->
      <p class="pbutton" @click="finishw" >完成提现</p>
      </div>
    </router-link>
    <div class="tixianbutton"  @click="withdraw">确认提现</div>
  </div>
</template>

<script>
import {userWithdraw} from '@/api'
// import Bus from '@/utils/bus'
export default {
  mounted () {
    console.log(this.$route)
    this.brokerage = this.$route.query.brokerage
    console.log(this.brokerage)
    this.$nextTick(() => {
      let heightnum = document.documentElement.clientHeight  || window.screen.availHeight
      let widthnum = document.documentElement.clientWidth  || window.screen.availWidth
      document.getElementsByClassName("abtixian")[0].style.height=heightnum+"px"
      // document.getElementsByClassName("tixianSuccess")[0].style.height=heightnum+"px"
      // document.getElementsByClassName("tixianSuccess")[0].style.width=widthnum+"px"

    })
  },
  computed: {
    type () {
      if (this.current === 1) {
        return '支付宝'
      } else if (this.current === 2) {
        return '银行卡'
      }
    }
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
    clear () {
      this.amount = ''
      this.mobile = ''
      this.bank_name = ''
      this.user_account = ''
      this.user_truename = ''
      this.amount = ''
    },
    finishw () {
      if(this.apiresult){
      this.apiresult = false
      this.clear()
      this.$router.push({path: '/mysy', query: {current: 2}})
      }
    },
    withdraw () {
      if (!this.amount) {
        this.$toast.fail('请输入提现金额')
        return
      }
      const data = {
        amount: this.amount,
        mobile: this.mobile,
        bank_name: this.bank_name,
        user_account: this.user_account,
        user_truename: this.user_truename,
        amount: this.amount,
        account_type: this.current === 1 ? 1 : 3
      }
      this.userWithdrawApi(data)
    },
    async userWithdrawApi (data) {
      const result = await userWithdraw(data)
      console.log(result, 'api')
      if (result.code === 1) {
        this.clear()
        // Bus.$emit('tixianresult')
        this.$router.push({path: '/wctx'})
      } else {
        this.$toast.fail(result.msg)
        this.apiresult = false
      }
    },
    listClick (item) {
      this.bankname = item
      this.bankShow = false
    },
    clickSbank () {
      this.bankShow = !this.bankShow
    },
    clickTab (arg) {
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
    top: 0;
    left:0;
    background:white;
    width:100vw;
    height:100vh;
    /* padding-top:50px; */
    z-index: 300;
    /* transform: translate(-50%,-50%);
    width:600px;
    height:700px; */


}
.tixss{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width:100vw;
  height:100vh;
  margin:0 auto;
}
.tixss p:nth-child(2){
  font-size:36px;
  color:#333;
  padding-top:10px;
  padding-bottom: 10px;
}
.tixss p:nth-child(3){
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
.abtixian{
  display:flex;
  flex-direction: column;
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
