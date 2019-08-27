<template>
  <div class="addresslist">
    <div class="addressItem">
      <div class="username">
        <span>王小娜</span>
        <span>13578963769</span>
      </div>
      <div class="adrinfo">
        湖北省武汉市江岸区后湖大道金桥1号东方恒鑫源丰 巢快递柜
      </div>
      <div class="adrfun">
        <van-checkbox v-model="checked" checked-color="#9C3FA2" class="adrfunheight">设为默认</van-checkbox>
        <div class="adredit">
          <img src="../assets/images/edit.png" />
          <span>编辑</span>
        </div>
        <div class="adredit">
          <img src="../assets/images/delete.png" />
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="addressItem">
      <div class="username">
        <span>王小娜</span>
        <span>13578963769</span>
      </div>
      <div class="adrinfo">
        湖北省武汉市江岸区后湖大道金桥1号东方恒鑫源丰 巢快递柜
      </div>
      <div class="adrfun">
        <van-checkbox v-model="checked" checked-color="#9C3FA2" class="adrfunheight">设为默认</van-checkbox>
        <div class="adredit">
          <img src="../assets/images/edit.png" />
          <span>编辑</span>
        </div>
        <div class="adredit">
          <img src="../assets/images/delete.png" />
          <span>删除</span>
        </div>
      </div>
    </div>
    <div class="mybtn">
      新增收货地址
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: false
    }
  }
}
</script>

<style>

</style>
