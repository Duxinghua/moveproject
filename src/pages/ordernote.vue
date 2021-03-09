<template>
<div class="orderwrap">
  <TopNav :menu="menutext"/>
  <div class="ordernote">

  <van-field
    v-model="remarks"
    rows="2"
    autosize
    label=""
    type="textarea"
    maxlength="200"
    placeholder="填写订单备注需求"
    show-word-limit
  />
  <div class="imgwrap" v-if="orderType == 2">
    <div class="imgtitle">
      上传搬家照片
    </div>
    <van-uploader capture="camera" accept="image"  v-model="fileList" multiple  :max-count="4" :after-read="afterRead" :before-delete="beforedelete"  />
  </div>
  <van-button type="primary" size="small" round block @click="messageHandler">确定</van-button>
  </div>
</div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  name:'Ordernote',
  components:{
    TopNav
  },
  data(){
    return {
      remarks:'',
      fileList:[],
      uploadimg:[],
      orderType:2,
      menutext:'订单备注'
    }
  },
  mounted(){
    this.orderType = localStorage.getItem('orderType')
    this.remarks = localStorage.getItem('remarks')
    var fileList = localStorage.getItem('fileList')
    if(fileList){
      fileList = JSON.parse(fileList)
      this.fileList = fileList
    }
  },
  methods:{
    messageHandler(){
      localStorage.setItem('remarks',this.remarks)
      if(this.orderType == 3){
        this.$router.push({ path: "/platformpricing" ,query:{remarks:this.remarks}});
      }else{
        this.$router.push({ path: "/confirmorder" ,query:{remarks:this.remarks}});
      }
    },
    afterRead(e,detail){
      console.log(detail)
      var data = new FormData();
      data.append('file', e.file)
      this.$api.appealimgUpload(data).then((result) => {
        if(result.code == 200){
          this.fileList[detail.index].viewUrl = result.data.viewUrl
          alert(1)
          localStorage.setItem('fileList',JSON.stringify(this.fileList))
        }else{
          alert(2)
          return this.$toast(result.msg)
        }
      })
    },
    beforedelete(e,detail){
      var index = detail.index
      this.fileList.splice(index,1)
    }
  }
}
</script>

<style lang="scss" scoped>
.orderwrap{
  display: flex;
  flex-direction: column;
}
.ordernote{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6f7;
  padding:30px;
  box-sizing: border-box;
  .imgwrap{
    display: flex;
    flex-direction: column;
      .imgtitle{
        font-size: 20px;
        color:#333333;
        margin-top:30px;
        margin-bottom: 30px;
      }
  }
  /deep/ .van-cell{
    border-radius: 20px;
    overflow: hidden;
  }
  /deep/ .van-button--small{
    position: fixed;
    left:30px;
    width:690px;
    bottom: 100px;
    height:80px;
  }
}
</style>
