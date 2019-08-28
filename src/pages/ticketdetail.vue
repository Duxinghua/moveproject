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
        <a :href="'tel:'+ticketDetail.shop_detail.contacts">
        <img src="../assets/images/call.png" />
        </a>
      </div>
      <p>{{ticketDetail.shop_detail.shop_name}}</p>
      <p class="tdshp"><img src="../assets/images/addressposition.png" />
        <a :href="'http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:'+ticketDetail.shop_detail.lat+','+ticketDetail.shop_detail.lng+';title:'+ticketDetail.shop_detail.shop_name+';addr:'+ticketDetail.shop_detail.address+'&key=R5PBZ-4LMWW-3W3RQ-OGHPU-UGOQ7-EIFRN&referer=search'"><span class="addressdeta">{{ticketDetail.shop_detail.address}}</span></a>
      </p>
    </div>
    <div class="tdescription" v-if="ticketDetail&&ticketDetail.content">
      <div class="tdesch">
        <span>详情</span>
      </div>
      <div class="tdescb" v-html="ticketDetail.content">
      </div>
    </div>
    <div class="paybutton">
      <span>在线支付：</span>
      <span>¥{{ticketDetail.price}}</span>
      <router-link class="button" :to="'/ticketpay?id='+ticketDetail.goods_id">立即预订</router-link>
    </div>
  </div>
</template>

<script>
import {ticketDetailApi} from '@/api'
export default {
  data () {
    return {
      ticketDetail: null
    }
  },
  mounted () {
    this.getTicketDetail()
  },
  methods: {
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

<style scoped>
  .tdsheader a{
    display: inherit;
  }
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
    color: #333333;
    font-size:26px;
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
    overflow-x: hidden;
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
    z-index: 101;
    bottom: 0;
    left:0;
    color:#333333;
    font-size: 26px;
    background:white;
    box-shadow:0px 4px 9px 0px rgba(217,217,217,0.21);
  }

  .paybutton span:nth-child(2){
    flex:1 1 auto;
    color:#E52B2B;
    font-size: 32px;
    font-weight: bold;
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
