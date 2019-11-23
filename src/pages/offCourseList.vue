<template>
  <div class="home">
    <van-list
        v-model="loading"
        v-show="courseList.length > 0"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoad"
        >
      <div class="offcourse-list">
        <CourseItem v-for="(cource,index) in courseList" :item="cource" :key="index" courseDetail="/offCourseDetail"></CourseItem>
      </div>
    </van-list>
    <NoData v-if="courseList.length == 0"/>
  </div>
</template>

<script>
import CourseItem from '@/components/courceItem'
import NoData from '@/components/nodata'

export default {
  name: 'OffCourseList',
  data () {
    return {
      courseList: [],
      loading: false,
      finished: false,
      total: 0,
      current: 1,
      recommend: 0
    }
  },
  mounted () {
    this.getOfflineList()
  },
  methods: {
    getOfflineList () {
      const param = {
        page: this.current,
        pageSize: 10,
        type: 3,
        recommend: this.recommend
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.courseList(param).then((res) => {
        this.$toast.clear()
        if (res.code === 1) {
          this.loading = false
          console.log(res.data);
          if (this.courseList.length == 0) {
            // 第一次加载
            this.courseList = res.data.data || []
            this.total = res.data.total
          } else if (this.courseList.length < this.total) {
            // 加载更多
            this.courseList = this.courseList.concat(res.data.data)
          }
          if (this.courseList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.courseList.length < this.total) {
        this.current++
        this.getOfflineList()
      }
    }
  },
  components: {
    CourseItem,
    NoData
  }
}
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100vh;
  background-color: #FBF8F4;
  .offcourse-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-top: 36px;
    padding-left: 25px;
    padding-right: 25px;
  }
  .home-course-content-item:nth-child(2n){
    margin-right: 0 !important;
  }
}
</style>
