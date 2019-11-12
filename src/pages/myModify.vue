<template>
  <div class="myModify">
    <div class="myModify-name">
      <span>修改昵称</span>
      <span>1-15个字，起个响亮的名字~</span>
      <div class="input-wrap">
        <input type="text" placeholder="花田喜事Hebe">
        <img src="../assets/images/input-close.png" alt="">
      </div>

    </div>
    <div class="myModify-name">
      <span>个人简介</span>
      <span>有意思的简介会吸引更多关注~</span>

      <textarea placeholder="走最多的路，看最好的风景，读最好的书~"/>


    </div>
    <div class="myModify-btn">
      确认修改
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyModify',
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.myModify{
  display: flex;
  flex-direction: column;
  &-name{
    display: flex;
    flex-direction: column;
    margin:77px 26px  0 26px;
    span:nth-child(1){
      color:#333333;
      font-size: 32px;
    }
    span:nth-child(2){
      font-size: 26px;
      color:#999999;
      margin-top:18px;
    }
    .input-wrap{
      width:698px;
      height:92px;
      position: relative;
      margin-top:30px;
      input{
          width: 100%;
          height:100%;
          border-radius: 12px;
          font-size: 28px;
          color:#333;
          padding-left:26px;
          padding-right:26px;
          border:2px solid #E3E3E3;
      }
      img{
        width:32px;
        height:32px;
        position: absolute;
        right:26px;
        top: 50%;
        transform: translateY(-50%)
      }
    }
    textarea{
      resize:none;
      width:698px;
      height:312px;
      border-radius: 12px;
      border:2px solid #E3E3E3;
      font-size: 28px;
      color:#333333;
      padding:26px;
    }
  }
  &-btn{
    width:677px;
    height:88px;
    line-height: 88px;
    border-radius: 44px;
    font-size: 36px;
    color:#F3D995;
    background:#708363;
    text-align: center;
    margin:130px auto auto auto;
  }
}
</style>
