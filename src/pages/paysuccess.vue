<template>
  <div class="paysuccess">
        <TopNav :menu="menutext" />
        <img src="../assets/images/sss.png" class="paysuico" />
        <div class="title">
          支付成功
        </div>
        <div class="des">
          订单支付成功，请耐心等待!
        </div>
        <div class="btns" @click="handlerss">
          确定
        </div>
  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  components:{
    TopNav
  },
  data(){
    return {
        menutext: "支付成功"
    }
  },
  methods:{
    handlerss() {
          this.$router.push("/")
    }
  }

}
</script>

<style lang="scss" scoped>
.paysuccess{
  width:100%;
  min-height: 100vh;
  background: white;
  padding-top:180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .paysuico{
    width: 160px;
    height:160px;
  }
  .title{
    margin-top:20px;
    color:#333333;
    font-size: 38px;
  }
  .des{
        margin-top:20px;
    color:#888888;
    font-size: 28px;
  }
  .btns{
    width: 220px;
    height:60px;
    line-height: 60px;
    text-align: center;
    margin-top:60px;
    color:#333333;
    font-size: 28px;
    border-radius: 10px;
    border:2px solid #888888;

  }
}

</style>
