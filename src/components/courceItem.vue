<template>
    <div class="home-course-content-item" @click="courseDetailHandler(item.course_id)">
          <img class="course-img" :src="item.image[0]" alt="">
          <span>{{item.title}}</span>
          <div class="course-people">
            <img :src="item.admin.avatar" alt="">
            <span>{{item.admin.nickname}}</span>
          </div>
    </div>
</template>

<script>
export default {
  name: 'CourseItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    courseDetail: {
      type: String,
      required: true
    }
  },
  methods: {
    courseDetailHandler (index) {
      this.$router.push({path: this.courseDetail, query: {id: index}})
    }
  }
}
</script>

<style lang="scss" scoped>
.home-course-content-item{
        display: flex;
        flex-direction: column;
        width:336px;
        margin-right:26px;
        margin-bottom: 26px;
        .course-img{
          width:336px;
          height:225px;
          border-radius:8px;
        }
        span{
          width:100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 30px;
          color:#333;
          height:60px;
          line-height: 60px;
        }
        .course-people{
          display: flex;
          flex-direction: row;
          height:38px;
          align-items: center;
          img{
            width:38px;
            height:38px;
            border-radius:50%;
            margin-right:15px;
          }
          span{
            font-size: 26px;
            color:#898C87;
            font-weight: 500;
            width:283px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

}
</style>
