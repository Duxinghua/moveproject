<template>
  <div class="accountingrules">
      <TopNav :menu="menutext"/>
  </div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  name:'Accountingrules',
  components:{
  TopNav
  },
  data(){
    return {
      menutext:'货搬搬用户协议'
    }
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>
  .accountingrules{
    display: flex;
    flex-direction: column;
    padding:30px;
    box-sizing: border-box;
    min-height: 100vh;
    background:#f5f6f7;
  }
</style>
