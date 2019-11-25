<template>
  <div class="order-suc">
    <div class="order-suc-msg">
      <img src="../assets/images/paysuccess.png" alt="">
      <div class="pay-suc">
        <span>订单支付成功</span>
        <span>¥4280.00</span>
        <span>可添加微信V21542233</span>
      </div>
    </div>
    <div class="order-suc-btns">
      <span @click="toHomeHandler">返回首页</span>
      <span>查看订单</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderSuccess',
  data () {
    return {}
  },
  methods: {
    toHomeHandler () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.order-suc{
  background: #fbf8f5;
  padding: 187px 75px;
  // padding-bottom: 100px;
  min-height: 100vh;
  &-msg{
    display: flex;
    flex-direction: column;
    align-items: center;
    img{
      width: 384px;
      height: 232px;
      margin-bottom: 58px;
    }
    .pay-suc{
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        font-size: 30px;
        margin: 8px 0;
        color: #333333;
      }
      span:nth-child(2){
        color: #995258;
      }
      span:nth-child(3){
        color: #999999;
        font-size: 24px;
      }
    }
  }
  &-btns{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 93px;
    span{
      width: 288px;
      height: 88px;
      line-height: 88px;
      text-align: center;
      border-radius: 44px;
      font-size: 36px;
      color: #666666;
      border: 1px solid #E3E3E3;
      background-color: #FBF8F4;
    }
    :last-child{
      color: #F3D995;
      border: 1px solid #708363;
      background-color: #708363;
    }
  }
}
</style>