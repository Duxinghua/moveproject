<template>
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
    <van-uploader v-model="fileList" multiple  :max-count="9" :after-read="afterRead"  />
  </div>
  <van-button type="primary" size="small" round block @click="messageHandler">确定</van-button>
  </div>
</template>

<script>
export default {
  name:'Ordernote',
  data(){
    return {
      remarks:'',
      fileList:[],
      orderType:2
    }
  },
  mounted(){
    this.orderType = localStorage.getItem('orderType')
  },
  methods:{
    messageHandler(){
      // if(!this.remarks.length){
      //    this.$toast('请输入订单备注信息');
      //    return
      // }
      localStorage.setItem('remarks',this.remarks)
      this.$router.push({ path: "/confirmorder" ,query:{remarks:this.remarks}});
    },
    afterRead(e){
      console.log(e)
    }
  }
}
</script>

<style lang="scss" scoped>
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
