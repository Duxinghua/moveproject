<template>
  <div class="ticketdetail">
    <div class="tdheader">
      <img src="../assets/images/m1.png" alt="" />
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
      <p class="tdshp"><img src="../assets/images/addressposition.png" /><span>高新二路129号创意产业园3037号</span></p>
    </div>
    <div class="tdescription">
      <div class="tdesch">
        <span>详情</span>
      </div>
      <div class="tdescb">
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

</style>
