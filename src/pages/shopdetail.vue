<template>
  <div class="shopdetail">
    <div class="shopheader">
      <span>
        商户介绍
      </span>
    </div>
    <div class="shopbody">
      <div class="shopname">
        <span>{{detail.shop_name}}</span>
            <a :href="'tel:'+detail.contacts">
              <img src="../assets/images/call.png" />
            </a>
      </div>
      <a class="shopaddress" :href="'http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:'+detail.lat+','+detail.lng+';title:'+detail.shop_name+';addr:'+detail.address+'&key=R5PBZ-4LMWW-3W3RQ-OGHPU-UGOQ7-EIFRN&referer=search'">
        <img src="../assets/images/addressposition.png" />
        <span>{{detail.address}}</span>
      </a>
    </div>
    <div class="shopdetailbody">
      <div v-html="detail.content">

      </div>
    </div>
  </div>
</template>

<script>
import {mallTicketShopDetail} from '@/api'
export default {
  data () {
    return {
      shop_id: null,
      detail: {
        shop_name: null
      }
    }
  },
  mounted () {
    this.shop_id = this.$route.query.id
    this.mallTicketShopDetailApi()
  },
  methods: {
    async mallTicketShopDetailApi () {
      const data = {
        shop_id: this.shop_id
      }
      const result = await mallTicketShopDetail(data)
      if (result.code === 1) {
        if (result.data) {
          this.detail = result.data
        }
      }
    }
  }
}
</script>

<style scoped>
.shopdetailbody{
  margin-top:30px;
  font-size:initial;
}
.shopdetailbody img{
  width:100% !important;
  height:auto !important;
}
.shopaddress img{
  width:25px;
  height:33px;
  margin-right:18px
}
.shopaddress span{
  font-size:32px;
  width:calc(100% - 60px);
  color:#333 !important;
  flex: 1 1 auto;
}
.shopname,.shopaddress{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.shopname{
  margin-bottom: 30px;
}
.shopname span{
  font-size: 36px;
  color:#333333;
}
.shopname img{
  width:58px;
  height:58px;
}
.shopbody{
  display:flex;
  flex-direction: column;
  margin-top:50px;
}
.shopdetail{
  display: flex;
  flex-direction: column;
  padding:32px;
}
.shopheader span{
  color: #333333;
  position: relative;
  z-index: 100;
  font-size: 30px;

}
.shopheader span::after{
    position: absolute;
    bottom: 0;
    left: 0;
    content: '';
    background: #FBE6FA;
    height: 0.213333rem;
    width: 100%;
    z-index: -1;
}

</style>
