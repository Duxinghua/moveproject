<template>
  <div class="agreement">
         <TopNav :menu="menutext"/>
    <div class="content">
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  name: 'Agreement',
  components:{
    TopNav
  },
  data(){
    return{
      menutext:'货搬搬用户协议'
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
.agreement{
  box-sizing: border-box;
  padding:0 30px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f5f6f7;
  .content{
    border-radius: 20px;
    margin-top:50px;

    box-sizing: border-box;
    overflow: hidden;
    width:100%;
    background:white;
    height: 200px;
  }
}
</style>
