<template>
          <div class="ticketItem">
            <img :src="item.img" />
            <div class="ticketItemCon">
              <h4>{{item.title}}</h4>
              <p class="ticketp">{{item.des}} <span>5.7km</span> </p>
              <p class="ticketd"><span>¥{{item.pr1}}</span><span >¥{{item.pr2}}</span></p>
              <span class="btn"><router-link to="/ticketdetail" >立即购买</router-link></span>
            </div>
          </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>
  .ticketContent{
    padding-top: 10px;
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
}
.ticketItemCon{
  display: flex;
  flex-direction: column;
  width: 100%;
}
.ticketItemCon h4{
  color:#333333;
  font-size: 30px;
  font-weight: 500;
  line-height: 40px;
  margin-bottom: 8px;
}
.ticketItemCon .ticketp{
  font-size: 24px;
  color:#999999;
  margin-bottom: 18px;
  line-height: 28px;
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
  font-weight: bold;
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
