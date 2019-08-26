<template>
  <div class="footer">
      <div class="menuitem">
        <img src="../assets/images/home.png" alt="" />
        <span>首页</span>
      </div>
      <div class="menuitem">
        <img src="../assets/images/sale.png" alt="" />
        <span><router-link to="/sale" >营销</router-link></span>
      </div>
      <div class="menuitem">
        <img src="../assets/images/xbr.png" alt="" />
        <span>新宝瑞</span>
      </div>
      <div class="menuitem">
        <img src="../assets/images/me.png" alt="" />
        <span>我的</span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.footer{
  position: fixed;
  width:100%;
  left:0;
  bottom:0;
  height:98px;
  background:white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-shadow:0px 0px 7px 0px rgba(0, 0, 0, 0.08);
}
.footer .menuitem{
  display: flex;
  flex-direction: column;
  width:25%;
  height:100%;
  justify-content: center;
  align-items: center;
}
.footer .menuitem img{
  width:44px;
  height:44px;
}
.footer .menuitem span{
  font-size: 22px;
  padding-top:4px;
  color:#999999;
}

</style>
