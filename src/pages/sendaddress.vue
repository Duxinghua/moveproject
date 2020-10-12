<template>
  <div class="sendaddress">
    <AddressMenu :adretext="adretext" :adreadonly="adreadonly" @addressInput="addressInput" />
    <div class="addresswrap">
      <div class="addressitem" v-for="(item,sindex) in adList" :key="sindex" @click="adItemHandler(sindex)">
        <div class="addresstop">
         {{item.name}}
        </div>
        <div class="addressbottom">
          <div class="ad1">
           {{item.address}}
          </div>
          <div class="ad2">
           {{item.juli}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddressMenu from '@/components/addressMenu'
import { post, get } from '../api/request'
export default {
  components:{
    AddressMenu
  },
  data(){
    return {
      adretext:'武汉',
      adreadonly:false,
      qid:0,
      adList:[
        {
          id:0,
          name:'昊城景都',
          address:'葛店开发区祥达锦苑21栋一单元',
          jule:'2.4KM'
        },
        {
          id:1,
          name:'昊城景都',
          address:'葛店开发区祥达锦苑21栋一单元',
          jule:'2.4KM'
        }
      ]
    }
  },
  mounted(){
    this.qid = this.$route.query.index
  },
  methods:{
    addressInput(e){
      this.gets().then((result) => {
        console.log(result,'result')
      })
    },
    gets(){
      return get('https://apis.map.qq.com/ws/place/v1/suggestion/?region=北京&keyword=美食&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77',{})
    },
    adItemHandler(index){
      var list = localStorage.getItem('adList')
      if(list){
        list = JSON.parse(list)
        list[this.qid] = this.adList[index]
        localStorage.setItem('adList',JSON.stringify(list))
      }
      this.$router.push({
        path:'/',
        query:{
          // obj:JSON.stringify(obj)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.sendaddress{
  display: flex;
  flex-direction: column;
  background:#f5f6f7;
  min-height: 100vh;
  .addresswrap{
    display: flex;
    flex-direction: column;
    margin-top:20px;
    .addressitem{
      display: flex;
      flex-direction: column;
      padding:30px;
      box-sizing: border-box;
      background: white;
      border-bottom: 1px solid #f5f6f7;
      .addresstop{
        display: flex;
        flex-direction: row;
        position: relative;
        padding-left:60px;
        box-sizing: border-box;
        font-size: 32px;
        color:#333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .addresstop::after{
        position: absolute;
        content:'';
        left:0;
        top:50%;
        transform: translateY(-50%);
        width:32px;
        height:32px;
        background:url('../assets/images/adposa.png') no-repeat;
        background-size: 100% 100%;
      }
      .addressbottom{
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-left:60px;
        box-sizing: border-box;
        font-size: 24px;
        margin-top:10px;
        color:#b5b5b5;
        .ad1{
          flex:1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .ad2{
          margin-left:30px;
        }
      }
    }
    .addressitem:last-child{
      border-bottom: 1px solid transparent;
    }
  }
}
</style>
