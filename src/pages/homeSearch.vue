<template>
  <div class="homeSearch">
    <div class="homeSearch-header">
      <div class="homeSearch-header-input">
        <img src="../assets/images/homesearch.png" alt="">
        <input type="text">
        <span>取消</span>
      </div>
      <div class="homeSearch-header-tab">
        <ul>
          <li :class="{active:current == 0}" @click="tabHandler(0)">课程</li>
          <li :class="{active:current == 1}" @click="tabHandler(1)">用户</li>
        </ul>
      </div>
    </div>
    <div class="homeSearch-course-content" v-if="pageType == 0">
      <div class="homeSearch-course">
        <CourceItem v-for="(cource,index) in courceList" :item="cource" :key="index" offlineDetail="/offcoursedetail"/>
      </div>
    </div>
    <div class="homeSearch-user-content" v-if="pageType == 1">
      <div class="homeSearch-users">
        <div class="homeSearch-users-item" v-for="item in userList" :key="item.id">
          <img :src="item.img" alt="">
          <div class="user-msg">
            <p>{{item.title}}</p>
            <span>{{item.content}}</span>
          </div>
          <div class="user-btn" :class="{active: item.id == status}">
            <img src="../assets/images/userfocus.png" v-if="item.id != status" alt="">
            <span @click="userFocusHandler(item.id)">{{item.id == status ? '已' : '' }}关注</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CourceItem from '@/components/courceItem.vue'

export default {
  name: 'HomeSearch',
  data () {
    return {
      status: 0,
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
      userList: [
        {
          id: 1,
          img: require('../assets/images/useravatar.png'),
          title: '花田喜事xibe',
          content: '年少时向往远方，走的太匆忙'
        },
        {
          id: 2,
          img: require('../assets/images/useravatar.png'),
          title: 'Anlebaby',
          content: '年少时向往远方，走的太匆忙'
        },
        {
          id: 3,
          img: require('../assets/images/useravatar.png'),
          title: '朝花夕拾zhanzhan',
          content: '年少时向往远方，走的太匆忙'
        },
        {
          id: 4,
          img: require('../assets/images/useravatar.png'),
          title: '花田喜事xibe',
          content: '年少时向往远方，走的太匆忙'
        }
      ],
      current: 0,
      pageType: 0
    }
  },
  methods: {
    tabHandler (index) {
      this.current = index
      this.pageType = index
    },
    userFocusHandler (index) {
      if (this.status === 0) {
        this.status = index
      } else {
        this.status = 0
      }
    }
  },
  components: {
    CourceItem
  }
}
</script>

<style lang="scss" scoped>
.homeSearch{
  background-color: #FBF8F4;
  &-header{
    width:100%;
    height:203px;
    background:white;
    padding:26px 26px 0 26px;
    box-sizing: border-box;
    &-input{
      height:82px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      img{
        position: absolute;
        width:33px;
        height:35px;
        left:36px;
        // top: 24px;
        top:50%;
        transform: translateY(-50%)
      }
      input{
        width:624px;
        height:100%;
        border-radius: 40px;
        padding-left:85px;
        background:#FAFAFA;
        border:none;
        font-size: 30px;
        color:#333;
      }
      span{
        color:#6D8160;
        font-size: 30px;
      }
    }
    &-tab{
      margin-bottom: 37px;
      ul{
        display: flex;
        // flex-direction: row;
        color:#999;
        font-size: 30px;
        li{
          padding: 24px 26px;
        }
        .active{
          font-size: 36px;
          color: #6D8160;
          position: relative
        }
        .active::after{
          content: '';
          display: block;
          position: absolute;
          bottom: 1px;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 5px;
          background-color: #76896A;
        }
      }
    }
  }
  &-course{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 38px;
  }
  &-users{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 25px;
    &-item{
      width: 700px;
      height: 179px;
      background-color: #FFFFFF;
      border-radius: 10px;
      padding: 36px 20px;
      margin-bottom: 15px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      img{
        width: 107px;
        height: 107px;
      }
      .user-msg{
        width: 338px;
        display: flex;
        flex-direction: column;
        p{
          font-size: 32px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span{
          font-size: 26px;
          color: #999999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      div:last-child{
        width: 170px;
        height: 58px;
        // background-color: #6D8160;
        border: 1px solid #CDA871;
        border-radius: 28px;
        color: #CDA871;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        img{
          width: 34px;
          height: 30px;
          margin-right: 16px;
        }
        span{
          font-size: 30px;
        }
      }
      div.active{
        background-color: #6D8160;
        border: none;
        color: #F3D995;
      }
    }
  }
}
.home-course-content-item:nth-child(2n){
  margin-right: 0 !important;
}
.homeSearch-course-content,.homeSearch-user-content{
  width: 100%;
  height: 100vh;
}
</style>
