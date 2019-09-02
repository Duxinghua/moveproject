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
  <div class="productList">
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
  },
  methods: {
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
      const result = await mallGoodsindex({})
      console.log(result, 'result')
      if (result.code === 1) {
        this.prList = result.data.list
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
      slideList: []
    }
  }

}
</script>

<style scoped>
.produce-banner{
  padding-bottom: 0px !important;
}
</style>
