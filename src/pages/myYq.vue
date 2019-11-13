<template>
  <div class="myYq">
    <img class="myYq-top" src="../assets/images/myyq.png" alt="">
    <img class="myYq-qrcode" src="../assets/images/qrcodewrap.png" alt="">
    <div class="myYq-wrap">
      <div class="content">
        <span>长按识别 立即体验</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {

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
      }
    }
  }
}

</style>
