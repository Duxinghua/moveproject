<template>
    <div class="submit-order">
        <div class="order-site" @click="onLinkAddress">
            <div class="site-top"></div>
            <div class="order-not" v-if="!addressData.id">
                <div class="left">
                    <img src="../assets/images/site1.png" alt="">
                    <span>选择收货地址</span>
                </div>
                <van-icon name="arrow" />
            </div>
            <div class="site-data" v-if="addressData.id">
                <img src="../assets/images/site.png" alt="">
                <div class="site-info">
                    <div class="name">收货人：{{addressData.user_name}}<span>{{addressData.mobile}}</span></div>
                    <div class="location">{{addressData.address_name.replace(/[/]/g," ")}}&nbsp;&nbsp;{{addressData.address}}</div>
                </div>
                <van-icon name="arrow" />
            </div>
        </div>

        <div class="order-details">
            <div class="order-info" v-for="(item, index) in orderData.goods" :key="index">
                <div class="img">
                    <img :src="item.images" alt="">
                </div>
                <div class="info">
                    <div class="title">{{item.goods_name}}</div>
                    <div class="money">￥<span>{{item.price}}</span> <em>{{item.specs}}</em></div>
                    <div class="num"><van-stepper disabled disable-input v-model="item.goods_num"/></div>
                </div>
            </div>
            <div class="order-item">
                <div class="left">商品合计</div>
                <div class="right">￥{{goodsTotal.toFixed(2)}}</div>
            </div>
             <div class="order-item">
                <div class="left">运费</div>
                <div class="right">￥0.00</div>
            </div>
             <div class="order-item">
                <div class="left">优惠活动</div>
                <div class="right">原价￥0.00</div>
            </div>
            <div class="order-item" @click="toggle">
                <div class="left">可用<span>0学分</span>抵用<span>0</span>元</div>
                <van-checkbox v-model="checked" ref="checkboxes" checked-color="#718063"></van-checkbox>
            </div>
        </div>

        <div class="buy-box">
            <div class="money">需支付<span>￥{{goodsTotal.toFixed(2)}}</span></div>
            <div class="submit" @click="onBuy">立即购买</div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            num:1,
            radio:"2",
            checked:false,
            orderId:0,
            orderData:{},
            goodsTotal:0,
            orderMoney:0,
            orderType:0
        }
    },
    watch:{
        orderData:{
            deep:true,
            handler(data){
                let goodsTotal = 0;
                if(data.goods && data.goods.length > 0){
                    data.goods.forEach((item) => {
                        goodsTotal += item.goods_num * item.price;
                    })
                }
                this.goodsTotal = goodsTotal;
            }
        }
    },
    computed:{
        ...mapState('shop',['addressData'])
    },
    mounted(){
        const {orderId,type} = this.$route.query;
        this.orderId = orderId;
        this.orderType = type;
        this.getAddressList();
        this.goodsOrder();
    },
    methods:{
        ...mapMutations('shop',['saveAddressData']),
        goodsOrderStore(){
            // 微信支付
            let param = {}
            if(this.orderType == 0){
                //购物车购买
                let cart_id = [];
                this.orderData.goods.forEach((item) => {
                    cart_id.push(item.cart_id)
                })
                param = {
                    cart_id:cart_id.join(','),
                    type:this.orderType,
                    address_id:this.addressData.id,
                }
            }else if(this.orderType == 1){
                //拼团购买
                param = {
                    t_id:this.orderData.t_id,
                    type:this.orderType,
                    address_id:this.addressData.id,
                }
            }else{
                //单个商品购买
                param = {
                    goods_id:this.orderData.goods[0].goods_id,
                    specs:this.orderData.goods[0].specs,
                    goods_num:this.orderData.goods[0].goods_num,
                    address_id:this.addressData.id,
                    type:this.orderType
                }
            }
            this.$api.goodsOrderStore(param).then((res) => {
                if(res.code == 1){
                    
                }else{
                    this.$toast(res.msg);
                }
            })
        },
        onLinkAddress(){
            this.$router.push({
                path:'/addressList',
                query:{
                    type:'select'
                }
            })
        },
        onBuy(){
            if(!this.addressData.mobile){
                this.$toast('请填写收货地址')
                return false
            }
            this.goodsOrderStore()
        },
        toggle(){
            this.$refs.checkboxes.toggle();
        },
        goodsOrder(){
            const param = {
                order_id:this.orderId
            }
            this.$api.goodsOrder(param).then((res) => {
                if(res.code == 1){
                    this.orderData = res.data;
                }
            })
        },
        getAddressList(){
            const param = {
                page:1,
                pageSize:100
            }
            this.$toast.loading({
                duration:0,
                message: '加载中...',
                forbidClick: true
            });
            this.$api.addressList(param).then((res) => {
                this.$toast.clear();
                if(res.code == 1){
                    if(res.data.data.length > 0){
                        if(!this.addressData.id){
                            this.saveAddressData(res.data.data[0])
                        }
                    }
                }
            })
        },
    }
}
</script>

