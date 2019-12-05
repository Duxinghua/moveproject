<template>
  <div class="myTz myEdit">
      <van-list
            v-model="loading"
            v-show="tzList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
      <div class="myTz-item" v-for="(item,index) in tzList" :key="index">
          <div class="myTz-item-top">
            <img class="avatar" :src="item.user.avatar" alt="">
            <div class="userinfo">
              <span>{{item.user.nickname}}</span>
              <span>{{autoTimer(item.create_time)}}小时前</span>
            </div>
            <img class="sd" src="../assets/images/sd.png" alt="" @click="delClickHandler(item.gp_id)">
          </div>
          <div class="myTz-item-banner">
            <el-carousel id="huabantz-banner" indicator-position="outside" @change="changeTab">
              <el-carousel-item v-for="(imgitem,index) in item.images" :key="index">
                <div class="huabantzimg">
                  <!-- <img  :src="imgitem" alt=""> -->
                  <van-image :src="imgitem">
                    <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                    </template>
                  </van-image>
                </div>
              </el-carousel-item>
            </el-carousel>
            <span class="huabantzind">{{(item.images.length === 1 ? 1 : (index+1))+"/"+item.images.length}}</span>
          </div>
        <div class="myTz-item-detail">
          <div class="myTz-item-detail-content">
            <div class="des">
              <span class="destitle">{{item.title}}</span>
              <div class="desico">
                <img :src="item.likes == 1 ? require('../assets/images/ydz.png') : require('../assets/images/gzxico.png')" alt=""  @click="gzClickHandler(item.gp_id,item.user_id)">
                <img src="../assets/images/shareico.png" alt="">
              </div>
            </div>
            <div class="info">
              {{item.content}}
            </div>
          </div>
          <input class="myTz-item-detail-input" placeholder="喜欢就评论" @click="inputClick(item.gp_id)"/>
        </div>
      </div>
  </van-list>
  <NoData v-if="tzList.length == 0" />
        <!-- 贴子 -->
    <van-popup
      v-model="tzShow"
      closeable
      overlay
      round
      position="bottom"
    >
    <div class="grender">
      <div class="grender-item" @click="delClick">
      删除
      </div>
      <div class="grender-item" @click="cancelDelHandler">
      取消
      </div>
    </div>
    </van-popup>
  </div>
</template>

<script>
import NoData from '@/components/nodata.vue'
export default {
  name: 'MyTz',
  data () {
    return {
      tzShow: false,
      index: 1,
      gp_id: '',
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
      tzList: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0

    }
  },
  components: {
    NoData
  },
  mounted () {
    this.getTzList()
  },
  methods: {
    delClick () {
      var _this = this
      this.$api.postsDel({gp_id:this.gp_id}).then((res)=>{
        if(res.code === 1){
          this.$toast({
            message:res.msg,
            onClose: ()=> {
            _this.tzShow = false
            _this.tzList = []
            _this.finished = false
            _this.loading = false
            _this.current = 1
            _this.getTzList()
            }
          })
        }else{
          _this.tzShow = false
          _this.$toast(res.msg)
        }
      })
    },
    cancelDelHandler () {
      this.gp_id = ''
      this.tzShow = false
    },
    delClickHandler (id) {
      this.gp_id = id
      this.tzShow = true

    },
    inputClick (id) {
      this.$router.push({name:'HuabanTzDetail',query:{id}})
    },
    gzClickHandler (gp_id,gp_user_id) {
      this.$api.postsSaveLike({gp_id: gp_id, gp_user_id: gp_user_id}).then((res) => {
        if (res.code === 1) {
          this.$toast({
            message: res.msg,
            onClose: () => {
              this.tzList =  []
              this.finished = false
              this.loading = false
              this.current = 1
              this.getTzList()
            }
          })
        } else {
          this.$toast(res.msg)
        }
      })
    },
    autoTimer (timer) {
      return parseInt((new Date().getTime() - timer*1000)/1000/3600)
    },
    changeTab (e) {
      this.index = e
    },
    getTzList () {
      const param = {
        page: this.current,
        pageSize: 10,
        my: 1
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.postsLists(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.tzList.length == 0) {
            // 第一次加载
            this.tzList = res.data.data || []
            this.total = res.data.total
          } else if (this.tzList.length < this.total) {
            // 加载更多
            this.tzList = this.tzList.concat(res.data.data)
          }
          if (this.tzList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.tzList.length < this.total) {
        this.current++
        this.getTzList()
      }
    }

  }

}
</script>

<style lang="scss" scoped>
.myTz{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:#FBF8F4;
  &-item{
    display: flex;
    flex-direction: column;
    background: white;
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
        border-radius: 50%;
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
        overflow: hidden;
        .van-image{
          width:100%;
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
