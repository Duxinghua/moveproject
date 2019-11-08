<template>
  <div class="huabantz">
    <div class="huabantz-top">
      <img class="avatar" src="../assets/images/people.png" alt="">
      <div class="userdes">
        <span>朝花夕拾xixi</span>
        <span>10小时前</span>
      </div>
      <div class="gzbtn">
        <img src="../assets/images/gzico.png" alt="">
        <span>关注</span>
      </div>
    </div>
    <div class="huabantz-banner">
      <el-carousel id="huabantz-banner" indicator-position="outside" @change="changeTab">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <img class="huabantzimg" :src="item.image" alt="">
        </el-carousel-item>
      </el-carousel>
      <span class="huabantzind">{{(index+1)+"/"+bannerList.length}}</span>
    </div>
    <div class="huabantz-detail">
      <div class="huabantz-detail-content">
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
      <div class="huabantz-detail-pl">
        <div class="plnum">
          共7条评论
        </div>
        <div class="plcontent">
          <div class="pl-item">
              <span>华见笑了</span>
              <span>很喜欢，做的不错，构图很有心意</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuabanTzDetail',
  data () {
    return {
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
  mounted () {
    console.log(this.$route.params.id)
  },
  methods: {
    changeTab (e) {
      this.index = e
    }
  }

}
</script>

<style lang="scss" scoped>
#huabantz-banner{
  height:602px !important;
  padding-bottom: 50px;
}

.huabantz{
  background:#FBF8F4;
  display: flex;
  flex-direction: column;
  &-top{
    display: flex;
    flex-direction: row;
    height:111px;
    padding-left:26px;
    padding-right:26px;
    box-sizing: border-box;
    align-items: center;
    .avatar{
      width:73px;
      height:73px;
      margin-right: 20px;
    }
    .userdes{
      flex:1;
      display: flex;
      flex-direction: column;
      span:nth-child(1){
        font-size: 30px;
        color: #333;
        font-weight: 500;
        line-height: 36px;
      }
      span:nth-child(2){
        font-size: 24px;
        color:#999;
        line-height: 36px;
      }

    }
    .gzbtn{
      width:170px;
      height:58px;
      background:rgba(255,255,255,0);
      border:2px solid rgba(205, 168, 113, 1);
      border-radius:28px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      font-size: 30px;
      color:#CDA871;
      img{
        width:34px;
        height:30px;
      }
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
    &-pl{
      display: flex;
      flex-direction: column;
      margin-top:39px;
      width:100%;
      padding-left:26px;
      padding-right:26px;
      box-sizing: border-box;
      .plnum{
        color:#995258;
        font-size:26px;
      }
      .plcontent{
        display: flex;
        flex-direction: column;
        .pl-item{
          font-size:26px;
          color:#333;
          span:nth-child(1){
            font-weight: bold;
            margin-right:10px;
          }
          span:nth-child(2){
            font-weight: 500
          }
        }
      }
    }
  }
}
</style>
