<template>
            <div class="saleItems">
               <router-link  :to="'/saledetail?id='+items.celebrity_id">
                <div class="siitemheader">
                  <img class="avater" :src="items.head_image" alt="" />
                  <div class="siiteminfo">
                    <p class="p1">{{items.user_name}}</p>
                    <p class="p2">{{names}}{{items.account}} </p>
                    <p class="p3"><span class="sp1">{{items.funs}}</span>粉丝<span class="sp2">{{items.likes}}</span>获赞</p>
                  </div>
                  <img class="smore" src="../assets/images/more.png" alt="" />
                </div>
                <div class="siitembody">
                  <img :src="imgitem.url" alt="" v-for="(imgitem, index) in autoImgs"  :key="index">
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
      if (this.imgs.length > 3) {
        var arr = this.imgs.slice(0, 2)
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

<style>
.saleItems{
  border-bottom: 1px solid #f3f3f3;
}
.siitemheader{
  padding:32px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.siitemheader .avater{
  width:98px;
  height:98px;
  margin-right:29px;
  border-radius: 50%;
}
.siiteminfo{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex: 1 1 auto;
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
}
.siiteminfo .p3{
  font-size: 26px;
  color:#999999;
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
  width:52px;
  height:52px;
  cursor: pointer;
}
.siitembody{
  display: flex;
  justify-content:space-between;
  flex-direction: row;
  padding-bottom: 20px;
}
.siitembody img{
  width:220px;
  height:224px;
}

</style>
