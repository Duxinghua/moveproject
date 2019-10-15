<template>
  <div class="home">
    <div class="header">
      <div class="hs">
        <div class="search">
          <div class="options" v-if="inputValue">
            <span class="so" @click="changetap">{{type}}</span>
            <img src="../assets/images/so.png" />
            <ul class="opul" v-if="changeValue">
              <li @click="changeli('活动')">活动</li>
              <li @click="changeli('产品')">产品</li>
            </ul>
          </div>
          <div class="ico"></div>
          <input type="text" v-model.lazy="searchValue" @change="changeEvent" @input="inputEvent" placeholder="街道口魔方艺术馆营销活动" @click="clickInput" >
        </div>
         <div class="button" v-if="inputValue" @click="searchCancel">取消</div>
      </div>
      <div class="hc" v-show="searchC">
        <div class="banner">
          <van-swipe :autoplay="3000" >
            <van-swipe-item v-for="(item, index) in slideList" :key="index">
              <a :href="item.url"><img class="banner-radius" :src="item.image" /></a>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="topmenu">
          <router-link  class="mitem" to="/activity" >
            <img src="../assets/images/hd.png" />
            <span>活动</span>
          </router-link>
          <router-link class="mitem" to="/ticket">
            <img src="../assets/images/mp.png" />
            <span>门票</span>
          </router-link>
          <router-link class="mitem"  to="/produce">
            <img src="../assets/images/sp.png" />
            <span>产品</span>
          </router-link>
          <router-link class="mitem" to="/club">
            <img src="../assets/images/hz.png" />
            <span>俱乐部</span>
          </router-link>
        </div>
      </div>
    </div>
    <div class="container" v-show="searchC">
      <div class="productitem">
        <div class="headerline">
          <img src="../assets/images/yh.png" />
          <span>优惠产品</span>
        </div>
        <div class="productcontent">
          <Product v-for="(item,index) in goodsList" :key="index" :pitem="item"/>
        </div>
      </div>
      <div class="productitem">
        <div class="headerline">
          <img src="../assets/images/hdico.png" />
          <span>特惠门票</span>
        </div>
        <div class="productcontent">
          <Menbiao v-for="(item,index) in ticketList" :key="index" :pitem="item"/>
        </div>
      </div>
      <div class="activity">
        <div class="headerline">
          <img src="../assets/images/nav.png" />
          <span>最新活动</span>
        </div>
        <div class="activitycontent">
            <Activity v-for="(item,index) in activityList" :key="index" :avitem="item" />
        </div>

      </div>
      <div class="activity">
        <div class="headerline">
          <img src="../assets/images/oav.png" />
          <span>往期活动</span>
        </div>
        <div class="activitycontent">
            <Activity v-for="(item,index) in historyList" :key="index" :avitem="item" />
            <div class="loadmore" v-if="hasMoreData">
              <img :src="loadUrl" alt="">
            </div>
        </div>

      </div>
    </div>
    <div class="searchContent" v-show="!searchC">
      <div class="result" v-show="false">
        <p>暂无历史数据</p>
      </div>
      <div class="resultList" v-show="true">
        <div class="resultItem">
          <img src="../assets/images/avimg1.png" />
          <div class="resultContent">
            <p class="resultTitle">汉晞户外拓展真人CS</p>
            <div class="address">
              <span>真人CS | 江汉区江汉区银松路79号</span>
              <span>5.7km</span>
            </div>
            <p class="resultMoney"><span>¥118</span><span>¥700</span></p>
          </div>
        </div>
        <div class="resultItem">
          <img src="../assets/images/avimg1.png" />
          <div class="resultContent">
            <p class="resultTitle">汉晞户外拓展真人CS</p>
            <div class="address">
              <span>真人CS | 江汉区江汉区银松路79号</span>
              <span>5.7km</span>
            </div>
            <p class="resultMoney"><span>¥118</span><span>¥700</span></p>
          </div>
        </div>
      </div>
    </div>
    <Footer :home="true" :me="false" :xbr="false" :sale="false"/>
  </div>
</template>

<script>
import Product from './product.vue'
import Menbiao from './menbiao.vue'
import Activity from './activity.vue'
import Footer from './footer.vue'
import {indexInfo, indexHistoryList} from '@/api'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      searchValue: '',
      inputValue: false,
      searchC: true,
      changeValue: false,
      type: '活动',
      slideList: [],
      searchList: [

      ],
      avList: [],
      goodsList: [],
      ticketList: [],
      activityList: [],
      historyList: [],
      recommend: 1,
      page: 1,
      pageSize: 10,
      hasMoreData: false,
      loadUrl: require('@/assets/images/loading.png')
    }
  },
  methods: {
    clear () {
      localStorage.clear()
    },
    clickInput () {
      this.$router.push({path: '/search'})
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
          this.indexHistoryListapi()
        }
      } else {
        this.inBottom = false
      }
    },
    async indexInfoapi () {
      const result = await indexInfo({})
      console.log(result)
      if (result.code === 1) {
        if (result.data.slideList > 3) {
          this.slideList = result.data.slideList.slice(0, 2)
        } else {
          this.slideList = result.data.slideList
        }
        this.goodsList = result.data.goodsList
        this.ticketList = result.data.ticketList
        this.activityList = result.data.activityList
        // this.historyList = result.data.list
      }
    },
    async indexHistoryListapi () {
      const data = {
        recommend: this.recommend,
        pageSize: this.pageSize,
        page: this.page
      }
      const result = await indexHistoryList(data)
      console.log(result, 'historyapi')
      if (result.code === 1) {
        this.historyList = result.data.list
        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          if(this.historyList.length === 0){
            this.hasMoreData = false
          }else{
            this.hasMoreData = true
          }

        }
      }
    },
    changetap () {
      // this.changeValue = true
    },
    changeli (arg) {
      this.type = arg
      this.changeValue = false
    },
    changeEvent (e) {
      console.log(e)
      // this.searchC = false
    },
    inputEvent (e) {
      console.log(e)
      // this.inputValue = true
    },
    searchCancel (e) {
      // this.inputValue = false
      // this.changeValue = false
      // this.searchC = true
    }

  },
  mounted () {
    this.indexInfoapi()
    this.indexHistoryListapi()
  },
  components: {
    Product,
    Activity,
    Footer,
    Menbiao
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.loadmore img{
    display: block;
    width: 52px;
    height: 55px;
    margin: 0 auto;
}
</style>
