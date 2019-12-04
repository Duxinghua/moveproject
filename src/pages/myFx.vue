<template>
  <div class="myXf">
    <div class="myXf-top">
      <img class="card" src="../assets/images/myxf.png" alt="">
      <div class="cardInfo">
        <div class="cardInfo-c">
          <span>账户余额</span>
          <span>{{userInfo.money}}</span>
          <span @click="linkClickHandler">提现</span>
        </div>
      </div>
      <div class="myXf-top-menu">
        <span :class="{active: currentIndex === 0 ? true : false}" @click="tabClickHandler(0)">好友分销</span>
        <span :class="{active: currentIndex === 1 ? true : false}" @click="tabClickHandler(1)">提现记录</span>
      </div>
    </div>
    <div class="myXf-content" v-if="currentIndex === 0">
      <van-list
            v-model="loading"
            v-show="fxlist.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
      <div class="myXf-content-item" v-for="(item, index) in fxlist" :key="index" >
        <div class="myXf-content-item-top">
            <img class="userIco" :src="item.avatar" alt="">
            <div class="userInfo">
              <span>{{item.username}}</span>
              <span>注册时间:{{item.date}}</span>
            </div>
        </div>
        <div class="myXf-content-item-bottom">
          <div>累计消费金额:<span class="sl">¥{{item.price}}</span></div>
          <div>返还金额:<span class="sr">¥{{item.price_to_top}}</span></div>
        </div>
      </div>
      </van-list>
    </div>
    <div class="myXf-Fx" v-if="currentIndex === 1">
      <div class="myXf-Fx-top">
        <span class="time">时间</span>
        <span class="des">详情</span>
        <span class="money">金额</span>
        <span class="status">状态</span>
      </div>
      <div class="myXf-Fx-content">
        <van-list
            v-model="loading"
            v-show="fxlist.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
        >
        <div class="myXf-Fx-content-item" v-for="(item, index) in fxlist" :key="index">
          <span class="time">{{item.create_time.split(" ")[0]}}</span>
          <span class="des">{{item.type == 0 ? '转至支付宝' : '转至银行卡'}}</span>
          <span class="money">¥{{item.money}}</span>
          <span class="status">{{item.status_text}}</span>
        </div>
        </van-list>
      </div>
    </div>
    <img class="myfooter" src="../assets/images/myfooter.png" alt="">
  </div>
</template>

<script>
import NoData from '@/components/nodata'
export default {
  name: 'MyFx',
  data () {
    return {
      currentIndex: 0,
      finished: false,
      loading: false,
      current: 1,
      total: 0,
      userInfo: {},
      xflist: [],
      fxlist: []
    }
  },
  mounted () {
    this.getuserIndex()
    if (this.$route.query.current) {
      this.currentIndex = this.$route.query.current

    }
    this.getuserTakeout()
  },
  methods: {

    getuserTakeout () {
      console.log(this.$api)
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      if(this.currentIndex === 1){
        this.$api.userTakeout(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.fxlist.length == 0) {
              // 第一次加载
              this.fxlist = res.data.data || []
              this.total = res.data.total
            } else if (this.fxlist.length < this.total) {
              // 加载更多
              this.fxlist = this.fxlist.concat(res.data.data)
            }
            if (this.fxlist.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      }else if(this.currentIndex === 0){
        this.$api.userDistribution(param).then((res) => {
          this.$toast.clear()
          if (res.code == 1) {
            this.loading = false

            if (this.fxlist.length == 0) {
              // 第一次加载
              this.fxlist = res.data.data || []
              this.total = res.data.total
            } else if (this.fxlist.length < this.total) {
              // 加载更多
              this.fxlist = this.fxlist.concat(res.data.data)
            }
            if (this.fxlist.length >= this.total) {
              // 全部加载完成
              this.finished = true
            }
          }
        })
      }
    },
    onLoad () {
      if (this.fxlist.length < this.total) {
        this.current++
        this.getuserTakeout()
      }
    },
    getuserIndex () {
      this.$api.userIndex().then((result) => {
        if (result.code === 1) {
          this.userInfo = result.data
        }
      })
    },
    tabClickHandler (e) {
      this.currentIndex = e
      this.finished = false
      this.loading = false
      this.current = 1
      this.fxlist = []
      this.getuserTakeout()

    },
    linkClickHandler () {
      this.$router.push({name: 'MyTx', params: {money: this.userInfo.money}})
    }
  },
  computed: {
    autoIco (type) {
      var links
      switch (type) {
        case 1:
          links = require('../assets/images/myxfzl.png')
          break
        case 2:
        case 3:
          links = require('../assets/images/myxfxx.png')
          break
        case 4:
          links = require('../assets/images/myxfft.png')
          break
      }
      return links
    }
  },
  components: {
    NoData
  }
}
</script>

<style lang="scss" scoped>
.time,.status{
  width:30%
}
.des,.money{
  width:20%
}
.myXf{
  display: flex;
  flex-direction: column;
  min-height:100vh;
  background:white;
  .myfooter{
      position: fixed;
      bottom: 0;
      left:0;
      width:100%;
      height:164px;
  }
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
      top:99px;
      left:111px;
      &-c{
        display: flex;
        flex-direction: column;
        color: #333;
        justify-content: flex-start;
        span:nth-child(1){
          font-size: 30px;
          text-indent: 2px;
        }
        span:nth-child(2){
          font-size: 62px;
          font-weight: bold;
        }
        span:nth-child(3){
          width:201px;
          height:68px;
          background:rgba(153,82,88,1);
          border-radius:34px;
          font-size: 36px;
          line-height: 68px;
          color:white;
          text-align: center;
          margin-top: 45px;
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
    width:100%;
    background:white;
    &-item{
      display: flex;
      flex-direction: column;
      border-bottom: 15px solid #FBF8F4;
      &-top{
          padding-left:26px;
          padding-right:26px;
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
            border-radius: 50%;
            margin-right:26px;
          }
          .userInfo{
            display: flex;
            flex-direction: column;
            width:476px;
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
      }
      &-bottom{
        padding-left:26px;
        padding-right:26px;
        display: flex;
        justify-content: space-between;
        font-size: 30px;
        height:94px;
        align-items: center;
        color:#666666;
        .sl{
          color:#6D8160;
          margin-left:10px;
        }
        .sr{
          color:#995258;
          margin-left:10px;
        }
      }
    }
  }
  &-Fx{
    display: flex;
    flex-direction: column;
    padding-left: 26px;
    padding-right: 26px;
    background:white;
    &-top{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 88px;
      align-items: center;
      color: #999999;
      font-size: 26px;
      border-bottom: 1px solid #F3F3F3;
      span{
        display: flex;
        justify-content: center;
      }
    }
    &-content{
      display: flex;
      flex-direction: column;
      &-item{
        height: 80px;
        font-size: 26px;
        color:#333333;
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid #F3F3F3;
        span{
          display: flex;
          justify-content: center;
          align-items: center;
        }

      }
      &-item:last-child{
        border-bottom: 1px solid transparent;
      }
    }
  }
}
</style>
