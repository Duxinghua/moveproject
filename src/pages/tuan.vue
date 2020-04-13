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
        <van-list
            v-model="loading"
            v-show="goodsList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
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
        <NoData v-if="goodsList.length == 0"/>
        <Footer :pt="true" />
    </div>
</template>

<script>
import Footer from '@/components/footer.vue'
import Tabs from '@/components/common/tabs'
import TuanItem from '@/components/shop/tuanitem'
import NoData from '@/components/nodata'

export default {
  data () {
    return {
      tabList: [],
      goodsList: [],
      slideList: [],
      loading: false,
      finished: false,
      total: 0,
      current: 1,
      type: 'tuan'
    }
  },
  components: {
    Tabs,
    TuanItem,
    NoData,
    Footer
  },
  mounted () {
    this.goodsTuanBanner()
    this.goodTuanLists()
  },
  methods: {
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
        pageSize: 10,
        gc_id: this.gcId
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.goodsList(param).then((res) => {
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
        }
      })
    },
    onLoad () {
      if (this.goodsList.length < this.total) {
        this.current++
        this.getGoodsList()
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
  }
  .goods-list {
    padding:25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 0px;
  }
}
</style>
