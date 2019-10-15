<template>
  <div class="searchPage">
    <div class="searchHeader">
           <div class="search">
              <div class="searchHeaderleft" >
                  <van-dropdown-menu>
                    <van-dropdown-item @change="dropChange" v-model="value1" :options="option1" title-class="title-class"/>
                  </van-dropdown-menu>
              </div>
              <img src="../assets/images/search.png" class="search-ico"/>
              <input type="text" placeholder="街道口魔方艺术馆营销活动"  v-model="searchValue"  />
           </div>
          <span class="button" @click="clickEvent">搜索</span>
    </div>
    <div class="searchBody" :style="autoStyle">
      <div class="produceItem" >
          <Produce v-for="(item,index) in dataList" :pitem="item" :key="index" v-if="value1 === 0" />
          <Menbiao v-for="(item,index) in dataList" :pitem="item" :key="index" v-if="value1 === 2" />
      </div>
      <Wbitem v-for="(item,index) in dataList" :items="item" :key="index" v-if="value1 === 3" />
      <Activity v-for="(item,index) in dataList" :avitem="item" :key="index" v-if="value1 === 1" />
      <div class="loadmore" v-if="false">
          <img :src="loadUrl" alt="">
      </div>
      <NoData v-if="dataList.length==0"/>
    </div>
  </div>
</template>

<script>
import {ticketListApi, activityListApi, celebrity, mallGoodsSearch} from '@/api'
import Wbitem from '@/components/wbitem.vue'
import NoData from '@/components/nodata.vue'
import Produce from '@/components/product.vue'
import Activity from '@/components/activity.vue'
import Menbiao from '@/components/menbiao.vue'
export default {
  components: {
    Wbitem,
    NoData,
    Produce,
    Activity,
    Menbiao
  },
  mounted () {
    let bodycolors = document.documentElement || document.body
    bodycolors.style.background = '#f3f3f3'
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollfunction, false)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfunction, false)
  },
  computed: {
    autoStyle () {
      if (this.value1 === 1) {
        return {
          'background': 'white!important'
        }
      }
    }
  },
  methods: {
    dropChange () {
      this.dataList = []
      this.searchValue = ''
      this.hasMoreData = false
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
          if (this.value1 === 0) {
            this.mallGoodsindexApi()
          } else if (this.value1 === 1) {
            this.activityList()
          } else if (this.value1 === 2) {
            this.ticketList()
          } else if (this.value1 === 3) {
            this.celebrityApi()
          }
        }
      } else {
        this.inBottom = false
      }
    },
    async celebrityApi () {
      const data = {
        keywords: this.searchValue,
        page: this.page,
        page_size: this.page_size
      }
      const result = await celebrity(data)
      this.hasGetData = true
      if (result.code === 1) {
        this.dataList = this.dataList.concat(result.data.list)
        console.log(this.dataList)
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          if (this.dataList.length === 0) {
            this.hasMoreData = false
          } else {
            this.hasMoreData = true
          }
        }
      }
    },
    async mallGoodsindexApi () {
      const data = {
        title: this.searchValue,
        page: this.page,
        page_size: this.page_size
      }
      const result = await mallGoodsSearch(data)
      this.hasGetData = true
      if (result.code === 1) {
        this.dataList = this.dataList.concat(result.data.list)
        console.log(this.dataList)
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          if (this.dataList.length === 0) {
            this.hasMoreData = false
          } else {
            this.hasMoreData = true
          }
        }
      }
    },
    async ticketList () {
      const data = {
        keywords: this.searchValue,
        page: this.page,
        page_size: this.page_size
      }
      const result = await ticketListApi(data)
      this.hasGetData = true
      if (result.code === 1) {
        this.dataList = this.dataList.concat(result.data.list)
        console.log(this.dataList)
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          if (this.dataList.length === 0) {
            this.hasMoreData = false
          } else {
            this.hasMoreData = true
          }
        }
      }
    },
    async activityList () {
      const data = {
        keywords: this.searchValue,
        page: this.page,
        page_size: this.page_size
      }
      const result = await activityListApi(data)
      this.hasGetData = true
      if (result.code === 1) {
        this.dataList = this.dataList.concat(result.data.list)
        console.log(this.dataList)
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          this.hasMoreData = true
        }
        if (this.dataList.length === 0) {
          this.hasMoreData = false
        } else {
          this.hasMoreData = true
        }
      }
    },
    clickEvent () {
      this.dataList = []
      this.hasGetData = false
      this.hasMoreData = false
      this.inBottom = false
      this.page = 1
      if (this.value1 === 0) {
        this.mallGoodsindexApi()
        this.$nextTick(() => {
          let bodycolors = document.documentElement || document.body
          bodycolors.style.background = '#f3f3f3'
        })
      } else if (this.value1 === 1) {
        this.activityList()
        this.$nextTick(() => {
          let bodycolors = document.documentElement || document.body
          bodycolors.style.background = 'white'
        })
      } else if (this.value1 === 2) {
        this.ticketList()
        this.$nextTick(() => {
          let bodycolors = document.documentElement || document.body
          bodycolors.style.background = '#f3f3f3'
        })
      } else if (this.value1 === 3) {
        this.celebrityApi()
        this.$nextTick(() => {
          let bodycolors = document.documentElement || document.body
          bodycolors.style.background = '#f3f3f3'
        })
      }
    }
  },
  data () {
    return {
      searchValue: '',
      value1: 0,
      option1: [
        { text: '产品', value: 0 },
        { text: '活动', value: 1 },
        { text: '门票', value: 2 },
        { text: '渠道', value: 3 }
      ],
      dataList: [],
      page: 1,
      page_size: 10,
      loadUrl: require('@/assets/images/loading.png'),
      hasGetData: false,
      hasMoreData: false
    }
  }

}
</script>

<style scoped>
.produceItem{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.loadmore img{
  display: block;
  width: 52px;
  height: 55px;
  margin: 0 auto;

}
.searchBody{
  background:#f3f3f3;
  padding-top:120px;
  padding-left:32px;
  padding-right:32px;
}
.search-ico{
  width:25px;
  height:25px;
  margin-right:20px;
  margin-left:20px;
}
.searchHeader{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left:32px;
  padding-right:32px;
  padding-top:20px;
  padding-bottom: 20px;
  position: fixed;
  left:0;
  top:0;
  width:100%;
  background:white;
  z-index: 3000;
  margin-bottom: 50px;
}

.searchHeaderleft{
  width:80px;
}
.search input{
  color:#999999;
  border:none;
  font-size: 24px;
}
.search{
  padding-left:15px;
  width:70%;
}
.search input{
  color:#999999;
  border:none;
  font-size: 24px;
}
.button{
  padding-right:32px;
  padding-left:32px;
  margin-left:15px;
  display: flex;
  height:60px;
  /* width:100%; */
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  color:white;
  font-size: 26px;
  background:#943D93;
  border-radius: 8px;
  box-shadow:0px 4px 9px 0px rgba(217,217,217,0.21);
}
</style>
