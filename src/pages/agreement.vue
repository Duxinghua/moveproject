<template>
  <div class="agreement">
    <div class="content">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Agreement',
  data(){
    return{

    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.agreement{
  padding:30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6f7;
  .content{
    border-radius: 20px;
    overflow: hidden;
    width:100%;
    background:white;
    height: 200px;
  }
}
</style>
