<template>
  <div class="productList">
    <Product v-for="(item,index) in prList" :key="index" :pitem="item"/>
    <Pagetab />
  </div>
</template>

<script>
import Product from '../components/product.vue'
import Pagetab from '../components/pagetab.vue'
import { mallGoodsindex } from '@/api'
export default {
  components: {
    Product,
    Pagetab
  },
  mounted () {
    this.mallGoodsindexApi()
  },
  methods: {
    async mallGoodsindexApi () {
      const result = await mallGoodsindex({})
      console.log(result, 'result')
      if (result.code === 1) {
        this.prList = result.data.list
      }
    }
  },
  data () {
    return {
      prList: []
    }
  }

}
</script>

<style>

</style>
