<template>
  <div class="myXf">
    <div class="myXf-top">
      <img class="card" src="../assets/images/myxf.png" alt="">
      <div class="cardInfo">
        <div class="cardInfo-c">
          <span>花币</span>
          <span>{{score}}</span>
        </div>
      </div>
      <div class="myXf-top-menu">
        <span :class="{active: currentIndex === 0 ? true : false}" @click="tabClickHandler(0)">花币记录</span>
        <span :class="{active: currentIndex === 1 ? true : false}" @click="tabClickHandler(1)">花币规则</span>
      </div>
    </div>
    <div class="myXf-content">
      <van-list
            v-model="loading"
            v-show="xflist.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
            v-if="currentIndex === 0"
      >
      <div class="myXf-content-item" v-if="currentIndex === 0" v-for="(item,index) in xflist" :key="index">
        <img class="userIco" src="../assets/images/myxfzl.png" alt="">
        <div class="userInfo">
          <span>{{item.memo}}</span>
          <span>{{item.create_time}}</span>
        </div>
        <span class="userNum">{{item.type == 1 ?'+' :'-'}}{{item.score}}</span>
      </div>
      </van-list>
      <div class="aids" style="font-size: initial;" v-if="currentIndex === 1" v-html="points_rule">
      </div>
      <NoData v-if="(xflist.length === 0 && currentIndex === 0) || (currentIndex === 1) && !points_rule"/>
      <img class="myfooter" src="../assets/images/myfooter.png" alt="">
    </div>
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  name: 'MyXf',
  data () {
    return {
      currentIndex: 0,
      xflist: [],
      finished: false,
      loading: false,
      current: 1,
      total: 0,
      score: 0,
      points_rule: null
    }
  },
  mounted () {
    this.score = this.$route.query.score
    this.getxflist()
  },
  methods: {
    tabClickHandler (e) {
      this.currentIndex = e
      if (this.currentIndex === 0) {
        this.getxflist()
      } else {
        this.getcommonConfig()
      }
    },
    getcommonConfig () {
      this.$api.commonConfig({name: 'points_rule'}).then((res) => {
        if (res.code === 1) {
          this.points_rule = res.data.value
        }
      })
    },
    getxflist () {
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
      this.$api.userScoreLog(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.xflist.length == 0) {
            // 第一次加载
            this.xflist = res.data.data || []
            this.total = res.data.total
          } else if (this.xflist.length < this.total) {
            // 加载更多
            this.xflist = this.xflist.concat(res.data.data)
          }
          if (this.xflist.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.xflist.length < this.total) {
        this.current++
        this.getxflist()
      }
    }
  },
  computed: {
  },
  components: {
    NoData
  }
}
</script>

<style lang="scss" scoped>
.aids{
  padding-top:26px;
  font-size: initial;
  word-wrap: break-word;
  word-break: break-all;
}
.aids img{
  width:100% !important;
  height:auto !important;
}
.myXf{
  display: flex;
  flex-direction: column;
  background:white;
  min-height: 100vh;
  &-top{
    background:#FBF8F4;
    height:448px;
    padding-top:41px;
    position: relative;
    .card{
      width:640px;
      height:362px;
      display:flex;
      margin:0 auto;
    }
    .cardInfo{
      position: absolute;
      top:144px;
      left:111px;
      &-c{
        display: flex;
        flex-direction: column;
        color: #333;
        justify-content: flex-start;
        span:nth-child(1){
          font-size: 30px;
          text-indent: 8px;
        }
        span:nth-child(2){
          font-size: 62px;
          font-weight: bold;
        }
      }
    }
    &-menu{
      display: flex;
      flex-direction: row;
      height:105px;
      justify-content: center;
      align-items: center;
      position: absolute;
      left:0;
      bottom: 0;
      background:white;
      width:100%;
      border-bottom: 2px solid #F3F3F3;
      span{
        font-size: 32px;
        color:#999999;
        padding-left:24px;
        padding-right:24px;
      }
      .active{
        font-size: 36px;
        color:#6D8160;
        position: relative;
      }
      .active::before{
        position: absolute;
        width:45px;
        content: '';
        height:4px;
        background:#6D8160;
        left:50%;
        bottom: -25px;
        transform: translateX(-50%)
      }
    }
  }
  &-content{
    display: flex;
    flex-direction: column;
    padding-left:26px;
    padding-right:26px;
    width:100%;
    &-item{
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 30px;
      padding-bottom: 30px;
      width:100%;
      border-bottom: 1px solid #F3F3F3;
      .userIco{
        width:77px;
        height:77px;
        margin-right:26px;
      }
      .userInfo{
        display: flex;
        flex-direction: column;
        width:400px;
        span:nth-child(1){
          font-size: 32px;
          color:#333;
          width:100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span:nth-child(2){
          font-size: 26px;
          margin-top:10px;
          color:#666;
        }
      }
      .userNum{
        font-size:38px;
        color:#CDA871;
        width:219px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: right;
      }
    }
    .myfooter{
      position: fixed;
      bottom: 0;
      left:0;
      width:100%;
      height:164px;
    }
  }
}
</style>
