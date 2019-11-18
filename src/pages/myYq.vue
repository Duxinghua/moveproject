<template>
  <div class="myYq">
    <img class="myYq-top" src="../assets/images/myyq.png" alt="">
    <img class="myYq-qrcode" src="../assets/images/qrcodewrap.png" alt="">
    <div class="myYq-wrap">
      <div class="content">
        <span>长按识别 立即体验</span>
        <img :src="qrurl" alt="" />
      </div>
    </div>
    <div class="myYq-btn">
      分享邀请好友
    </div>
  </div>
</template>

<script>
import Api from '@/api/index'
export default {
  data () {
    return {
      qrurl: ''
    }
  },
  mounted () {
    Api.userQrcode().then((result) => {
      if (result.code === 1) {
        this.qrurl = result.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.myYq{
  background:#FBF8F4;
  display: flex;
  flex-direction: column;
  height:100vh;
  &-top{
    width:750px;
    height:586px;
  }
  &-qrcode{
    position: fixed;
    top:432px;
    left:50%;
    transform: translateX(-50%);
    width:448px;
    height:440px;
    z-index: 1;
  }
  &-wrap{
    position: fixed;
    top:432px;
    left:50%;
    transform: translateX(-50%);
    width:448px;
    height:440px;
    z-index: 2;
    .content{
      display: flex;
      flex-direction: column;
      span{
        height:58px;
        width:100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 29px;
        color:white;
      }
      img{
        width:262px;
        height:260px;
        margin-top:64px;
        margin-left:93px
      }
    }
  }
  &-btn{
    background:#718464;
    width:683px;
    height:88px;
    border-radius: 44px;
    color:#F3D995;
    text-align: center;
    line-height: 88px;
    font-size:36px;
    position: fixed;
    left:50%;
    top:80%;
    transform: translateX(-50%)

  }
}

</style>
