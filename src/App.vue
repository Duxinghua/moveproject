<template>
  <div id="app">
    <keep-alive>
      <router-view v-wechat-title='$route.meta.title' v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-wechat-title='$route.meta.title' v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /* @font-face
  {
  font-family: myFirstFont;
  src: url('/assets/css/PingFang Regular.tff')
  } */
}
input {-webkit-appearance:none; }
.van-uploader__upload{
  background-color: white!important
}
</style>
