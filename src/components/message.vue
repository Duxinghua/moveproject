<template>
    <div class="submit-order-reconfirm" v-if="reShow">
      <div class="re-mb" @click="onHandler"></div>
      <div class="re-body">
        <div class="pt">友情提示</div>
        <div class="pb" v-html="tipText"></div>
        <div  class="btns">
          <!-- <span @click="cancelHandler">取消</span> -->
          <span @click="onHandler">知道了</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Message',
  props: ['reShow', 'tipText'],
  methods: {
    onHandler () {
      this.$emit('onClose', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-order-reconfirm{
    .re-mb{
      position: fixed;
      left: 0;
      top: 0;
      z-index: 999;
      background: rgba(1,1,1,0.6);
      width: 100%;
      height: 100%;
    }
    .re-body{
      position: fixed;
      margin: auto;
      left: 0;
      right: 0;
      top: 345px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      // transform: translate(-30%,-50%);
      width: 578px;
      height: auto;
      padding: 35px 0;
      background: #FFFFFF;
      border-radius: 12px;
      z-index: 1000;
      .pt{
        font-size: 32px;
        color: #333333;
        margin-bottom:25px;
      }
      .pb{
        font-size: 26px;
        padding-left:26px;
        padding-right:26px;
        color: #333333;
        width: 578px;
        max-height: 450px;
        overflow: hidden;
        overflow-y: scroll;
      }
      .btns{
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top:25px;
        span{
          width: 209px;
          height: 72px;
          line-height: 72px;
          text-align: center;
          font-size: 30px;
          border-radius: 36px;
          border: 2px solid #E3E3E3;
          color: #999999;
          background-color: #fff;
          margin: 0 13px;
        }
        :last-child{
          border: 1Px solid #CDAA79;
          // background-color: #738666;
          color: #CDAA79;
        }
      }
    }
}
</style>
