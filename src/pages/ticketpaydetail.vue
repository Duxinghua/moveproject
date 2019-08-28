<template>
  <div class="ticketdetail">
    <div class="tdheader">
      <img src="../assets/images/m1.png" alt="" class="topimg"/>
      <div class="tddes">
        <h4>天空之城成人票+天空之境+往返索道票</h4>
        <p class="tdshp"><img src="../assets/images/addressposition.png" /><span class="addressdeta">高新二路129号创意产业园3037号</span>
          <a class="juli"></a>
        </p>
        <div class="detailinfo">
          <div class="contitem">
            <div class="contleft">使用日期</div>
            <div class="contrigth pink">2019-08-12 周一</div>
          </div>
          <div class="contitem">
            <div class="contleft">使用方法</div>
            <div class="contrigth">换票入园，同时携带 [商家短信] 和 [身份证] 先换票再入园</div>
          </div>
          <div class="contitem">
            <div class="contleft">截止时间</div>
            <div class="contrigth">08:00-18:00</div>
          </div>
          <div class="contitem">
            <div class="contleft">营业时间</div>
            <div class="contrigth">08:00-18:00</div>
          </div>
          <div class="contitem">
            <div class="contleft">核验方式</div>
            <div class="contrigth">线下核验（固定）</div>
          </div>
          <div class="contitem">
            <div class="contleft">购买数量</div>
            <div class="contrigth">1张</div>
          </div>
        </div>
      </div>
      <div class="tddes">
        <h4 class="xianqi">订单详情</h4>
        <div class="detailinfo">
          <div class="contitem">
            <div class="contleft">游玩人</div>
            <div class="contrigth">啦啦啦 <br> 13578966987</div>
          </div>
          <div class="contitem">
            <div class="contleft">订单编号</div>
            <div class="contrigth">123455678962145</div>
          </div>
          <div class="contitem">
            <div class="contleft">购买数量</div>
            <div class="contrigth">1张</div>
          </div>
          <div class="contitem">
            <div class="contleft">下单时间</div>
            <div class="contrigth">2019-08-07 15:20:14</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paybutton from '../components/paybutton.vue'
export default {
  components: {
    Paybutton
  },
  methods: {
    payClient (e) {
      console.log(e)
    }
  }

}
</script>

<style lang="scss" scoped>
  .tdheader .topimg{
    width: 100%;
    height: auto;
  }
  .tddes{
    padding-bottom: 10px;
    margin-bottom: 20px;
  }
  .tddes h4{
    margin-bottom: 12px;
    font-weight: bold;
  }
  .xianqi{
    font-size: 34px;
  }
  .tdpfl span:nth-child(1){
    font-size: 24px;
  }
  .tdpfl span:nth-child(2){
    color: #E52B2B;
    font-weight: bold;
  }
  .tdpfl span:nth-child(3){
    text-decoration: line-through;
  }
  .addressdeta{
    width: 100%;
  }
  .tdshp{
    padding-bottom: 24px;
    border-bottom: 1px solid #EEEEEE;
  }
  .tdshp  .juli{
    width: 48px;
    height: 48px;
    background: url("../assets/images/call.png") no-repeat center;
    background-size: 100%;
  }
  .ticketdetail{
    padding: 44px 30px 0;
    min-height: 100vh;
  }
  .detailinfo{
    font-size: 24px;
    line-height: 36px;
    padding-top: 24px;
    .contitem{
      padding-bottom: 18px ;
    }
    .contleft{
      float: left;
      width: 160px;
      color: #666666;
    }
    .contrigth{
      overflow: hidden;
      color: #333333;
    }
    .pink{
      color: #9C3FA2;
    }
  }
</style>
