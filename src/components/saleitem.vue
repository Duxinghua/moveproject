<template>
            <div class="saleItems">
               <router-link  :to="'/saledetail?id='+items.celebrity_id">
                <div class="siitemheader">
                  <!-- :src="items.head_image" -->
                  <img class="avater"  v-lazy="items.head_image" alt="" />
                  <div class="siiteminfo">
                    <p class="p1">{{items.user_name}}</p>
                    <p class="p2">{{names}}号:{{items.account}} </p>
                    <!-- <p class="p3"><span class="sp1">{{items.funs}}</span>粉丝<span class="sp2">{{items.likes}}</span>获赞</p> -->
                    <p class="p3">{{items.excerpt}}</p>
                  </div>
                  <img class="smore" src="../assets/images/more.png" alt="" />
                </div>
                <div class="siitembody">
                  <div class="siitemimg" v-for="(imgitem, index) in autoImgs"  :key="index" >
                    <!-- :src="imgitem.url" -->
                    <img  v-lazy="imgitem.url" alt="">
                  </div>
                </div>
               </router-link>
          </div>
</template>

<script>
export default {
  props: ['items', 'names'],
  data () {
    return {
      imgs: this.items.photos
    }
  },
  computed: {
    autoImgs () {
      console.log(this.items)
      if (this.imgs.length > 3) {
        var arr = this.imgs.slice(0, 3)
        return arr
      } else {
        return this.imgs
      }
    }
  },
  mouted () {

  }
}
</script>

<style >
.saleItems{
  border-bottom: 1px solid #f3f3f3;
}
.siitemheader{
  padding:30px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.siitemheader .avater{
  width:118px;
  height:118px;
  margin-right:29px;
  border-radius: 50%;
}
.siiteminfo{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex:1;
}
.siiteminfo .p1{
  font-size: 30px;
  color:#333333;
  margin-bottom: 7px;
}
.siiteminfo .p2{
  font-size:24px;
  color:#666666;
  margin-bottom: 7px;
  width:450px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.siiteminfo .p3{
  font-size: 26px;
  color:#913C92;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp:2;
  -webkit-box-orient: vertical;
}
.siiteminfo .p3 .sp1{
  margin-right:12px;
  color:#913C92;
}
.siiteminfo .p3 .sp2{
  margin:0 12px;
  color:#913C92;
}
.siitemheader .smore{
  width:60px;
  height:60px;
  cursor: pointer;
}
.siitembody{
  display: flex;
  justify-content:space-between;
  flex-direction: row;
  padding-bottom: 20px;
  width:100%;
}
.siitemimg{
  display: flex;
  justify-content: center;
  align-items: center;
  width:33.33%;
  height:224px;
}
.siitembody .siitemimg img{
  width:90%;
  height:90%;
  border-radius: 8px;
}

</style>
