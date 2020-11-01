<template>
<div class="worklist">
  <TopNav :menu="menutext"/>
  <div class="selectwork">
    <div class="left">
      <div :class="['litem',listIndex == index ? 'active' : '']" v-for="(item,index) in list" :key="index" @click="listItemHandler(index)">
        {{item}}
      </div>
    </div>
    <div class="right">
      <div class="rightitem">
        <div class="righttitle">
          {{workName}}
        </div>
        <div class="rightcontentwrap">
          <div :class="['rightcontent',contentIndex == index ? 'active' : '']" v-for="(item,index) in cateList" :key="index" @click="contentHandler(index,item.workName2)">
             {{item.workName2}}
          </div>
        </div>
      </div>
    </div>
    <div class="fixedbtn">
      <van-button type="primary" color="#28ae3a" round block size="small" @click="needHandler">确定</van-button>
    </div>
  </div>
</div>
</template>

<script>
import TopNav from '@/components/topnav.vue'
export default {
  name:'Selectwork',
  components:{
    TopNav
  },
  data(){
    return {
      listIndex:0,
      workName:'',
      menutext:'选择工种',
      contentIndex:0,
      list:[],
      cateList:[]
    }
  },
  mounted(){
    this.getcustWorkTypeFindWorkLevel()
  },
  methods:{
    needHandler(){
      this.$router.push('/platformpricing')
    },
    getcustWorkTypeFindWorkLevel(){
      this.$api.custWorkTypeFindWorkLevel({}).then((result) => {
        if(result.code == 200){
          this.list = result.data
          var workTypeName = localStorage.getItem('workTypeName')
          if(workTypeName){
            this.workName = workTypeName
            this.list.map((item,index)=>{
              if(item == workTypeName){
                this.listIndex = index
              }
            })
          }else{
            this.workName = this.list[0]
          }
          this.getcustWorkTypeFindMap()
        }
      })
    },
    getcustWorkTypeFindMap(){
      var data = {
        workName:this.workName
      }
      this.$api.custWorkTypeFindMap(data).then((result) =>{
        if(result.code == 200){
          this.cateList = result.data
          var workTypeName2 = localStorage.getItem('workTypeName2')
          if(workTypeName2){
            this.cateList.map((item,index) => {
              if(item.workName2 == workTypeName2){
                this.contentIndex = index
              }
            })
          }else{
            localStorage.setItem('workTypeName2',this.cateList[0].workName2)
          }
        }
      })
    },
    listItemHandler(index){
      this.listIndex = index
      this.workName = this.list[index]
      localStorage.setItem('workTypeName',this.workName)
      this.getcustWorkTypeFindMap()
    },
    contentHandler(index,workTypeName2){
      localStorage.setItem('workTypeName2',workTypeName2)
      this.contentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
.worklist{
  display: flex;
  flex-direction: column;
}
  .selectwork{
    display: flex;
    flex-direction: row;
    height: 100vh;
    background:white;
    .left{
      width:180px;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      background: #f5f6f7;
      .litem{
        width:100%;
        height:100px;
        border-bottom: 2px solid white;
        font-size: 20px;
        color:#333333;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .active{
         color:#28ae3a;
         background: white;
         position: relative;
      }
      .active::after{
        position: absolute;
        content:'';
        left:0;
        top:0;
        width:5px;
        height:100%;
        background:#28ae3a;
      }
    }
    .right{
      width:calc(100% - 180px);
      overflow: scroll;
      display: flex;
      flex-direction: column;
      padding-left:30px;
      padding-right:30px;
      box-sizing: border-box;
      .rightitem{
        display: flex;
        flex-direction: column;
        .righttitle{
          font-size: 18px;
          line-height: 100px;
          height:100px;
          color:#666666;
        }
        .rightcontentwrap{
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          .rightcontent{
            display: flex;
            justify-content: center;
            align-items: center;
            width:220px;
            height:60px;
            font-size: 24px;
            line-height: 60px;
            border-radius: 30px;
            margin-right:20px;
            margin-bottom: 20px;
            color:#333333;
            border:1px solid #efefef;
          }
          .active{
            border:1px solid #28ae3a;
            color:#28ae3a;
          }
        }
      }
    }
    .fixedbtn{
      display: flex;
      padding:0 30px;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width:100%;
      height:100px;
      position: fixed;
      left:0;
      bottom: 0;
      z-index: 2000;
      background: white;
    }
    /deep/ .van-button--small{
      width:100%;
      height:80px;
    }
  }
</style>
