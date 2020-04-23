<template>
    <div class="home">
        <div class="home-banner">
            <van-swipe :autoplay="3000" id="home-banner-carousel" indicator-color="#F3D995"	>
              <van-swipe-item v-for="(item, index) in slideList" :key="index">
                <div class="home-banner-item">
                    <van-image :src="item.image">
                        <template v-slot:loading>
                            <van-loading
                                type="spinner"
                                size="20"
                            />
                        </template>
                    </van-image>
                </div>
              </van-swipe-item>
            </van-swipe>
        </div>
        <div class="goods_menu">
          <span :class="activeIndex == 1 ? 'active' : ''" @click="tabClick(1)">商品</span>
          <span :class="activeIndex == 2 ? 'active' : ''" @click="tabClick(2)">课程</span>
        </div>
        <van-list
            v-model="loading"
            v-show="goodsList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
            v-if="activeIndex == 1"
        >
            <div class="goods-list">
                <TuanItem
                    v-for="(item, index) in goodsList"
                    :key="index"
                    :goodsData="item"
                    :types="type"
                />
            </div>
        </van-list>
        <van-list
            v-model="loading"
            v-show="goodsLists.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoads"
            v-if="activeIndex == 2"
        >
            <div class="goods-list">
                <StuanItem
                    v-for="(item, index) in goodsLists"
                    :key="index"
                    :goodsData="item"
                    :types="type"
                />
            </div>
        </van-list>
        <NoData v-if="noDataShow"/>
        <NoData v-if="noDataShows"/>
        <Footer :pt="true" />
    </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import Tabs from '@/components/common/tabs'
import TuanItem from '@/components/shop/tuanitem'
import StuanItem from '@/components/shop/stuanitem'
import NoData from '@/components/nodata'

export default {
  data () {
    return {
      tabList: [],
      goodsList: [],
      goodsLists: [],
      slideList: [],
      loading: false,
      finished: false,
      total: 0,
      current: 1,
      type: 'tuan',
      activeIndex: 1,
      noDataShow: false,
      noDataShows: false
    }
  },
  components: {
    Tabs,
    TuanItem,
    StuanItem,
    NoData,
    Footer
  },
  mounted () {
    this.goodsTuanBanner()
    this.getGoodsList()
  },
  methods: {
    tabClick (index) {
      this.activeIndex = index
      this.current = 1
      this.loading = false
      this.finished = false
      this.total = 0
      this.goodsLists = []
      this.goodsList = []
      this.noDataShow = false
      this.noDataShows = false
      if (index == 1) {
        this.getGoodsList()
      } else {
        this.getCourseList()
      }
    },
    async goodsTuanBanner () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      var result = await this.$api.goodsTuanBanner({})
      this.$toast.clear()
      if (result.code == 1) {
        this.slideList = result.data
      }
    },
    async goodTuanLists () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      var result = await this.$api.goodTuanLists({})
      this.$toast.clear()
      if (result.code == 1) {
        this.goodsList = result.data.data
      }
    },
    getGoodsList () {
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.goodTuanLists(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.goodsList.length == 0) {
            // 第一次加载
            this.goodsList = res.data.data || []
            this.total = res.data.total
          } else if (this.goodsList.length < this.total) {
            // 加载更多
            this.goodsList = this.goodsList.concat(res.data.data)
          }
          if (this.goodsList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
          if (this.goodsList.length) {
            this.noDataShow = false
          } else {
            this.noDataShow = true
          }
        }
      })
    },
    // /api/course/tuanLists
    getCourseList () {
      const param = {
        page: this.current,
        pageSize: 10
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.coursesTuanLists(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false

          if (this.goodsLists.length == 0) {
            // 第一次加载
            this.goodsLists = res.data.data || []
            this.total = res.data.total
          } else if (this.goodsLists.length < this.total) {
            // 加载更多
            this.goodsLists = this.goodsLists.concat(res.data.data)
          }
          if (this.goodsLists.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
          if (this.goodsLists.length) {
            this.noDataShows = false
          } else {
            this.noDataShows = true
          }
        }
      })
    },
    onLoad () {
      if (this.goodsList.length < this.total) {
        this.current++
        this.getGoodsList()
      }
    },
    onLoads () {
      if (this.goodsLists.length < this.total) {
        this.current++
        this.getCourseList()
      }
    },
    onTabChange (id) {
      this.goodsList = []
      this.current = 1
      this.gcId = id
      this.finished = false
      this.getGoodsList()
    },
    onSearch (id) {
      this.$router.push({
        path: '/searchGoods',
        query: {
          id
        }
      })
    },
    onCate () {
      this.$router.push({
        path: '/goodsCate',
        query: {}
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.home {
  background: #fbf8f5;
  padding-bottom: 100px;
  min-height: 100vh;
  #home-banner-carousel{
   height:380px !important;
   /deep/ .van-image{
     width:100%;
     height:100%;
     img{
       width:100%;
       height:100%;
     }
   }
  }
  .goods_menu{
    width:40%;
    margin:0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    height:100px;
    span{
      display: flex;
      align-items: center;
      justify-content: center;
      width:50%;
      height:100%;
      font-size: 28px;
      color:#999999;
    }
    .active{
      position: relative;
      font-size: 32px;
      font-weight: bold;
      color:#708265
    }
    .active::after{
      position: absolute;
      content:'';
      left:50%;
      transform: translateX(-50%);
      bottom: 15px;
      width:20px;
      height:5px;
      background: #708265;
    }
  }
  .goods-list {
    padding:0 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 0px;
  }
}
</style>
