<template>
  <div class="topmenu">
    <div class="heightwrap"></div>
    <div class="tcontent" @click="goback">
      <van-icon name="arrow-left" size="20" color="#565657" />
      <span class="menutext">{{menu}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    menu:{
      type:String,
      default:'默认菜单'
    },
    path:{
      type:String,
      default:''
    }

  },
  methods:{
    goback(){
      //  this.$router.go(-1);
      console.log(this.path,'path')
      // return
     localStorage.setItem("sCar",0)
    //  this.$router.push("/"+this.path)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.topmenu{
  width:100%;
  height:100px;
  display: flex;
  box-sizing: border-box;
  background: white;
  .heightwrap{
    width:100%;
    height:100px;
  }
  .tcontent{
    position: fixed;
    left:0;
    top:0;
    width:100%;
    height:100px;
    z-index: 900;
    background: white;
    box-shadow: 0 0 1px rgba(0,0,0,0.25);
    transition: background-color 0.3s ease-in-out;
    display: flex;
    align-items: center;
    padding:0 30px;
    box-sizing: border-box;
    .menutext{
      font-size: 28px;
      color:#000000;
      width:calc(100% - 60px);
      display: flex;
      justify-content: center;
    }
  }
}
</style>
