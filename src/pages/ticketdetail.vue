<template>
  <div class="ticketdetail">
    <div class="tdheader">
      <img src="../assets/images/m1.png" alt="" class="topimg"/>
      <div class="tddes">
        <h4>天空之城成人票+天空之境+往返索道票</h4>
        <p class="tdpdes">仅售118元，价值700元真人野战主题团建拓展火爆开启！</p>
        <div class="tdpf">
          <div class="tdpfl">
            <span>活动价</span><span>¥118</span><span>¥700</span>
          </div>
          <div class="tdpfr sharebutton">
            <img src="../assets/images/share.png"/>
            <span>分享赚佣金</span>
          </div>
        </div>
      </div>
    </div>
    <div class="tdsh">
      <div class="tdsheader">
        <span>商户</span>
        <img src="../assets/images/call.png" />
      </div>
      <p>梁子湖真人cs团建拓展</p>
      <p class="tdshp"><img src="../assets/images/addressposition.png" /><span class="addressdeta">高新二路129号创意产业园3037号</span>
        <span class="juli">5.7km</span>
      </p>
    </div>
    <div class="tdescription">
      <div class="tdesch">
        <span>详情</span>
      </div>
      <div class="tdescb">
        <p>真人CS是各种喜欢军事及户外运动的人大家聚集在一起，的一种军事模拟类真人户外竞技运动。使用模拟类游戏战术发射器（BB弹、水弹、彩弹、激光等各类对抗发射器器械）身着战术装备以及各种款式的军装、护具，进行的模拟军队作战训练的一种游戏，也是国际上风行的wargame（野战游戏）。</p>
        <img src="/static/img/m1.e95871e.png" alt="">
        <img src="/static/img/m1.e95871e.png" alt="">
      </div>
    </div>
    <Paybutton @pay="payClient"/>
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

<style>
  .tdheader .topimg{
    width: 100%;
    height: auto;
  }
  .tddes h4{
    margin-bottom: 10px;
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
  .tdpfr{
    line-height: 0.693333rem;
  }
  .addressdeta{
    width: 100%;
  }
  .tdshp  .juli{
    margin-left: 20px;
    color: #999;
  }
  .tdescription{
    padding-top: 24px;
    margin-bottom: 15px;
  }
  .tdescb{
    font-size: 24px;
    color: #333333;
    text-align: left;
    line-height: 40px;
    margin-bottom: 34px;
  }
  .ticketdetail{
    padding-bottom: 98px;
  }
  .tdesch{
    border-bottom: 1px solid #F3F3F3;
    padding-bottom: 10px;
    margin-bottom: 39px;
  }
  .tdescb img{
    width: 50%;
    float: left;
    padding-right:20px;
    margin-top: 32px;
  }

</style>
