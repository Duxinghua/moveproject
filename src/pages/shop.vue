<template>
    <div class="shop-container">
        <div class="no-shop" v-if="shopFlag">
            <img src="../assets/images/shop.png" alt="">
            <div class="text">购物车空空如也</div>
            <div class="btn" @click="onLinkShop">开启购物之旅</div>
        </div>
        <div class="shop-list" v-if="shopList.length > 0">
            <div class="shop-item" v-for="(item, index) in shopList" :key="item.index" v-if="item.goods">
                <van-checkbox v-model="item.checked" checked-color="#718063"></van-checkbox>
                <div class="shop-img">
                    <img :src="item.goods.images[0]" alt="">
                </div>

                <div class="shop-center">
                    <div class="shop-title"><span>{{item.goods.goods_name}}</span><van-icon name="cross" @click="onRemove(item.cart_id)" /></div>
                    <div class="shop-sub">{{item.goods.description}}</div>
                    <div class="shops-sku" v-if="item.specs">规格：{{item.specs.specs}}</div>
                    <div class="shop-money" v-if="item.specs">
                        <div class="money">￥<span>{{item.specs.price}}</span></div>
                        <div class="num"><van-stepper :key="index" disable-input v-model="item.goods_num" @change="onChangeNum($event,item)"/></div>
                    </div>
                </div>

            </div>
        </div>

        <div class="buy" v-if="shopList.length > 0">
            <div class="left">
                <van-checkbox v-model="allChecked" checked-color="#718063"></van-checkbox>
                <span class="num">已选({{checkedTotal}})</span>
                <div class="total">合计<span>￥{{moneyTotal}}</span></div>
            </div>
            <div class="submit" @click="onBuy">立即购买</div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      moneyTotal: '0.00',
      shopList: [],
      allChecked: false,
      checkedTotal: 0,
      cartIdChecked: [],
      sourceuid: '',
      shopFlag: false
    }
  },
  watch: {
    shopList: {
      deep: true,
      handler (data) {
        let checkedTotal = 0
        let moneyTotal = 0
        let cartIdChecked = []
        data.forEach((item) => {
          if (item.checked) {
            checkedTotal += 1
            cartIdChecked.push(item.cart_id)
            if (item.specs) {
              moneyTotal += item.goods_num * item.specs.price
            }
          }
        })
        if (checkedTotal != 0 && checkedTotal == data.length) {
          this.allChecked = true
        }

        this.moneyTotal = moneyTotal.toFixed(2)
        this.checkedTotal = checkedTotal
        this.cartIdChecked = cartIdChecked
      }
    },
    allChecked (data) {
      const shopList = this.shopList.map((item) => {
        return {
          ...item,
          checked: data
        }
      })
      this.shopList = shopList
    }
  },
  mounted () {
    this.goodsCarts()
    if (this.$route.query.sourceuid) {
      this.sourceuid = this.$route.query.sourceuid
    }
  },
  methods: {
    onBuy () {
      if (this.checkedTotal == 0) {
        this.$toast('请选择支付商品')
        return false
      }
      this.goodsOrderCreate()
    },
    onChangeNum (value, item) {
      this.goodsStoreCarts(item, value)
    },
    goodsCarts () {
      const params = {
        page: 1,
        pageSize: 100
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.goodsCarts(params).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.shopList = res.data.data.map((item, index) => {
            return {
              ...item,
              index,
              checked: false
            }
          })
          if (this.shopList.length) {
            this.shopFlag = false
          } else {
            this.shopFlag = true
          }
        }
      })
    },
    onLinkShop () {
      this.$router.push({name: 'shopHome'})
    },
    onRemove (id) {
      const _this = this
      this.$dialog.confirm({
        title: '提示',
        message: '确认是否删除',
        beforeClose (action, done) {
          if (action === 'confirm') {
            _this.goodsDelCarts(id, done)
          } else {
            done()
          }
        }
      })
    },
    goodsDelCarts (id, done) {
      this.$api.goodsDelCarts({cart_id: id}).then((res) => {
        done()
        if (res.code == 1) {
          const index = this.shopList.findIndex((item) => item.cart_id == id)
          this.shopList.splice(index, 1)
          this.$toast('删除成功')
        } else {
          this.$toast(res.msg)
        }
      })
    },
    goodsStoreCarts (data, goodsNum) {
      const param = {
        goods_id: data.goods_id,
        goods_num: goodsNum,
        specs: JSON.stringify(data.specs)

      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.goodsStoreCarts(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.$toast('修改成功')
        }
      })
    },
    goodsOrderCreate () {
      const param = {
        type: 0,
        cart_id: this.cartIdChecked.join(',')
      }
      if (this.sourceuid) {
        param.sourceuid = this.sourceuid
      }
      this.$router.push({
        path: '/submitOrder',
        query: param
      })
    }

  }

}
</script>

