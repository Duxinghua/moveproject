<template>
  <div class="myAbout">
    <div class="myrow">
      <span>课程名称：</span>
      <span>{{detail.title}}</span>
    </div>
    <div class="myrow">
      <span>课程描述：</span>
      <span>{{detail.description}}</span>
    </div>
    <div class="myrow">
      <span>课程图片：</span>
      <img :src="detail.image ? detail.image[0] : ''" alt="">
    </div>
    <div class="myrow">
      <span>直播老师：</span>
      <span>{{detail.courseAppoint.live_teacher}}</span>
    </div>
    <div class="myrow">
      <span>直播时间：</span>
      <span>{{detail.courseAppoint.open_time_text}}</span>
    </div>
    <div class="myrow">
      <span>直播地址：</span>
      <span>{{detail.video}}</span>
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata.vue'
export default {
  name: 'VideoDetail',
  data () {
    return {
      detail: {
        courseAppoint: {}
      }
    }
  },
  components: {
    NoData
  },
  mounted () {
    const param = {
      course_id: this.$route.query.courseId
    }
    this.$api.courseDetail(param).then((res) => {
      // this.$toast.clear()
      if (res.code == 1) {
        this.detail = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.myAbout{
  background:#FBF8F4;
  min-height:100vh;
  display: flex;
  flex-direction: column;
  padding:25px;
  box-sizing: border-box;
  .myrow{
    display: flex;
    flex-direction: row;
    font-size: 24px;
    margin-bottom: 5px;
    span:first-child{
      width:20%
    }
    span:last-child{
      width:80%;
    }
    img{
      width:144px;
      height:211px;
    }
  }
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
