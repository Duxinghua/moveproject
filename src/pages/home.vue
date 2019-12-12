<template>
  <div class="home">
    <div class="home-top">
      <img class="home-top-search" src="../assets/images/search.png" @click="searchHandle()" alt="">
      <ul class="home-top-list">
        <li :class="{active:current == 0}" @click="menuHandler(0)">推荐</li>
        <li :class="{active:current == 1}" @click="menuHandler(1)">名师</li>
        <li :class="{active:current == 2}" @click="menuHandler(2)">线上课程</li>
        <li :class="{active:current == 3}" @click="menuHandler(3)">线下课程</li>
      </ul>
    </div>
    <div class="home-tj-content" v-if="pageType == 0">
      <div class="home-banner">
            <van-swipe :autoplay="3000" id="home-banner-carousel" indicator-color="#F3D995"	>
              <van-swipe-item v-for="(item, index) in slideList" :key="index">
                <div class="home-banner-item">
                    <van-image :src="item.image">
                        <template v-slot:loading>
                            <van-loading
                                type="spinner"
                                size="20"
                            />
                        </template>
                    </van-image>
                </div>
              </van-swipe-item>
            </van-swipe>
      </div>
      <div class="home-course">
        <TitleItem title="线下课程" />
        <div class="home-course-content">
          <CourceItem v-for="(cource,index) in offcourseList" :item="cource" :key="index"/>
        </div>
        <MoreText moreText="更多课程" moreName="OffCourseList" />
      </div>
      <div class="home-teacher">
        <TitleItem title="名师推荐" />
          <swiper class="swiper-content" :options="swiperOption" >
              <swiper-slide v-for="(item,index) in schoolList" :key="index">
                <div class="home-teacher-item" >
                <img  :src="item.avatar" alt="">
                <div class="teacherinfo">
                  <span class="teacher-name">{{item.nickname}}</span>
                  <span class="teacher-des">{{item.keywords}}</span>
                  <div class="teacher-btn">
                    <span @click="teacherInfoHandle(item.id)">详情</span>
                    <img src="../assets/images/teachersq.png" alt="">
                  </div>
                </div>
                </div>
              </swiper-slide>
              <div class="swiper-button-prev" slot="button-prev"></div>
              <div class="swiper-button-next" slot="button-next"></div>
          </swiper>



        <MoreText moreText="更多名师" moreName="TeacherList"/>
      </div>
      <div class="home-course home-onlinecourse">
        <TitleItem title="线上课程" />
        <div class="home-course-content">
          <CourceItem v-for="(cource,index) in oncourseList" :item="cource" :key="index"/>
          <NoData v-if="oncourseList.length == 0"/>
        </div>
        <MoreText moreText="更多课程" moreName="OnlineCourseList"/>

      </div>
      <div class="home-video" >
        <TitleItem title="直播约课" />
        <el-carousel indicator-position="none" :interval="4000" type="card" id="home-video-carousel" @change="cardChange">
          <el-carousel-item v-for="(item,index) in videoLists" :key="index">
            <img  class="home-video-img" :src="item" />
          </el-carousel-item>
        </el-carousel>
        <div class="home-video-course">
          <span class="videoTitle">花艺课中式传统插花</span>
          <div class="videoDes">
            <img class="videoAvatar" src="../assets/images/video-avatar.png" />
            <span class="videoPerson">Kate sapdiek</span>
          </div>
        </div>
        <MoreText moreText="更多直播" />
      </div>
    </div>
    <div class="home-ms-content" v-if="pageType == 1">
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
      <NoData v-if="TeacherLists.length == 0"/>
    </div>
    <div class="home-onlinecontent" v-if="pageType == 2 || pageType == 3">
      <van-list
        v-model="Onlinesloading"
        v-show="OnlinesLists.length > 0"
        :finished="Onlinesfinished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="onLoadOn"
      >
      <CourceItem v-for="(cource,index) in OnlinesLists" :item="cource" :key="index"/>
      </van-list>
    </div>


    <Footer :mrt="true" />
  </div>
</template>

<script>
import TitleItem from '@/components/titleItem.vue'
import MoreText from '@/components/moreItem.vue'
import CourceItem from '@/components/courceItem.vue'
import Footer from '@/components/footer.vue'
import NoData from '@/components/nodata'
// import ApiModel from '@/api'