<style lang='scss' scoped>
.submit-order{
    width: 100%;
    min-height: 100vh;
    padding: 25px;
    padding-bottom: 95px;
    background: #FBF8F5;
    .order-site{
        background: #fff;
        .site-top{
            width: 100%;
            height: 10px;
            background: url('../assets/images/site-bg.png') 100%/100% no-repeat;
        }
        .order-not{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 30px 35px;
            .left{
                display: flex;
                justify-content: space-between;
                align-items: center;
                img{
                    width: 90px;
                    height: 90px;
                }
                span{
                    font-size: 30px;
                    color: #333333;
                    margin-left: 20px;
                }
            }
            i{
                font-size: 30px;
                color: #888888;
            }
        }
        .site-data{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 40px 30px 50px 30px;
            img{
                width: 30px;
                height: 40px;
                margin-bottom: 30px;
            }
            .site-info{
                flex: 1;
                margin-left: 30px;
                .name{
                    color: #333333;
                    font-size: 28px;
                    font-weight: 500;
                    span{
                        margin-left: 40px;
                    }
                }
                .location{
                    color: #333333;
                    font-size: 24px;
                }
            }
            i{
                font-size: 30px;
                color: #888888;
            }
        }
    }
    .order-details{
        padding: 25px 30px;
        background: #fff;
        margin-top: 20px;
        .order-info{
            display: flex;
            margin-bottom: 30px;
            .img{
                width: 200px;
                height: 150px;
                border-radius: 5px;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .info{
                height: 100%;
                margin-left: 30px;
                .title{
                    width: 400px;
                    color: #333333;
                    font-size: 32px;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    
                }
                .money{
                    color: #995258;
                    font-size: 24px;
                    margin-bottom: 10px;
                    margin-top: 5px;
                    span{
                        font-size: 30px;
                    }
                    em{
                        font-style: normal;
                        color: #333;
                        margin-left: 10px;
                    }
                }
                .num{
                    /deep/ .van-stepper{
                        .van-stepper__minus, .van-stepper__plus{
                            width: 40px;
                            height: 40px;
                            background: #FBF8EF;
                            border-radius: 5px;
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
                            width: 75px;
                            margin: 0px;
                            height: 100%;
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
        .order-item{
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #333333;
            font-size: 26px;
            padding: 25px 0px;
            border-top: 1Px solid #F6F6F6;
            .left{
                span{
                    color: #995258;
                }
            }
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
        }

    }
    .buy-box{
        position: fixed;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 95px;
        background: #fff;
        box-shadow:0px 0px 16px 0px rgba(0, 0, 0, 0.2);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 25px;
        .money{
            color: #333333;
            font-size: 30px;
            span{
                color: #995258;
                font-size: 36px;
            }
        }
        .submit{
            width: 280px;
            height: 80px;
            background: #738266;
            text-align: center;
            line-height: 80px;
            color: #F3D995;
            font-size: 36px;
            border-radius: 50px;
        }
    }
}
</style>