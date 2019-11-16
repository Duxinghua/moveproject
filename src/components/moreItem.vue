<template>
    <div class="home-course-more" @click="moreClickHandler">
        <img src="../assets/images/moreleft.png" alt="">
        <span>{{moreText}}</span>
        <img src="../assets/images/moreright.png" alt="">
    </div>
</template>

<script>
export default {
  name: 'MoreItem',
  props: ['moreText', 'moreName', 'moreOffCourse', 'moreOnlineCourse'],
  methods: {
    moreClickHandler () {
      this.$router.push({
        name: this.moreName
      })
      this.$router.push({
        name: this.moreOffCourse
      })
      this.$router.push({
        name: this.moreOnlineCourse
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-course-more{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      height:36px;
      color:#738965;
      line-height: 36px;
      margin-bottom: 13px;
      img{
        width:17px;
        height:25px;
      }
}
</style>
