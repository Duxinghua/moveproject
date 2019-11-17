<template>
  <div class="huabantz">
    <div class="huabantz-top">
      <img class="avatar" :src="user.avatar ? user.avatar : require('../assets/images/people.png')" alt="">
      <div class="userdes">
        <span>{{user.nickname}}</span>
        <span>{{user.logintime}}小时前</span>
      </div>
      <div class="gzbtn" v-if="user.amity == 0" @click="gzClickHandler(user.id)">
        <img src="../assets/images/gzico.png" alt="">
        <span>关注</span>
      </div>
      <span class="gz" v-else  @click="gzClickHandler(user.id)">已关注</span>
    </div>
    <div class="huabantz-banner">
      <el-carousel id="huabantz-banner" indicator-position="outside" @change="changeTab">
        <el-carousel-item v-for="(item,index) in tzDetail.images" :key="index">
          <img class="huabantzimg" :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
      <span class="huabantzind">{{(index+1)+"/"+bannerLength}}</span>
    </div>
    <div class="huabantz-detail">
      <div class="huabantz-detail-content">
        <div class="des">
          <span class="destitle">{{tzDetail.title}}</span>
          <div class="desico">
            <img src="../assets/images/gzxico.png" alt="" @click="dzClickHandler">
            <img src="../assets/images/shareico.png" alt="">
          </div>
        </div>
        <div class="info">
         {{tzDetail.content}}
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
          <div class="pl-item">
              <span>华见笑了</span>
              <span>很喜欢，做的不错，构图很有心意</span>
          </div>
        </div>
      </div>
    </div>
    <div class="huabantz-commit">
      <input type="text" v-model="content" class="huabantz-commit-input" placeholder="喜欢就评论…" @keyup.enter="submit">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuabanTzDetail',
  data () {
    return {
      id:'',
      index: 1,
      user: {},
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
      ],
      tzDetail:{},
      bannerLength:0,
      content:''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getGzdetail()
  },
  methods: {
    getGzdetail () {
      this.$api.tzPosts({id:this.id}).then((res)=>{
      if(res.code === 1) {
        this.user = res.data.user
        this.user.logintime =  this.timers(res.data.user.logintime)
        this.tzDetail = res.data
        this.bannerLength = res.data.images.length
      }


    })
    },
    changeTab (e) {
      this.index = e
    },
    timers (timer) {
      return parseInt((new Date().getTime() - (timer*1000))/3600/1000)
    },
    gzClickHandler (id) {
      console.log(id)
      this.$api.userSaveFollow({user_id:id}).then((res)=>{
        if(res.code === 1){
          this.$toast({
            message: res.msg,
            onClose: () => {
              this.getGzdetail()
            }
          })
        }
      })
    },
    dzClickHandler () {
      this.$api.postsSaveLike({gp_id:this.tzDetail.gp_id,gp_user_id:this.tzDetail.user_id}).then((res)=>{
        console.log(res)
      })
    },
    submit () {
      if(!this.content){
        this.$toast('请输入评论')
        return
      }
      var params = {
        gp_id: this.tzDetail.gp_id,
        content: this.content
      }
      this.$api.postsCommentsSave(params).then((res)=>{
        if(res.code === 1) {
          this.$toast({
            message:res.msg,
            onClose:()=>{
              this.content = ''
            }
          })

        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
// #huabantz-banner{
//   height:602px !important;
//   padding-bottom: 50px;
// }

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
      border-radius: 50%;
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
      background:#6D8160;
      // border:2px solid rgba(205, 168, 113, 1);
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
    .gz{
      width:170px;
      height:58px;
      background:white;
      border:2px solid rgba(205, 168, 113, 1);
      border-radius:28px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      font-size: 30px;
      color:#CDA871;
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
        padding-bottom: 20px;
      }
      .plcontent{
        display: flex;
        flex-direction: column;
        .pl-item{
          font-size:26px;
          line-height:50px;
          height:50px;
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
  &-commit{
    display: flex;
    flex-direction: column;
    height:500px;
    &-input{
      width:700px;
      height:88px;
      background:rgba(242,239,234,1);
      border-radius:44px;
      border:none;
      margin:0 auto;
      padding: 0 50px;
      color:#666;
      font-size: 26px;
    }

  }
}
</style>
