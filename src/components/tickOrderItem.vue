<template>
  <div class="item">
    <router-link :to="'/ticketpaydetail?id='+item.order_id">
      <div class="item-head">
        <div class="item-head-title">{{item.create_time}}</div>
        <div class="item-head-status">{{statusList[item.status]}}</div>
      </div>
      <div class="item-content">
        <div class="item-content-img"><img :src="item.goods_image" /></div>
        <div class="item-content-info">
          <div class="item-content-info-title">{{item.goods_name}}</div>
          <div class="item-content-info-con">{{item.description}}</div>
        </div>
      </div>
      <div class="item-bottom">
        <div class="item-bottom-count">数量：{{item.count}}</div>
        <div class="item-bottom-money">支付金额：<span>￥{{item.price_pay}}</span></div>
      </div>
    </router-link>
    <div class="item-btn" v-if="item.status==0">
      <div class="item-btn-close" @click="closeOrder">关闭订单</div>
      <div class="item-btn-repay">
        <router-link :to="'/ticketpay?id='+item.order_id">立即支付</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      statusList: {
        '0': '待付款',
        '1': '待核销',
        '10': '已核销'
      }
    }
  },
  methods: {
    closeOrder () {
      this.$dialog.confirm({
        title: '提示',
        message: '是否关闭订单'
      }).then(() => {
        console.log('11')
      }).catch(() => {})
    }
  }
}
</script>

<style lang='scss' scoped>
.item{
  background: #fff;
  padding: 0 20px 20px 20px;
  margin-bottom: 30px;
  &-head{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    line-height:68px;
    font-size:30px;
    &-title{
      color: #000000;
    }
    &-status{
      color: #8C3B92;
    }
  }
  &-content{
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    &-img{
      width: 194px;
      height: 150px;
      img{
        display: block;
        width: 194px;
        height: 150px;
      }
    }
    &-info{
      width: 450px;
      margin-left: 20px;
      line-height: 36px;
      &-title{
        font-size: 28px;
        color: #333;
      }
      &-con{
        margin-top: 10px;
        font-size: 24px;
        color: #999;
      }
    }
  }
  &-bottom{
    margin-top: 20px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    &-count{
      font-size: 24px;
      color: #333;
    }
    &-money{
      font-size: 28px;
      color: #333;
      span{
        font-size: 32px;
        color: #8C3B92;
      }
    }
  }
  &-btn{
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    font-size: 32px;
    text-align: center;
    margin-top: 20px;
    &-close{
      width:187px;
      height:68px;
      line-height:68px;
      border-radius:6px;
      color: #a043a7;
      background: #eee3fd;
      margin-right: 20px;
    }
    &-repay{
      width:187px;
      height:68px;
      line-height:68px;
      border-radius:6px;
      background: #9C3FA2;
      a{
        color: #fff;
      }
    }
  }
}
</style>
