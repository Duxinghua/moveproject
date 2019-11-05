<template>
  <div class="home">
    <div class="home-top">
      <img class="home-top-search" src="../assets/images/search.png" alt="">
      <ul class="home-top-list">
        <li class="active">推荐</li>
        <li>名师</li>
      </ul>
    </div>
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
        <CourceItem v-for="(cource,index) in courceList" :item="cource" :key="index" />
      </div>
      <MoreText moreText="更多课程" />
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
                <span>详情</span>
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
        <CourceItem v-for="(cource,index) in courceList" :item="cource" :key="index" />
      </div>
      <MoreText moreText="更多课程" />

    </div>
    <div class="home-video">
      <TitleItem title="直播约课" />
      <el-carousel :interval="4000" type="card" id="home-video-carousel">
        <el-carousel-item v-for="item in 6" :key="item">
          <img src="../assets/images/video1.png" />
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import TitleItem from '@/components/titleItem.vue'
import MoreText from '@/components/moreItem.vue'
import CourceItem from '@/components/courceItem.vue'
// import ApiModel from '@/api'

export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
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
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
          img: require('../assets/images/courseimg.png'),
          title: '花艺课中式传统插花',
          avater: require('../assets/images/people.png'),
          name: 'Kate sapdiek'
        },
        {
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
          name: '柯杏林',
          des: '知音花艺协会副会长兼秘书长; 中国传统插花中国传统插花中国传统插花中国传统插花'
        },
        {
          id: 2,
          img: require('../assets/images/teacher.png'),
          name: '柯杏林',
          des: '知音花艺协会副会长兼秘书长; 中国传统插花中国传统插花中国传统插花中国传统插花'
        }
      ],
      current: 0
    }
  },
  methods: {
    onChange (index) {
      this.current = index
    },
    clear () {
      localStorage.clear()
    },
    clickInput () {
      this.$router.push({path: '/search'})
    }
  },
  mounted () {
    // document.getElementById('el-carousel').style.height = this.bannerHeight + 'px';
    console.log(this.$refs.teacherItem)
  },
  components: {
    TitleItem,
    MoreText,
    CourceItem
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
  height:428px !important
}
.home{
  display: flex;
  flex-direction: column;
  width:100%;
  background:#FBF8F4;
  &-top{
    width:100%;
    height:82px;
    background:#6D8260;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left:30px;
    padding-right:30px;
    box-sizing: border-box;
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
  }
}
</style>
