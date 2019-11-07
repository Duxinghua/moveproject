<template>
  <div class="huaban">
    <div class="huaban-top">
      <div class="huaban-top-item" v-for="(item,index) in huabanList" :key="index">
        <img class="huaban-top-item-img1" :src="item.image" alt="">
        <div class="huaban-top-item-des">
          <span class="title">{{item.title}}</span>
          <span class="title subtitle">{{item.des}}</span>
          <span class="title subtitle">{{item.num}}</span>
        </div>
        <img class="huaban-top-item-img2" src="../assets/images/huabanjoin.png" alt="">
      </div>
    </div>
    <Footer :hb="true" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
export default {
  name: 'Huaban',
  data () {
    return {
      huabanList: [
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        },
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        },
        {
          image: require('../assets/images/huabanp1.png'),
          title: '插花花艺爱好同盟',
          des: '爱华，爱生活！',
          num: '1979成员'
        }
      ]
    }
  },
  components: {
    Footer
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
display: none;
}
.huaban{
  display: flex;
  flex-direction: column;
  background:#FBF8F4;
  width:100%;
  padding-top:26px;
  &-top{
    height:184px;
    width:100%;
    overflow-y: hidden;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    display:-webkit-box;
    border-bottom: 2px solid red;
    &-item{
      width:536px;
      height:100%;
      padding:26px 32px;
      background:white;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right:26px;
      &-img1{
        width:117px;
        height:117px;
        margin-right:20px;
      }
      &-des{
        width:265px;
        display: flex;
        flex-direction: column;
        .title{
          font-size: 30px;
          color:#333;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .subtitle{
          font-size:24px;
          color:#999;
          line-height:48px;
        }
      }
      &-img2{
        width:82px;
        height:82px;
      }
    }
  }
}
</style>
