<template>
  <div class="nodata">
    <img :src="imgurl" alt="">
    <p>{{autotips}}</p>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data () {
    return {
      imgurl: require('@/assets/images/nodata.png')
    }
  },
  computed: {
    autotips () {
      if (!this.message) {
        return '暂无数据'
      } else {
        return this.message
      }
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
    position: absolute;
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
      font-size: 30px;
      color: #999999;
    }
  }
</style>
