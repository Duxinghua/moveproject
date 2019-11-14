<template>
  <div class="myTz myEdit">
    <div class="myTz-item">
      <div class="myTz-item-top">
        <img class="avatar" src="../assets/images/people.png" alt="">
        <div class="userinfo">
          <span>朝花夕拾xixi</span>
          <span>10小时前</span>
        </div>
        <img class="sd" src="../assets/images/sd.png" alt="">
      </div>
      <div class="myTz-item-banner">
        <el-carousel id="huabantz-banner" indicator-position="outside" @change="changeTab">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img class="huabantzimg" :src="item.image" alt="">
          </el-carousel-item>
        </el-carousel>
        <span class="huabantzind">{{(index+1)+"/"+bannerList.length}}</span>
      </div>
      <div class="myTz-item-detail">
        <div class="myTz-item-detail-content">
          <div class="des">
            <span class="destitle">传统中式花道基础构图方式道基础构图方式道基础构图方式道基础构图方式道基础构图方式</span>
            <div class="desico">
              <img src="../assets/images/gzxico.png" alt="">
              <img src="../assets/images/shareico.png" alt="">
            </div>
          </div>
          <div class="info">
            相邻的花与花之间一定要注意面向的面不能出现平行线~
          </div>
        </div>
        <input class="myTz-item-detail-input" placeholder="喜欢就评论"/>
    </div>
    </div>
        <!-- 贴子 -->
    <van-popup
      v-model="tzShow"
      closeable
      overlay
      round
      position="bottom"
    >
    <div class="grender">
      <div class="grender-item">
      删除
      </div>
      <div class="grender-item">
      取消
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'MyTz',
  data () {
    return {
      tzShow: true,
      index: 1,
      bannerList: [
        {
          id: 1,
          image: require('../assets/images/770552.png')
        },
        {
          id: 2,
          image: require('../assets/images/770552.png')
        },
        {
          id: 3,
          image: require('../assets/images/770552.png')
        },
        {
          id: 4,
          image: require('../assets/images/770552.png')
        }
      ]
    }
  },
  methods: {
    changeTab (e) {
      this.index = e
    }
  }

}
</script>

<style lang="scss" scoped>
.myTz{
  display: flex;
  flex-direction: column;
  &-item{
    display: flex;
    flex-direction: column;
    border-bottom: 15px solid #FBF8F4;
    &-top{
      margin:21px 0;
      padding-left:26px;
      padding-right:26px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width:100%;
      .avatar{
        width:73px;
        height:73px;
        margin-right:22px;
      }
      .userinfo{
        display: flex;
        flex-direction: column;
        flex:1;
        span:{
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:nth-child(1){
          font-size: 30px;
          color:#333333;
        }
        span:nth-child(2){
          font-size: 24px;
          color:#999999;
          margin-top:8px;
        }
      }
      .sd{
        width:49px;
        height:11px;
      }

    }
    &-banner{
      display: flex;
      flex-direction: column;
      justify-content: center;
      position: relative;
      .huabantzimg{
        width:100%;
        height:552px;
      }
      .huabantzind{
        width:100px;
        height:48px;
        background:rgba(109,129,96,0.5);
        border-radius:24px;
        color:white;
        position: absolute;
        top:478px;
        right: 26px;
        z-index: 2;
        font-size: 24px;
        text-align: center;
        line-height: 48px;
      }
    }
    &-detail{
      display: flex;
      flex-direction: column;
      &-content{
        padding-left:26px;
        padding-right:26px;
        width:100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .des{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          width:100%;
          .destitle{
            width:576px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size:36px;
            color:#333;
            // display: inline-flex;
          }
          .desico{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            img:nth-child(1){
              width:37px;
              height:32px;
              margin-right:15px;
            }
            img:nth-child(2){
              width:33px;
              height:33px;
            }
          }
        }
        .info{
          color:#999;
          font-size:26px;
          margin-top:14px;
        }
      }
      &-input{
        height:88px;
        border:none;
        background:rgba(243,243,243,1);
        border-radius:44px;
        margin:45px 26px;
        padding:45px;
        box-sizing: border-box;
        font-size: 26px;
        color:#666666;
      }
    }
  }
}
</style>
