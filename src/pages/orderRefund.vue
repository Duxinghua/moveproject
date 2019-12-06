<template>
  <div class="orderdetail">
    <div class="orderdetail-top">
      <span class="tip">申请退款</span>
      <div class="orderlist">
        <div class="ordercontent" v-for="(goodsitem,index) in order_detail.goods" :key="index">
            <img :src="goodsitem.images" alt="">
            <div class="ordercenter">
              <div class="ol">
                <span class="s1">{{goodsitem.goods_name}}</span>
                <span class="s1 s2">{{goodsitem.specs}}</span>
                <div><span class="s3">¥</span><span class="s4">{{goodsitem.price}}</span></div>
              </div>
              <span class="s5">x {{goodsitem.goods_num}}</span>
            </div>
        </div>
      </div>
      <textarea placeholder="请输入退货原因…"  class="orderdetail-top-textarea" v-model="contents"/>
      <div class="orderdetail-top-price">退款金额：<span>¥{{order_detail.price_pay}}</span></div>
      <span class="orderdetail-top-span">上传凭证（{{imgList.length}}/3）</span>
      <div class="orderdetail-top-uploads">
        <div class="uploadimgs-wrap" v-for="(item,index) in imgList" :key="index" @click="delImg(index)">
          <img :src="item.l" class="uploadimgs" alt="">
          <img src="../assets/images/uploadcloses.png" class="uploadclose" alt="">
        </div>
        <div class="orderdetail-wrap uploadborder" @click="chooseImage" v-if="imgList.length < 3">
          <img src="../assets/images/uploadmores.png" class="uplaodmores" alt="" />
        </div>
      </div>
    </div>


    <div class="orderdetail-btn" @click="postSave">确认提交</div>
  </div>
</template>

