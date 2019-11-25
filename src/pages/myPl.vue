<template>
  <div class="myPl">
    <div class="myPl-item">
      <img class="myPl-item-left" src="../assets/images/people.png" alt="" />
      <div class="myPl-item-right">
        <div class="top">
          <span>陌上花开135</span>
          <span>2019-10-06</span>
        </div>
        <div class="pl">
          <span class="pl-item">
          夜想就夜想就
          </span>
          <span class="pl-item">
            日思夜
          </span>
          <span class="pl-item">
            日思夜想就想再来一杯
          </span>
        </div>
        <div class="goods">
          <img class="img" src="../assets/images/770552.png" alt="">
          <div class="goodsinfo">
            <span>青梅菊花酒</span>
            <span>绵甜低度健康酒，清火养生养生养生养生养生养生养生</span>
            <span>¥99</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPl',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.myPl{
  display: flex;
  flex-direction: column;
  &-item{
    padding:26px 26px 45px 26px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    &-left{
      width:65px;
      height:65px;
      margin-right:20px;
    }
    &-right{
      width:613px;
      display: flex;
      flex-direction: column;
      .top{
        height:65px;
        font-size: 26px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        span:nth-child(1){
          color:#333;
          margin-right:20px;
        }
        span:nth-child(2){
          color:#999;
        }
      }
      .pl{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        &-item{
          width:fit-content;
          padding:19px 40px;
          border:2px solid #E7E7E7;
          margin-right:11px;
          margin-top:20px;
          font-size:30px;
          color:#333;
          border-radius: 44px;
        }
      }
      .goods{
        width:100%;
        height:199px;
        background:rgba(247,247,247,1);
        border-radius:12px;
        display: flex;
        flex-direction: row;
        padding:31px;
        box-sizing: border-box;
        margin-top:30px;
        .img{
          width:186px;
          height:137px;
          border-radius: 8px;
          margin-right:31px;
        }
        .goodsinfo{
          display: flex;
          flex-direction: column;
          width:340px;
          span{
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:nth-child(1){
            font-size: 30px;
            color:#333;
          }
          span:nth-child(2){
            font-size: 26px;
            color:#666;
            margin-top:14px;
          }
          span:nth-child(3){
            font-size: 30px;
            color:#995258;
            margin-top:20px;
          }
        }
      }
    }

  }
}
</style>
