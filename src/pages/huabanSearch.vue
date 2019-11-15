<template>
  <div class="huabanSearch">
    <div class="huabanSearch-header">
      <div class="inputWrap">
        <img src="../assets/images/huabansearchico.png" alt="">
        <input type="text" class="input" placeholder="插花">
        <span>搜索</span>
      </div>
      <div class="menuTab">
        <ul>
          <li :class="{active: current == item.id ? true : false }" @click="resultClickHandler(item.id)" v-for="(item) in menuList" :key="item.id">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="huabanSearch-content">
          <component :is="isComponent" v-for="(item, index) in usergzlist" :key="index" :item="item"/>
          <!-- <div class="huabanUserItem">
            <img class="avatar" src="../assets/images/people.png" alt="">
            <div class="huabanUserItem-center">
                <span class="user">花田喜事xibe</span>
                <span class="userinfo">年少时向往远方，走的太匆忙</span>
                 <div class="usergz">
                   <span>关注</span>
                   <span>1782</span>
                 </div>
            </div>
            <div class="huabanUserItem-btn nogzbackground">
              <span class="gz" style="display:none">已关注</span>
              <div class="nogz" >
                <img src="../assets/images/gzico.png" alt="">
                <span>关注</span>
              </div>
            </div>
          </div> -->

    </div>
  </div>
</template>

<script>
import HuabanGroupItem from '@/components/huabanGroupItem.vue'
import HuabantzItem from '@/components/huabantzItem.vue'
import HuabanUsergzItem from '@/components/huabanUsergzItem.vue'
export default {
  name: 'HuabanSearch',
  data () {
    return {
      current: 0,
      isComponent: HuabanUsergzItem,
      menuList: [
        {
          id: 0,
          name: '小组'
        },
        {
          id: 1,
          name: '帖子'
        },
        {
          name: '用户'
        }
      ],
      usergzlist: [
        {
          avatar: require('../assets/images/people.png'),
          username: '花田喜事xibe',
          userinfo: '年少时向往远方，走的太匆忙',
          isGz: true,
          gznum: '1782'
        },
        {
          avatar: require('../assets/images/people.png'),
          username: '花田喜事xibe',
          userinfo: '年少时向往远方，走的太匆忙',
          isGz: false,
          gznum: '1782'
        }
      ]
    }
  },
  components: {
    HuabanGroupItem,
    HuabantzItem,
    HuabanUsergzItem
  },
  methods: {
    resultClickHandler (arg) {
      this.current = arg
      switch (arg) {
        case 0:
          this.isComponent = 'HuabanGroupItem'
          break
        case 1:
          this.isComponent = 'HuabantzItem'
          break
        case 2:
          this.isComponent = 'HuabanUsergzItem'
          break
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.huabanSearch{
  background:#FBF8F4;
  &-header{
    padding-top:26px;
    height:203px;
    width:100%;
    background:white;
    padding-left:26px;
    padding-right: 26px;
    box-sizing: border-box;
    .inputWrap{
      height:82px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      position: relative;
      img{
        position: absolute;
        width:33px;
        height:35px;
        left:36px;
        top:50%;
        transform: translateY(-50%)
      }
      input{
        width:624px;
        height:100%;
        border-radius: 40px;
        padding-left:85px;
        background:#FAFAFA;
        border:none;
        font-size: 30px;
        color:#333;
      }
      span{
        color:#6D8160;
        font-size: 30px;
      }
    }
    .menuTab{
      padding-bottom:37px;
      ul{
        display: flex;
        color:#999;
        font-size: 30px;
        li{
          padding:24px 50px;
        }
        .active{
          font-size: 36px;
          color:#6D8160;
          position: relative;
        }
        .active::before{
          display: block;
          content: '';
          width: 30%;
          height: 3px;
          background: #6D8160;
          position: absolute;
          bottom: 0px;
          left:50%;
          transform: translateX(-50%)
        }
      }
    }
  }
  &-content{
    width:100%;
    height:100vh;
    padding-top:26px;
    padding-left:26px;
    padding-right:26px;
    .huabanUserItem{
      display: flex;
      flex-direction: row;
      align-items: center;
      background:white;
      border-radius: 10px;
      width:100%;
      padding:35px 25px;

      .avatar{
        width:107px;
        height:107px;
        margin-right:25px;
      }
      &-center{
        width:336px;
        display: flex;
        flex-direction: column;
        margin-right:25px;
        .user{
          font-size: 32px;
          color:#333333;
          overflow: hidden;
          text-overflow: ellipsis;
          width:100%;
          white-space: nowrap;
        }
        .userinfo{
          font-size: 26px;
          color:#999999;
          overflow: hidden;
          text-overflow: ellipsis;
          width:100%;
          white-space: nowrap;
        }
        .usergz{
          display: flex;
          flex-direction: row;
          span:nth-child(1){
            font-size: 26px;
            color:#999999;
            margin-right:10px;
          }
          span:nth-child(2){
            font-size: 26px;
            color:#333333;
          }
        }
      }
      &-btn{
        width:170px;
        height:58px;
        border-radius: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        .gz{
          color:#F3D995;
          font-size: 30px;
        }
        .nogz{
          display: flex;
          flex-direction: row;
          align-items: center;
          img{
            width:34px;
            height:30px;
            margin-right:16px;
          }
          span{
            color: #CDA871;
            font-size: 30px;
          }
        }
      }
      .gzbackground{
        background:#708363;
      }
      .nogzbackground{
        background:transparent;
        border:2px solid #CDA871;
      }
    }
  }
}
</style>
