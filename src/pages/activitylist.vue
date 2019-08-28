<template>
  <div class="activitylist">
    <div class="activitylist-content">
      <div class="activitylist-content-tab">
        <span v-for="(item,index) in menuList" :key="index" :class="index==aIndex?'active':'' " @click="changetab(index)">{{item.name}}</span>
      </div>
      <div class="activitylist-content-list" v-if="avList.length!=0">
        <Activity v-for="(item,index) in avList" :key="index" :avitem="item" />
        <div class="loadmore" v-if="hasMoreData">
          <img :src="loadUrl" alt="">
        </div>
      </div>
      <NoData v-if="avList.length==0&&hasGetData"/>
    </div>
  </div>
</template>

<script>
import Activity from '@/components/activity.vue'
import NoData from '@/components/nodata.vue'
import {activityListApi, activityCateApi} from '@/api'
export default {
  components: {
    Activity,
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
      avList: [],
      loadUrl: require('@/assets/images/loading.png')
    }
  },
  mounted () {
    this.activityCate()
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
          this.activityList()
        }
      } else {
        this.inBottom = false
      }
    },
    async activityCate () {
      let formdata = {}
      const data = await activityCateApi(formdata)
      if (data.code === 1) {
        let {menuList} = this
        this.menuList = [...menuList, ...data.data]
        this.activityList()
      }
    },
    async activityList () {
      let formdata = {page: this.page, page_size: this.page_size}
      if (this.aIndex === 0) {
        formdata.recommend = 1
      } else {
        formdata.cate_id = this.cate_id
      }
      const data = await activityListApi(formdata)
      this.hasGetData = true
      if (data.code === 1) {
        let {avList} = this
        this.avList = [...avList, ...data.data.list]

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
      this.avList = []

      this.activityList()
    }
  }

}
</script>

<style lang='scss' scoped>
.activitylist{
  display: flex;
  flex-direction: column;
  background:#F3F3F3;
  width:100%;
  height:100vh;
  &-content{
    background:white;
    display: flex;
    flex-direction: column;
    padding-top: 88px;
    &-tab{
      height:88px;
      font-size:26px;
      color:#999999;
      border-top:1px solid #f3f3f3;
      border-bottom: 1px solid #f3f3f3;
      padding-left:32px;
      padding-right:32px;
      overflow-y: hidden;
      overflow-x: auto;
      width: 100%;
      position: fixed;
      top: 0;
      background-color: #fff;
      white-space:nowrap;
      span{
        margin-right:39px;
        line-height: 32px;
        padding:26px 0;
        display: inline-block;
      }
      .active{
        color:#8C3B92;
        border-bottom:3px solid #8C3B92;
      }
    }
    &-list{
      display: flex;
      flex-direction: column;
      padding:32px;
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