export default {
  name: 'Home',
  data () {
    return {
      slideList: [
      ],
      offcourseList: [],
      oncourseList: [],
      videoList:[],
      schoolList: [
      ], // 推荐页名师
      TeacherLists: [], // 名师列表页名师
      OnlinesLists: [],
      Onlinestotal: 0,
      current: 0,
      OnlinesCurrent: 1,
      Onlinesloading: false,
      Onlinesfinished: false,
      pageType: 0,
      total: 0,
      page: 1,
      loading: false,
      finished: false,
      videoLists: [
        require('../assets/images/1.png'),
        require('../assets/images/2.png'),
        require('../assets/images/3.png')
      ],
      theacherCurrent: 0,
          swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
          },
          speed:3000,
          prevButton: '.swiper-button-prev',//上一张
          nextButton: '.swiper-button-next',//下一张
          paginationClickable: true,
          observer: true,
          observerParents: true
          // onProgress:function(i,x){
          //   console.log(i,x)
          // }

        }
    }
  },
  mounted () {
    this.getCourseList()
    this.getTeacherRec()
    this.indexBanner()
  },
  methods: {
    indexBanner () {
      this.$api.indexBanner({type:1}).then((res)=>{
        if(res.code == 1) {
          this.slideList = res.data
        }
      })
    },
    menuHandler (index) {
      this.current = index
      this.pageType = index
      if(index == 2 || index == 3){
        this.Onlinestotal = 0
        this.OnlinesLists = []
        this.OnlinesCurrent = 1
        this.Onlinesloading = false
        this.Onlinesfinished = false
        this.getOfCourseList()
      }
    },
    cardChange (index) {
      // console.log(index, 'cardindex')
    },
    onChange (index) {
      this.current = index
    },
    clear () {
      localStorage.clear()
    },
    clickInput () {
      this.$router.push({path: '/search'})
    },
    teacherInfoHandle (index) {
      this.$router.push({path: '/teacherDetail', query: {index}})
    },
    searchHandle () {
      this.$router.push({name: 'HomeSearch'})
    },
    getTeacherRec () {
      const paramRec = {
        page: 1,
        pageSize: 4,
        recommend: 1
      }
      const paramL = {
        page: this.page,
        pageSize: 10,
        recommend: 0
      }
      this.$api.teacherList(paramRec).then((res) => {
        if (res.code === 1) {
          this.schoolList = res.data.data
          // console.log(res.data)
        }
      })
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.teacherList(paramL).then((res) => {
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
    getCourseList () {
      const paramOff = {
        page: 1,
        pageSize: 4,
        type: 3, // 线下
        recommend: 1
      }
      const paramOn = {
        page: 1,
        pageSize: 4,
        type: 2, // 线上
        recommend: 1
      }
      const paramV = {
        page: 1,
        pageSize: 5,
        type: 1, // 直播
        recommend: 1
      }

      this.$api.courseList(paramOff).then((res) => {
        if (res.code === 1) {
          this.offcourseList = res.data.data
          // console.log(res.data)
        }
      })
      this.$api.courseList(paramOn).then((res) => {
        if (res.code === 1) {
          this.oncourseList = res.data.data
          // console.log(res.data)
        }
      })
      this.$api.courseList(paramV).then((res) => {
        if (res.code === 1) {
          this.videoList = res.data.data
          // console.log(res.data.data)
        }
      })
    },
    getOfCourseList () {
      var param = {}
      const paramOff = {
        page: this.OnlinesCurrent,
        pageSize: 10,
        type: 3 // 线下
      }
      const paramOn = {
        page: this.OnlinesCurrent,
        pageSize: 10,
        type: 2 // 线上
      }
      if(this.pageType == 2) {
        param = paramOn
      }else if(this.pageType == 3){
        param = paramOff
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.courseList(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.Onlinesloading = false
          if (this.OnlinesLists.length == 0) {
            // 第一次加载
            this.OnlinesLists = res.data.data || []
            this.Onlinestotal = res.data.total
          } else if (this.OnlinesLists.length < this.Onlinestotal) {
            // 加载更多
            this.OnlinesLists = this.OnlinesLists.concat(res.data.data)
          }
          if (this.OnlinesLists.length >= this.Onlinestotal) {
            // 全部加载完成
            this.Onlinesfinished = true
          }
        }
      })
    },
    onLoadOn () {
      if (this.OnlinesLists.length < this.Onlinestotal) {
        this.OnlinesCurrent++
        this.getOfCourseList()
      }
    },
    onLoad () {
      if (this.TeacherLists.length < this.total) {
        this.page++
        this.getTeacherRec()
      }
    }
  },
  components: {
    TitleItem,
    MoreText,
    CourceItem,
    Footer,
    NoData
  },
  computed: {
      // swiper() {
      //   return this.$refs.mySwiper.swiper
      // }
  }
}
</script>

<style lang='scss' scoped>
.swiper-content{
  width:100%;
  height:230px;
  margin-bottom: 26px;
  .swiper-button-next {
    background:url('../assets/images/right.png') no-repeat;
    background-size: 80% 80%;
  }
  .swiper-button-prev{
    background:url('../assets/images/left.png') no-repeat;
    background-size: 80% 80%;
  }
}
#home-banner-carousel{
  height:380px !important;
}
#home-teacher-carousel{
  height:230px !important;
  margin-bottom: 26px;
}
#home-video-carousel{
  height:calc(425px * 1.2) !important
}
.theacherContent{
  position: relative;
}
.home{
  display: flex;
  flex-direction: column;
  width:100%;
  background:#FBF8F4;
  min-height: 100vh;
  &-onlinecontent{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding-left:26px;
      padding-right:26px;
      margin:126px 0px;
      .van-list{
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            /deep/ .van-list__finished-text{
              width:100%;
            }
      }
      &-item:nth-child(2n){
        margin-right:0px !important;
      }
  }
  &-top{
    width:100%;
    height:98px;
    background:url("../assets/images/tab-bg.png") 100% 100% no-repeat;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left:30px;
    padding-right:30px;
    box-sizing: border-box;
    position: fixed;
    top:0;
    left:0;
    z-index:99999;
    &-search{
      width:42px;
      height:42px;
    }
    &-list{
      font-size: 32px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left:45px;
      color:white;
      .active{
        font-weight: 500;
        transform: scale(1.3);
        color:#E3D29C;
      }
    }
    &-list li{
      font-size: 32px;
      margin-right:40px;
      transition: all 0.3s;
    }
  }
  &-banner{
    width:100%;
    height:380px;
    display: block;
    position: relative;
    &-item{
      width:100%;
      height:370px;
      overflow: hidden;
      .van-image{
        width:100%;
        height:100%;
      }
    }
    &-indicator{
      display: flex;
      flex-direction: row;
      position: absolute;
      left:50%;
      bottom:42px;
      transform: translateX(-50%)
    }
    &-indicator span{
      width:15px;
      height:15px;
      border-radius: 50%;
      display: block;
      background:white;
      margin-left:7px;
      margin-right:7px;
    }
    &-indicator .active{
      background: #E3D29C
    }
  }
  &-course{
    display: flex;
    flex-direction: column;
    border-bottom: 15px solid #F6F3EE;
    padding-bottom: 30px;
    &-content{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding-left:26px;
      padding-right:26px;
      min-height: 225px;
      &-item:nth-child(2n){
        margin-right:0px !important;
      }

      /deep/ .nodata{
        position: relative;
        top: 120px;
      }
    }

  }
  &-teacher{
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    border-bottom: 15px solid #F6F3EE;
    /deep/ .el-carousel__arrow {
      font-size: 36px;
      color:#697D5D;
    }
    /deep/ .el-carousel__arrow--left{
      // width:21px;
      // height:39px;
      background: transparent;
      // background:url('../assets/images/left.png') no-repeat;
    }
    /deep/ .el-carousel__arrow--right{
      // width:21px;
      // height:39px;
      background: transparent;
      // background:url('../assets/images/right.png') no-repeat;
    }
    .custom-indicator {
      // transform: translateY(-50%);
      img:first-child{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        width:21px;
        height:39px;
        left:26px;
      }
      img:last-child{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        width:21px;
        height:39px;
        right:26px;
      }
    }
    &-item{
      display: flex;
      flex-direction: row;
      width:90%;
      height:212px;
      justify-content: center;
      align-items: center;
      margin:10px auto 26px auto;
      background:#FBF8F4;
      img{
        width:162px;
        height:212px;
        margin-right:28px;
      }
      .teacherinfo{
        display: flex;
        flex-direction: column;
        width:calc(90% - 28px - 162px);
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
          margin-top:20px;
        }
        .teacher-btn{
          color:#CDA871;
          font-size: 30px;
          font-weight: 500;
          width:150px;
          height:58px;
          line-height: 58px;
          text-align: center;
          border: 2px solid #CDA871;
          border-radius: 29px;
          margin-top:20px;
          position: relative;
          span{
            position: absolute;
            left:45%;
            top:50%;
            transform: translate(-45%,-50%)
          }
          img{
            position: absolute;
            left:70%;
            top:50%;
            transform: translate(-70%,-50%);
            width:11px;
            height:21px;
            margin-left:10px;
          }
        }
      }
    }
  }
  &-video{
    box-sizing: border-box;
    padding-left:26px;
    padding-right:26px;
    padding-bottom: 126px;
    &-img{
      width:calc(319px * 1.2);
      height:calc(425px * 1.2);
      margin-right:0px !important;
    }
    &-course{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top:33px;
      margin-bottom:33px;
      .videoTitle{
        font-size:30px;
        color:#333;
      }
      .videoDes{
        display: flex;
        flex-direction: row;
        margin-top:22px;
        .videoAvatar{
          width:38px;
          height:38px;
          margin-right:12px;
        }
        .videoPerson{
          font-size:26px;
          color:#898C87;
        }
      }
    }
  }
  &-mingshi{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 13px;
    background:#FBF8F4;
    min-height: 1284px;
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
.home-tj-content,.home-ms-content{
  display: flex;
  flex-direction: column;
  margin-top:98px;
}

</style>
