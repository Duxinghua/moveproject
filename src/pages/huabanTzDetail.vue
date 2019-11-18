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
    <div :class="autoMarge">
      <el-carousel id="huabantz-banner" :indicator-position="indicator" @change="changeTab">
        <el-carousel-item v-for="(item,index) in tzDetail.images" :key="index">
          <img class="huabantzimg" :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
      <span class="huabantzind">{{(bannerLength == 1 ? 1 : index+1)+"/"+bannerLength}}</span>
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
          共{{commentsList.length}}条评论
        </div>
        <div class="plcontent">
          <div class="pl-item" v-for="(item,index) in commentsList" :key="index">
              <span>{{item.user.nickname}}</span>
              <span>{{item.content}}</span>
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
      tzDetail: {},
      bannerLength: 0,
      content: '',
      commentsList: [],
      current: 1,
      total:0,
      indicator: 'none'
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getGzdetail()
    this.getpostsComments()
  },
  methods: {
    getpostsComments () {
      const param = {
        page: this.current,
        pageSize: 10,
        id: this.id
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.postsComments(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.commentsList.length == 0) {
            // 第一次加载
            this.commentsList = res.data.data || []
            this.total = res.data.total
          } else if (this.commentsList.length < this.total) {
            // 加载更多
            this.commentsList = this.commentsList.concat(res.data.data)
          }
          if (this.commentsList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })

    },
    onLoad () {
      if (this.commentsList.length < this.total) {
        this.current++
        this.getpostsComments()
      }
    },
    getGzdetail () {
      this.$api.tzPosts({id:this.id}).then((res)=>{
      if(res.code === 1) {
        this.user = res.data.user
        this.user.logintime =  this.timers(res.data.user.logintime)
        this.tzDetail = res.data
        this.bannerLength = res.data.images.length
        this.indicator = res.data.images.length > 1 ? 'outside' : 'none'
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
        if(res.code === 1){
          this.$toast({
            message: res.msg,
            onClose: () => {
              console.log('this is ')
            }
          })
        }else{
          this.$toast(res.msg)
        }
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
              this.getpostsComments()
            }
          })

        }
      })
    }
  },
  computed: {
    autoMarge () {
      return {
        'huabantz-banner': true,
        'huabantz-marge': this.bannerLength == 1 ? true : false
      }
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
  &-marge{
    margin-bottom: 26px;
  }
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
