<template>
    <div class="goods-item" @click="onLinkDetails(goodsData.goods_id)">
        <div class="goods-img">
            <van-image :src="goodsData.images[0]">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
        </div>
        <div class="goods-content">
            <div class="goods-title">{{goodsData.goods_name}}</div>
            <div class="goods-subtitle">{{goodsData.description}}</div>
            <div class="goods-price">¥{{goodsData.price}}</div>
            <div class="shopping">
                <img class="shop" src="../../assets/images/shoping-bg.png" alt="">
                <img class="bg" src="../../assets/images/shoping.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    goodsData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onLinkDetails (goodsId) {
      this.$router.push({
        path: '/goodsDetails',
        query: {
          goodsId
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.goods-item{
    width: 333px;
    margin-bottom: 40px;
    .goods-img{
        width: 100%;
        height: 245px;
        overflow: hidden;
        border-radius: 5px;
        .van-image{
            width: 100%;
            height: 100%;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
    .goods-content{
        position: relative;
        .goods-title{
            color: #333333;
            font-size: 32px;
            margin-top: 20px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .goods-subtitle{
            color: #999999;
            width: 260px;
            font-size: 26px;
            margin-top: 5px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .goods-price{
            color: #995258;
            font-size: 30px;
        }
        .shopping{
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 70px;
            height: 70px;
            .bg{
                width: 70px;
                height: 70px;
                position: absolute;
            }
            .shop{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                z-index: 1;
                width: 32px;
                height: 30px;
            }
        }
    }
}
</style>
