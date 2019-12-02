<template>
    <div class="group-details">
        <div class="goods-header">
            <div class="goods-img">
                <img :src="goodsData.image && goodsData.image[0]" alt="">
            </div>
            <div class="goods-info">
                <div class="title">{{goodsData.title}}</div>
                <div class="num">{{groupDetails.user_number}}人团</div>
                <div class="money">
                    <div class="price">￥<span>{{goodsData.price_tuan}}</span></div>
                    <em>单买价¥{{goodsData.price}}</em>
                </div>
            </div>
        </div>

        <div class="goods-group">
            <div :class="['group-list',{'list-active1':groupDetails.user_number == 2,'list-active':groupDetails.user_number == 3}]">
                <div class="group-item" v-for="(item, index) in groupDetails.users" :key="index">
                    <div class="img"><img :src="item.avatar" alt=""></div>
                    <div class="tag" v-if="index == 0">团长</div>
                </div>
                <div class="group-item active" v-for="(item, index) in ((groupDetails.user_number - groupDetails.users.length) || [])" :key="'active' + index">
                    <img src="../assets/images/doubt.png" alt="">
                </div>
            </div>
            <div class="goods-time">
                <img src="../assets/images/remind.png" alt="">拼团中，还差<span>{{(groupDetails.user_number - groupDetails.current_number) || 0}}人</span>，<van-count-down v-if="groupDetails.t_id" :time="(groupDetails.expire_time - groupDetails.create_time) * 1000" />后结束
            </div>
            <div class="goods-submit" @click="showPopup" v-if="groupDetails.is_my == 0">参与拼团</div>
            <div class="goods-submit" @click="onShare" v-if="groupDetails.is_my == 1">邀请拼团</div>
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
                <div class="goods-item" v-for="(item, index) in groupList" :key="index">
                    <div class="img"><img :src="item.image && item.image[0]" alt=""></div>
                    <div class="content">
                        <div class="title">{{item.title}}</div>
                        <div class="price">单买价¥{{item.price}}</div>
                        <div class="money"><em>{{item.user_number}}人团</em>￥<span>{{item.price_tuan}}</span></div>
                        <div class="submit" @click="onLinkDetails(item.course_id,item.type)">去开团</div>
                    </div>
                </div>
            </div>
        </div>

        <van-popup v-model="popupStatus" round :safe-area-inset-bottom="true" position="bottom">
            <div class="sku-content">
                <div class="sku-header">
                    <img :src="goodsData.image && goodsData.image[0]" alt="">
                    <div class="price">
                        <div class="title"><span>{{goodsData.title}}</span></div>
                        <div class="money"><span>￥{{ goodsData.price_tuan }}</span><em>单买价￥{{ goodsData.price }}</em></div>
                    </div>
                </div>

                <div class="submit" @click="onSubmit">
                    确认
                </div>
            </div>
        </van-popup>

        <van-overlay :show="overlayStatus" @click="hideOverlay">
            <div class="wrapper" @click.stop>
                <div class="tuan-wrapper">
                    <div class="tuan-status"><img src="../assets/images/select.png" alt=""><span>{{tuanStatus == 0 ? '已支付' : '拼团成功'}}</span></div>
                    <div :class="['group-list',{'list-active1':groupDetails.user_number == 2,'list-active':groupDetails.user_number == 3}]">
                        <div class="group-item" v-for="(item, index) in groupDetails.users" :key="index">
                            <div class="img"><img :src="item.avatar" alt=""></div>
                            <div class="tag" v-if="index == 0">团长</div>
                        </div>
                        <div class="group-item active" v-for="(item, index) in ((groupDetails.user_number - groupDetails.users.length) || [])" :key="'active' + index">
                            <img src="../assets/images/doubt.png" alt="">
                        </div>
                    </div>
                    <div class="goods-time" v-if="tuanStatus == 0">
                        <img src="../assets/images/remind.png" alt="">拼团中，还差<span>{{(groupDetails.user_number - groupDetails.current_number) || 0}}人</span>，<van-count-down v-if="groupDetails.t_id" :time="groupDetails.expire_time * 1000" />后结束
                    </div>
                    <div class="tuan-share" @click="onLink">{{tuanStatus == 0 ? '邀请好友拼团' : '继续逛逛'}}</div>
                    <div class="tuan-link" @click="onLinkOrder"><span>查看订单</span><van-icon name="arrow" /></div>
                </div>
            </div>
        </van-overlay>
        <WxShare :show="wxShare" @toShare="toShare" />
    </div>
