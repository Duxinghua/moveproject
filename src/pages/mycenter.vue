<template>
  <div class="mycenter">
    <div class="mycHeader">
      <img class="myavater" src="../assets/images/mc1.png" />
      <span class="myusername">会员August、</span>
      <div class="myjr">
          <!-- <img class="myjrb" src="../assets/images/tsb.png" /> -->
          <p class="p1">00.00</p>
          <p class="p2">可提现</p>
          <p class="p3"><span>累计总额00.00元</span><span>已提现00.00元</span></p>
      </div>

    </div>
    <div class="mycBody">
      <div class="myorder">
        <h4>我的订单</h4>
        <div class="myofun">
          <div class="myoitem">
            <img class="ao" src="../assets/images/ao.png" alt="">
            <span>全部订单</span>
          </div>
          <div class="myoitem">
            <img class="df1" src="../assets/images/df1.png" alt="">
            <span>待付款</span>
          </div>
          <div class="myoitem">
            <img class="df2" src="../assets/images/df2.png" alt="">
            <span>待发货</span>
          </div>
          <div class="myoitem">
            <img class="ds" src="../assets/images/ds.png" alt="">
            <span>待收货</span>
          </div>

        </div>
      </div>
      <div class="myyq">
        <img src="../assets/images/yq.png" />
      </div>
      <div class="myyqg">
        <div class="myyqgitem">
          <img class="myyqic" src="../assets/images/yj.png" />
          <span class="myyqc" >邀请好友获得奖励金</span>
          <span class="myyqbtn">去邀请</span>
        </div>
        <div class="myyqgitem">
          <img class="myyqic" src="../assets/images/ma.png" />
          <span class="myyqc">我的地址</span>
          <img class="myyqnext" src="../assets/images/addressnext.png" />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from '../components/footer.vue'
export default {
  components: {
    Footer
  }
}
</script>

<style>

</style>
