<template>
  <div class="ticketdetail" v-if="detail">
    <div class="tdheader" v-if="detail&&detail.goods">
      <img v-lazy="detail.goods.goods_image" alt="" class="topimg"/>
      <div class="tddes">
        <h4>{{detail.goods.goods_name}}</h4>
        <p class="tdshp">
          <a :href="`http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:${detail.shop.lat},${detail.shop.lng};title:${detail.goods.goods_name};addr:${detail.shop.address}&key=R5PBZ-4LMWW-3W3RQ-OGHPU-UGOQ7-EIFRN&referer=search`">
            <img src="../assets/images/addressposition.png" />
            <span class="addressdeta">{{detail.shop.address}}</span>
          </a>
          <a class="juli" :href="`tel:${detail.shop.contacts}`"></a>
        </p>
        <div class="detailinfo">
          <div class="contitem">
            <div class="contleft">使用方法</div>
            <div class="contrigth">{{detail.goods.remark}}</div>
          </div>
          <div class="contitem">
            <div class="contleft">截止时间</div>
            <div class="contrigth">{{detail.goods.end_time}}</div>
          </div>
          <div class="contitem">
            <div class="contleft">营业时间</div>
            <div class="contrigth">{{detail.shop.business_time}}</div>
          </div>
          <div class="contitem">
            <div class="contleft">核验方式</div>
            <div class="contrigth">线下核验（固定）</div>
          </div>
          <div class="contitem">
            <div class="contleft">购买数量</div>
            <div class="contrigth">{{detail.num}}张</div>
          </div>
        </div>
      </div>
      <div class="tddes">
        <h4 class="xianqi">订单详情</h4>
        <div class="detailinfo">
          <div class="contitem">
            <div class="contleft">游玩人</div>
            <div class="contrigth">{{detail.true_name}} <br> {{detail.mobile}}</div>
          </div>
          <div class="contitem">
            <div class="contleft">订单编号</div>
            <div class="contrigth">{{detail.order_code}}</div>
          </div>
          <div class="contitem">
            <div class="contleft">购买数量</div>
            <div class="contrigth">{{detail.num}}张</div>
          </div>
          <div class="contitem">
            <div class="contleft">下单时间</div>
            <div class="contrigth">{{detail.create_time}}</div>
          </div>
        </div>
      </div>
      <div class="ticketdetail-bottom" v-if="detail&&detail.order_check.length!=0">
        <h4>核销码</h4>
        <p v-for="(item,index) in detail.order_check" :key="index">
          <span>核销码</span>
          <span :class="item.check_status==2?'through':''">{{item.check_number}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Paybutton from '../components/paybutton.vue'
import {tickOrderDetailApi} from '@/api'
export default {
  components: {
    Paybutton
  },
  mounted () {
    this.tickOrderDetail()
  },
  data () {
    return {
      detail: null
    }
  },
  methods: {
    payClient (e) {
      console.log(e)
    },
    async tickOrderDetail () {
      let formdata = {order_id: this.$route.query.id}
      const data = await tickOrderDetailApi(formdata)
      this.detail = data.data
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
    justify-content: space-between;
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
    &-bottom{
      padding-bottom: 10px;
      margin-bottom: 20px;
      background: white;
      h4{
        margin: 12px 0;
        font-size: 34px;
        padding-left: 30px;
        font-weight: bold;
      }
      p{
        color: #666;
        font-size: 24px;
        display: flex;
        flex-wrap: nowrap;
        padding-left: 30px;
        span:last-child{
          margin-left: 80px;
        }
        .through{
          text-decoration: line-through;
        }
      }
    }
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
