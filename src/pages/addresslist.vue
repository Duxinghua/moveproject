<template>
  <div class="addresslist">
    <van-radio-group v-model="radio" @change="changeRadio">

    <div class="addressItem addressfix" v-for="(item, index) in addlist" :key="index">
      <div class="username">
        <span>{{item.username}}</span>
        <span>{{item.mobile}}</span>
      </div>
      <div class="adrinfo">
        {{item.province_name}}{{item.city_name}}{{item.area_name}}{{item.address}}
      </div>
      <div class="adrfun">
        <van-radio @click="clickRadio(item.id)" :name="item.id" checked-color="#9C3FA2" class="adrfunheight">设为默认</van-radio>
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
    <div class="mybtn" @click="clickToadd">
      新增收货地址
    </div>
  </div>
</template>

<script>
import getSitem from '@/utils/storage'
import {mallAddressIndex, mallAddressDel, mallAddressEdit} from '@/api'
export default {
  data () {
    return {
      checked: false,
      addlist: [],
      radio: 0,
      goods_id: false,
      good_url: 0,
      flag: false
    }
  },
  watch: {

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
    // autoArg () {
    //   if (this.goods_id) {
    //     return '&goods_id=' + this.$route.query.goods_id + '&good_url=' + this.$route.query.good_url
    //   } else {
    //     return ''
    //   }
    // }
  },
  mounted () {
    // console.log(this.$route.query.add_url,'add_url')
    // getSitem.remove('goods_id')
    if (this.$route.query.flag) {
      this.flag = this.$route.query.flag
      getSitem.setStr('flag', this.$route.query.flag)
    }
    if (this.$route.query.add_url) {
      this.add_url = this.$route.query.add_url
    }
    if (this.$route.query.goods_id) {
      this.goods_id = this.$route.query.goods_id
    }
    if (this.$route.query.good_url) {
      this.good_url = this.$route.query.good_url
    }
    // getSitem.setStr('goods_id', this.goods_id)
    // getSitem.setStr('goods_url', this.goods_url)
    this.mallAddressIndexApi()
  },
  methods: {
    /// myaddress?mode=2
    async mallAddressEditApi (data) {
      const result = await mallAddressEdit(data)
      if (result.code === 1) {
        // this.$toast.success(result.msg)
        if (getSitem.getStr('buy_add') === 1 + '' && getSitem.getStr('goods_id')) {
          this.$router.push({path: '/payorder', query: {goods_id: getSitem.getStr('goods_id')}})
        } else {
          this.mallAddressIndexApi()
        }
      }
    },
    clickToadd (e) {
      if (this.goods_id) {
        this.$router.push({path: '/myaddress', query: {mode: 2, goods_id: this.goods_id, good_url: this.good_url}})
      } else {
        this.$router.push({path: '/myaddress', query: {mode: 2, flag: this.flag}})
      }
    },
    changeRadio (e) {
      // var id = e
      // var data = {}
      // this.addlist.map((item) => {
      //   if(item.id === id){
      //     data = item
      //   }
      // })
      // data.is_default = 1
      // // this.mallAddressEditApi(data)

    },
    clickRadio (e) {
      console.log(e, 'e')
      var id = e
      var is_default = 0
      var data = {}
      this.addlist.map((item) => {
        if (item.id === id) {
          data = item
          is_default = item.is_default
        }
      })
      if (is_default === 1) {
        this.radio = 'value'
        data.is_default = 0
      } else {
        this.radio = id
        data.is_default = 1
      }
      this.mallAddressEditApi(data)
    },
    async mallAddressIndexApi () {
      const data = {
        token: getSitem.getStr('token')
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
