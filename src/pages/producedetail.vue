<template>
  <div calss="prdetail">
    <div class="productdetail">
      <div class="prheader">
        <img class="prbanner" src="../assets/images/detail.png"  />
        <div class="prdes">
          <p>无损风味 超即溶精品咖啡（24颗入）</p>
          <p>8月2日-8月7日，买2盒赠滤泡杯</p>
          <div class="moneyShare">
            <span>¥118</span>
            <span>¥700</span>
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
        <div class="prdetaioncontent">
        </div>
      </div>
    </div>
    <Paytab :price="195" @pay="handlepay" />
    <Pagetab />
  </div>
</template>

<script>
import Pagetab from '../components/pagetab.vue'
import Paytab from '../components/paybutton.vue'
export default {
  components: {
    Pagetab,
    Paytab
  },
  methods: {
    handlepay (e) {
      this.$router.push({path: 'payorder'})
    }
  }
}
</script>

<style>

</style>
