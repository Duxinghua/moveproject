<template>
  <div class="userinfo">
    <div class="userinfo-top">
      <div class="userinfo-header">
        <img src="../assets/images/people.png" alt="">
        <div class="userinfo-top-wrap">
          <span class="username">花田喜事xibe花田喜事xibe花田喜事xibe</span>
          <div class="userxf">
            <span>被喜欢</span>
            <span>2568</span>
            <span>喜欢</span>
            <span>1782</span>
          </div>
        </div>
        <span class="userinfo-top-btn">已关注</span>
      </div>
      <div class="userinfo-tab">
        <ul>
          <li :class="{active : (current == 0 ? true : false)}" @click="tabClick(0)">帖子</li>
          <li :class="{active : (current == 1 ? true : false)}" @click="tabClick(1)">图册</li>
        </ul>
      </div>
    </div>
    <div class="userinfo-content">
      <div class="userinfo-content-item" style="display:none">
        <img src="../assets/images/userinfoimg.png" alt="">
        <span class="title">花艺课中式传统插花</span>
        <div class="like">
            <img class="avatar" src="../assets/images/people.png" alt="">
            <span class="ather">Kate sapdiekssss</span>
            <img class="likeico" src="../assets/images/like.png" alt="">
            <span class="anum">50</span>
        </div>

      </div>
      <div class="userinfo-content-imgitem">
        <img src="../assets/images/userinfophoto.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuabanUserInfo',
  data () {
    return {
      current: 0
    }
  },
  methods: {
    tabClick (e) {
      this.current = e
    }
  }
}
</script>

<style lang="scss" scoped>
.userinfo{
  background:#FBF8F4;
  display: flex;
  flex-direction: column;
  width:100%;
  &-header{
    height:107px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top:26px;
    margin-bottom: 26px;
  }
  &-top{
    width:100%;
    background:white;
    height:237px;
    display: flex;
    flex-direction: column;
    img{
      width:107px;
      height:107px;
      margin-right:25px;
      margin-left:26px;
    }
    &-wrap{
      width:369px;
      display: flex;
      flex-direction: column;
      height:107px;
      justify-content: center;
      margin-right:25px;
      .username{
        font-size: 32px;
        color:#333333;
        width:100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .userxf{
        display: flex;
        flex-direction: row;
        height:36px;
        span:nth-child(2n+1){
          font-size: 26px;
          color:#999999;
          margin-right:10px;
        }
        span:nth-child(2n){
          font-size: 26px;
          color:#333333;
          margin-right:15px;
        }
      }
    }
    &-btn{
      width:172px;
      height:62px;
      border:2px solid #CDA871;
      color:#CDA871;
      line-height: 62px;
      font-size: 30px;
      text-align: center;
      border-radius:31px;
      margin-right:26px;
    }
  }
  &-tab{
    display: flex;
    height: 88px;
    width:100%;
    border-top:2px solid #f3f3f3;
    border-bottom: 2px solid #f3f3f3;
    ul{
      display: flex;
      width:100%;
      flex-direction: row;
      color:#999999;
      font-size: 32px;
      justify-content: center;
      align-items: center;
      li{
        padding-left:32px;
        padding-right:32px;
      }
      .active{
        color:#6D8160;
        font-size: 36px;
        position: relative;
      }
      .active::before{
        position: absolute;
        content: '';
        left:50%;
        width:30%;
        height:4px;
        background:#6D8160;
        transform: translateX(-50%);
        bottom: -12px;
      }
    }
  }
  &-content{
    display: flex;
    width:100%;
    padding:24px 24px 124px 24px;
    &-item{
      width:339px;
      img{
        width:339px;
        height:292px;
        border-radius: 8px 8px 0 0;
      }
      .title{
        font-size: 30px;
        color:#333333;
        display: flex;
      }
      .like{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top:12px;
        height:38px;
          .avatar{
            width:38px;
            height:38px;
            margin-right:12px;
          }
          span{
            font-size: 24px;
            color:#666;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .likeico{
            width:30px;
            height:27px;
            margin-right:12px;
          }
          .ather{
            margin-right:12px;
            width:150px;
          }
          .anum{
            width:85px;

          }
      }
    }
    &-imgitem{
      width:339px;
      height:436px;
      img{
        width:100%;
        height:100%;
        border-radius: 8px;
      }
    }
  }

}
</style>
