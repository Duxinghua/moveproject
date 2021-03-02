<template>
  <div class="nodata">
    <img src="../assets/images/mescroll-empty.png" class="nodatapng" />
    <div class="nodatatext">暂无数据</div>
  </div>
</template>

<script>
export default {
  props:{

  },
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.nodata{
  position: fixed;
  left:50%;
  top:350px;
  transform: translate(-50%,0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .nodatapng{
    width:180px;
    height:180px;
  }
  .nodatatext{
    font-size: 30px;
    color:#666666;
  }
}

</style>
