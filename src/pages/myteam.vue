<template>
  <div class="toshare">
    <div class="toshareContent">
      <div class="toshareitem" v-for="(item, index) in teamList" :key="index">
        <!-- :src="item.avatar" -->
          <img  v-lazy="item.avatar" alt="">
          <span>{{item.user_nickname}}</span>
          <span>{{item.create_time_desc}}</span>
      </div>
      <NoData v-if="teamList.length==0&&hasGetData" message="暂无邀请好友"/>
    </div>
    <Sharepagestyle :sharePageStyle="sharePageStyle" @close="showshareclose"/>
    <div class="tosharebut" @click="shareClick">
        邀请好友
    </div>
  </div>
</template>

<script>
import {userMyteam, weixinGetShareApi, weixinGetShare} from '@/api'
import NoData from '@/components/nodata.vue'
import Sharepagestyle from '@/components/showSharePage.vue'

export default {
  components: {
    NoData,
    Sharepagestyle
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfunction, false)
  },
  data () {
    return {
      page: 1,
      page_size: 10,
      totalPage: 0,
      teamList: [],
      hasMoreData: false,
      hasGetData: false,
      inBottom: false,
      wxpay: {},
      sharePageStyle: false
    }
  },
  methods: {
    shareClick () {
      // this.sharePageStyle = true
      this.$router.push({path: '/toshare'})
    },
    showshareclose () {
      this.sharePageStyle = false
    },
    async weixinGetShareApi () {
      const data = {
        appid: this.appid,
        current_url: location.href
      }
      const result = await weixinGetShare(data)
      if (result.code === 1) {
        this.wxpay = result.data
        this.wxs(result.data)
      }
    },
    scrollfunction () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      console.log(scrollHeight, scrollTop, windowHeight)
      if (scrollHeight < (scrollTop + windowHeight) + 1) {
        if (!this.inBottom && this.hasMoreData) {
          console.log('加载更多')
          this.page++
          this.inBottom = true
          this.hasMoreData = false
          this.userMyteamApi()
        }
      } else {
        this.inBottom = false
        console.log(111)
      }
    },
    async userMyteamApi () {
      const data = {
        page: this.page,
        page_size: this.page_size
      }
      const result = await userMyteam(data)
      this.hasGetData = true
      if (result.code === 1) {
        this.teamList = this.teamList.concat(result.data.list)
        this.totalPage = result.data.totalPage
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          this.hasMoreData = true
        }
      }
    }
  },
  mounted () {
    let bodycolors = document.documentElement || document.body
    bodycolors.style.background = '#f3f3f3'
    this.userMyteamApi()
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollfunction, false)
    })
  }
}
</script>

<style scoped>
.toshareitem span:nth-child(2){
  color:#333;
  font-size: 28px;
  margin-bottom: 17px;
}
.toshareitem span:nth-child(3){
  color:#666;
  font-size: 24px;
}
.toshareitem img{
  width:77px;
  height:77px;
  margin-bottom: 29px;
  border-radius: 50%;
}
.toshareitem{
  display: flex;
  flex-direction: column;
  padding-top:37px;
  padding-bottom: 37px;
  border-radius: 20px;
  background:white;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-right:20px;
  width:calc(50% - 10px);
}
.toshareitem:nth-child(2n){
  margin-right:0px !important;
}

.toshareContent{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 98px;
}
.toshare{
  background: #f3f3f3;
  display: flex;
  flex-direction: column;
  padding-left:32px;
  padding-right:32px;
  padding-top:20px;
}
.tosharebut{
  position: fixed;
  bottom: 0;
  left:0;
  background:#9C3FA2;
  height:98px;
  width:100%;
  color:white;
  text-align: center;
  line-height: 98px;
  font-size:32px;
}
</style>
