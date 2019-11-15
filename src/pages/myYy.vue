<template>
  <div class="MyYy">
    <div class="MyYy-item">
      <div class="myleft">
        <img class="img" src="../assets/images/myYypic.png" alt="" />
        <img class="play" src="../assets/images/myYyplay.png" alt="">
      </div>
      <div class="myright">
        <span class="title">传统构图三大要素</span>
        <div class="userinfo">
          <img src="../assets/images/people.png" alt="">
          <span>Kate sapdiek</span>
        </div>
        <span class="time">预约时间：2019.10.11</span>
        <span class="btn">取消预约</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyYy',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.MyYy{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:#FBF8F4;
  &-item{
    display: flex;
    flex-direction: row;
    background:white;
    padding:43px 0px;
    .myleft{
      width:325px;
      height:216px;
      margin-left:26px;
      margin-right:26px;
      position: relative;
      .img{
        width:100%;
        height:100%;
      }
      .play{
        position: absolute;
        left:50%;
        top:50%;
        width:51px;
        height:51px;
        transform: translate(-50%,-50%)
      }
    }
    .myright{
      display: flex;
      flex-direction: column;
      margin-right:26px;
      width:347px;
      .title{
        font-size: 30px;
        color: #333333;
      }
      .userinfo{
        display: flex;
        flex-direction: row;
        margin-top:14px;
        img{
          width:38px;
          height:38px;
          margin-right:13px;
        }
        span{
          width:296px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 26px;
          color:#898C87;
        }
      }
      .time{
        font-size: 26px;
        color:#6D8160;
        margin-top:15px;
      }
      .btn{
        width:180px;
        height:62px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(227, 227, 227, 1);
        border-radius:31px;
        font-size: 30px;
        color:#666666;
        line-height: 62px;
        text-align: center;
        margin-top:15px;
      }
    }
  }
}
</style>
