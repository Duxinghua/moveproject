<template>
  <div class="userinfo">
    <div class="userinfo-top">
      <div class="userinfo-header">
        <img :src="detail.avatar" alt="">
        <div class="userinfo-top-wrap">
          <span class="username">{{detail.nickname}}</span>
          <div class="userxf">
            <span>被喜欢</span>
            <span>{{detail.likes}}</span>
            <span>喜欢</span>
            <span>{{detail.likes}}</span>
          </div>
        </div>
        <span class="userinfo-top-btn">已关注</span>
      </div>
      <div class="userinfo-tab">
        <ul>
          <li :class="{active : (currentIndex == 0 ? true : false)}" @click="tabClick(0)">帖子</li>
          <li :class="{active : (currentIndex == 1 ? true : false)}" @click="tabClick(1)">图册</li>
        </ul>
      </div>
    </div>
    <div class="userinfo-content">
      <!-- finished-text="没有更多了" -->
      <van-list
            v-model="loading"
            v-show="huabanList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
      <div class="userinfo-content-item" v-if="currentIndex === 0" v-for="(item,index) in huabanList" :key="index">
         <div class="itemimg">
              <van-image :src="item.image">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
              </van-image>
         </div>
        <span class="title">{{item.title}}</span>
        <div class="like">
            <img class="avatar" :src="item.avatar" alt="">
            <span class="ather">{{item.nickname}}</span>
            <img class="likeico" src="../assets/images/like.png" alt="">
            <span class="anum">{{item.likes}}</span>
        </div>

      </div>
      <div class="userinfo-content-imgitem" v-if="currentIndex === 1"  v-for="(item,index) in huabanList" :key="index">
          <div class="itemimg">
                <van-image :src="item.url">
                  <template v-slot:loading>
                      <van-loading type="spinner" size="20" />
                  </template>
                </van-image>
          </div>
      </div>
      </van-list>
      <div class="no-more">
        <NoData v-if="huabanList.length === 0" />
      </div>
    </div>

  </div>
</template>

<script>
import NoData from '@/components/nodata.vue'
export default {
  name: 'HuabanUserInfo',
  data () {
    return {
      currentIndex: 0,
      finished: false,
      loading: false,
      current: 1,
      total: 0,
      huabanList: [],
      detail:{},
      user_id:''
    }
  },
  mounted () {
    this.user_id = this.$route.query.id
    this.getUserInfo()
  },
  components: {
    NoData
  },
  methods: {
    getUserInfoList () {
      const param = {
        page: this.current,
        pageSize: 10,
        user_id: this.user_id
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      if(this.currentIndex === 0){
        this.$api.postsLists(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false
            if (this.huabanList.length == 0) {
              // 第一次加载
              console.log(res.data.data)
              var list = []
              res.data.data.map((item)=>{
                item.image = item.images ? item.images[0] : ''
                item.avatar = item.user.avatar
                item.nickname = item.user.nickname
                list.push(item)
              })
              this.huabanList = list || []
              this.total = res.data.total
            } else if (this.huabanList.length < this.total) {
              // 加载更多
              var list = []
              res.data.data.map((item)=>{
                item.image = item.images ? item.images[0] : ''
                item.avatar = item.user.avatar
                item.nickname = item.user.nickname
                list.push(item)
              })
              this.huabanList = this.huabanList.concat(list)
            }
            if (this.huabanList.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      }else if(this.currentIndex === 1){
        this.$api.groupPhotos(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.huabanList.length == 0) {
              // 第一次加载
              this.huabanList = res.data.data || []
              this.total = res.data.total
            } else if (this.huabanList.length < this.total) {
              // 加载更多
              this.huabanList = this.huabanList.concat(res.data.data)
            }
            if (this.huabanList.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      }
    },
    getUserInfo () {
      this.$api.userIndex({user_id:this.user_id}).then((res)=>{
        if(res.code === 1) {
          this.detail = res.data
          this.getUserInfoList()
        }
      })
    },
    tabClick (e) {
      this.currentIndex = e
      this.finished = false
      this.loading = false
      this.current = 1
      this.total = 0
      this.huabanList = []
      this.getUserInfoList()
    },
    onLoad () {
      if (this.huabanList.length < this.total) {
        this.current++
        this.getUserInfoList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
 /deep/ .van-list__finished-text{
  width:100%;
}
.userinfo{
  background:#FBF8F4;
  display: flex;
  flex-direction: column;
  width:100%;
  min-height: 100vh;
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
      border-radius: 50%;
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
    padding:24px 24px 0px 24px;
    box-sizing: border-box;
    flex-direction: column;
    .van-list{
      // display: flex;
      // flex-direction: row;
      // justify-content: flex-start;
      // flex-wrap: wrap;
      -moz-column-count:2; /* Firefox */
      -webkit-column-count:2; /* Safari 和 Chrome */
      column-count:2;
      -moz-column-gap: 24px;
      -webkit-column-gap:24px;
      column-gap: 24px;
      column-width:339px;

    }
    /deep/ .nodata{
      position: relative;
    }
    &-item{
      // width:339px;
      // display: flex;
      // flex-direction: column;
      // margin-bottom: 24px;
      // margin-right: 24px;
      // background:#FFFFFF;
      // border-radius: 8px;
      float: left;
      margin-bottom: 24px;
      -moz-page-break-inside: avoid;
      -webkit-column-break-inside: avoid;
      break-inside: avoid;
      .itemimg{
        width:100%;
        height:auto;
        border-radius: 8px 8px 0 0;
        .van-image{
          width: 100%;
          height: auto;
        }
      }
      .title{
        font-size: 30px;
        color:#333333;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding:12px 17px;
      }
      .like{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top:12px;
        padding:0px 17px 15px 17px;
        // height:38px;
          .avatar{
            width:38px;
            height:38px;
            border-radius: 50%;
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
      .itemimg{
        width:100%;
        height:auto;
        border-radius: 8px;
        .van-image{
          width: 100%;
          height: auto;
       }
     }
    }
  }

}
.van-list .userinfo-content-item:nth-child(2n){
margin-right:0px !important;
}
</style>
