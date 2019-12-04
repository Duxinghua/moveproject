<template>
  <div class="huabantz">
    <div class="huabantz-top">
      <img class="avatar" :src="user.avatar ? user.avatar : require('../assets/images/people.png')" alt="">
      <div class="userdes">
        <span>{{user.nickname ? user.nickname : ''}}</span>
        <span>{{user.logintime}}小时前</span>
      </div>
      <div class="gzbtn" v-if="user.amity == 0" @click="gzClickHandler(user.id)">
         <van-icon size="20" name="like-o" />
        <span>关注</span>
      </div>
      <span class="gz" v-else  @click="gzClickHandler(user.id)">已关注</span>
    </div>
    <div :class="autoMarge">
      <van-swipe @change="changeTab" :autoplay="3000">
         <van-swipe-item   v-for="(item,index) in tzDetail.images" :key="index" @click="onImageView(tzDetail.images,index)">
            <div class="huabantzimg" >
                     <van-image :src="item"  >
                        <template v-slot:loading>
                            <van-loading
                                type="spinner"
                                size="20"
                            />
                        </template>
                    </van-image>
            </div>
         </van-swipe-item>
        <div class="custom-indicator" slot="indicator">
          {{(bannerLength == 1 ? 1 : index+1)}}/{{bannerLength}}
        </div>
      </van-swipe>
      <div class="dindex" v-if="bannerLength > 1">
        <span :class="{active:index == aindex}" v-for="(item,aindex) in tzDetail.images" :key="aindex"></span>
      </div>
    </div>
    <div class="huabantz-detail">
      <div class="huabantz-detail-content">
        <div class="des">
          <span class="destitle">{{tzDetail.title}}</span>
          <div class="desico">
            <img :src="tzDetail.likes == 1 ? require('../assets/images/gzxico.png') : require('../assets/images/ydz.png')" alt="" @click="dzClickHandler">
            <img src="../assets/images/shareico.png" alt="" @click="shareOpen">
          </div>
        </div>
        <div class="info">
         {{tzDetail.content}}
        </div>
      </div>
      <div class="huabantz-detail-pl">
        <div class="plnum">
          共{{total}}条评论
        </div>
        <div class="plcontent">
          <van-list
            v-model="loading"
            v-show="commentsList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
          >
            <div class="pl-item" v-for="(item,index) in commentsList" :key="index">
                <span>{{item.user ? item.user.nickname : ''}}</span>
                <span>{{item.content}}</span>
            </div>
            </van-list>
        </div>
      </div>
    </div>
    <div class="huabantz-commit">
      <input type="text" v-model="content" class="huabantz-commit-input" placeholder="喜欢就评论…" >
      <span @click="submit">发送</span>
    </div>
    <WxShare :show="wxShare" @toShare="toShare" />
    <van-image-preview
            v-model="imageShow"
            :images="imagePreview"
            :startPosition="startPosition"
        >
    </van-image-preview>
  </div>
</template>

<script>
import WxShare from '@/components/wxshare.vue'
export default {
  name: 'HuabanTzDetail',
  data () {
    return {
      id: '',
      wxShare:false,
      index: 1,
      user: {},
      tzDetail: {},
      bannerLength: 0,
      content: '',
      commentsList: [],
      current: 1,
      total: 0,
      indicator: 'none',
      finished: false,
      loading: false,
      imageShow: false,
      imagePreview: [],
      startPosition: 0
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getGzdetail()
    this.getpostsComments()
  },
  methods: {
    onImageView(data, index) {
            this.imagePreview = data;
            this.startPosition = index;
            this.imageShow = true;
    },
    shareOpen () {
      this.wxShare = true
    },
    toShare () {
      this.wxShare = false
    },
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
          this.total = res.data.total
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
      this.$api.tzPosts({id: this.id}).then((res) => {
        if (res.code === 1) {
          this.user = res.data.user
          this.user.logintime = this.timers(res.data.user.logintime)
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
      return parseInt((new Date().getTime() - (timer * 1000)) / 3600 / 1000)
    },
    gzClickHandler (id) {
      console.log(id)
      this.$api.userSaveFollow({user_id: id}).then((res) => {
        if (res.code === 1) {
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
      this.$api.postsSaveLike({gp_id: this.id, gp_user_id: this.tzDetail.user_id}).then((res) => {
        if (res.code === 1) {
          this.$toast({
            message: res.msg,
            onClose: () => {
              this.getGzdetail()
            }
          })
        } else {
          this.$toast(res.msg)
        }
      })
    },
    submit () {
      if (!this.content) {
        this.$toast('请输入评论')
        return
      }
      var params = {
        gp_id: this.tzDetail.gp_id,
        content: this.content
      }
      this.$api.postsCommentsSave(params).then((res) => {
        if (res.code === 1) {
          this.$toast({
            message: res.msg,
            onClose: () => {
              this.content = ''
              this.finished = false
              this.loading = false
              this.current = 1
              this.commentsList = []
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
        'huabantz-marge': this.bannerLength == 1
      }
    }
  },
  components: {
    WxShare
  }

}
</script>

<style lang="scss" scoped>
.van-swipe-item{
  width:50%
}
.dindex{
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin:20px 0;
  span{
    width:14px;
    height:14px;
    background:#E3E3E3;
    border-radius: 50%;
    margin:0 7px;
  }
  .active{
    background: #F3D995;
  }
}
.custom-indicator {
        position: absolute;
        width: 100px;
        height: 50px;
        border-radius: 25px;
        background: rgba(109, 129, 96, 0.7);
        right: 10px;
        bottom: 30px;
        z-index: 10;
        font-size: 24px;
        color: #f3f3f3;
        text-align: center;
        line-height: 50px;
 }
.huabantz{
  background:#FBF8F4;
  display: flex;
  flex-direction: column;
  min-height:100vh;
  &-marge{
    margin-bottom: 26px;
  }
  &-top{
    display: flex;
    flex-direction: row;
    height:111px;
    padding:26px;

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
      // background:#6D8160;
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
      overflow: hidden;
      display: flex;
      background:white;
        .van-image {
          width: 100%;
          height: auto;
        }
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
          display:table;
          span:nth-child(1){
            font-weight: bold;
            margin-right:10px;
          }
          span:nth-child(2){
            font-weight: 500;
          }
        }
        /deep/ .van-list__finished-text{
          margin-top:15px;
        }
      }
    }
  }
  &-commit{
    display: flex;
    flex-direction: row ;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    padding-left:26px;
    padding-right:26px;
    width:100%;
    span{
      font-size: 26px;
      color:#333;
      margin-left:26px
    }
    &-input{
      flex:1;
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
