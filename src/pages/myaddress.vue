<template>
  <div class="myaddress">
    <div class="myacontent">
      <van-cell-group>
        <van-field
          v-model="username"
          label="收货人"
          type="text"
          placeholder="请填写"
          rows="1"
          autosize
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="mobile"
          label="手机号"
          type="text"
          placeholder="请填写"
          rows="1"
          autosize
        />
      </van-cell-group>
      <div class="zonesel" @click="selectaddress">
        <van-cell-group class="zonesel-van"    @click="selectaddress">
          <van-field
            v-model="zone"
            label="所在地区"
            type="text"
            placeholder="请选择"
            rows="1"
            readonly
            @click="selectaddress"
          />
        </van-cell-group>

        <img class="addnext" src="../assets/images/addressnext.png" />
      </div>
      <div class="myaddressxiaoxi">
        <van-cell-group>
          <van-field
            v-model="address"
            label="详细地址"
            type="textarea"
            placeholder="请填写，如街道、楼栋、单元等等"
            rows="1"
            autosize
          />
        </van-cell-group>
      </div>
    </div>
    <div class="myaoptions">
      <van-checkbox @change="selectCheck" v-model="checked" checked-color="#9C3FA2" icon-size="16">设为默认地址</van-checkbox>
    </div>
    <van-action-sheet v-model="show" style="font-size: initial">
        <van-area :area-list="areaList"  @confirm="onconfirm" @cancel="oncancel"/>
    </van-action-sheet>
    <div class="mybtn" @click="saveAddress">
      保存
    </div>
  </div>
</template>

<script>
import getSitem from '@/utils/storage'
import { mallAddressEdit, indexCityData, mallAddressAdd } from '@/api'
export default {
  data () {
    return {
      username: '',
      mobile: '',
      zone: '',
      address: '',
      checked: true,
      area: '',
      province: '',
      city: '',
      is_default: 1,
      id: '',
      mode: 0,
      show: false,
      areaList: [],
      goods_id: false,
      good_url: false,
      add_url: false,
      flag: false
    }
  },
  methods: {
    selectCheck (e) {
      if (e) {
        this.is_default = 1
      } else {
        this.is_default = 0
      }
    },
    onconfirm (e) {
      this.zone = e[0].name + e[1].name + e[2].name
      this.province = e[0].code
      this.city = e[1].code
      this.area = e[2].code
      this.show = false
    },
    oncancel () {
      this.show = false
    },
    onSelect () {

    },
    selectaddress () {
      this.show = true
    },
    saveAddress () {
      console.log('saveadd')
      this.mallAddressEditApi()
    },
    getToken () {
      return getSitem.getStr('token')
    },
    async indexCityDataApi () {
      const tokens = getSitem.getStr('token')
      const data = {
        token: tokens
      }
      const result = await indexCityData(data)
      if (result.code === 1) {
        this.areaList = result.data
      }
    },
    async mallAddressEditApi () {
      console.log(this.mode, 'mode')
      const tokens = getSitem.getStr('token')
      const data = {
        username: this.username,
        mobile: this.mobile,
        province: this.province,
        city: this.city,
        area: this.area,
        is_default: this.is_default,
        id: this.id,
        address: this.address,
        token: tokens
      }
      if (!data.username) {
        this.$toast.fail('请输入姓名')
      }
      if (!data.mobile) {
        this.$toast.fail('请输入手机号')
      }
      if (!data.province) {
        this.$toast.fail('请选择省份')
      }
      if (!data.city) {
        this.$toast.fail('请选择城市')
      }
      if (!data.area) {
        this.$toast.fail('请选择区域')
      }
      if (!data.address) {
        this.$toast.fail('请输入地址')
      }
      if (this.mode === 1 + '') {
        const result = await mallAddressEdit(data)
        if (result.code === 1) {
          this.$toast.success(result.msg)
          // this.$router.push({path: '/addresslist'})
          // console.log(this.goods_id,"goods_id")
          if (this.goods_id) {
            this.$router.push({path: '/addresslist', query: {goods_id: this.goods_id, good_url: this.good_url, add_url: true}})
          } else {
            this.$router.push({path: '/addresslist'})
          }
        } else {
          this.$toast.fail(result.msg)
        }
      } else {
        delete data.id
        const result = await mallAddressAdd(data)
        if (result.code === 1) {
          this.$toast.success(result.msg)
          // this.$router.push({path: '/addresslist'})

          if (this.goods_id) {
            this.$router.push({path: '/addresslist', query: {goods_id: this.goods_id, good_url: this.good_url, add_url: true}})
          } else {
            this.$router.push({path: '/addresslist'})
          }
        } else {
          this.$toast.fail(result.msg)
        }
      }
    }
  },
  mounted () {
    //  this.type = this.$route.qurey.type
    this.goods_id = this.$route.query.goods_id
    console.log(this.goods_id, 'ids')
    this.good_url = this.$route.query.good_url
    if (this.$route.query.flag) {
      this.flag = this.$route.query.flag
    }
    // console.log(this.$toast.success('成功'))
    this.indexCityDataApi()
    this.mode = this.$route.query.mode
    if (this.mode === 1 + '') {
      this.username = this.$route.query.username
      this.mobile = this.$route.query.mobile
      this.zone = this.$route.query.province_name + this.$route.query.city_name + this.$route.query.area_name
      this.address = this.$route.query.address
      this.checked = this.$route.query.is_default === 1 + ''
      this.area = this.$route.query.area
      this.province = this.$route.query.province
      this.city = this.$route.query.city
      this.id = this.$route.query.id
    } else if (this.mode === 2 + '') {
      this.username = ''
      this.mobile = ''
      this.zone = ''
      this.address = ''
      this.checked = true
      this.area = ''
      this.province = ''
      this.city = ''
      this.id = ''
    }
  }

}
</script>

<style >
.myaddress .van-cell__title{
  font-size:32px;
  color:#666666;
  }
.myaddress .van-picker-column{
    font-size: 32px;
  }
.myaddress .van-field__label{
    width:35% !important;
    display: flex;
    align-items: center;
  }
.myaddress .van-field__body input{
  height:40px!important;
  font-size:28px;
}
.myaddress .van-cell__value{
    width:65% !important;
    padding:20px 0
  }
 .myaddress .van-field__control,.myaddress .van-field__control{
    text-align: right !important;
  }
 .myaddress .van-checkbox{
    flex-direction: row-reverse;
    width:100%;
  }
 .myaddress .van-checkbox__icon--round .van-icon{
    border-radius: 0%;
  }
 .myaddress .van-checkbox__label{
    font-size: 28px;
    color:#333333;
    width:95%;
  }
 .myaddress .van-checkbox__icon{
    /* width:5%; */
  }
 .myaddressxiaoxi .van-field{
   padding-top: 15px!important;
   display: flex;
   flex-direction: column;
   width:100% !important;
 }
 .myaddressxiaoxi .van-cell__value{
   width:100% !important;
 }
 .myaddressxiaoxi .van-field__control{
   padding-top:5px;
   height:60px !important;
   font-size:28px;
 }
</style>
