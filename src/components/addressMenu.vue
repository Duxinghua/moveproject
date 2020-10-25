<template>
<div class="addressnemu">
    <div class="menu">
        <div class="adleft">
          <div class="addr">
            {{adretext}}
          </div>
          <van-icon name="arrow-down" />
        </div>
        <div class="adright">
          <van-icon
            name="circle"
            color="#28ae3a"
          />
          <van-field v-model="address" maxlength="500" :clearable="true" :readonly="adreadonly" label="" :placeholder="addressplaceholder" @input="addressInput"/>
        </div>
    </div>
    <div class="aheight">
    </div>
</div>
</template>

<script>
export default {
  name:'addressMessage',
  props:{
    adretext:{
      type:String,
      default:'武汉'
    },
    adreadonly:{
      type:Boolean,
      default:true
    },
    addressplaceholder:{
      type:String,
      default:'从哪儿发'
    }
  },
  data(){
    return {
      address:''
    }
  },
  methods:{
    addressInput(e){
      this.$emit('addressInput',this.address)
    }
  }
}
</script>

<style lang="scss" scoped>
.addressnemu{
  display: flex;
  flex-direction: column;
  height:100px;
  .menu {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    height: 100px;
    padding: 0 30px;
    box-sizing: border-box;
    background: white;
    position: fixed;
    left:0;
    // top:0;
    z-index: 300000;
    .adleft {
      width: 160px;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      position: relative;
      .addr {
        font-size: 18px;
      }
      /deep/ .van-icon {
        font-size: 28px;
      }
    }
    .adleft::after{
      position: absolute;
      right:0;
      top:50%;
      transform: translateY(-50%);
      width:1px;
      height:60%;
      background:#f5f4f4;
      content:'';
    }
    .adright {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-left:30px;
      box-sizing: border-box;
      flex:1;
      /deep/ .van-icon {
        font-size: 28px;
        font-weight: bold;
      }
    }
  }
  .aheight{
    width:100%;
    height:100px;
    background:transparent;
  }
}
</style>
