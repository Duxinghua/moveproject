<template>
    <div class="sharePageStyle" v-if="sharePageStyle" @click="showshareclose" >
      <img src="../assets/images/sharewxico.png" alt="">
    </div>
</template>

<script>
export default {
  props: ['sharePageStyle'],
  methods: {
    showshareclose () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.sharePageStyle{
  position: fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.7)
}
</style>
