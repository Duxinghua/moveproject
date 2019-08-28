<template>
  <div class="ticket">
    <div class="activitycate">
      <span v-for="(item,index) in menuList" :key="index" :class="index==aIndex?'active':'' " @click="changetab(index)">{{item.name}}</span>
    </div>
    <div class="ticketContent" v-if="list.length!=0">
      <ticketItem v-for="(item,index) in list" :key="index" :item="item" />
      <div class="loadmore" v-if="hasMoreData">
        <img :src="loadUrl" alt="">
      </div>
    </div>
    <NoData v-if="list.length==0&&hasGetData"/>
  </div>
</template>

<script>
import ticketItem from '../components/ticketItem.vue'
import NoData from '@/components/nodata.vue'
import {ticketListApi, ticketCateApi} from '@/api'
export default {
  components: {
    ticketItem,
    NoData
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
      loadUrl: require('@/assets/images/loading.png')
    }
  },
  mounted () {
    this.ticketCate()
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollfunction, false)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfunction, false)
  },
  methods: {
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
    padding-top: 88px;
  }
  .loadmore img{
    display: block;
    width: 52px;
    height: 55px;
    margin: 0 auto;
  }

</style>