<script>
import config from '@/utils/config'
export default {
  name: 'OrderRefund',
  data () {
    return {
      order_id: null,
      order_detail: {},
      num: 3,//上传数量
      localIds: [],
      imgList: [],
      contents: ''
    }
  },
  created () {
    var data = {
      url:location.href
    }
    const agent = navigator.userAgent
    const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if(isiOS){
      data.url = config.shareurls
    }
    this.$api.userGetSignPackage(data).then((res) => {
      if (res.code === 1) {
        var wxpay = res.data
        wx.config({
          debug: false,
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

      }
    })
  },
  mounted () {
    this.order_id = this.$route.query.id
    this.getDetail()
  },
  methods: {
    postSave () {
      var images = []
      var _this = this
      if(!this.contents){
        this.$toast('请输入原因')
        return
      }
      this.imgList.map((item)=>{
          images.push(item.url)
      })

      var params = {
        description:this.contents,
        order_id:this.order_id,
        images:images.join()
      }
      // alert(JSON.stringify(params))
      this.$api.goodsStoreRefund(params).then((res)=>{
        if(res.code === 1){
          _this.$toast({
            message:res.msg,
            onClose: ()=>{
              _this.$router.push({name:'OrderList'})
            }
          })
        }else{
          _this.$toast(res.msg)
        }
      })


    },
    getDetail () {
      this.$api.goodsOrderIndex({order_id:this.order_id}).then((res)=>{
        if(res.code === 1) {
          this.order_detail = res.data
        }
      })
    },
    delImg (index) {
      this.imgList.splice(index,1)
      this.localIds.splice(index,1)
      this.num = this.imgList
      console.log(this.imgList,'imgList')
    },
    chooseImage () {
      var _this = this
      if(this.imgList.length < 4){
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            _this.localIds = res.localIds
            _this.localIds.map((item)=>{
              _this.uploadImage(new String(item).toString())
            })
          }
        })
      }else{
        this.$toast('只能上传三张')
      }
    },
    uploadImage (localId) {
      // this.$toast('uploadImage')
      var _this = this
      wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            // _this.$toast('serverId')
            // // alert(res.serverId)
            _this.getImgData(localId,serverId)
          }
      })
    },
    getImgData (localId,serverId) {
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      var _this = this
      this.$api.commonwxUpload({id:serverId}).then((result)=>{
          if(result.code === 1){
            _this.$toast({
              message:result.msg,
              onClose: ()=>{
                      if(isiOS){
                        wx.getLocalImgData({
                              localId: localId, // 图片的localID
                              success: function (res) {
                                  var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                                  localData = localData.replace('jgp', 'jpeg');
                                  _this.imgList.push({l:localData,s:serverId,url:result.data.url})
                              }
                        });
                      }else{
                        _this.imgList.push({l:localId,s:serverId,url:result.data.url})
                      }
                      _this.num --
              }
            })
          }else{
            _this.$toast(result.msg)
          }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.orderdetail{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FBF8F4;
  &-btn{
    width:677px;
    height:88px;
    font-size: 36px;
    line-height: 88px;
    text-align: center;
    border-radius: 44px;
    background:#6D8160;
    color:#F3D995;
    margin:50px auto;
  }
  &-top{
   display: flex;
   flex-direction: column;
   background:white;
   padding:26px 26px 0px 26px;
     &-textarea{
      margin-top:42px;
      width:100%;
      padding:10px;
      height:311px;
      resize:none;
      outline:none;
      font-size:28px;
      border-radius:12px;
      margin-bottom: 28px;
      border:2px solid rgba(241, 241, 241, 1);
    }
    &-price{
      font-size: 30px;
      color:#333;
      padding-bottom: 40px;
      border-bottom: 2px solid #F3F3F3;
      span{
        font-size: 36px;
        color:#995258;
      }
    }
    &-span{
      font-size: 26px;
      color:#999;
      padding:20px 0;
    }
    &-uploads{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding-bottom: 40px;
      .orderdetail-wrap{
        width:157px;
        height:157px;
        position: relative;
        margin-right:25px;
        display: flex;
        .uploadimgs{
          width:157px;
          height:157px;
        }
        .uploadclose{
          width:36px;
          height:36px;
          position: absolute;
          right:10px;
          top:10px;
        }
        .uplaodmores{
          width:73px;
          height:73px;
          margin:auto;
        }

      }
      .uploadborder{
        width:157px;
        height:157px;
        border:1px solid #D2D2D2;
      }
    }
    .tip{
      font-size:30px;
      color:#333;
      padding:30px 0;
    }
    .orderwlinfo{
      display: flex;
      flex-direction: row;
      padding-bottom: 26px;
      border-bottom: 1px solid #F3F3F3;
      img{
        width:91px;
        height:91px;
        margin-right:35px;
      }
      .orderwl{
        display: flex;
        flex-direction: column;
        span:nth-child(1){
          font-size: 30px;
          color:#333;
          margin-top:13px;
        }
        span:nth-child(2){
          font-size: 24px;
          color:#999;
        }
      }
    }
    .orderlist{
      display: flex;
      width:100%;
      flex-direction: column;
      .ordercontent{
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding:30px 0px;
            width:100%;
            // border-bottom:1px solid #F3F3F3;
            img{
              width:156px;
              height:130px;
              border-radius: 8px;
              margin-right:15px;
            }
            .ordercenter{
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              width: calc(100% - 171px);
              position: relative;
              .ol{
                display: flex;
                flex-direction: column;
                font-size: 30px;
                width:400px;
                .s1{
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .s2{
                  font-size: 26px;
                  color:#999999;
                  margin-top:10px;
                }
                .s3{
                  color:#995258;
                  font-size: 24px;
                }
                .s4{
                  color:#995258;
                  font-size: 34px;
                }
              }
            }
            .s5{
              font-size: 28px;
              color:#333;
            }
      }
    }
    .orderItem{
      font-size: 26px;
      color:#666;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 20px 0px;
      align-items: center;
      border-bottom: 1px solid #F3F3F3;
      position: relative;
              .btn{
                width:146px;
                height:58px;
                background:rgba(255,255,255,1);
                border:2px solid rgba(205, 168, 113, 1);
                border-radius:29px;
                text-align: center;
                line-height: 58px;
                color:rgba(205, 168, 113, 1);
                font-size: 30px;
                position:absolute;
                right: 0;
                top: 50%;
                transform: translateY(-50%)
              }
    }
    .orderItemfix{
      height:100px;
    }
    .total{
      padding:30px 0;
      font-size: 32px;
      span:nth-child(1){
        color:#333;
      }
      span:nth-child(2){
        color:#6D8160
      }
      border-bottom: 1px solid transparent;
    }
  }

  &-content{
    display: flex;
    flex-direction: column;
    background:white;
    padding:0px 26px;
    margin-top:15px;
    .header{
      padding:26px 0;
      color:#6D8160;
      font-size: 36px;
      position: relative;
      span{
        width: fit-content;
        position: absolute;
        left:0;
        top:50%;
        transform: translate(0%,-50%);
      }
      span::before{
        position: absolute;
        content: '';
        height: 16px;
        width:100%;
        background:#EEF1EC;
        border-radius: 8px;
        left:0;
        bottom: 0;
        z-index: -1;
      }
    }
    .address{
      font-size: 26px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding:26px 0px;
      border-bottom: 1px solid #F3F3F3;
      span:nth-child(1){
        color: #999999;
        width:150px;
      }
      .infos{
        display: flex;
        flex-direction: column;
        span{
          color:#333333;
          font-size: 26px;
          line-height: 42px;
        }
      }
    }
    .orderother{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      font-size: 26px;
      padding:20px 0px;
      align-items: center;
      border-bottom: 1px solid #f3f3f3;
      span:nth-child(1){
        width:150px;
        color:#999999;
      }
      span:nth-child(2){
        color:#333333;
      }
    }

  }
  &-btns{
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin:44px 0px;
    span{
      width:250px;
      height:86px;
      border-radius:43px;
      font-size: 36px;
      text-align: center;
      line-height: 86px;
      margin:0px 11px;
    }
    .cancel{
      background:white;
      color:#999999;
    }
    .success{
      background:#738666;
      color:#F3D995;
    }
    .repay{
      background:#738666;
      color:#F3D995;
      width:90%;
    }
  }
}
</style>
