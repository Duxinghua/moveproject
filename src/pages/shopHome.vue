<template>
    <div class="home">
        <Tab
            :tabList="tabList"
            @on-change="onTabChange"
            @on-search="onSearch"
            @on-cate="onCate"
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
                />
            </div>
        </van-list>
        <NoData v-if="goodsList.length == 0"/>
        <Footer :sc="true" />
    </div>
</template>

<script>
import Tab from '@/components/common/tab'
import GoodsItem from '@/components/shop/goodsItem'
import Footer from '@/components/footer.vue'
import NoData from '@/components/nodata'

export default {
  data () {
    return {
      tabList: [],
      goodsList: [],
      loading: false,
      finished: false,
      total: 0,
      current: 1,
      gcId: 0
    }
  },
  components: {
    Tab,
    GoodsItem,
    Footer,
    NoData
  },
  mounted () {
    this.categorys()
  },
  methods: {
    categorys () {
      this.$api.categorys().then((res) => {
        if (res.code == 1) {
          if (res.data.length > 0) {
            this.tabList = res.data.map((item) => {
              return {
                id: item.gc_id,
                name: item.gc_name
              }
            })

            this.gcId = this.tabList[0].id
            this.getGoodsList()
          }
        }
      })
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
  .goods-list {
    padding: 55px 25px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 0px;
  }
}
</style>
