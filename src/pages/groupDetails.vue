<template>
    <div class="group-details">
        <div class="goods-header">
            <div class="goods-img">
                <img src="../assets/images/770552.png" alt="">
            </div>
            <div class="goods-info">
                <div class="title">{{goodsData.goods_name}}</div>
                <div class="num">{{groupDetails.user_number}}人团</div>
                <div class="money">
                    <div class="price">￥<span>{{goodsData.price_tuan}}</span></div>
                    <em>单买价¥{{goodsData.price}}</em>
                </div>
            </div>
        </div>

        <div class="goods-group">
            <div :class="['group-list',{'list-active':groupDetails.user_number == 3}]">
                <div class="group-item" v-for="(item, index) in groupDetails.users" :key="index">
                    <div class="img"><img src="../assets/images/770552.png" alt=""></div>
                    <div class="tag" v-if="index == 0">团长</div>
                </div>
                <div class="group-item active" v-for="(item, index) in ((groupDetails.user_number - groupDetails.users.length) || [])" :key="'active' + index">
                    <img src="../assets/images/doubt.png" alt="">
                </div>
            </div>
            <div class="goods-time">
                <img src="../assets/images/remind.png" alt="">拼团中，还差<span>{{(groupDetails.user_number - groupDetails.current_number) || 0}}人</span>，<van-count-down :time="100000000" />后结束
            </div>
            <div class="goods-submit" @click="goodsTuanJoin">参与拼团</div>
            <div class="goods-process">
                <span>邀请好友拼团</span>
                <van-icon name="arrow" />
                <span>人满分别发货</span>
                <span>/</span>
                <span>人不满自动退款</span>
            </div>
        </div>

        <div class="good-hot">
            <div class="hot-header">
                <img src="../assets/images/titleleft.png" alt="">
                <h2>热门拼团</h2>
                <img src="../assets/images/titleright.png" alt="">
            </div>

            <div class="goods-list">
                <div class="goods-item">
                    <div class="img"><img src="../assets/images/770552.png" alt=""></div>
                    <div class="content">
                        <div class="title">玫瑰花泥面膜</div>
                        <div class="price">单买价¥1599</div>
                        <div class="money"><em>5人团</em>￥<span>1299</span></div>
                        <div class="submit">去开团</div>
                    </div>
                </div>
                <div class="goods-item">
                    <div class="img"><img src="../assets/images/770552.png" alt=""></div>
                    <div class="content">
                        <div class="title">玫瑰花泥面膜</div>
                        <div class="price">单买价¥1599</div>
                        <div class="money"><em>5人团</em>￥<span>1299</span></div>
                        <div class="submit">去开团</div>
                    </div>
                </div>
                <div class="goods-item">
                    <div class="img"><img src="../assets/images/770552.png" alt=""></div>
                    <div class="content">
                        <div class="title">玫瑰花泥面膜</div>
                        <div class="price">单买价¥1599</div>
                        <div class="money"><em>5人团</em>￥<span>1299</span></div>
                        <div class="submit">去开团</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsData:{},
            groupId:0,
            groupDetails:{
                users:[]
            }
        }
    },
     mounted(){
        this.groupId = this.$route.query.id;
        this.goodsTuan();
    },
    methods:{
        goodsTuan(){
            this.$toast.loading({
                duration:0,
                message: '加载中...',
                forbidClick: true
            });
            this.$api.goodsTuan({t_id:this.groupId}).then((res) => {
                if(res.code == 1){
                    this.groupDetails = res.data;
                    this.goodsIndex(res.data.goods_id)
                } 
            })
        },
        goodsTuanJoin(){
            this.$api.goodsTuanJoin({t_id:this.groupId}).then((res) => {
                if(res.code == 1){
                    this.goodsTuan();
                    this.$toast({
                        type:'success',
                        forbidClick:true,
                        message:'加入拼团成功'
                    });
                }else{
                    this.$toast({
                        forbidClick:true,
                        message:res.msg
                    });
                }
            })
        },
        goodsIndex(id){
            const param = {
                goods_id:id
            }
            this.$api.goodsIndex(param).then((res) => {
                this.$toast.clear();
                if(res.code == 1){
                    this.goodsData = res.data;
                }
            })
        },
    }
}
</script>

