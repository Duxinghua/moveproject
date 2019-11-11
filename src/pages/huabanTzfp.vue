<template>
  <div class="huabanTzfp">
    <div class="huabanTzfp-top">
      <input type="text" class="huabanTzfp-top-input" placeholder="请输入标题内容…">
      <textarea placeholder="请输入帖子内容…"  class="huabanTzfp-top-textarea"/>
      <span>添加图片（0/3）</span>
      <div class="huabanTzfp-top-uploads">
        <div class="uploadimgs-wrap">
          <img src="../assets/images/uploadimg.png" class="uploadimgs" alt="">
          <img src="../assets/images/uploadcloses.png" class="uploadclose" alt="">
        </div>
        <div class="uploadimgs-wrap">
          <img src="../assets/images/uploadimg.png" class="uploadimgs" alt="">
          <img src="../assets/images/uploadcloses.png" class="uploadclose" alt="">
        </div>
        <div class="uploadimgs-wrap uploadborder">
          <img src="../assets/images/uploadmores.png" class="uplaodmores" alt="" />
        </div>
      </div>
    </div>
    <div class="huabanTzfp-btn">确认发布</div>
  </div>
</template>

<script>
export default {
  name: 'HuabanTzfp',
  data () {
    return {

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
