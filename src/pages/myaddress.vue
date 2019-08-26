<template>
  <div class="myaddress">
    <div class="myacontent">
      <van-cell-group>
        <van-field
          v-model="username"
          label="收货人"
          type="textarea"
          placeholder="请填写"
          rows="1"
          autosize
        />
      </van-cell-group>
      <van-cell-group>
        <van-field
          v-model="phone"
          label="手机号"
          type="textarea"
          placeholder="请填写"
          rows="1"
          autosize
        />
      </van-cell-group>
      <div class="zonesel">
        <van-cell-group class="zonesel-van">
          <van-field
            v-model="zone"
            label="所在地区"
            type="textarea"
            placeholder="请填写"
            rows="1"
            autosize
          />
        </van-cell-group>
        <img class="addnext" src="../assets/images/addressnext.png" />
      </div>
      <van-cell-group>
        <van-field
          v-model="address"
          label="详细地址"
          type="textarea"
          placeholder="请填写，如街道、楼栋、单元等等"
          rows="1"
          autosize
        />
      </van-cell-group>
    </div>
    <div class="myaoptions">
      <van-checkbox v-model="checked" checked-color="#9C3FA2">设为默认地址</van-checkbox>
    </div>
    <div class="mybtn">
      保存
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      phone: '',
      zone: '',
      address: '',
      checked: true
    }
  }

}
</script>

<style>
.van-cell__title{
  font-size:32px;
  color:#666666;
}
.van-field__label{
  width:20%;
  padding:20px 0;
}
.van-cell__value{
  width:80%;
  padding:20px 0
}
.van-field__control{
  text-align: right;
}
.van-checkbox{
  flex-direction: row-reverse;
  width:100%;
}
.van-checkbox__icon--round .van-icon{
  border-radius: 0%;
}
.van-checkbox__label{
  font-size: 28px;
  color:#333333;
  width:95%;
}
.van-checkbox__icon{
  width:5%;
}
</style>
