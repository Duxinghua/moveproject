<template>
    <div class="search-goods">
        <div class="search-box">
            <div class="search-wrap">
                <van-icon name="search" />
                <form action="javascript:return true;">
                    <input type="search" v-model="keywordValue" @keyup.13="onSearch()" ref="searchInput">
                </form>
            </div>
            <div class="cancel" @click="onCancel">取消</div>
        </div>
        <van-list
            v-model="loading"
            v-show="goodsList.length > 0"
            :finished="finished"
            :immediate-check="false"
            finished-text="没有更多了"
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
    </div>
</template>

<script>
import GoodsItem from '@/components/shop/goodsItem'
import NoData from '@/components/nodata'

export default {
  data () {
    return {
      goodsList: [],
      loading: false,
      finished: false,
      current: 1,
      keywordValue: '',
      keyword: '',
      param: {
        page: this.current,
        pageSize: 10,
        keyword: this.keyword
      }
    }
  },
  components: {
    GoodsItem,
    NoData
  },
  mounted () {
    // this.getGoodsList();
    if (this.$route.query.id) {
      var gc_id = this.$route.query.id
      // var keyword = this.$route.query.name
      // this.keywordValue = this.$route.query.name
      this.param.gc_id = gc_id
      // this.param.keyword = keyword
      this.getGoodsList()
    }
  },
  methods: {
    getGoodsList () {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.goodsList(this.param).then((res) => {
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
    onCancel () {
      this.$router.push('/')
    },
    onSearch () {
      this.keyword = this.keywordValue
      this.goodsList = []
      this.current = 1
      this.finished = false
      this.getGoodsList()
      this.$refs.searchInput.blur()
    }
  }
}
</script>

<style lang='scss' scoped>
.search-goods{
    width: 100%;
    min-height: 100vh;
    background: #FBF8F5;
    .search-box{
        // position: fixed;
        // top: 0px;
        // left: 0px;
        display: flex;
        padding: 25px;
        align-items: center;
        width: 100%;
        .search-wrap{
            display: flex;
            align-items: center;
            background: #fff;
            border-radius: 40px;
            flex: 1;
            height: 70px;
            padding: 15px 35px;
            i{
                font-size: 35px;
                color: #758367;
            }
            form{
                flex: 1;
                display: flex;
                align-items: center;
            }
            input{
                flex: 1;
                height: 100%;
                margin-left: 20px;
                font-size: 30px;
                color: #333333;
                border: none;
            }
            input[type=search]::-webkit-search-cancel-button{
                -webkit-appearance: none;
            }
        }
        .cancel{
            color: #6D8160;
            font-size: 30px;
            margin-left: 20px;
        }
    }

    .goods-list{
        padding: 15px 25px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        // padding-top: 130px;
        padding-bottom: 0px;
    }
}
</style>
