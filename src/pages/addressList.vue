<template>
    <div class="address-box">
        <div class="address-list" v-if="addressList.length > 0">

            <div class="address-item" v-for="(item, index) in addressList" :key="index" @click="selectAddress(item)">
                <div class="name"><span>{{item.user_name}}</span><span>{{item.mobile}}</span></div>
                <div class="address">{{item.address_name.replace(/[/]/g," ")}}&nbsp;{{item.address}}</div>
                <div class="default">
                    <div class="radio-box">
                        <van-checkbox :value="index == defaultIndex" @click.stop="onChange(index,item.id)" shape checked-color="#718063">默认地址</van-checkbox>
                    </div>
                    <div class="action">
                        <div class="action-item" @click.stop="onEdit(item.id)">
                            <img src="../assets/images/edit.png" alt="">
                            <span>编辑</span>
                        </div>
                        <div class="action-item" @click.stop="onRemove(item.id)">
                            <img src="../assets/images/delete.png" alt="">
                            <span>删除</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <NoData v-if="addressList.length == 0"/>

        <div class="add-address" @click="onLinkAdd">
            新增收货地址
        </div>

    </div>
</template>

<script>
import NoData from '@/components/nodata'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      defaultIndex: 0,
      addressList: [],
      type: undefined
    }
  },
  components: {
    NoData
  },
  mounted () {
    this.getAddressList()
    const {type} = this.$route.query
    this.type = type
  },
  methods: {
    ...mapMutations('shop', ['saveAddressData']),
    selectAddress (data) {
      if (this.type == 'select') {
        this.saveAddressData(data)
        this.$router.back(-1)
      }
    },
    onChange (index, id) {
      if (this.defaultIndex != index) {
        this.defaultIndex = index
        this.saveAddress(id)
      }
    },
    saveAddress (id) {
      const param = {
        id,
        is_default: 1
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.saveAddress(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.$toast({
            type: 'success',
            message: '修改成功'
          })
        } else {
          Notify({ type: 'danger', message: res.msg })
        }
      })
    },
    getAddressList () {
      const param = {
        page: 1,
        pageSize: 100
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.addressList(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.addressList = res.data.data
        }
      })
    },
    onLinkAdd () {
      this.$router.push('/editAddress')
    },
    onRemove (id) {
      const _this = this
      this.$dialog.confirm({
        title: '提示',
        message: '确认是否删除',
        beforeClose (action, done) {
          if (action === 'confirm') {
            _this.delAddress(id, done)
          } else {
            done()
          }
        }
      })
    },
    delAddress (id, done) {
      this.$api.delAddress({id}).then((res) => {
        if (res.code == 1) {
          done()
          this.$toast({
            type: 'success',
            message: res.msg
          })
          this.defaultIndex = 0
          this.getAddressList()
        } else {
          this.$toast({
            forbidClick: true,
            message: res.msg
          })
        }
      })
    },
    onEdit (id) {
      this.$router.push({
        path: '/editAddress',
        query: {
          id
        }
      })
    }
  }

}
</script>

<style lang='scss' scoped>
.address-box{
    width: 100%;
    min-height: 100vh;
    padding-bottom: 95px;
    background: #FBF8F5;
    .address-list{
        padding: 30px;
        .address-item{
            background: #fff;
            border-radius:8px;
            margin-bottom: 20px;
            .name{
                padding: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 32px;
                color: #333333;
            }
            .address{
                color: #333333;
                font-size: 28px;
                padding-left: 30px;
                padding-right: 30px;
            }
            .default{
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 30px;
                margin-top: 30px;
                border-top: 1Px solid #F3F3F3;
                font-size: 28px;
                .radio-box{
                    display: flex;
                    align-items: center;
                    span{
                        margin-left: 20px;
                    }
                    /deep/ .van-checkbox{
                        .van-checkbox__icon{
                            height: auto;
                            line-height: normal;
                            i{
                                width: 30px;
                                height: 30px;
                                font-size: 28px;
                                border-radius: 5px;
                            }
                        }

                    }
                }
                .action{
                    display: flex;
                    .action-item{
                        display: flex;
                        align-items: center;
                        margin-left: 50px;
                        img{
                            width: 30px;
                            height: 30px;
                            margin-right: 20px;
                        }
                    }
                }
            }

        }
    }
    .add-address{
        width: 750px;
        height: 95px;
        text-align: center;
        line-height: 95px;
        color: #F3D995;
        font-size: 36px;
        background: #6D8160;
        position: fixed;
        bottom: 0px;
        left: 0px;
    }
}
</style>
