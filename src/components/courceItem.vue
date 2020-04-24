<template>
    <div class="home-course-content-item" @click="courseDetailHandler(item.course_id)">
          <div class="course-img">
              <van-image :src="item.image[0]">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
          </div>
          <!-- <img class="course-img" :src="item.image[0]" alt=""> -->
          <span class="cspan">{{item.title}}</span>
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
    }
    // courseDetail: {
    //   type: String,
    //   required: true
    // }
  },
  methods: {
    courseDetailHandler (index) {
      if (this.item.type == 2) {
        this.$router.push({path: '/onlineCourseDetail', query: {id: index}})
      } else if (this.item.type == 3) {
        this.$router.push({path: '/offCourseDetail', query: {id: index}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home-course-content-item{
        display: flex;
        flex-direction: column;
        width:calc((100% - 24px)/2);
        margin-right:24px;
        margin-bottom:24px;
        .course-img{
          width:100%;
          height:225px;
          overflow: hidden;
          border-radius:8px;
          font-size: 0;
         .van-image {
            width: 100%;
            height: 100%;
          }

        }
        .cspan{
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
          width:100%;
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
            width:calc(100% - 38px - 15px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

}
</style>
