<template>
    <div class="paybutton">
      <span>在线支付：</span>
      <span>¥{{price}}</span>
     <span class="button" @click="handlePay">立即购买</span>
      <!-- <router-link class="button" to="/ticketpay">立即预订</router-link> -->
    </div>
</template>

<script>
export default {
  name: 'pay',
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
  bottom: 0;
  left:0;
  color:#333333;
  font-size: 24px;
  background:white;
  box-shadow:0px 4px 9px 0px rgba(217,217,217,0.21);
}

.paybutton span:nth-child(2){
  flex:1 1 auto;
  color:#E52B2B;
  font-size: 34px;
  /* font-weight: bold; */
}
.paybutton .button{
  background:#943D93;
  padding:17px 51px;
  border-radius: 8px;
  color:white;
  font-size: 28px;
  line-height: 40px;
  text-align: center;
}

</style>
