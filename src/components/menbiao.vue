<template>
  <div class="pritem">
    <img class="pritemimg" :src="pitem.goods_image" />
    <p class="pr1">{{pitem.goods_name}}</p>
    <p class="pr2">{{pitem.description}}</p>
    <div class="pcar">
      <span>¥{{pitem.price}}</span>
      <span>¥{{pitem.price_cost}}</span>
      <router-link :to="'/ticketdetail?id='+pitem.goods_id"><img src="../assets/images/pcar.png" /></router-link>

    </div>
  </div>
</template>

<script>
export default {
  props: {
    pitem: Object,
    required: true
  }

}
</script>

<style>
.pritem{
  display: flex;
  flex-direction: column;
  margin-right:22px;
  margin-bottom: 21px;
  width:calc(50% - 22px)
}
.pritem:nth-child(2n){
  margin-right:0px !important;
}

.pritemimg{
  width:331px;
  height:253px;
}
.pr1{
  color:#333333;
  font-size: 26px;
  font-weight: 500;
  margin-top:21px;
  margin-bottom: 9px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pr2{
  font-size:24px;
  color:#999999;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pcar{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-items: center;
  height:50px;
  margin:auto 0;
}
.pcar span:first-child{
  color:#E52B2B;
  font-size: 30px;
  font-weight: bold;
  margin-right:10px;
}
.pcar span:nth-child(2){
  color:#999999;
  font-size: 26px;
  font-weight: 500;
  text-decoration:line-through;
  flex: 1 1 auto;
  line-height:50px;
}
.pcar img{
  width:44px;
  height:44px;
}
</style>
