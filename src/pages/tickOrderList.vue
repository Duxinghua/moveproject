<template>
  <div class="orderlist">
    <div class="orderlist-content">
      <div class="orderlist-content-tab">
        <div class="orderlist-content-tab-list" v-for="(item,index) in menuList" :key="index" @click="changetab(index)">
          <span :class="index==aIndex?'active':''">{{item.name}}</span>
        </div>
      </div>
      <div class="orderlist-content-list" v-if="list.length!=0">
        <TickOrderItem v-for="(item,index) in list" :key="index" :item="item" @listrefresh="listrefresh" />
        <div class="loadmore" v-if="hasMoreData">
          <img :src="loadUrl" alt="">
        </div>
      </div>
      <NoData v-if="list.length==0&&hasGetData"/>
    </div>
  </div>
</template>

<script>
import TickOrderItem from '@/components/tickOrderItem.vue'
import NoData from '@/components/nodata.vue'
import {tickOrderLisApi} from '@/api'
import getSitem from '@/utils/storage'
import Bus from '@/utils/bus'
export default {
  components: {
    TickOrderItem,
    NoData
  },
  data () {
    return {
      hasGetData: false,
      hasMoreData: false,
      inBottom: false,
      aIndex: 0,
      page: 1,
      page_size: 10,
      menuList: [
        {name: '全部', status: ''},
        {name: '待付款', status: 0},
        {name: '待核销', status: 1},
        {name: '已核销', status: 10}
      ],
      list: [],
      loadUrl: require('@/assets/images/loading.png')
    }
  },
  mounted () {
    var vm = this
    Bus.$on('refreshs', () => {
      vm.page = 1
      vm.list = []
      vm.orderLis()
    }),
    this.orderLis()
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollfunction, false)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfunction, false)
  },
  methods: {
    listrefresh () {
      this.page = 1
      this.list = []
      this.orderLis()
    },
    scrollfunction () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollHeight <= (scrollTop + windowHeight)) {
        if (!this.inBottom && this.hasMoreData) {
          console.log('加载更多')
          this.page++
          this.inBottom = true
          this.hasMoreData = false
          this.orderLis()
        }
      } else {
        this.inBottom = false
      }
    },
    async orderLis () {
      let status = this.menuList[this.aIndex].status
      let token = getSitem.getStr('token')
      let formdata = {status, token, page: this.page, page_size: this.page_size}
      const data = await tickOrderLisApi(formdata)
      this.hasGetData = true
      if (data.code === 1) {
        let {list} = this
        this.list = [...list, ...data.data.list]

        if (data.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          this.hasMoreData = true
        }
      }
    },
    changetab (index) {
      if (this.aIndex === index) {
        return
      }
      this.aIndex = index
      this.hasGetData = false
      this.hasMoreData = false
      this.inBottom = false
      this.page = 1
      this.list = []
      this.orderLis()
    }
  }

}
</script>

<style lang='scss' scoped>
.orderlist{
  display: flex;
  flex-direction: column;
  background:#F3F3F3;
  width:100%;
  height:100vh;
  &-content{
    background:white;
    display: felx;
    flex-direction: column;
    padding-top: 88px;
    &-tab{
      width: 100%;
      height:88px;
      font-size:26px;
      color:#999999;
      border-top:1px solid #f3f3f3;
      border-bottom: 1px solid #f3f3f3;
      position: fixed;
      top: 0;
      background-color: #fff;
      white-space:nowrap;
      display: flex;
      flex-wrap: nowrap;
      &-list{
        flex: 1;
        text-align: center;
        line-height: 32px;
        padding:0 30px;
        span{
          display: block;
          padding: 26px 0;
        }
        .active{
          color:#8C3B92;
          border-bottom:3px solid #8C3B92;
        }
      }
    }
    &-list{
      display: flex;
      flex-direction: column;
      padding:32px;
      background: #f5f5f5;
      .loadmore{
        img{
          display: block;
          width: 52px;
          height: 55px;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
