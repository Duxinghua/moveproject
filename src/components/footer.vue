<template>
  <div class="footer">

      <!-- <router-link class="menuitem" to="/company">
        <img :src="zb === true ? require('../assets/images/zbico-a.png') : require('../assets/images/zbico.png')" alt="" />
        <span :class="{active:zb}">直播</span>
      </router-link> -->
      <router-link class="menuitem" to="/">
        <img :src="sc === true ? require('../assets/images/scico-a.png') : require('../assets/images/scico.png')" alt="" />
        <span :class="{active:sc}">首页</span>
      </router-link>
      <router-link class="menuitem" to="/goodsCate" >
          <img :src="fl === true ? require('../assets/images/hbico-a.png') : require('../assets/images/hbico.png')" alt="" />
          <span :class="{active:fl}">分类</span>
      </router-link>
      <router-link class="menuitem" to="/tuan" >
          <img :src="pt === true ? require('../assets/images/ptico-a.png') : require('../assets/images/ptico.png')" alt="" />
          <span :class="{active:pt}">拼团</span>
      </router-link>
      <router-link class="menuitem" to="/Fall">
        <img :src="mrt === true ? require('../assets/images/mrico-a.png') : require('../assets/images/mrico.png') " alt="" />
        <span :class="{active:mrt}">名人堂</span>
      </router-link>
      <router-link class="menuitem" to="/my">
        <img :src="wd === true ? require('../assets/images/wdico-a.png') : require('../assets/images/wdico.png')" alt="" />
        <span :class="{active:wd}">我的</span>
      </router-link>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    mrt: {
      type: Boolean,
      default: false
    },
    hb: {
      type: Boolean,
      default: false
    },
    fl: {
      type: Boolean,
      default: false
    },
    pt: {
      type: Boolean,
      default: false
    },
    zb: {
      type: Boolean,
      default: false
    },
    sc: {
      type: Boolean,
      default: false
    },
    wd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style scoped>
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
  z-index: 1000;
}
.footer .menuitem{
  display: flex;
  flex-direction: column;
  width:20%;
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
.footer .active{
  color: #738965!important;
}

</style>
