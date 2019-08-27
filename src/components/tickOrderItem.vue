<template>
  <router-link class="item" :to="'/activitydetail?id='+avitem.activity_id">
    <div class="item-head">
      <div class="item-head-title">2019年6月27号 11:11:11</div>
      <div class="item-head-status">已核销</div>
    </div>
    <div class="item-content">
      <div class="item-content-img"><img :src="avitem.image" /></div>
      <div class="item-content-info">
        <div class="item-content-info-title">天空之城成人票+天空之境+往返索道 票</div>
        <div class="item-content-info-con">高新二路129号创意产业园3037号高新二 路29号创意产业园3037号</div>
      </div>
    </div>
    <div class="item-bottom">
      <div class="item-bottom-count">数量：1</div>
      <div class="item-bottom-money">支付金额：<span>￥298.00</span></div>
    </div>
    <div class="item-btn">
      <div class="item-btn-close">关闭订单</div>
      <div class="item-btn-repay">立即支付</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    avitem: {
      type: Object,
      required: true
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
      color: #fff;
      background: #9C3FA2;
    }
  }
}
</style>
