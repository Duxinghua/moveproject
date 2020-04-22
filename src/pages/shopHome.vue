<template>
    <div class="home">
        <Tab
            :tabList="tabList"
            @on-change="onTabChange"
            @on-search="onSearch"
            @on-cate="onCate"
        />
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
        <div class="sales">
            <div class="title">今日特卖</div>
            <div class="goods-list" v-if="todaySale.length != 0">
                <GoodsItem
                    v-for="(item, index) in todaySale"
                    :key="index"
                    :goodsData="item"
                    :types="type"
                />
            </div>
            <NoData v-if="todaySale.length == 0" />
        </div>
        <div class="sales">
            <div class="title">新品上市</div>
            <div class="goods-list" v-if="newSale.length != 0">
                <GoodsItem
                    v-for="(item, index) in newSale"
                    :key="index"
                    :goodsData="item"
                    :types="type"
                />
            </div>
            <NoData v-if="newSale.length == 0" />
        </div>
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
      slideList: [],
      loading: false,
      finished: false,
      total: 0,
      current: 1,
      gcId: 0,
      type: 'single',
      newSale: [],
      todaySale: []
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
    this.goodsbanner()
  },
  methods: {
    categorys () {
      this.$api.goodsCates().then((res) => {
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
      } else {
        if (result.code == 401) {
          localStorage.setItem('page', location.href)
          this.$router.push({
            path: '/auth'
          })
        }
      }
    },
    getGoodsList () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.goodsHome({}).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.newSale = res.data.new_sale
          this.todaySale = res.data.today_sale
        } else {
          // console.log(res)
        }
      })
    },
    onTabChange (id) {
      // this.goodsList = []
      // this.current = 1
      // this.gcId = id
      // this.finished = false
      // this.getGoodsList()
      this.$router.push({
        path: '/shopCate',
        query: {
          id
        }
      })
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
  /deep/ .nodata{
    margin-top:300px;
  }
  /deep/ .van-image__img{
    border-radius: 10px;
  }
  #home-banner-carousel{
   height:355px !important;
   width:700px!important;
   margin:auto;
  }
  .home-banner-item{
    width:100%;
    height:100%;
    /deep/ .van-image__img{
      width:100%;
      height:100%;
      border-radius: 20px;
    }
    .van-image{
      width:100%;
      height:100%;
      img{
        width:100%;
        height:100%;
        border-radius: 20%;
      }
    }
  }
  .home-banner{
    margin-top:200px;
    padding-top:25px;
    height:380px;
    box-sizing: border-box;
    background:#fbf8f5;
  }
  .sales{
    display: flex;
    flex-direction: column;
    padding:25px 25px 0 25px;
    box-sizing: border-box;
    width:100%;
    .title{
      font-size:36px;
      font-weight:800;
      color:rgba(102,121,90,1);
      margin-bottom: 25px;
    }
  }
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 0px;
  }
}
</style>
