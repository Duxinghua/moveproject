<template>
  <div class="produce-banner-search">
      <div class="header produce-banner">
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
          <input type="text" v-model.lazy="searchValue" @change="changeEvent" @input="inputEvent" @click="clickInput" placeholder="街道口魔方艺术馆营销活动" >
        </div>
         <div class="button" v-if="inputValue" @click="searchCancel">取消</div>
      </div>
      <div class="hc" v-show="searchC">
        <div class="banner">
          <van-swipe :autoplay="3000" >
            <van-swipe-item v-for="(item, index) in slideList" :key="index">
              <a :href="item.url"><img class="banner-radius"  :src="item.image" /></a>
            </van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>
  <div class="productList productListR">
    <Product v-for="(item,index) in prList" :key="index" :pitem="item"/>
  </div>
   <Footer :home="false" :me="false" :xbr="false" :sale="false"/>
  </div>
</template>

<script>
import Product from '../components/product.vue'
import Pagetab from '../components/pagetab.vue'
import { mallGoodsindex, indexInfo } from '@/api'
export default {
  components: {
    Product,
    Pagetab
  },
  mounted () {
    this.mallGoodsindexApi()
    this.indexInfoapi()
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scrollfunction, false)
      let bodycolors = document.documentElement || document.body
      bodycolors.style.background = '#f3f3f3'
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollfunction, false)
  },
  methods: {
    scrollfunction () {
      let topHeight = document.getElementsByClassName('produce-banner')[0].clientHeight
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollHeight - topHeight <= (scrollTop + windowHeight)) {
        if (!this.inBottom && this.hasMoreData) {
          console.log('加载更多')
          this.page++
          this.inBottom = true
          this.hasMoreData = false
          this.mallGoodsindexApi()
        }
      } else {
        this.inBottom = false
      }
    },
    clickInput () {
      this.$router.push({path: '/search'})
    },
    changeEvent (e) {
      // console.log(e)
      // this.searchC = false
    },
    inputEvent (e) {
      // this.inputValue = true
    },
    searchCancel (e) {
      // this.inputValue = false
      // this.changeValue = false
      // this.searchC = true
    },
    changetap () {

    },
    async mallGoodsindexApi () {
      const data = {page: this.page, page_size: this.page_size}
      this.hasGetData = true
      const result = await mallGoodsindex(data)
      console.log(result, 'result')
      if (result.code === 1) {
        let {prList} = this
        this.prList = [...prList, ...result.data.list]

        if (result.data.totalPage === this.page) {
          this.hasMoreData = false
        } else {
          this.hasMoreData = true
        }
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
      }
    }
  },
  data () {
    return {
      prList: [],
      searchValue: '',
      inputValue: false,
      searchC: true,
      changeValue: false,
      type: '活动',
      slideList: [],
      page: 1,
      page_size: 10,
      hasGetData: false,
      hasMoreData: false,
      inBottom: false
    }
  }

}
</script>

<style scoped>
.produce-banner{
  padding-bottom: 0px !important;
  position: fixed;
  top: 0;
  left:0;
  width:100%;
}
.productListR{
  margin-top: 440px;
}
</style>
