<template>
    <div class="wx-share" v-if="show" @click="toShare">
      <img src="../assets/images/shareimg.png" alt="">
    </div>
</template>

<script>
export default {
  props:{
    show:{
      type: Boolean,
      default: false
    }
  },
  methods:{
    toShare () {
      this.$emit('toShare')
    }
  }
}
</script>

<style lang="scss" scoped>
  .wx-share{
    width:100%;
    height:100%;
    position: fixed;
    left:0;
    top:0;
    z-index: 3000;
    background:rgba(0,0,0, 0.5);
    img{
      width:80%;
      position: fixed;
      left:50%;
      top:100px;
      transform: translateX(-50%);
      z-index: 3001
    }
  }
</style>
