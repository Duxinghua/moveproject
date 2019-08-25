<template>
    <div class="paybutton">
      <span>在线支付：</span>
      <span>¥{{price}}</span>
      <span class="button" @click="handlePay">立即购买</span>
    </div>
</template>

<script>
export default {
  props: ['price'],
  methods: {
    handlePay () {
      this.$emit('pay')
    }
  }

}
</script>

<style>
.paybutton{
  padding-right:32px;
  padding-left:32px;
  display: flex;
  height:98px;
  width:100%;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  position:fixed;
  bottom: 98px;
  left:0;
  color:#333333;
  font-size: 26px;
  background:white;
  box-shadow:0px 4px 9px 0px rgba(217,217,217,0.21);
}
.paybutton span:nth-child(2){
  flex:1 1 auto;
  color:#F4781D;
}
.paybutton .button{
  background:#943D93;
  padding:17px 51px;
  border-radius: 8px;
  color:white;
}

</style>
