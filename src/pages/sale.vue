<template>
  <div class="sales">
    <div :class="autosalessh">
      <div class="saleheader">
        <div class="saitem" @click="saleTab(7)">
          <img src="../assets/images/woman.png" alt="" />
          <span :class="{activeTabs: current === 7}">直播带货</span>
        </div>
        <div class="saitem" @click="saleTab(8)">
          <img src="../assets/images/live.png" alt="" />
          <span :class="{activeTabs: current === 8 }">广告模特</span>
        </div>
        <div class="saitem" @click="saleTab(9)">
          <img src="../assets/images/media.png" alt="" />
          <span :class="{activeTabs: current === 9 }">新媒体宣传</span>
        </div>
      </div>
      <!-- <div class="sales-v" v-if="current === 9">
        <van-tabs v-model="active" swipeable @click="onClick" ref="vtab" >
          <van-tab  v-for="(item,index) in itemlist" :title="item.name" :key="index" :name="item.id" >
          </van-tab>
        </van-tabs>
      </div> -->
      <!--  -->
      <div class="activitycate sale-v" v-if="current === 9">
        <span v-for="(item,index) in itemlist" :key="index" :class="index==aIndex?'active':'' " @click="changetab(index,item.id,item.name)">{{item.name}}</span>
      </div>
    </div>
    <div :class="autoContentClass">

          <div :class="autoClass" id="salescontent">
            <Saleitem  :names="names" :items="items" :key="index" v-for="(items,index) in itemdata" v-if="autoSaleitem"/>

            <Wbitem  :names="names" :items="items" :key="index" v-for="(items,index) in itemdatas"  v-if="autoWbitem"/>
            <div class="loadmore" v-if="false">
                <img :src="loadUrl" alt="">
            </div>
          </div>

    </div>
    <!-- <Footer :home="false" :xbr="false" :sale="true" :me="false" /> -->
  </div>
</template>

<script>
import Saleitem from '../components/saleitem.vue'
import Wbitem from '../components/wbitem.vue'
import Footer from '../components/footer.vue'
import {newsCate, celebrity} from '@/api'
import getSitem from '@/utils/storage'
export default {
  created () {
    window.addEventListener('scroll', this.onScroll)
  },
  mounted () {

     this.active = parseInt(getSitem.getStr('active')) || 10
    // getSitem.setStr('current',9)
    // getSitem.setStr('active',10)

    this.$nextTick(() => {
      this.active = parseInt(getSitem.getStr('active')) || 10
      console.log(getSitem.getStr('active'),'active')
      console.log(this.active)
      this.current = parseInt(getSitem.getStr('current')) || 9
      if(this.current != 9){
        this.active = this.current
        this.names = '账'
      }
      this.newsCateApi()
      this.celebrityApi()

      this.aIndex = getSitem.getStr('aIndex') || 0
      window.addEventListener('scroll', this.scrollfunction, false)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfunction, false)
  },
  methods: {
    tabClick(e){
      console.log(e,'change');
    },
    saleTab (arg) {
      this.itemdata = []
      this.itemdatas = []
      this.page = 1
      this.hasGetData = false
      this.hasMoreData = false
      this.inBottom = false
      this.current = arg
      getSitem.setStr('current', arg)
      if (arg === 7 || arg === 8) {
        this.active = arg
        this.names = '账'
      }else{
        this.active = getSitem.getStr('active') || 10
        getSitem.setStr('active', this.active)
        this.aIndex = getSitem.getStr('aIndex') || 0
        this.itemlist.map((item)=>{
          if(item.id == this.active){
            this.names = item.name
          }
        })
      }
      this.celebrityApi()
    },
    scrollfunction () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if ((scrollHeight - 181) <= (scrollTop + windowHeight)) {
        if (!this.inBottom && this.hasMoreData) {
          console.log('加载更多')
          this.page++
          this.inBottom = true
          this.hasMoreData = false
          this.celebrityApi()
        }
      } else {
        console.log(1111)
        this.inBottom = false
      }
    },
    infinite: function () {

    },
    loadMore: function () {
      this.busy = true
      if (this.page >= this.totalPage) {
        return
      } else {
        this.page++
      }
      setTimeout(() => {
        console.log('start')
        this.celebrityApi()
        this.busy = false
      }, 1000)
    },
    onRefresh () {
      this.init() // 加载数据
    },

    async init () {
      const data = {
        cate_id: this.active,
        page: this.page,
        page_size: this.page_size
      }
      const result = await celebrity(data)
      if (result.code === 1) {
        this.itemdatas = result.data.list
        this.totalPage = result.data.totalPage
        this.isLoading = false
        this.finished = true
        this.loading = false

        if (this.page >= this.totalPage) {
          this.finished = true
        }
      }
    },
    onClick (name, title) {
      getSitem.setStr('active', name)
      console.log(this.active,'active')
      this.itemdata = []
      this.itemdatas = []
      this.page = 1
      this.names = title
      this.celebrityApi()
    },
    changetab(index,id,name){
      this.aIndex = index
      getSitem.setStr('aIndex', index)
      getSitem.setStr('active', id)
      this.active = id
      this.itemdata = []
      this.itemdatas = []
      this.page = 1
      this.names = name
      this.celebrityApi()
    },
    async newsCateApi () {
      const result = await newsCate({})
      if (result.code === 1) {
        this.itemlist = result.data
        console.log(getSitem.getStr('active'),'active')
        this.active = getSitem.getStr('active') || result.data[0].id
        console.log(this.active,'aactive')
        // this.active = result.data[0].id
      }
    },
    async celebrityApi () {
      const data = {
        cate_id: this.active,
        page: this.page,
        page_size: this.page_size
      }
      const result = await celebrity(data)
      if (result.code === 1) {
        if (this.active < 13) {
          console.log('startpage')
          this.itemdata = this.itemdata.concat(result.data.list)
          this.totalPage = result.data.totalPage
        } else {
          this.itemdatas = this.itemdatas.concat(result.data.list)
          this.totalPage = result.data.totalPage
          console.log(this.itemdatas, 'data')
        }
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          if (this.itemdatas.length === 0) {
            this.hasMoreData = false
          } else {
            this.hasMoreData = true
          }
        }
      }
    }
  },
  computed: {
    autosalessh () {
      if (this.current === 7) {
        return {
          'saless-hmz': true
        }
      } else if (this.current === 8) {
        return {
          'saless-hmz': true
        }
      } else if (this.current === 9) {
        return {
          'saless-h': true
        }
      }
    },
    autoSaleitem () {
      if (this.active < 13) {
        return true
      } else {
        return false
      }
    },
    autoWbitem () {
      if (this.active > 12) {
        return true
      } else {
        return false
      }
    },
    autoClass () {
      if (this.active < 13) {
        return {
          saleitems: true
        }
      } else {
        return {
          wbitems: true
        }
      }
    },
    autoContentClass () {
      if (this.current === 7) {
        return {
          salecontentmz: true
        }
      } else if (this.current === 8) {
        return {
          salecontentmz: true
        }
      } else if (this.current === 9) {
        return {
          salecontent: true
        }
      }
    }
  },
  components: {
    Saleitem,
    Wbitem,
    Footer
  },
  data () {
    return {
      current: 9,
      aIndex:0,
      active: 10,
      names: '抖音',
      page: 1,
      page_size: 10, // 每页显示多少条
      totalPage: '', // 总页数
      itemlist: [],
      itemdata: [],
      itemdatas: [],
      wbitemdata: [],
      loading: false, // 控制上拉加载的加载动画
      finished: false, // 控制在页面往下移动到底部时是否调用接口获取数据
      isLoading: false, // 控制下拉刷新的加载动画
      items: 20,
      data: [],
      busy: false,
      loadUrl: require('@/assets/images/loading.png'),
      hasMoreData: false

    }
  }
}
</script>

