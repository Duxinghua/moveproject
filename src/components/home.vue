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
          <input type="text" v-model.lazy="searchValue" @change="changeEvent" @input="inputEvent" placeholder="街道口魔方艺术馆营销活动" >
          <div class="close"></div>
        </div>
         <div class="button" v-if="inputValue" @click="searchCancel">取消</div>
      </div>
      <div class="hc" v-show="searchC">
        <div class="banner">
          <van-swipe :autoplay="3000" >
            <van-swipe-item v-for="(item, index) in slideList" :key="index">
              <a :href="item.url"><img v-lazy="item.image" /></a>
            </van-swipe-item>
          </van-swipe>
        </div>
        <div class="topmenu">
          <div class="mitem">
            <img src="../assets/images/hd.png" />
            <span><router-link to="/activity" >活动</router-link></span>
          </div>
          <div class="mitem">
            <img src="../assets/images/mp.png" />
            <span><router-link to="/ticket" >门票</router-link></span>
          </div>
          <div class="mitem">
            <img src="../assets/images/sp.png" />
            <span><router-link to="/produce" >产品</router-link></span>
          </div>
          <div class="mitem">
            <img src="../assets/images/hz.png" />
            <span><router-link to="/join" >合作</router-link></span>
          </div>
        </div>
      </div>
    </div>
    <div class="container" v-show="searchC">
      <div class="productitem">
        <div class="headerline">
          <img src="../assets/images/yh.png" />
          <span>最新优惠</span>
        </div>
        <div class="productcontent">
          <Product v-for="(item,index) in goodsList" :key="index" :pitem="item"/>
        </div>
      </div>
      <div class="productitem">
        <div class="headerline">
          <img src="../assets/images/hdico.png" />
          <span>出团门票</span>
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
      pageSize: 10
    }
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
        this.goodsList = result.data.goodsList
        this.ticketList = result.data.ticketList
        this.activityList = result.data.activityList
        this.historyList = result.data.list
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
      }
    },
    changetap () {
      this.changeValue = true
    },
    changeli (arg) {
      this.type = arg
      this.changeValue = false
    },
    changeEvent (e) {
      console.log(e)
      this.searchC = false
    },
    inputEvent (e) {
      this.inputValue = true
    },
    searchCancel (e) {
      this.inputValue = false
      this.changeValue = false
      this.searchC = true
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
<style scoped>

</style>
