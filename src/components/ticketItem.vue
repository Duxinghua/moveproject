<template>
  <router-link :to="'/ticketdetail?id='+item.goods_id">
    <div class="ticketItem">
      <img :src="item.goods_image" v-lazy="item.goods_image"/>
      <div class="ticketItemCon">
        <h4>{{item.goods_name}}</h4>
        <p class="ticketp">{{item.description}}</p>
        <p class="ticketd"><span>¥{{item.price}}</span><span >¥{{item.price_cost}}</span></p>
        <span class="btn">立即购买</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped>
  .ticketContent{
    padding-top: 10px;
  }
  a{
    display: block;
  }
.ticketItem{
  border-bottom: 1px solid #F3F3F3;
  display: flex;
  flex-direction:row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top:28px;
  padding-bottom: 32px;
}
.ticketItem img{
  width:176px;
  height:132px;
  margin-right:29px;
  border-radius: 8px;
}
.ticketItemCon{
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ticketItemCon h4{
  color:#333333;
  font-size: 30px;
  font-weight: 500;
  line-height: 40px;
  margin-bottom: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ticketItemCon .ticketp{
  font-size: 24px;
  color:#999999;
  margin-bottom: 18px;
  line-height:32px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
  .ticketItemCon .ticketp span{
    float: right;
  }
.ticketd{
  margin-bottom: 16px;
  font-size: 26px;
  line-height: 32px;
}
.ticketd span:nth-child(1){
  font-size: 30px;
  color:#E52B2B;
  /* font-weight: bold; */
  margin-right:15px;
}
.ticketd span:nth-child(2){
  font-size: 26px;
  color:#999999;
  text-decoration:line-through;
  font-size: 24px;
}
.ticketItemCon .btn{
  width:160px;
  height:52px;
  border-radius: 8px;
  color:#8C3B92;
  background:#EEE4FD;
  border:1px solid #E4C1E7;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 24px;
}
.ticketItemCon .btn a{
  color: #8C3B92;
}

</style>