<style>
.activeTabs{
  color:#913C92 !important;
}
.sales{
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  height:100vh;
}
.saless-h{
  position: fixed;
  z-index:110;
  left:0;
  top:0;
  width:100%;
  height:181px;
  display: flex;
  flex-direction: column;
  background:#f3f3f3;
}
.saless-hmz{
  position: fixed;
  z-index:110;
  left:0;
  top:0;
  width:100%;
  height:90px;
  display: flex;
  flex-direction: column;
  background:#f3f3f3;
}
.saleheader{
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width:100%;
  padding:26px 0;
  background:white;
  height:93px;
}
.saleheader .saitem{
  width:33.33%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.saitem img{
  width:44px;
  height:44px;
  margin-right:15px;
}
.saitem span{
  color:#999999;
  font-size: 26px;
  height:44px;
  line-height: 44px;
}
.salecontent{
  width:100%;
  margin-top:183px;
  /* margin-bottom: 98px; */
}
.salecontentmz{
  width:100%;
  margin-top:100px;
  /* margin-bottom: 98px; */
}
.saleitems{
  padding:0px 32px;
  background:white;
  /* margin-bottom: 98px; */
}
.wbitems{
 padding:32px;
 background:#f3f3f3;
}
.sale-v{
  margin-top:103px;
}
.sales-v{
  margin-top:10px;
}
.sales-v .van-tabs{
  height:78px;
}

.sales-v .van-tabs--line .van-tabs__wrap {
  height: 78px !important;
  position: static;
}
.sales-v .van-tab span{
  margin:auto 0;
}

.sales-v .van-tabs__line{
  background:#923D93;
  width:47px !important;
}
.sales-v .van-tab--active{
  color:#923D93;
  font-size:30px!important;
}
.sales-v .van-tab{
  font-size:26px;
  flex:0 0 140px!important;
  display: flex;
  justify-content: center;
}
.sales-v .van-ellipsis{
  padding:0 !important;
}
.loadmore img{
          display: block;
          width: 52px;
          height: 55px;
          margin: 0 auto;
}

</style>
