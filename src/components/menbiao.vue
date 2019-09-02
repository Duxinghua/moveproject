<template>
  <router-link class="pritem" :to="'/ticketdetail?id='+pitem.goods_id">
    <img class="pritemimg" :src="pitem.goods_image" />
    <p class="pr1">{{pitem.goods_name}}</p>
    <p class="pr2">{{pitem.description}}</p>
    <div class="pcar">
      <span>¥{{pitem.price}}</span>
      <span>¥{{pitem.price_cost}}</span>
  <img src="../assets/images/pcar.png" />

    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    pitem: Object,
    required: true
  }

}
</script>

<style scoped>
.pritem{
  display: flex;
  flex-direction: column;
  margin-right:10px;
  margin-bottom: 21px;
  width:calc(50% - 10px);
  background:white;
  border-radius: 8px;
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
  margin-top:10px;
  padding-left:10px;
  padding-right:10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pr2{
  font-size:24px;
  color:#999999;
  font-weight: 400;
  padding-left:10px;
  padding-right:10px;
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
  padding-left:10px;
  padding-right:10px;
}
.pcar span:first-child{
  color:#E52B2B;
  font-size: 30px;
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
