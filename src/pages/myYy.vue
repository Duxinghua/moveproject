<template>
  <div class="MyYy">
     <van-list
            v-model="loading"
            v-show="orderList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
      >
        <div class="MyYy-item" v-for="(item,index) in orderList" :key="index">
          <div class="myleft">
            <img class="img" :src="item.course.image ? item.course.image[0] : ''" alt="" />
            <img class="play" src="../assets/images/myYyplay.png" alt="">
          </div>
          <div class="myright">
            <span class="title">{{item.course.title}}</span>
            <div class="userinfo">
              <img :src="item.course.admin.avatar" alt="">
              <span>{{item.course.admin.nickname}}</span>
            </div>
            <span class="time">预约时间：{{new String(item.create_time).split(" ")[0]}}</span>
            <span class="btn" @click="cancelHandler(item.course_id)">申请退款</span>
          </div>
        </div>
      </van-list>
      <NoData v-if="orderList.length === 0" />
      <video width="320"  controls="controls" poster="https://www.baidu.com/img/bd_logo1.png?qua=high">
              <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4">
              Your browser does not support the video tag.
      </video>
  </div>
</template>

<script>
import NoData from '@/components/nodata.vue'
export default {
  name: 'MyYy',
  components: {
    NoData
  },
  data () {
    return {
      orderList: [],
      finished: false,
      loading: false,
      status: '',
      current: 1,
      total: 0
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    cancelHandler (course_id) {
      var _this = this
      this.$api.courseDelAppoint({course_id:course_id}).then((res)=>{
        if(res.code == 1) {
          _this.$toast({
            message:res.msg,
            onClose: () => {
              _this.finished = false
              _this.loading = false
              _this.current = 1
              _this.orderList = []
              _this.getOrderList()
            }
          })
        }else{
          _this.$toast(res.msg)
        }
      })
    },
    getOrderList () {
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.userAppoint(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.orderList.length == 0) {
            // 第一次加载
            this.orderList = res.data.data || []
            this.total = res.data.total
          } else if (this.orderList.length < this.total) {
            // 加载更多
            this.orderList = this.orderList.concat(res.data.data)
          }
          if (this.orderList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.orderList.length < this.total) {
        this.current++
        this.getOrderList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.MyYy{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background:#FBF8F4;
  &-item{
    display: flex;
    flex-direction: row;
    background:white;
    padding:43px 0px;
    border-bottom: 15px solid #FBF8F4;
    .myleft{
      width:325px;
      height:216px;
      margin-left:26px;
      margin-right:26px;
      position: relative;
      .img{
        width:100%;
        height:100%;
      }
      .play{
        position: absolute;
        left:50%;
        top:50%;
        width:51px;
        height:51px;
        transform: translate(-50%,-50%)
      }
    }
    .myright{
      display: flex;
      flex-direction: column;
      margin-right:26px;
      width:347px;
      .title{
        font-size: 30px;
        color: #333333;
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .userinfo{
        display: flex;
        flex-direction: row;
        margin-top:14px;
        img{
          width:38px;
          height:38px;
          margin-right:13px;
        }
        span{
          width:296px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 26px;
          color:#898C87;
        }
      }
      .time{
        font-size: 26px;
        color:#6D8160;
        margin-top:15px;
      }
      .btn{
        width:180px;
        height:62px;
        background:rgba(255,255,255,1);
        border:2px solid rgba(227, 227, 227, 1);
        border-radius:31px;
        font-size: 30px;
        color:#666666;
        line-height: 62px;
        text-align: center;
        margin-top:15px;
      }
    }
  }
}
</style>
