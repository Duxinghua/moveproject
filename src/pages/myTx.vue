<template>
  <div class="myTx">
    <div class="myTx-top">
      <div class="myTx-top-item" @click="MenuClickHandler(0)">
        <img src="../assets/images/alipay.png" alt="">
        <span>支付宝提现</span>
        <img :src="current === 0 ? require('../assets/images/select.png') : require('../assets/images/noselect.png')" alt="">
      </div>
      <div class="myTx-top-item" @click="MenuClickHandler(1)">
        <img src="../assets/images/blank.png" alt="">
        <span>银行卡提现</span>
        <img :src="current === 1 ? require('../assets/images/select.png') : require('../assets/images/noselect.png')" alt="">
      </div>
    </div>
    <div class="myTx-content">
      <div class="myTx-content-alipay">
        <input type="text" v-model="alipay" placeholder="请输入支付宝账号" v-if="current === 0">
        <input type="text" v-model="blank" placeholder="请输入银行账号" v-if="current === 1">
        <input type="text" v-model="blankName" placeholder="请输入开户银行" v-if="current === 1">
        <input type="text" v-model="userName" placeholder="请输入姓名">
        <input type="text" v-model="mobile" placeholder="请输入手机号码">
        <span>提取金额</span>
        <div class="input-wrap">
          <input type="text" v-model="inputMoney">
          <span>¥</span>
        </div>
        <div class="tip-wrap">
          可提现金额¥{{money}}
        </div>
      </div>
    </div>
    <div class="myTx-btn" @click="txClickHandler">
      确认提现
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyTx',
  data () {
    return {
      current: 0,
      money: '0',
      alipay: '',
      blank: '',
      blankName: '',
      userName: '',
      mobile: '',
      type: 0,
      inputMoney: ''
    }
  },
  methods: {
    MenuClickHandler (e) {
      this.blank = ''
      this.blankName = ''
      this.mobile = ''
      this.userName = ''
      this.alipay = ''
      this.inputMoney = ''
      this.type = ''
      this.current = e
      this.type = e
    },
    txClickHandler () {
      if (this.current === 0) {
        if (!this.alipay) {
          this.$toast('请输入支付宝账号')
          return
        }
      }
      if (this.current === 1) {
        if (!this.blank) {
          this.$toast('请输入银行账号')
          return
        }
        if (!this.blankName) {
          this.$toast('请输入开户银行')
          return
        }
      }
      if (!this.userName) {
        this.$toast('请输入姓名')
        return
      }
      if (!this.mobile) {
        this.$toast('请输入手机号码')
        return
      }
      if (!this.inputMoney) {
        this.$toast('请输入提现金额')
        return
      }
      var params = {
        bank_account: this.blank,
        bank_address: this.blankName,
        mobile: this.mobile,
        true_name: this.userName,
        ali_account: this.alipay,
        money: this.inputMoney,
        type: this.type
      }
      this.$api.userStoreTakeout(params).then((res) => {
        if (res.code === 1) {
          this.$toast({
            message: res.msg,
            onClose: () => {
              console.log('sss')
              this.blank = ''
              this.blankName = ''
              this.mobile = ''
              this.userName = ''
              this.alipay = ''
              this.inputMoney = ''
              this.type = ''
              this.$router.push({name: 'MyFx', query: {current: 1}})
            }
          })
        } else {
          this.$toast(res.msg)
        }
      })
    }
  },
  mounted () {
    this.money = this.$route.params.money
  }
}
</script>

<style lang="scss" scoped>
.myTx{
  display: flex;
  flex-direction: column;
  background:#FBF8F4;
  min-height: 100vh;
  &-top{
    display: flex;
    flex-direction: column;
    background:white;
    padding-left:26px;
    padding-right:26px;
    &-item{
      padding-left:26px;
      padding-right:26px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height:129px;
      color:#333;
      font-size: 30px;
      border-bottom: 1px solid #F3F3F3;
      img:nth-child(1){
        width:64px;
        height:64px;
        margin-right:21px;
      }
      span{
        flex:1;
      }
      img:nth-child(3){
        width:30px;
        height:30px;
      }
    }
    &-item:last-child{
      border-bottom: 1px solid transparent;
    }
  }
  &-content{
    margin-top:15px;
    background:white;
    input{
      font-size: 32px;
      color:#333333;
      height:90px;
      border:none;
      border-bottom:1Px solid #F3F3F3;
      padding-left:26px;
      padding-right:26px;
    }
    &-alipay{
      display: flex;
      width:100%;
      flex-direction: column;
      padding-left:26px;
      padding-right:26px;
      span{
        color:#333;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-left:26px;
        font-size: 30px;
      }
      .input-wrap{
        height:90px;
        position: relative;
        width:100%;
        span{
          position: absolute;
          left:5px;
          top:50%;
          transform: translateY(-50%)
        }
        input{
          width: 100%;
          padding-left:54px;
          position: absolute;
          transform: translateY(-50%);
          left:5px;
          top:50%;
        }
      }
      .tip-wrap{
        height: 90px;
        display: flex;
        font-size: 24px;
        color:#999999;
        line-height: 90px;
        padding-left: 26px;
      }
    }
  }
  &-btn{
    width:683px;
    height:88px;
    background:#728565;
    line-height:88px;
    text-align: center;
    font-size: 36px;
    color:#F3D995;
    border-radius: 44px;
    margin:72px auto 192px auto;
  }
}
</style>
