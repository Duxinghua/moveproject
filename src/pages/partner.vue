<template>
    <div class="afterorder">
      <div class="after1" >
        <span>姓名</span>
        <input v-model="name" placeholder="请输入姓名" />
        <span>手机号</span>
        <input v-model="mobile" placeholder="请输入手机号" />
        <span>备注</span>
        <textarea v-model="remark" placeholder="请输入"></textarea>
        <div class="btn" @click="submit">确定提交</div>
      </div>
    </div>
</template>

<script>
import getSitem from '@/utils/storage'
export default {
  name: 'Partner',
  data () {
    return {
      order_id: '',
      name: '',
      mobile: '',
      remark: '',
      is_aftersale: '',
      detail: {}
    }
  },
  components: {

  },
  mounted () {
  },
  methods: {
    submit () {
      if (!getSitem.checkName(this.name)) {
        this.$dialog.alert({
          title: '',
          message: '请输入姓名'
        }).then(() => {
        })
        return true
      }
      if (!getSitem.checkPhone(this.mobile)) {
        this.$dialog.alert({
          title: '',
          message: '请输入手机号'
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
        username: this.name,
        phone: this.mobile,
        remark: this.remark
      }
      this.partnerApply(data)
    },
    async partnerApply (data) {
      var _this = this
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      var result = await this.$api.partnerApply(data)
      this.$toast.clear()
      if (result.code == 1) {
        this.$dialog.alert({
          title: '',
          message: result.msg
        }).then(() => {
          this.$router.push({name: 'My'})
        })
      } else {
        this.$dialog.alert({
          title: '',
          message: result.msg
        }).then(() => {
          this.$router.push({name: 'My'})
        })
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
    textarea,input{
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
    input{
      height: 100px;
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
