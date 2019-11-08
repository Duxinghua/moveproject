<template>
  <div class="hometitle">
    <img src="../assets/images/titleleft.png" alt="">
    <span>{{title}}</span>
    <img src="../assets/images/titleright.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'titleItem',
  props: ['title']
}
</script>

<style lang="scss" scoped>
.hometitle{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding-top:30px;
      padding-bottom: 30px;
      img{
        width:141px;
        height:18px;
      }
      span{
        font-size: 36px !important;
        color:#333 !important;
        font-weight: 500 !important;
        padding-left:15px;
        padding-right:15px;
      }
}
</style>
