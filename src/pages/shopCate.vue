<template>
    <div class="home">
        <Tabs
            :tabList="tabList"
            @on-change="onTabChange"
            @on-search="onSearch"
            @on-cate="onCate"
            v-if="tabList.length"
        />
        <van-list
            v-model="loading"
            v-show="goodsList.length > 0"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
        >
            <div class="goods-list">
                <GoodsItem
                    v-for="(item, index) in goodsList"
                    :key="index"
                    :goodsData="item"
                    :types="type"
                />
            </div>
        </van-list>
        <NoData v-if="goodsList.length == 0"/>
    </div>
</template>

<script>
import Tabs from '@/components/common/tabs'
import GoodsItem from '@/components/shop/goodsItem'
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
      gcId: 0,
      type: 'single'
    }
  },
  components: {
    Tabs,
    GoodsItem,
    NoData
  },
  mounted () {
    this.gcId = this.$route.query.id
    this.categorys()
  },
  methods: {
    categorys () {
      var that = this
      this.$api.goodsCates().then((res) => {
        if (res.code == 1) {
          if (res.data.length > 0) {
            var lists = []
            res.data.map((item) => {
              if (item.gc_id == that.gcId) {
                if (item.list.length) {
                  item.list.map((sitem) => {
                    lists.push({
                      id: sitem.gc_id,
                      name: sitem.gc_name
                    })
                  })
                }
              }
            })
            this.tabList = lists
            if (this.tabList.length) {
              this.gcId = this.tabList[0].id
              this.getGoodsList()
            }
          }
        }
      })
    },
    async goodsbanner () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      var result = await this.$api.goodsbanner({})
      this.$toast.clear()
      if (result.code == 1) {
        this.slideList = result.data
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
  .home-banner{
    margin-top:250px;
  }
  .goods-list {
    padding:125px 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 0px;
  }
}
</style>