</template>

<script>
import WxShare from '@/components/wxshare.vue'
import config from '@/utils/config'
import getSitem from '@/utils/storage'
export default {
  data() {
        return {
            tuanStatus:1,//1是拼团成功 0 是支付成功
            overlayStatus:false,
            popupStatus:false,
            goodsNum:1,
            skuIndex:-1,
            skuList:[],
            goodsData:{},
            groupId:0,
            groupDetails:{
              users:[]
            },
            groupList:[],
            wxShare: false
        }
  },
  mounted () {
    alert(getSitem.getStr('mobile'))
    if(!getSitem.getStr('mobile')){
          this.$router.push({name:'Login'})
    }else {
      alert('111')
    }

    const {tuanStatus,id} = this.$route.query
    this.groupId = id
    this.tuanStatus = tuanStatus;
    this.goodsTuan()

    // if(typeof tuanStatus == 'string'){
    //     setTimeout(() => {
    //         this.overlayStatus = true;
    //     },500)
    // }

  },
  components: {
    WxShare
  },
  methods:{
      wxs (title,description,image) {
          var data = {
            url:location.href
          }
          var that = this
          let shareurl = config.baseurl + '/coursegroupdetails?id=' + that.groupId
          const agent = navigator.userAgent
          const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
          if(isiOS){
            data.url = config.shareurls
          }
          this.$api.userGetSignPackage(data).then((res) => {
            if (res.code === 1) {
              var wxpay = res.data
              wx.config({
                debug: true,
                appId: wxpay.appId,
                timestamp: wxpay.timestamp,
                nonceStr: wxpay.nonceStr,
                signature: wxpay.signature,
                jsApiList: [
                  'checkJsApi',
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'chooseImage',
                  'uploadImage',
                  'getLocalImgData'
                ]
              })
              wx.error(function (res) {
                console.log('出错了：' + res.errMsg)
              })
              // 在这里调用 API
              wx.ready(function () {
                wx.checkJsApi({
                  jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'chooseImage',
                    'uploadImage',
                    'getLocalImgData'
                  ],
                  success: function (res) {

                  }
                })
              })

              // 点击分享到朋友圈
              wx.onMenuShareTimeline({
                title: title, // 分享标题
                desc: description, // 分享描述
                link: config.gourl + encodeURIComponent(shareurl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: image, // 分享图标
                trigger: function (res) {
                  that.wxShare = false
                  // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
                  alert('用户点击分享到朋友圈')
                },
                success: function () {
                  that.wxShare = false
                  // 用户确认分享后执行的回调函数
                  alert('分享成功')
                },
                cancel: function () {
                  that.wxShare = false
                  // 用户取消分享后执行的回调函数
                  alert('分享取消')
                },
                fail: function (res) {
                  alert(JSON.stringify(res))
                }
              })
              wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: description, // 分享描述
                link: config.gourl + encodeURIComponent(shareurl), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: image, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                  that.wxShare = false
                  // 用户确认分享后执行的回调函数
                  // alert('分享成功');

                },
                cancel: function () {
                  that.wxShare = false
                  // 用户取消分享后执行的回调函数
                  // alert('分享取消');
                }
              })

            }
          })

      },
      toShare () {
        this.wxShare = false
      },
      onShare () {
        this.wxShare = true
      },
      onLink(){
          if(this.tuanStatus == 1){
              this.$router.push({
                path:'/shopHome'
            })
          }
      },
      onLinkOrder(){
          this.$router.push({
                path:'/courseorderlist'
            })
      },
        hideOverlay(){
            this.overlayStatus = false;
        },
        onLinkDetails(id,type){
            var path = ''
            if(type == 2){
              path = '/onlineCourseDetail'
            }else if(type == 3) {
              path = '/offcoursedetail'
            }
            this.$router.push({
                path: path,
                query:{
                    id
                }
            })
        },
        goodsTuan(){
            this.$toast.loading({
                duration:0,
                message: '加载中...',
                forbidClick: true
            });
            this.$api.courseTuanIndex({t_id:this.groupId}).then((res) => {
                this.$toast.clear();
                if(res.code == 1){
                    this.groupDetails = res.data;
                    this.goodsData = res.data.course || {};
                    this.skuList = res.data.goods ? res.data.goods.specs : [];
                    this.groupList = res.data.hot || [];
                    var obj = res.data.course
                    var title = obj.title
                    var description = obj.description
                    var image = obj.image ? obj.image[0] : ''
                    console.log(title,description,image)
                    this.wxs(title,description,image)
                }
            })
        },
        onSkuClick(index){
            if(this.skuIndex == index){
                this.skuIndex = -1;
            }else{
                this.skuIndex = index;
            }
        },
        onSubmit(){
            this.goodsOrderCreate(2)
        },
        showPopup(){
            this.popupStatus = true;
        },
        goodsOrderCreate(type){
            //参加拼团到支付页面
            const param = {
                type,
                tid:this.groupId,
                courseId:this.groupDetails.course_id
            }
            this.$router.push({
                path:'/submitcourseorder',
                query:param
            })
        }

  }
}