<style lang='scss' scoped>
.group-details{
    width: 100%;
    min-height: 100vh;
    background: #F6F3EF;
    .goods-header{
        padding: 30px 25px;
        display: flex;
        align-items: center;
        background: #FBF8F5;
        .goods-img{
            width: 240px;
            height: 175px;
            border-radius: 5px;
            overflow: hidden;
            margin-right: 30px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .goods-info{
            .title{
                color: #333333;
                font-size: 30px;
            }
            .num{
                border: 1Px solid #CDA871;
                padding: 6px 30px;
                display: inline-block;
                border-radius: 24px;
                color: #CDA871;
                font-size: 26px;
            }
            .money{
                display: flex;
                align-items: center;
                margin-top: 20px;
                .price{
                    color: #995258;
                    font-size: 26px;
                    span{
                        font-size: 36px;
                    }
                }
                em{
                    font-style: normal;
                    text-decoration: line-through;
                    color: #999999;
                    font-size: 26px;
                    margin-left: 20px;
                }
            }
        }
    }
    .goods-group{
        background: #FBF8F5;
        margin-top: 20px;
        padding: 60px;
        .group-list{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .group-item{
                width: 100px;
                height: 100px;
                position: relative;
                .img{
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .tag{
                    position: absolute;
                    padding: 5px 9px;
                    color: #fff;
                    font-size: 24px;
                    background: #995258;
                    border-radius: 20px;
                    right: 0px;
                    top: -20px;
                }
            }
            .active{
                border: 1Px dotted #DCDCDC;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 26px;
                    height: 42px;
                }
            }
        }
        .list-active{
            width: 400px;
            margin-left: auto;
            margin-right: auto;
        }
        .goods-time{
            display: flex;
            justify-content: center;
            align-items: center;
            color: #333333;
            font-size: 26px;
            margin-top: 30px;
            margin-bottom: 40px;
            img{
                width: 28px;
                height: 28px;
                margin-right: 10px;
            }
            span{
                color: #995258;
            }
        }
        .goods-submit{
            width: 625px;
            height: 85px;
            background: #738266;
            border-radius: 50px;
            text-align: center;
            line-height: 85px;
            font-size: 36px;
            color: #F3D995;
        }
        .goods-process{
            color: #666666;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 35px;
            span{
                margin-left: 15px;
                &:first-child{
                    color: #CDA871;
                    margin-left: 0px;
                }
            }
            i{
                color: #CDA871;
                margin-left: 15px;
            }
        }
    }
    .good-hot{
        background: #FBF8F5;
        margin-top: 20px;
        padding: 60px 30px;
        .hot-header{
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 140px;
                height: 18px;
            }
            h2{
                color: #333333;
                font-size: 36px;
                margin-left: 20px;
                margin-right: 20px;
            }
        }
        .goods-list{
            .goods-item{
                padding: 40px 0px;
                border-bottom: 1Px solid #F2EFEA;
                display: flex;
                align-items: center;
                &:last-child{
                    border-bottom: none;
                }
                .img{
                    width: 240px;
                    height: 175px;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                .content{
                    flex: 1;
                    height: 100%;
                    margin-left: 20px;
                    position: relative;
                    .title{
                        color: #333333;
                        font-size: 32px;
                    }
                    .price{
                        text-decoration: line-through;
                        color: #999999;
                        font-size: 26px;
                        margin-top: 10px;
                    }
                    .money{
                        color: #995258;
                        font-size: 26px;
                        margin-top: 40px;
                        em{
                            font-style: normal;
                            color: #999999;
                            font-size: 26px;
                            margin-right: 10px;
                        }
                        span{
                            font-size: 36px;
                        }
                    }
                    .submit{
                        position: absolute;
                        right: 0;
                        bottom: 0px;
                        width: 180px;
                        height: 70px;
                        text-align: center;
                        line-height: 70px;
                        color: #fff;
                        font-size: 30px;
                        background: #C7AA7B;
                        border-radius: 40px;
                    }
                }
            } 
        }
    }
}
</style>