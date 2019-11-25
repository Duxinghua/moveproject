<template>
  <div class="dotask">
    <div class="dotask-content">
      <textarea name="" id="" cols="30" rows="10" placeholder="请输入作业内容..."></textarea>
      <div class="upload-title">添加图片 （0/3）</div>
      <div class="upload-addImg">
        <div class="imgs">
          <img class="taskimg" src="../assets/images/taskAddImg.png" alt="">
          <img class="taskimg-close" src="../assets/images/taskimgclose.png" alt="">
          <img class="taskimg-bg" src="../assets/images/taskAddimgbg.png" alt="">
        </div>
        <div class="imgs">
          <img class="taskimg" src="" alt="">
          <img class="taskimg-close" src="" alt="">
          <img class="taskimg-bg" src="../assets/images/taskAddimgbg.png" alt="">
        </div>
      </div>
    </div>
    <div class="dotask-commit">
      确认发布
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoTask'
}
</script>

<style lang="scss" scoped>
.dotask{
  background: #F6F3EE;
  padding-bottom: 100px;
  min-height: 100vh;
  overflow-x: hidden;
  overflow: auto;
  &-content{
    width: 700px;
    height: 660px;
    background-color: #fff;
    margin: 28px 23px 80px;
    padding: 34px 25px 60px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    textarea{
      width: 650px;
      height: 310px;
      border: 1px solid #F1F1F1;
      border-radius: 10px;
      font-size: 28px;
      line-height: 38px;
      color: #999999;
      padding: 26px 18px;
    }
    .upload-title{
      width: 100%;
      font-size: 26px;
      color: #999999;
      margin-top: 40px;
      margin-bottom: 28px;
    }
    .upload-addImg{
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      .imgs{
        width: 157px;
        height: 157px;
        border: 1px solid #D2D2D2;
        margin-right: 25px;
        position: relative;
        .taskimg{
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        .taskimg-close{
          width: 36px;
          height: 36px;
          position: absolute;
          top: 3px;
          right: 10px;
          z-index: 1
        }
        .taskimg-bg{
          width: 73px;
          height: 73px;
          margin-top: 40px;
          margin-left: 38px;
        }
      }
    }
  }
  &-commit{
    width: 677px;
    height: 88px;
    line-height: 88px;
    border-radius: 44px;
    margin: 0 auto;
    background-color: #6D8160;
    font-size: 36px;
    color: #F3D995;
    text-align: center;
  }
}
</style>