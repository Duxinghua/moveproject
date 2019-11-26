<template>
  <div class="home">
    <van-list
      v-model="loading"
      v-show="TeacherLists.length > 0"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
    >
        <div class="home-mingshi">
          <div class="home-mingshi-item" v-for="item in TeacherLists" :key="item.id">
            <img :src="item.avatar" alt="">
            <div class="home-mingshi-item-des">
              <span class="teacher-name">{{item.nickname}}</span>
              <p class="teacher-des">{{item.keywords}}</p>
              <div class="home-course-more">
                  <img src="../assets/images/moreleft.png" alt="">
                  <span @click="teacherInfoHandle(item.id)">了解更多</span>
                  <img src="../assets/images/moreright.png" alt="">
              </div>
            </div>
          </div>
        </div>
    </van-list>
  </div>
</template>

<script>
import NoData from '@/components/nodata'

export default {
  name: 'TeacherList',
  data () {
    return {
      TeacherLists: [],
      loading: false,
      finished: false,
      recommend: 0,
      current: 1,
      total: 0
    }
  },
  mounted () {
    this.getTeacherList()
  },
  methods: {
    getTeacherList () {
      const param = {
        page: this.current,
        pageSize: 10,
        recommend: this.recommend
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.teacherList(param).then((res) => {
        this.$toast.clear()
        if (res.code === 1) {
          this.loading = false
          // console.log(res.data)
          if (this.TeacherLists.length == 0) {
            // 第一次加载
            this.TeacherLists = res.data.data || []
            this.total = res.data.total
          } else if (this.TeacherLists.length < this.total) {
            // 加载更多
            this.TeacherLists = this.TeacherLists.concat(res.data.data)
          }
          if (this.TeacherLists.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    teacherInfoHandle (index) {
      this.$router.push({path: '/teacherDetail', query: {index}})
    },
    onLoad () {
      if (this.TeacherLists.length < this.total) {
        this.current++
        this.getTeacherList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height: 100vh;
    background-color: #FBF8F4;
    // display: flex;
    // flex-direction: column;
    // margin-top:98px;
    &-mingshi{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 13px;
    background:#FBF8F4;
    // min-height: 1284px;
    &-item{
      display: flex;
      flex-direction: row;
      width: 95%;
      padding: 28px 0;
      margin: 0 auto;
      border-bottom: 1px solid #ECF2E9;
      justify-content: center;
      align-items: center;
      img{
        width:162px;
        height:212px;
        margin-right:28px;
      }
      &-des{
        display: flex;
        flex-direction: column;
        width:calc(95% - 28px - 162px);
        .teacher-name{
          font-size: 32px;
          color:#333;
          font-weight: 500;
        }
        .teacher-des{
          width:100%;
          font-size: 26px;
          color:#898C87;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height:36px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-top: 16px;
        }
        // .moretext {
        //   justify-content: left;
        // }
        .home-course-more{
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: left;
            font-size: 28px;
            height:36px;
            color:#738965;
            line-height: 36px;
            margin-top: 20px;
            margin-bottom: 13px;
            img{
              width:17px;
              height:25px;
              margin: 0;
            }
        }
      }
    }
  }
  }
</style>