</script>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .tuan-wrapper{
    width: 600px;
    height: 585px;
    background-color: #fff;
    border-radius: 15px;
    padding: 40px;
    .tuan-status{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 50px;
        img{
            width: 40px;
            height: 40px;
        }
        span{
            color: #6D8160;
            font-size: 30px;
            margin-left: 10px;
        }
    }
    .tuan-share{
        width: 435px;
        height: 88px;
        line-height: 88px;
        text-align: center;
        border-radius: 50px;
        color: #F3D995;
        font-size: 36px;
        margin: 0 auto;
        margin-top: 70px;
        margin-bottom: 35px;
        background: #6B8162;
    }
    .tuan-link{
        color: #333333;
        font-size: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
  }
}
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
.list-active1{
    width: 300px;
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
    margin-left: auto;
    margin-right: auto;
}
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
        padding: 0px 30px;
        padding-top: 60px;
        padding-bottom: 60px;

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
                        width: 5.7rem;
                        color: #333333;
                        font-size: 32px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
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

    .sku-content{
        padding: 45px 35px 25px 35px;
        .sku-header{
            display: flex;
            align-items: center;
            margin-bottom: 50px;
            width:100%;
            img{
                width: 200px;
                height: 150px;
            }

            .price{
                width: calc( 100% - 200px);
                margin-left: 20px;
                .title{
                  font-size: 36px;
                  color:#333;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                 }
                .money{
                    span{
                        color: #995258;
                        font-size: 30px;
                        font-weight: 500;
                    }
                    em{
                        color: #999999;
                        font-size: 26px;
                        text-decoration: line-through;
                        margin-left: 10px;
                        font-style: normal;
                    }
                }
                .attri{
                    color: #333333;
                    font-size: 24px;
                }
            }
        }
        .sku-row{
            .sku-title{
                color: #333333;
                font-size: 26px;
                margin-bottom: 20px;
                margin-top: 20px;
            }
            .sku-list{
                display: flex;
                .sku-item{
                    padding: 12px 26px;
                    border-radius: 6px;
                    border: 1Px solid #E3E3E3;
                    font-size: 24px;
                    color: #333333;
                    margin-right: 20px;
                    cursor: pointer;
                    transition: all .3s;
                }
                .active{
                    border-color: #CDA871;
                    color: #CDA871;
                }
                /deep/ .van-stepper{
                    border: 1Px solid #D3D3D3;
                    border-radius: 6px;
                     .van-stepper__minus, .van-stepper__plus{
                        width: 80px;
                        height: 55px;
                        background: #fff;
                        &::before{
                            width: 13Px;
                            height: 1Px;
                        }
                        &::after{
                            width: 1Px;
                            height: 13Px;
                        }
                    }
                    input{
                        width: 115px;
                        margin: 0px;
                        height: 100%;
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
        .submit{
            width: 100%;
            height: 90px;
            text-align: center;
            line-height: 90px;
            color: #F3D995;
            font-size: 36px;
            background:url('../assets/images/buy-bg.png') 100%/100% no-repeat;
            margin-top: 40px;
        }
    }
}
</style>
