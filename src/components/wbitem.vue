<template>

               <!-- <router-link class="wbItem" :to="'/saledetail?id='+items.celebrity_id"> -->
                <div class="wbItem" @click="godetail">
                  <div class="wbimg">
                    <!-- :src="items.head_image"  -->
                    <img  class="wbimg-avater"  v-lazy="items.head_image" alt="" />
                    <img class="wbimg-v" src="../assets/images/v.png" alt="" />
                  </div>
                  <div class="wbcontent">
                    <p class="wbname">{{items.user_name}}</p>
                    <p class="wbdes">{{items.description}}</p>
                    <!-- <p class="wbfs"><span class="wbfsnum">{{items.likes}}</span>关注<span class="wbfsnum">{{items.funs}}</span>粉丝</p> -->
                    <p class="wbfs">{{items.excerpt}}</p>
                  </div>
                  <img class="wb-more" src="../assets/images/more.png" />
                </div>
               <!-- </router-link> -->

</template>

<script>
export default {
  props: ['items', 'names'],
  methods:{
    godetail(){
      this.$router.push({path: '/saledetail', query: {id: this.items.celebrity_id}})
    }
  }
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
  flex: 1;
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
  width:400px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.wbfs{
  font-size: 24px;
  color:#913C92;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
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
