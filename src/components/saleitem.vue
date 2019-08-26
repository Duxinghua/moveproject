<template>
            <div class="saleItems">
              <div class="siitemheader">
                <img class="avater" :src="item.avater" alt="" />
                <div class="siiteminfo">
                  <p class="p1">{{item.username}}</p>
                  <p class="p2">抖音号：{{item.noid}} </p>
                  <p class="p3"><span class="sp1">{{item.num1}}</span>粉丝<span class="sp2">{{item.num2}}</span>获赞</p>
                </div>
                <img class="smore" src="../assets/images/more.png" alt="" />
              </div>
              <div class="siitembody">
                <img :src="item.img1" alt="">
                <img :src="item.img1" alt="">
                <img :src="item.img1" alt="">
              </div>
          </div>
</template>

<script>
export default {
  props: ['item']
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
