<template>
  <div class="huabanMember">
    <div class="member">
      <div class="img"><img src="../assets/images/img1.png" alt=""></div>
      <span>有梦不晚XXX</span>
      <div class="leader">创建者</div>
    </div>
    <div class="content">
      <div class="member" v-for="item in memberList" :key="item.id">
        <div class="img"><img :src="item.image" alt=""></div>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HuabanGroupMember',
  data () {
    return {
      memberList:[
        {
          id: 1,
          image: require('../assets/images/img2.png'),
          name: '西瓜南瓜'
        },
        {
          id: 2,
          image: require('../assets/images/img2.png'),
          name: '有梦不晚XXX'
        },
        {
          id: 3,
          image: require('../assets/images/img3.png'),
          name: '西瓜南瓜'
        },
        {
          id: 4,
          image: require('../assets/images/img4.png'),
          name: '有梦不晚XXX'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.huabanMember{
  min-height: 100vh;
  background-color: #FFF;
  padding-top: 10px;
  .img{
    width: 74px;
    height: 74px;
    border-radius: 50%;
    margin-right: 27px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .member{
    padding: 0 25px;
    height: 120px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border-bottom: 15px solid #FBF8F4;
    span{
      font-size: 32px;
      color: #333333;
      line-height: 36px;
      max-width: calc(100% - 280px);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .leader{
      width: 92px;
      height:42px;
      border-radius: 21px;
      background-color: #995258;
      color: #FFF;
      font-size: 24px;
      line-height: 42px;
      text-align: center;
      margin-left: 26px;
    }
  }
  .content{
    padding-left: 25px;
    padding-right: 25px;
    display: flex;
    flex-direction: column;
    .member{
      padding: 0;
      border-bottom: 1px solid #F3F3F3;
    }
    :last-child{
      border-bottom: 0 !important;
    }
  }
}
</style>