<style lang='scss' scoped>
/deep/ .van-checkbox{
        .van-checkbox__icon{
            height: auto;
            line-height: normal;
            i{
                width: 30px;
                height: 30px;
                font-size: 28px;
            }
        }

    }
.shop-container{
    width: 100%;
    min-height: 100vh;
    padding-bottom: 95px;
    background: #FBF8F5;
    .no-shop{
        text-align: center;
        height: 100%;
        img{
            width: 365px;
            height: 255px;
            margin-top: 210px;
        }
        .text{
            color: #333333;
            font-size: 26px;
            margin-top: 90px;
            text-align: center;
        }
        .btn{
            width: 320px;
            height: 90px;
            line-height: 90px;
            text-align: center;
            margin: 0 auto;
            margin-top: 90px;
            background: #758367;
            color: #F3D995;
            font-size: 36px;
            border-radius: 50px;
        }
    }
    .shop-list{
        background: #fff;
        padding: 0px 25px;
        .shop-item{
            padding: 50px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-bottom: 1Px solid #F3F3F3;
            &:last-child{
                border-bottom: none;
            }

            .shop-img{
                width: 200px;
                height: 170px;
                border-radius: 5px;
                margin-left: 25px;
                margin-right: 30px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .shop-center{
                width: 400px;
                display: flex;
                flex-direction: column;
                // justify-content: space-between;
                height: 170px;
                .shop-title{
                    width: 100%;
                    color: #333333;
                    font-size: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span{
                        width: 100%;
                        display: inline-block;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        overflow: hidden;

                    }
                    i{
                        font-size: 30px;
                        color: #D3D3D3;
                    }
                }
                .shop-sub{
                    width: 400px;
                    color: #999999;
                    font-size: 26px;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .shops-sku{
                    color: #999999;
                    font-size: 24px;
                }
                .shop-money{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .money{
                        color: #995258;
                        font-size: 30px;
                        span{
                            font-size: 36px;
                        }
                    }
                    .num{
                        /deep/ .van-stepper{
                                border: 1Px solid #D3D3D3;
                                border-radius: 6px;
                                .van-stepper__minus, .van-stepper__plus{
                                    width: 55px;
                                    height: 45px;
                                    background: #fff;
                                    padding: 0px;
                                    &::before{
                                        width: 10Px;
                                        height: 1Px;
                                    }
                                    &::after{
                                        width: 1Px;
                                        height: 10Px;
                                    }
                                }
                                input{
                                    width: 65px;
                                    margin: 0px;
                                    height:45px;
                                    border-left: 1Px solid #D3D3D3;
                                    border-right: 1Px solid #D3D3D3;
                                    background: #fff;
                                    font-size: 24px;
                                }
                                input[disabled]{
                                    color: #333333;
                                    -webkit-text-fill-color:#333333;
                                    -webkit-opacity: 1;
                                }
                            }
                    }
                }
            }
        }
    }
    .buy{
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 95px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.2);
        background: #fff;
        z-index: 10;
        .left{
            display: flex;
            align-items: center;
            margin-left: 30px;
            .num{
                color: #999999;
                font-size: 26px;
                margin-left: 20px;
            }
            .total{
                color: #333333;
                font-size: 30px;
                margin-left: 20px;
                span{
                    color: #995258;
                    font-size: 36px;
                    margin-left: 10px;
                }
            }
        }
        .submit{
            width: 280px;
            height: 80px;
            text-align: center;
            line-height: 80px;
            color: #F3D995;
            font-size: 36px;
            border-radius: 50px;
            background: #748367;
        }
    }
}
</style>
