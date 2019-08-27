<template>
  <div class="ticketdetail" v-if="ticketDetail">
    <div class="tdheader">
      <img :src="ticketDetail.goods_image" v-lazy="ticketDetail.goods_image" alt="" class="topimg"/>
      <div class="tddes">
        <h4>{{ticketDetail.goods_name}}</h4>
        <p class="tdpdes">{{ticketDetail.description}}</p>
        <div class="tdpf">
          <div class="tdpfl">
            <span>活动价</span><span>¥{{ticketDetail.price}}</span><span>¥{{ticketDetail.price_cost}}</span>
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
      <p>{{ticketDetail.shop_detail.shop_name}}</p>
      <p class="tdshp"><img src="../assets/images/addressposition.png" /><span class="addressdeta">{{ticketDetail.shop_detail.address}}</span>
<!--        <span class="juli">5.7km</span>-->
      </p>
    </div>
    <div class="tdescription">
      <div class="tdesch">
        <span>详情</span>
      </div>
      <div class="tdescb" v-html="ticketDetail.content">
      </div>
    </div>
    <Paybutton @pay="payClient"/>
  </div>
</template>

<script>
import {ticketDetailApi} from '@/api'
import Paybutton from '../components/paybutton.vue'
export default {
  data () {
    return {
      ticketDetail: null
    }
  },
  components: {
    Paybutton
  },
  mounted () {
    this.getTicketDetail()
  },
  methods: {
    payClient (e) {
      console.log(e)
    },
    async getTicketDetail () {
      let formdata = {goods_id: this.$route.query.id}
      const data = await ticketDetailApi(formdata)
      if (data.code === 1) {
        this.ticketDetail = data.data
      }
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
    width: 100%;
  }
  .ticketdetail{
    padding-bottom: 98px;
  }
  .tdesch{
    border-bottom: 1px solid #F3F3F3;
    padding-bottom: 10px;
    margin-bottom: 39px;
  }
  .tdescb a{
    width: 100% !important;
  }
  .tdescb img{
    width: 100% !important;
  }

</style>
