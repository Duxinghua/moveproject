<template>
  <div class="huabanTzfp">
    <div class="huabanTzfp-top">
      <input type="text" class="huabanTzfp-top-input" placeholder="请输入标题内容…">
      <textarea placeholder="请输入帖子内容…"  class="huabanTzfp-top-textarea"/>
      <span>添加图片（{{imgList.length}}/3）</span>
      <div class="huabanTzfp-top-uploads">
        <div class="uploadimgs-wrap" v-for="(item,index) in imgList" :key="index" @click="delImg(index)">
          <img :src="item.l" class="uploadimgs" alt="">
          <img src="../assets/images/uploadcloses.png" class="uploadclose" alt="">
        </div>
        <div class="uploadimgs-wrap uploadborder" @click="chooseImage" v-if="imgList.length < 3">
          <img src="../assets/images/uploadmores.png" class="uplaodmores" alt="" />
        </div>
      </div>
    </div>
    <div >
      <ul>
        <li v-for="(item,index) in imgList" :key="index">{{item.s}}
        </li>
      </ul>
    </div>
    <div class="huabanTzfp-btn" @click="postSave">确认发布</div>
  </div>
</template>

<script>
import config from '@/utils/config'
export default {
  name: 'HuabanTzfp',
  data () {
    return {
      num: 3,//上传数量
      localIds: [],
      imgList: []
    }
  },
  mounted () {
    var data = {
      url:location.href
    }
    const agent = navigator.userAgent
    const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if(isiOS){
      data.url = config.shareurls
    }
    alert(data.url)
    this.$api.userGetSignPackage(data).then((res) => {
      if (res.code === 1) {
        var wxpay = res.data
        this.$wx.config({
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
        this.$wx.error(function (res) {
          console.log('出错了：' + res.errMsg)
        })
        // 在这里调用 API
        this.$wx.ready(function () {
          this.$wx.checkJsApi({
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
  methods: {
    postSave () {

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
        this.$wx.chooseImage({
          count: this.num, // 默认9
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
      this.$toast('uploadImage')
      var _this = this
      this.$wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            _this.$toast('serverId')
            alert(res.serverId)
            _this.getImgData(localId,serverId)
          }
      })
    },
    getImgData (localId,serverId) {
      const agent = navigator.userAgent
      const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
      var _this = this
      this.$api.commonwxUpload({id:serverId}).then((res)=>{
          alert(JSON.stringify(res))
          alert(res.msg)
      })
      if(isiOS){
        this.$wx.getLocalImgData({
              localId: localId, // 图片的localID
              success: function (res) {
                  var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                  localData = localData.replace('jgp', 'jpeg');
                  _this.imgList.push({l:localData,s:serverId})
              }
        });
      }else{
        _this.imgList.push({l:localId,s:serverId})
      }
      _this.num --
    }

  }
}
</script>

<style lang="scss" scoped>
.huabanTzfp{
  background:#FBF8F4;
  display: flex;
  flex-direction: column;
  padding-top: 26px;
  height:100vh;
  &-top{
    width:700px;
    height:768px;
    padding:25px;
    margin:0 auto;
    background:white;
    border-radius: 12px;
    &-input{
      height:88px;
      font-size:28px;
      font-weight:500;
      line-height:88px;
      margin-bottom: 18px;
      width:650px;
      border-radius:12px;
      border:2px solid rgba(241, 241, 241, 1);
    }
    &-textarea{
      width:650px;
      height:311px;
      resize:none;
      font-size:28px;
      border-radius:12px;
      margin-bottom: 28px;
      border:2px solid rgba(241, 241, 241, 1);
    }
    span{
      color:#999999;
      font-size: 26px;
      display: flex;
      margin-bottom: 28px;
    }
    &-uploads{
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      .uploadimgs-wrap{
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
  }
  &-btn{
    width:677px;
    height:88px;
    font-size: 36px;
    line-height: 88px;
    text-align: center;
    border-radius: 36px;
    background:#6D8160;
    color:#F3D995;
    margin:78px auto auto auto;
  }
}
</style>
