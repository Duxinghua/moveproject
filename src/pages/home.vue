<template>
  <div class="home">
    <div class="home-top">
      <img class="home-top-search" src="../assets/images/search.png" @click="searchHandle()" alt="">
      <ul class="home-top-list">
        <li :class="{active:current == 0}" @click="menuHandler(0)">推荐</li>
        <li :class="{active:current == 1}" @click="menuHandler(1)">名师</li>
      </ul>
    </div>
    <div class="home-tj-content" v-if="pageType == 0">
      <div class="home-banner">
            <el-carousel :autoplay="true" :interval="5000" id="home-banner-carousel">
              <el-carousel-item v-for="(item, index) in slideList" :key="index">
                <a :href="item.url"><img class="home-banner-item" :src="item.image" /></a>
              </el-carousel-item>
            </el-carousel>
      </div>
      <div class="home-course">
        <TitleItem title="线下课程" />
        <div class="home-course-content">
          <CourceItem v-for="(cource,index) in courceList" :item="cource" :key="index" offlineDetail="/offcoursedetail"/>
        </div>
        <MoreText moreText="更多课程" moreOffCourse="OffCourseList" />
      </div>
      <div class="home-teacher">
        <TitleItem title="名师推荐" />
        <el-carousel :autoplay="true" :interval="4000" indicator-position="none" id="home-teacher-carousel" arrow="always">
          <el-carousel-item  v-for="item in schoolList" :key="item.id">
            <div class="home-teacher-item" >
              <img  :src="item.img" alt="">
              <div class="teacherinfo">
                <span class="teacher-name">{{item.name}}</span>
                <span class="teacher-des">{{item.des}}</span>
                <div class="teacher-btn">
                  <span @click="teacherInfoHandle(item)">详情</span>
                  <img src="../assets/images/teachersq.png" alt="">
                </div>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
        <MoreText moreText="更多名师" />
      </div>
      <div class="home-course home-onlinecourse">
        <TitleItem title="线上课程" />
        <div class="home-course-content">
          <CourceItem v-for="(cource,index) in courceList" :item="cource" :key="index" onlineDetail="/onlineCourseDetail"/>
        </div>
        <MoreText moreText="更多课程" moreOnlineCourse="OnlineCourseList"/>

      </div>
      <div class="home-video">
        <TitleItem title="直播约课" />
        <el-carousel indicator-position="none" :interval="4000" type="card" id="home-video-carousel" @change="cardChange">
          <el-carousel-item v-for="item in 6" :key="item">
            <img  class="home-video-img" src="../assets/images/video1.png" />
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
       <div class="home-mingshi">
         <div class="home-mingshi-item" v-for="item in schoolList" :key="item.id">
           <img :src="item.img" alt="">
           <div class="home-mingshi-item-des">
             <span class="teacher-name">{{item.name}}</span>
             <p class="teacher-des">{{item.des}}</p>
             <MoreText class="moretext" moreText="了解更多" />
           </div>
         </div>
       </div>
    </div>
    <Footer :mrt="true" />
  </div>
</template>

<script>
import TitleItem from '@/components/titleItem.vue'
import MoreText from '@/components/moreItem.vue'
import CourceItem from '@/components/courceItem.vue'
import Footer from '@/components/footer.vue'
// import ApiModel from '@/api'

export default {
  name: 'Home',
  data () {
    return {
      slideList: [
        {
          url: 'https://www.baidu.com',
          image: require('../assets/images/banners.png')
        },
        {
          url: 'https://www.baidu.com',
          image: require('../assets/images/banners.png')
        },
        {
          url: 'https://www.baidu.com',
          image: require('../assets/images/banners.png')
        }
      ],
      courceList: [
        {
          id: 1,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          id: 2,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          id: 3,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          id: 4,
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        }
      ],
      schoolList: [
        {
          id: 0,
          img: require('../assets/images/teacher.png'),
          name: '柯杏林',
          des: '知音花艺协会副会长兼秘书长; 中国传统插花中国传统插花中国传统插花中国传统插花'
        },
        {
          id: 1,
          img: require('../assets/images/teacher.png'),
          name: '陈进',
          des: '中国插花协会理事；湖北省花木盆景协会插花分会副秘书长；知音插花协会副会长知音插花协会副会长'
        },
        {
          id: 2,
          img: require('../assets/images/teacher.png'),
          name: '柯杏林',
          des: '知音花艺协会副会长兼秘书长; 中国传统插花中国传统插花中国传统插花中国传统插花'
        }
      ],
      current: 0,
      pageType: 0
    }
  },
  methods: {
    menuHandler (index) {
      this.current = index
      this.pageType = index
    },
    cardChange (index) {
      console.log(index, 'cardindex')
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
    }
  },
  mounted () {
    // document.getElementById('el-carousel').style.height = this.bannerHeight + 'px';
    console.log(this.$refs.teacherItem)
    console.log(this.$api, 'api')
  },
  components: {
    TitleItem,
    MoreText,
    CourceItem,
    Footer
  }
}
</script>

<style lang='scss' scoped>
#home-banner-carousel{
  height:380px !important;
}
#home-teacher-carousel{
  height:212px !important;
  margin-bottom: 26px;
}
#home-video-carousel{
  height:calc(425px * 1.2) !important
}
.home{
  display: flex;
  flex-direction: column;
  width:100%;
  background:#FBF8F4;
  &-top{
    width:100%;
    height:98px;
    background:#6D8260;
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
      font-size: 28px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left:45px;
      color:white;
      .active{
        font-weight: 500;
        font-size: 36px;
        color:#E3D29C;
      }
    }
    &-list li{
      margin-right:40px;
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
    &-content{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      box-sizing: border-box;
      padding-left:26px;
      padding-right:26px;
      &-item:nth-child(2n){
        margin-right:0px !important;
      }
    }

  }
  &-teacher{
    display: flex;
    flex-direction: column;
    border-bottom: 15px solid #F6F3EE;
    &-item{
      display: flex;
      flex-direction: row;
      width:90%;
      height:100%;
      justify-content: center;
      align-items: center;
      margin:0 auto;
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
        .moretext {
          margin-top: 20px;
          justify-content: left;
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
