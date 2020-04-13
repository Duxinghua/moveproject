<template>
  <div class="myAbout">
    <div class="aids" style="font-size: initial;"  v-html="detail">

    </div>
    <NoData v-if="!detail"/>
  </div>
</template>

<script>
import NoData from '@/components/nodata.vue'
export default {
  name: 'MyYx',
  data () {
    return {
      detail: null
    }
  },
  components: {
    NoData
  },
  mounted () {
    console.log(1)
    this.$api.commonConfig({name: 'login_agreement'}).then((res) => {
      if (res.code === 1) {
        this.detail = res.data.value
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.myAbout{
  background:#FBF8F4;
  min-height:100vh;
  padding:0px 26px;
}
.aids{
  font-size: initial;
  word-wrap: break-word;
  word-break: break-all;
  padding-top: 50px;
}
.aids img{
  width:100% !important;
  height:auto !important;
}
</style>
