<template>
  <div class="productList">
    <Product v-for="(item,index) in prList" :key="index" :pitem="item"/>
    <Pagetab />
  </div>
</template>

<script>
import Product from '../components/product.vue'
import Pagetab from '../components/pagetab.vue'
export default {
  components: {
    Product,
    Pagetab
  },
  data () {
    return {
      prList: [
        {
          img: require('../assets/images/p1.png'),
          title: '木质花香淡香水滚珠套盒',
          des: '游走的嗅觉引力',
          money1: '99',
          money2: '129'
        },
        {
          img: require('../assets/images/p1.png'),
          title: '木质花香淡香水滚珠套盒',
          des: '游走的嗅觉引力',
          money1: '99',
          money2: '129'
        },
        {
          img: require('../assets/images/p1.png'),
          title: '木质花香淡香水滚珠套盒',
          des: '游走的嗅觉引力',
          money1: '99',
          money2: '129'
        },
        {
          img: require('../assets/images/p1.png'),
          title: '木质花香淡香水滚珠套盒',
          des: '游走的嗅觉引力',
          money1: '99',
          money2: '129'
        },
        {
          img: require('../assets/images/p1.png'),
          title: '木质花香淡香水滚珠套盒',
          des: '游走的嗅觉引力',
          money1: '99',
          money2: '129'
        },
        {
          img: require('../assets/images/p1.png'),
          title: '木质花香淡香水滚珠套盒',
          des: '游走的嗅觉引力',
          money1: '99',
          money2: '129'
        }
      ]

    }
  }

}
</script>

<style>

</style>
