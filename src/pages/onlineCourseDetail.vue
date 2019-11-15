<template>
  <div class="ondetail">
      <div class="ondetail-video">
          <img src="../assets/images/offlinedetail.png" alt="">
      </div>
      <div class="ondetail-top">
        <ul class="ondetail-top-list">
          <li :class="{active:current == 0}" @click="menuHandler(0)">视频介绍</li>
          <li :class="{active:current == 1}" @click="menuHandler(1)">相关花材</li>
          <li :class="{active:current == 2}" @click="menuHandler(2)">作业交流</li>
        </ul>
        <div class="ondetail-top-list">
          <span :class="{active:current == 0}"></span>
          <span :class="{active:current == 1}"></span>
          <span :class="{active:current == 2}"></span>
        </div>
      </div>
      <div class="ondetail-rec-content" v-if="pageType == 0">
        <div class="ondetail-title">
          <div>如何用气球打造排队-实景布置</div>
          <p>副标题如何用气球打造排队-实景布置</p>
        </div>
        <div class="ondetail-pt"></div>
        <div class="ondetail-teacher">
          <TeacherMsg :msgItem="msgItem"></TeacherMsg>
          <div class="ondetail-teacher-content">
            如何用气球打造排队-实景布置,副标题如何用气球打造排队-实景布置副标题如何用气球打造排队-实景布置副标题如何用气球打造排队~
          </div>
          <div class="ondetail-teacher-works">
            <p>作品</p>
            <div class="teacher-works">
              <TeacherWorks v-for="item in teacherWorks" :key="item.id" :item="item"></TeacherWorks>
            </div>
          </div>
        </div>
      </div>
      <div class="ondetail-flower-content" v-if="pageType == 1">
        <div class="ondetail-flowers">
          <div class="ondetail-flowers-item" v-for="item in flowerList" :key="item.id">
            <img :src="item.img" alt="">
            <p>{{item.name}}</p>
            <div>
              <span>气味浓度：{{item.des.smell}}</span>
              <span>温度要求{{item.des.wet}}</span>
              <span>养护难度：{{item.des.difficult}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ondetail-task-content" v-if="pageType == 2">
        333333
      </div>
  </div>
</template>

<script>
import TeacherMsg from '@/components/teacherMsg.vue'
import TeacherWorks from '@/components/teacherWorks.vue'

export default {
  name: 'OnlineCourseDetail',
  data () {
    return {
      msgItem: {
        img: require('../assets/images/people.png'),
        name: '柯杏林',
        msg: '知音花艺协会副会长兼秘书长秘书长'
      },
      teacherWorks: [
        {
          id: 1,
          img: require('../assets/images/onlineworks.png'),
          title: '残荷听雨',
          des: '杏林 2019.1020'
        },
        {
          id: 2,
          img: require('../assets/images/onlineworks.png'),
          title: '残荷听雨',
          des: '杏林 2019.1020'
        },
        {
          id: 3,
          img: require('../assets/images/onlineworks.png'),
          title: '秋水伊人',
          des: '杏林 2019.1020'
        },
        {
          id: 4,
          img: require('../assets/images/onlineworks.png'),
          title: '喜迎军运',
          des: '杏林 2019.1020'
        },
        {
          id: 5,
          img: require('../assets/images/onlineworks.png'),
          title: '残荷听雨',
          des: '杏林 2019.1020'
        },
        {
          id: 6,
          img: require('../assets/images/onlineworks.png'),
          title: '残荷听雨',
          des: '杏林 2019.1020'
        }
      ],
      flowerList: [
        {
          id: 1,
          img: require('../assets/images/flowers.png'),
          name: '小苍蓝',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
        },
        {
          id: 2,
          img: require('../assets/images/flowers.png'),
          name: '小苍蓝',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
        },
        {
          id: 3,
          img: require('../assets/images/flowers.png'),
          name: '小苍蓝',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
        },
        {
          id: 4,
          img: require('../assets/images/flowers.png'),
          name: '花毛莨',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
        },
        {
          id: 5,
          img: require('../assets/images/flowers.png'),
          name: '绣球',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
        },
        {
          id: 6,
          img: require('../assets/images/flowers.png'),
          name: '小苍蓝',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
        },
        {
          id: 7,
          img: require('../assets/images/flowers.png'),
          name: '花毛莨',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
        },
        {
          id: 8,
          img: require('../assets/images/flowers.png'),
          name: '小苍蓝',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
        },
        {
          id: 9,
          img: require('../assets/images/flowers.png'),
          name: '绣球',
          des: {
            smell: '无味',
            wet: '30%',
            difficult: '易'
          }
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
    }
  },
  components: {
    TeacherMsg,
    TeacherWorks
  }
}
</script>

<style lang="scss" scoped>
.ondetail{
  display: flex;
  flex-direction: column;
  width:100%;
  background:#FBF8F4;
  &-video{
      width: 100%;
      height: 500px;
      img{
        width:750px;
        height: 500px;
      }
  }
  &-top{
    width:100%;
    height:106px;
    background:#FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left:54px;
    padding-right:54px;
    box-sizing: border-box;
    &-list{
      display: flex;
      flex-direction: row;
      align-items: center;
      li.active{
        font-size: 36px;
        color:#6D8160;
      }
      span.active{
        background-color: #6D8160;
      }
    }
    &-list li {
      height: 98px;
      line-height: 100px;
      margin-left: 40px;
      margin-right: 40px;
      font-size: 32px;
      color:#999999;
    }
    &-list span{
      width: 66px;
      height: 5px;
      margin-left: 75px;
      margin-right: 75px;
      background-color: #ffffff;
      border-radius: 10%;

    }
  }
  &-title{
    width: 100%;
    height: 144px;
    padding-left: 33px;
    border-bottom: 15px solid #F6F3EE;
    display: flex;
    flex-direction: column;
    justify-content: center;
    div{
      font-size: 36px;
      color: #333333;
      border-bottom: 14px;
    }
    p{
      font-size: 26px;
      color: #666666;
    }
  }
  &-pt{
    height: 451px;
    border-bottom: 15px solid #F6F3EE;
  }
  &-teacher{
    padding-top: 69px;
    display: flex;
    flex-direction: column;
    border-bottom: 15px solid #F6F3EE;
    &-content{
      font-size: 26px;
      line-height: 36px;
      color: #333333;
      margin-top: 45px;
      margin-bottom: 45px;
      padding-left: 35px;
      padding-right: 35px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    &-works{
      display: flex;
      flex-direction: column;
      padding-bottom: 160px;
      p{
        font-size: 36px;
        color: #6D8160;
        padding-left: 29px;
      }
      .teacher-works{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-top: 35px;
        padding-left: 24px;
        padding-right: 24px;
      }
    }
  }
  &-flowers{
    width: 100%;
    padding: 45px 24px 80px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    &-item{
      display: flex;
      flex-direction: column;
      width: 216px;
      margin-right: 26px;
      margin-bottom: 37px;
      img{
        width: 216px;
        height: 287px;
      }
      p{
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 30px;
        color:#333;
        line-height: 36px;
        margin-top: 18px;
      }
      div{
        height: 87px;
        margin-top: 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
      div span {
        font-size: 24px;
        color: #999999;
        line-height: 32px;
      }
    }
    &-item:nth-child(3n){
        margin-right:0px !important;
    }
  }
}
</style>
