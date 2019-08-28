<template>
  <div class="footer">
      <router-link class="menuitem" to="/">
        <img :src="home === true ? require('../assets/images/homea.png') : require('../assets/images/home.png') " alt="" />
        <span>首页</span>
      </router-link>

        <router-link class="menuitem" to="/sale" >
          <img :src="sale === true ? require('../assets/images/salea.png') : require('../assets/images/sale.png')" alt="" />
          <span>营销</span>
        </router-link>
      <router-link class="menuitem" to="/company">
        <img :src="xbr === true ? require('../assets/images/xbra.png') : require('../assets/images/xbr.png')" alt="" />
        <span>新宝瑞</span>
      </router-link>
      <router-link class="menuitem" to="/mycenter">
        <img :src="me === true ? require('../assets/images/mea.png') : require('../assets/images/me.png')" alt="" />
        <span>我的</span>
      </router-link>
  </div>
</template>

<script>
export default {
  props: ['home', 'sale', 'xbr', 'me'],
  data () {
    return {

    }
  }

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
.router-link-active span{
  color: #FBE6FA
}
.router-link-exact-active span{
  color:#fbe6fa
}

</style>
