<template>
  <div class="login">
    <span class="loginTip">欢迎来到有梦不晚</span>
    <div class="input-wrap">
      <img src="../assets/images/phone.png" alt="">
      <input type="text" placeholder="请输入手机号">
    </div>
    <div class="input-wrap input-wrap-btn">
      <img src="../assets/images/phone.png" alt="">
      <input class="yz" type="text" placeholder="请输入短信验证码">
      <span class="btns" @click="sendClickHandler">{{timerText}}</span>
    </div>
    <div class="xy-wrap">
      <img @click="xyClickHandler" :src="yx ? require('../assets/images/select.png') : require('../assets/images/noselect.png')" alt="">
      <div>我已同意<span>《实名认证与隐私安全保障》</span>协议</div>
    </div>
    <div class="btn">
      确认提交
    </div>
    <img class="myfooter" src="../assets/images/myfooter.png" alt="">
    <div class="tipmessage">
      <img src="../assets/images/logintip.png" alt="">
      <span>验证码错误，请重新输入</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      time: 60,
      timeFlag: true,
      timer: null,
      timerText: '获取验证码',
      yx:true,
    }
  },
  methods: {
    xyClickHandler () {
      this.yx = !this.yx
    },
    sendClickHandler () {
      if (this.timeFlag) {
        this.timeFlag = false
        this.timer = setInterval(()=>{
          if(this.time === 0){
            clearInterval(this.timer)
            this.time = 60
            this.timer = null
            this.timeFlag = true
            this.timerText = '获取验证码'
          }else{
            this.time --
            this.timerText = this.time+'s'
          }
        },1000)
      }
    }
  },
  destroyed(){
      clearInterval(this.timer)
      this.time = 60
      this.timer = null
      this.timeFlag = true
  }

}
</script>

<style lang="scss" scoped>
.tipmessage{
  width:100%;
  height:88px;
  background:white;
  box-shadow:0px 12px 12px 1px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  left:0;
  top:0;
  img{
    width:49px;
    height:49px;
    margin-right:22px;
    margin-left:22px;
  }
  span{
    font-size: 30px;
    color:#666666;
  }
}
.login{
  display: flex;
  flex-direction: column;
  padding-left:26px;
  padding-right:26px;
  .loginTip{
    font-size: 36px;
    color:#333;
    margin-top: 160px;
    margin-bottom: 70px;
  }
  input{
    width:100%;
    font-size: 26px;
    height: 100%;
    color:#999999;
    background:#F8F8F8;
    border:none;
    border-radius: 44px;
    padding-left: 76px;
  }
  .input-wrap{
    height:88px;
    width:100%;
    position: relative;
    margin-bottom: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width:30px;
      height:34px;
      position: absolute;
      top:50%;
      left:26px;
      transform: translateY(-50%)
    }
  }
  .input-wrap-btn{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .yz{
      width:60%;
    }
    .btns{
      width:35%;
      height:88px;
      color:#333333;
      font-size: 26px;
      border:2px solid #F1F1F1;
      border-radius: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .xy-wrap{
    display: flex;
    flex-direction: row;
    font-size: 24px;
    color:#999999;
    padding-left:5px;
    margin-top: 40px;
    margin-bottom: 99px;
    img{
      width:34px;
      height:34px;
      margin-right:10px;

    }
    span{
      color:#6D8160;
    }
  }
  .btn{
    background:#738666;
    width:677px;
    height:88px;
    line-height:88px;
    text-align: center;
    margin:0 auto;
    font-size: 36px;
    color:#F3D995;
    border-radius: 44px;
  }
  .myfooter{
    position: fixed;
    left:0;
    bottom: 0;
    height:200px;
    width:100%;
  }
}
</style>
