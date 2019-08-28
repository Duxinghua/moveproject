<template>
  <div class="addresslist">
    <van-radio-group v-model="radio" @change="changeRadio">

    <div class="addressItem" v-for="(item, index) in addlist" :key="index">
      <div class="username">
        <span>{{item.username}}</span>
        <span>{{item.mobile}}</span>
      </div>
      <div class="adrinfo">
        {{item.province_name}}{{item.city_name}}{{item.area_name}}{{item.address}}
      </div>
      <div class="adrfun">
        <van-radio :name="item.id" checked-color="#9C3FA2" class="adrfunheight">设为默认</van-radio>
        <router-link class="adredit" :to="'/myaddress?mode=1&username='+item.username+'&mobile='+item.mobile+'&province_name='+item.province_name+'&city_name='+item.city_name+'&area_name='+item.area_name+'&address='+item.address+'&province='+item.province+'&city='+item.city+'&area='+item.area+'&is_default='+item.is_default+'&id='+item.id">
          <img src="../assets/images/edit.png" />
          <span>编辑</span>
        </router-link>
        <div class="adredit" @click="mallAddressDelApi(item.id)" :id="item.id">
          <img src="../assets/images/delete.png" />
          <span>删除</span>
        </div>
      </div>
    </div>

    </van-radio-group>
    <router-link class="mybtn" to="/myaddress?mode=2">
      新增收货地址
    </router-link>
  </div>
</template>

<script>
import getSitem from '@/utils/storage'
import {mallAddressIndex, mallAddressDel} from '@/api'
export default {
  data () {
    return {
      checked: false,
      addlist: [],
      radio: 0
    }
  },
  computed: {
    // radio () {
    //   if(this.addlist.length){
    //     this.addlist.map((data) => {
    //       if(data.is_default){
    //         console.log(data.id)
    //         return data.id
    //       }
    //     })
    //   }else{
    //     return 0
    //   }
    // }
  },
  mounted () {
    this.mallAddressIndexApi()
  },
  methods: {
    changeRadio (e) {
      console.log(e)
    },
    async mallAddressIndexApi () {
      const data = {
        token: getSitem.getStr('token') ? getSitem.getStr('token') : 'b9a0bf511d1522999f74c78feb898d97f18d4de1f5e20828c1f9cc2ea7dd8e0d'
      }
      console.log(data, 'data')
      const result = await mallAddressIndex(data)
      if (result.code === 1) {
        this.addlist = result.data
        this.addlist.map((data) => {
          if (data.is_default) {
            this.radio = data.id
          }
        })
        getSitem.setObj('address', result.data)
      }
    },
    async mallAddressDelApi (e) {
      const data = {
        token: getSitem.getStr('token'),
        id: e
      }
      console.log(data)
      const result = await mallAddressDel(data)
      if (result.code === 1) {
        console.log(result)
        this.$toast.success(result.msg)
        this.mallAddressIndexApi()
      }
    }
  }
}
</script>

<style>

</style>
