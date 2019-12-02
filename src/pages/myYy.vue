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
            <!-- <img class="img" :src="item.image ? item.image[0] : ''" alt="" />
            <img class="play" src="../assets/images/myYyplay.png" alt=""> -->
            <video-player class="video-player vjs-custom-skin"
                      ref="videoPlayer"
                      :playsinline="true"
                      @play="onPlayerPlay($event)"
                      :options="item.playerOptions">
            </video-player>
          </div>
          <div class="myright">
            <span class="title">{{item.title}}</span>
            <span class="price">¥{{item.price}}</span>
            <div class="userinfo">
              <img :src="item.admin.avatar" alt="">
              <span>{{item.admin.nickname}}</span>
            </div>
            <!-- <span class="time">预约时间：{{new String(item.create_time).split(" ")[0]}}</span> -->
            <!-- <span class="btn" @click="cancelHandler(item.course_id)">申请退款</span> -->
          </div>
        </div>
      </van-list>
      <NoData v-if="orderList.length === 0" />
      <!-- <video width="320"  controls="controls" poster="https://www.baidu.com/img/bd_logo1.png?qua=high">
              <source src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" type="video/mp4">
              Your browser does not support the video tag.
      </video> -->
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
    onPlayerPlay (e) {
      console.log(e)
    },
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
      this.$api.courseOrderCourseCenter(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.orderList.length == 0) {
            // 第一次加载
            var list = []
            res.data.data.map((item)=>{
              item.playerOptions = {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                  type: "video/mp4",
                  src: item.video //视频url地址
                }],
                poster: item.image[0], //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                  timeDivider: true,
                  durationDisplay: true,
                  remainingTimeDisplay: false,
                  fullscreenToggle: true  //全屏按钮

                }
              }
              list.push(item)
            })
            this.orderList = list || []
            this.total = res.data.total
          } else if (this.orderList.length < this.total) {
            // 加载更多
            var list = []
            res.data.data.map((item)=>{
              item.playerOptions = {
                playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                autoplay: false, //如果true,浏览器准备好时开始回放。
                muted: false, // 默认情况下将会消除任何音频。
                loop: false, // 导致视频一结束就重新开始。
                preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                  type: "video/mp4",
                  src: item.video //视频url地址
                }],
                poster: item.image ? item.image[0] : '', //你的封面地址
                // width: document.documentElement.clientWidth,
                notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                  timeDivider: true,
                  durationDisplay: true,
                  remainingTimeDisplay: false,
                  fullscreenToggle: true  //全屏按钮

                }
              }
              list.push(item)
            })
            this.orderList = this.orderList.concat(list)
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
    flex-direction: column;
    background:white;
    padding:43px 0px;
    border-bottom: 15px solid #FBF8F4;
    .myleft{
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
      margin-top:26px;
      margin-right:26px;
      margin-left:26px;
      .title{
        font-size: 30px;
        color: #333333;
        overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
      }
      .price{
        font-size: 30px;
        color:#995258;
      }
      .userinfo{
        display: flex;
        flex-direction: row;
        margin-top:14px;
        img{
          width:38px;
          height:38px;
          margin-right:13px;
          border-radius: 50%;
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
