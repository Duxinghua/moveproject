<template>
  <router-link class="avitem" :to="'/activitydetail?id='+avitem.activity_id">
    <img :src="avitem.image" v-lazy="avitem.image"/>
    <div class="avinfo">
      <span>{{avitem.title}}</span>
      <span>立即参加</span>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    avitem: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.avitem{
  display: block;
  width:100%;
  margin-bottom: 46px;
}
.avitem img{
  height:auto;
  margin-bottom: 20px;
  width: 100%;
}
.avitem .avinfo{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color:#333333;
}
.avitem  .avinfo span:first-child{
  font-size: 30px;
  color:#333333;
  font-weight: 500;
  line-height: 52px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
}
.avitem .avinfo span:nth-child(2){
  background:#E4C1E7;
  border:1px solid rgba(228, 193, 231, 1);
  border-radius: 8px;
  font-size: 24px;
  color:#8C3B92;
  width:160px;
  height:52px;
  line-height: 52px;
  text-align: center;
  cursor: pointer;
  flex-shrink: 0;
}
</style>
