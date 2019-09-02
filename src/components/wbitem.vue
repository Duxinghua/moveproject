<template>

               <router-link class="wbItem" :to="'/saledetail?id='+items.celebrity_id">
                  <div class="wbimg">
                    <img  class="wbimg-avater" :src="items.head_image"  v-lazy="items.head_image" alt="" />
                    <img class="wbimg-v" src="../assets/images/v.png" alt="" />
                  </div>
                  <div class="wbcontent">
                    <p class="wbname">{{items.user_name}}</p>
                    <p class="wbdes">{{items.description}}</p>
                    <p class="wbfs"><span class="wbfsnum">{{items.likes}}</span>关注<span class="wbfsnum">{{items.funs}}</span>粉丝</p>
                  </div>
                  <img class="wb-more" src="../assets/images/more.png" />
               </router-link>

</template>

<script>
export default {
  props: ['items', 'names']
}
</script>

<style>
.wbItem{
  background:white;
  border-radius: 8px;
  padding:32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.wbimg-avater{
  width:134px;
  height:134px;
  border-radius: 50%;
}
.wbimg{
  width:134px;
  height:134px;
  margin-right:29px;
  position: relative;
}
.wbimg-v{
  width:35px;
  height:35px;
  position: absolute;
  bottom: 0;
  right:0
}
.wbcontent{
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}
.wbname{
  color:#333333;
  font-size: 30px;
  margin-bottom: 15px;
}
.wb-more{
  width:60px;
  height:60px;
}
.wbdes{
  color:#666666;
  font-size: 26px;
  margin-bottom: 15px;
}
.wbfs{
  font-size: 24px;
  color:#999999;
}
.wbfsnum{
  font-size: 26px;
  color:#913C92;
  margin-right: 13px;
}
.wbfsnum:nth-child(2){
  margin-left: 13px;
}
</style>
