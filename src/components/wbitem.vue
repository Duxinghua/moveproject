<template>
            <div class="wbItem">
              <div class="wbimg">
                <img  class="wbimg-avater" :src="item.avater" alt="" />
                <img class="wbimg-v" src="../assets/images/v.png" alt="" />
              </div>
              <div class="wbcontent">
                <p class="wbname">{{item.username}}</p>
                <p class="wbdes">{{item.des}}</p>
                <p class="wbfs"><span class="wbfsnum">{{item.num1}}</span>关注<span class="wbfsnum">{{item.num2}}</span>粉丝</p>
              </div>
              <img class="wb-more" src="../assets/images/more.png" />
            </div>
</template>

<script>
export default {
  props: ['item']
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
  width:52px;
  height:52px;
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
