<template>
  <div class="nodata">
    <img :src="imgurl" alt="">
    <p>暂无数据</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgurl: require('@/assets/images/nodata.png')
    }
  },
  mounted () {

  },
  methods: {

  }

}
</script>

<style lang='scss' scoped>
  .nodata{
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    img{
      display: block;
      width: 203px;
      height: 211px;
      margin: 0 auto;
    }
    p{
      margin-top: 20px;
      text-align: center;
      font-size: 24px;
    }
  }
</style>
