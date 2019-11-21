<template>
  <div class="order-commit">
    <div class="order-commit-notice">
本活动为实名制活动，如填写有误，您将无法参与所报名
的活动。为保障您的自身利益，请仔细核对身份信息。                  
    </div>
    <div class="order-commit-content">
      <div>
        <input type="text" placeholder="请输入真实姓名">
        <img src="../assets/images/ordername.png" alt="">
      </div>
      <div>
        <input type="text" placeholder="请输入身份证号">
        <img src="../assets/images/ordercard.png" alt="">
      </div>
      <div>
        <input type="text" placeholder="请确认您的身份证号">
        <img src="../assets/images/ordercard.png" alt="">
      </div>
      <div>
        <input type="tel" placeholder="请输入您的手机号码">
        <img src="../assets/images/ordertel.png" alt="">
      </div>
    </div>
    <div class="order-commit-tip">
      <div class="order-checked">
        <img src="../assets/images/orderchecked.png" alt="">
      </div>
      <div class="order-msg">我已同意<span>实名认证与隐私安全保障》</span>协议</div>
    </div>
    <div class="order-commit-btn" @click="onCommit">
      确认提交
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCommit',
  data () {
    return {}
  },
  methods: {
    onCommit () {
      this.$router.push('/submitCourseOrder')
    }
  }
}
</script>

<style lang="scss" scoped>
.order-commit{
  background: #F6F3EE;
  // padding-bottom: 100px;
  height: 100vh;
  overflow-x: hidden;
  overflow: auto;
  &-notice{
    width: 650px;
    // height: 65px;
    margin: 40px auto;
    font-size: 26px;
    color: #333333;
    line-height: 38px;
  }
  &-content{
    width: 700px;
    height: 460px;
    background-color: #fff;
    border-radius: 10px;
    margin: 0 25px;
    padding-top: 38px;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div{
      height: 73px;
      border: 1px solid #F1F1F1;
      border-radius: 36px;
      font-size: 26px;
      position: relative;
      input{
        width: 630px;
        height: 100%;
        padding-left: 90px;
        border-radius: 36px;
        background-color: #F8F8F8;
        color: #999999;
        border: none;
      }
      img{
        width: 34px;
        height: 34px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        left: 30px;
      }
    }
  }
  &-tip{
    margin-top: 46px;
    margin-left: 40px;
    margin-bottom: 72px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .order-checked{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1px solid #333;
      margin-right: 18px;
      position: relative;
      img{
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .order-msg{
      font-size: 24px;
      color: #999999;
      span{
        color: #6D8160;
      }
    }
  }
  &-btn{
    width: 677px;
    height: 88px;
    line-height: 88px;
    border-radius: 44px;
    margin: 0 auto;
    background-color: #6D8160;
    font-size: 36px;
    color: #F3D995;
    text-align: center;
  }
}
</style>