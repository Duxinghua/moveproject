<template>
  <div class="ticketdetail">
    <div class="tdheader">
      <img :src="detail.goods.goods_image" alt="" class="topimg"/>
      <div class="tddes">
        <h4>{{detail.goods.goods_name}}</h4>
        <p class="tdshp"><span class="addressdeta">{{detail.goods.description}}</span>
          <a class="juli" :href="`tel:${detail.shop_mobile}`"></a>
        </p>
        <div class="detailinfo">
          <div class="contitem">
            <div class="contleft">购买数量</div>
            <div class="contrigth pink">{{detail.goods.num}} 份</div>
          </div>
        </div>
      </div>
      <div class="tddes">
        <h4 class="xianqi">订单信息</h4>
        <div class="detailinfo">
          <div class="contitem">
            <div class="contleft">收货人</div>
            <div class="contrigth">
              {{detail.true_name}}
              <br/>
              {{detail.mobile}}
              <br/>
              {{detail.province}}{{detail.city}}{{detail.area}}{{detail.address}}
              </div>
          </div>
          <div class="contitem">
            <div class="contleft">快递单号</div>
            <div class="contrigth" style="color:#923D93">
              {{detail.express_company}}<br/>
              {{detail.express_number}}
            </div>
          </div>
          <div class="contitem">
            <div class="contleft">购买数量</div>
            <div class="contrigth">{{detail.goods.num}}份</div>
          </div>
          <div class="contitem">
            <div class="contleft">订单总价</div>
            <div class="contrigth">{{detail.price_amount}}元</div>
          </div>
          <div class="contitem">
            <div class="contleft">订单编号</div>
            <div class="contrigth">{{detail.order_code}}</div>
          </div>
          <div class="contitem">
            <div class="contleft">下单时间</div>
            <div class="contrigth">{{detail.create_time}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paybutton from '../components/paybutton.vue'
import {mallOrderOrderDetail} from '@/api'
export default {
  mounted () {
    this.mallOrderOrderDetailApi()
  },
  data () {
    return {
      detail: {
        goods: {}
      }
    }
  },
  methods: {
    async mallOrderOrderDetailApi () {
      const data = {
        order_id: this.$route.query.id
      }
      console.log(data, 'data')
      const result = await mallOrderOrderDetail(data)
      if (result.code === 1) {
        this.detail = result.data
      }
    },
    payClient (e) {
      console.log(e)
    }
  },
  components: {
    Paybutton
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
