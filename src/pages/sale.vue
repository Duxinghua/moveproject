<template>
  <div class="sales">
    <div class="saless-h">
      <div class="saleheader">
        <div class="saitem">
          <img src="../assets/images/woman.png" alt="" />
          <span>模特展示</span>
        </div>
        <div class="saitem">
          <img src="../assets/images/live.png" alt="" />
          <span>直播展示</span>
        </div>
        <div class="saitem">
          <img src="../assets/images/media.png" alt="" />
          <span>新媒体</span>
        </div>
      </div>
      <div class="sales-v">
        <van-tabs v-model="active" swipeable @click="onClick">
          <van-tab v-for="(item,index) in itemlist" :title="item.name" :key="index" :name="item.id">
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="salecontent">

          <div :class="autoClass" id="salescontent">
            <Saleitem   :items="items" :key="index" v-for="(items,index) in itemdata" v-if="autoSaleitem"/>

            <Wbitem  :items="items" :key="index" v-for="(items,index) in itemdatas"  v-if="autoWbitem"/>

          </div>

    </div>
    <Footer :home="false" :xbr="false" :sale="true" :me="false" />
  </div>
</template>

<script>
import Saleitem from '../components/saleitem.vue'
import Wbitem from '../components/wbitem.vue'
import Footer from '../components/footer.vue'
import {newsCate, celebrity} from '@/api'
export default {
  created () {
    window.addEventListener('scroll', this.onScroll)
  },
  mounted () {
    this.celebrityApi()
    this.newsCateApi()
  },
  methods: {
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
    /*
    onScroll () {
      console.log('start')
      // 可滚动容器的高度
      let innerHeight = document.querySelector('#app').clientHeight
      // 屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight
      // 可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop
      // scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      console.log(innerHeight + ' ' + outerHeight + ' ' + scrollTop)
      if (innerHeight < (outerHeight + scrollTop)) {
        // 加载更多操作
        console.log('loadmore')

        console.log(this.page,'page')
        this.page++
        if(this.page > this.totalPage){
          return
        }
        this.celebrityApi()

      }else{
        console.log('loadless')
      }
    },
    */
    // onLoad () {
    //   async () => {
    //     const data = {
    //       cate_id: this.active,
    //       page: this.page + 1,
    //       page_size: this.page_size
    //     }
    //     const result = await celebrity(data)
    //     console.log('onload')
    //     if (result.code === 1) {
    //       this.totalPage = result.data.totalPage
    //       this.itemdatas = result.data.list
    //       this.isLoading = false
    //     }
    //   }
    // },
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
      console.log(name, title)
      this.itemdata = []
      this.celebrityApi()
    },
    async newsCateApi () {
      const result = await newsCate({})
      if (result.code === 1) {
        this.itemlist = result.data
        this.active = result.data[0].id
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
          this.totalPage = result.totalPage
          console.log(this.itemdata, 'data')
        }
      }
    }
  },
  computed: {
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
    }
  },
  components: {
    Saleitem,
    Wbitem,
    Footer
  },
  data () {
    return {
      active: 10,
      page: 1,
      page_size: 3, // 每页显示多少条
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
      busy: false
    }
  }
}
</script>

<style>
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
  margin-bottom: 98px;
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
}
.sales-v .van-tab{
  font-size:26px;
  flex:0 0 140px!important;
  display: flex;
  justify-content: center;
}
.sales-v .van-ellipsis{
  font-size:26px;
  padding:0 !important;
}
</style>
