<template>
    <div :class="['afterorder', is_aftersale == 2 ? 'afterbg' : '']" >
      <div class="after1" v-if="is_aftersale == 1">
        <span>售后描述</span>
        <textarea v-model="desc" placeholder="请输入"></textarea>
        <span>备注</span>
        <textarea v-model="remark" placeholder="请输入"></textarea>
        <div class="btn" @click="submit">确定提交</div>
      </div>
      <div class="after2" v-if="is_aftersale == 2">
        <span class="s1">售后描述</span>
        <div class="l1">{{detail.desc}}</div>
        <span class="s1">备注信息</span>
        <div class="l1">{{detail.remark}}</div>
        <div class="cs">
          <span class="s2">客服回复</span>
          <div class="l2">
            {{detail.reply}}
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
      order_id: '',
      desc: '',
      remark: '',
      is_aftersale: '',
      detail: {}
    }
  },
  components: {

  },
  mounted () {
    this.order_id = this.$route.query.id
    this.is_aftersale = this.$route.query.is_aftersale
    if (this.is_aftersale == 2) {
      this.afterSaleDetail({order_id: this.order_id})
    }
  },
  methods: {
    submit () {
      if (!this.desc) {
        this.$dialog.alert({
          title: '',
          message: '请输入描述'
        }).then(() => {
        })
        return true
      }
      if (!this.remark) {
        this.$dialog.alert({
          title: '',
          message: '请输入备注'
        }).then(() => {
        })
        return true
      }
      var data = {
        order_id: this.order_id,
        desc: this.desc,
        remark: this.remark
      }
      this.afterorder(data)
    },
    async afterorder (data) {
      var _this = this
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      var result = await this.$api.afterSaleGoods(data)
      this.$toast.clear()
      if (result.code == 1) {
        this.$dialog.alert({
          title: '',
          message: result.msg
        }).then(() => {
          _this.$router.go(-1)
        })
      } else {
        this.$toast(result.msg)
      }
    },
    async afterSaleDetail (data) {
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      const result = await this.$api.afterSaleDetail(data)
      this.$toast.clear()
      if (result.code == 1) {
        this.detail = result.data
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.afterorder {
  background: #fbf8f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding:30px;
  box-sizing: border-box;
  .after1{
    display: flex;
    flex-direction: column;
    span{
      font-size:32px;
      color:#333;
      margin-bottom: 20px;
    }
    textarea{
      resize:none;
      outline: none;
      font-size: 32px;
      line-height: 42px;
      height:200px;
      border:1px solid #cdcdcd;
      padding:15px;
      border-radius: 15px;
      box-sizing: border-box;
      margin-bottom: 20px;
    }
    .btn{
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
  }
  .after2{
    display: flex;
    flex-direction: column;
    .s1{
      font-size: 32px;
      font-weight: bold;
      color:#333;
      margin-bottom:15px;
    }
    .l1{
      font-size: 28px;
      line-height: 36px;
      display: inline-block;
      color:#333;
      margin-bottom: 15px;
    }
    .cs{
      display: flex;
      flex-direction: column;
      padding:30px;
      box-sizing: border-box;
      border-radius: 10px;
      min-height: 150px;
      .s2{
        font-size: 32px;
        font-weight: bold;
        color:#333;
        margin-bottom:15px;
      }
      .l2{
        font-size: 28px;
        line-height: 36px;
        display: inline-block;
        color:#333;
        margin-bottom: 15px;
        border:1px solid #cdcdcd;
        padding:15px;
      }
    }
  }
}
.afterbg{
  background: white;
}
</style>
