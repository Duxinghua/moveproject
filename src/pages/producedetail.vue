<template>
  <div calss="prdetail">
    <div class="productdetail">
      <div class="prheader">
        <img class="prbanner" :src="detail.goods_image"  />
        <div class="prdes">
          <p>{{detail.goods_name}}</p>
          <p>{{detail.description}}</p>
          <div class="moneyShare">
            <span>¥{{detail.price}}</span>
            <span>¥{{detail.price_cost}}</span>
            <div class="sharebutton">
              <img src="../assets/images/share.png" />
              <span>分享赚佣金</span>
            </div>
          </div>
        </div>

      </div>
      <div class="prcontent">
        <div class="prdetaion">
          <span class="prdetaiontitle">详情</span>
        </div>
        <div class="prdetaioncontent" v-html="detail.content">
        </div>
      </div>
    </div>
    <Paytab :price="detail.price" @pay="handlepay" />
  </div>
</template>

<script>
// import Pagetab from '../components/pagetab.vue'
import Paytab from '../components/paybutton.vue'
import { mallGoodDetail } from '@/api'
export default {
  data () {
    return {
      detail: {
        goods_image: null
      },
      goods_id: null
    }
  },
  mounted () {
    this.mallGoodDetailApi()
  },
  components: {
    Paytab
  },
  methods: {
    async mallGoodDetailApi () {
      const data = {
        id: this.$route.query.id
      }
      const result = await mallGoodDetail(data)
      if (result.code === 1) {
        this.detail = result.data
        this.goods_id = result.data.goods_id
      }
    },
    handlepay (e) {
      this.$router.push({path: 'payorder', query: {goods_id: this.goods_id}})
    }
  }
}
</script>

<style>

</style>
