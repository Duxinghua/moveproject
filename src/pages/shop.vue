<template>
    <div class="shop-container">
        <div class="no-shop" v-if="shopList.length == 0">
            <img src="../assets/images/shop.png" alt="">
            <div class="text">购物车空空如也</div>
            <div class="btn" @click="onLinkShop">开启购物之旅</div>
        </div>
        <div class="shop-list" v-if="shopList.length > 0">
            <div class="shop-item" v-for="(item, index) in shopList" :key="index">
                <van-checkbox v-model="checked" checked-color="#718063"></van-checkbox>
                <div class="shop-img">
                    <img src="../assets/images/770552.png" alt="">
                </div>

                <div class="shop-center">
                    <div class="shop-title"><span>青梅菊花酒</span><van-icon name="cross" @click="onRemove" /></div>
                    <div class="shop-sub">绵甜低度健康酒，清火养生不上头</div>
                    <div class="shop-money">
                        <div class="money">￥<span>99</span></div>
                        <div class="num"><van-stepper disable-input v-model="num" /></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="buy" v-if="shopList.length > 0">
            <div class="left">
                <van-checkbox v-model="checked" checked-color="#718063"></van-checkbox>
                <span class="num">已选(5)</span>
                <div class="total">合计<span>￥4280</span></div>
            </div>
            <div class="submit">立即购买</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num:1,
            shopList:[],
            checked:false
        }
    },
    mounted(){
        this.goodsCarts();
    },
    methods:{
        goodsCarts(){
            const params = {
                page:1,
                pageSize:100
            }
            this.$api.goodsCarts(params).then((res) => {
                if(res.code == 1){
                    this.shopList = res.data.data;
                }
            })
        },
        onLinkShop(){
            this.$router.push('/shopHome')
        },
        onRemove(){
            this.$dialog.confirm({
                title: '提示',
                message: '确认是否删除',
                beforeClose(action, done) {
                    if (action === 'confirm') {
                        setTimeout(done, 1000);
                    } else {
                        done();
                    }
                }
            });
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
                height: 150px;
                border-radius: 5px;
                margin-left: 25px;
                margin-right: 30px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .shop-center{
                display: flex;
                flex-direction: column;
                // justify-content: space-between;
                height: 150px;
                .shop-title{
                    color: #333333;
                    font-size: 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    i{
                        font-size: 30px;
                        color: #D3D3D3;
                    }
                }
                .shop-sub{
                    color: #999999;
                    font-size: 26px;
                    margin-top: 15px;
                    margin-bottom: 15px;
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