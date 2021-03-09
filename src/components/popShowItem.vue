<template>
          <van-popup
      type='center'
      round
      v-model="popshow"
      style="width:73%"
    >
      <div class="uni-tip">
        <div class="uni-top">
          <p class='uni-text'>温馨提示</p>
          <p class='uni-content'>选择线下付款，平台不承担任何责任</p>
        </div>
        <div class='uni-btn'>
          <span
            class="btns_cancel"
            @click='cal'
          >取消</span>
          <span
            class="btns"
            @click='contact'
          >确定</span>
        </div>
      </div>
    </van-popup>

</template>

<script>
export default {
  data(){
    return{
      popshow:false,
      current_id:''
    }
  },
  methods:{
    cal() {
      this.popshow = false;
      this.$toast("取消支付");
      this.$emit("update", 1);
    },
    contact() {
      var that = this;
      this.$api
        .orderPayOffLine({
          seqId: that.current_id,
          payType: "OFF_LINE",
        })
        .then((res) => {
          if (res.code == 200) {
            that.popshow = false;
            that.$toast("支付成功");
            that.$emit("update", 1);
          } else {
            that.$toast("支付失败");
          }
        });
    },

  }
}
</script>

<style lang="scss" scoped>
  .uni-tip {
    background-color: #fff;
    width: 100%;
    margin: 0 auto;
    border-radius: 26px;

    .uni-top {
      padding: 20px 30px 50px 30px;

      .uni-text {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 36px;
      }

      .uni-content {
        padding: 0 50px;
        font-size: 32px;
        color: #4c4c4c;
        line-height: 48px;
      }
    }

    .uni-btn {
      overflow: hidden;
      border-radius: 0px 0px 13px 13px;
      border: none;
      text-align: center;
      display: flex;
      font-size: 30px;
      .btns {
        background-color: #28ae3a;
        color: #fff;
        width: 50%;
        height: 90px;
        line-height: 90px;
      }

      .btns_cancel {
        background-color: #f5f6f7;
        color: #888889;
        width: 50%;
        height: 90px;
        line-height: 90px;
      }
    }
  }
  .btn {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    padding: 30px 30px 20px 30px;
    z-index: 2;
    width: 100%;

    span {
      background-color: #28ae3a;
      height: 76px;
      border-radius: 40px;
      line-height: 76px;
      text-align: center;
      color: #fff;
    }
  }

</style>
