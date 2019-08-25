<template>
  <div class="payprorder">
    <div class="addressItem">
      <img src="../assets/images/addresstop.png" />
      <div class="addresscontent">
        <img class="a1" src="../assets/images/addressposition.png" />
        <div class="addressinfo">
          <p><span>收货人：许会</span><span>159****1073</span></p>
          <p>中国 湖北 武汉市 洪山区*********光谷云计算</p>
        </div>
        <img class="a2" src="../assets/images/addressnext.png" />
      </div>
    </div>
    <div class="productorder">
      <div class="productoinfo">
        <img  src="../assets/images/p1.png" />
        <div class="productodes">
            <p>无损风味超即溶精品咖啡</p>
            <p>¥{{price}}</p>
            <p class="productpc"><span class="orderbutton" @click="sub">-</span><span class="ordernum">{{orderNum}}</span><span class="orderbutton jiaohao" @click="add">+</span></p>
        </div>
      </div>
      <div class="productosum">
        <span>商品合计</span>
        <span>¥{{orderMoney}}</span>
      </div>
      <div class="productosum">
        <span>运费</span>
        <span>¥0.00</span>
      </div>
      <div class="productosum">
        <span>优惠活动</span>
        <span>¥0.00</span>
      </div>
    </div>
    <Paytab :price="orderMoney" @pay="handlepay" />
    <Pagetab />
  </div>
</template>

<script>
import Pagetab from '../components/pagetab.vue'
import Paytab from '../components/paybutton.vue'
const BigNumber = require('bignumber.js')
export default {
  data () {
    return {
      orderNum: 1,
      price: 169.99
    }
  },
  components: {
    Pagetab,
    Paytab
  },
  computed: {
    orderMoney () {
      var price = new BigNumber(this.price)
      return price.multipliedBy(this.orderNum).toFixed()
    }

  },
  mounted () {
    var a = new BigNumber(123.4567)
    var c = a.multipliedBy(2)
    console.log(c.toFixed())
  },
  methods: {
    handlepay (e) {

    },
    add () {
      this.orderNum++
    },
    sub () {
      if (this.orderNum === 1) {
        this.orderNum = 1
      } else {
        this.orderNum--
      }
    }
  }
}
</script>

<style>

</style>
