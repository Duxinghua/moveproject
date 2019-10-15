<template>
  <div class="ticket ">
    <div class="ticket-header">
      <div class="banner ticket-banner">
          <van-swipe :autoplay="3000" >
              <van-swipe-item v-for="(item, index) in slideList" :key="index">
                <a :href="item.url"><img class="banner-radius" :src="item.image" /></a>
              </van-swipe-item>
            </van-swipe>
      </div>
      <div class="activitycate activitycate-banner">
        <span v-for="(item,index) in menuList" :key="index" :class="index==aIndex?'active':'' " @click="changetab(index)">{{item.name}}</span>
      </div>
    </div>
    <div class="ticketContent" v-if="list.length!=0">
      <Menbiao v-for="(item,index) in list" :key="index" :pitem="item" />
      <div class="loadmore" v-if="hasMoreData">
        <img :src="loadUrl" alt="">
      </div>
    </div>
    <div class="nodataContent">
    <NoData v-if="list.length==0&&hasGetData"/>
    </div>
  </div>
</template>

<script>
import ticketItem from '../components/ticketItem.vue'
import NoData from '@/components/nodata.vue'
import Menbiao from '@/components/menbiao.vue'
import {ticketListApi, ticketCateApi, indexInfo} from '@/api'
export default {
  components: {
    ticketItem,
    NoData,
    Menbiao
  },
  data () {
    return {
      hasGetData: false,
      hasMoreData: false,
      inBottom: false,
      aIndex: 0,
      menuList: [{name: '热门', id: ''}],
      cate_id: 0,
      page: 1,
      page_size: 10,
      list: [],
      loadUrl: require('@/assets/images/loading.png'),
      slideList: []
    }
  },
  mounted () {
    this.indexInfoapi()
    this.ticketCate()
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollfunction, false)
    })
    let bodycolors = document.documentElement || document.body
    bodycolors.style.background = '#f3f3f3'
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfunction, false)
  },
  methods: {
    async indexInfoapi () {
      const result = await indexInfo({})
      console.log(result)
      if (result.code === 1) {
        if (result.data.slideList > 3) {
          this.slideList = result.data.slideList.slice(0, 2)
        } else {
          this.slideList = result.data.slideList
        }
      }
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
          this.ticketList()
        }
      } else {
        this.inBottom = false
      }
    },
    async ticketCate () {
      let formdata = {}
      const data = await ticketCateApi(formdata)
      if (data.code === 1) {
        let {menuList} = this
        this.menuList = [...menuList, ...data.data]
        this.ticketList()
      }
    },
    async ticketList () {
      let formdata = {page: this.page, page_size: this.page_size}
      if (this.aIndex === 0) {
        formdata.recommend = 1
      } else {
        formdata.cate_id = this.cate_id
      }
      const data = await ticketListApi(formdata)
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
      this.cate_id = this.menuList[index].id
      this.hasGetData = false
      this.hasMoreData = false
      this.inBottom = false
      this.page = 1
      this.list = []

      this.ticketList()
    }
  }
}
</script>

<style scoped>
  .ticket{
    /* padding-top: 88px; */
    /* padding-right:32px;
    padding-left:32px; */
    display: flex;
    flex-direction: column
  }
  .ticket-banner{
    padding-right:32px;
    padding-left:32px;
  }
  .ticket-header{
    display: flex;
    flex-direction: column;
    position: fixed;
    top:0;
    left:0;
    width:100%;
    background:white;
  }
  .loadmore img{
    display: block;
    width: 52px;
    height: 55px;
    margin: 0 auto;
  }
  .nodataContent{
    display: flex;
  }
  .nodataContent .nodata{
    top: calc((100vh - 345px - 88px));
  }

</style>
