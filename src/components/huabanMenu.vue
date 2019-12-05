<template>
    <div class="home-top">
      <img class="home-top-search" src="../assets/images/search.png" alt="" @click="searchHandler">
      <ul class="home-top-list">
        <li :class="{active:current === index}" @click="menuHandler(index,item.gc_id)" v-for="(item, index) in menuList" :key="index">{{item.gc_name}}</li>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'HuabanMenu',
  props: [
    'menuList'
  ],
  data () {
    return {
      current: 0
    }
  },
  methods: {
    menuHandler (e,id) {
      this.current = e
      this.$emit('menuClick',id)
    },
    searchHandler () {
      this.$router.push({name: 'HuabanSearch'})
    }
  }
}
</script>

<style lang="scss" scoped>
.home-top{
    width:100%;
    height:98px;
    background: url('../assets/images/tab-bg.png') no-repeat;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left:30px;
    padding-right:30px;
    box-sizing: border-box;
    position: fixed;
    top:0;
    left:0;
    z-index:99999;
    &-search{
      width:42px;
      height:42px;
    }
    &-list{
      font-size: 32px;
      display: flex;
      // flex-direction: row;
      align-items: center;
      margin-right:25px;
      margin-left:25px;
      padding-left:25px;
      color:white;
      overflow: hidden;
      overflow-x: auto;
      .active{
        font-weight: 500;
        transform: scale(1.3);
        color:#E3D29C;
      }
    }
    &-list li{
      margin-right:40px;
      flex-shrink:0;
      transition: all 0.3s;
    }
  }
</style>
