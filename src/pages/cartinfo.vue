<template>
<div class="cartinfo">

</div>
</template>

<script>
export default {
  name:'Cartinfo',
  data(){
    return {
      carType:'',
      detail:{}
    }
  },
  mounted(){
    this.carType = this.$route.query.carType
    this.getDetail()
  },
  methods:{
    getDetail(){
      var data = {
        carType:this.carType
      }
      this.$api.sysCarTypeFindPage(data).then((result)=>{
        this.detail = result.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.cartinfo{
  display: flex;
  flex-direction: column
}
</style>
