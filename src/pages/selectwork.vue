<template>
  <div class="selectwork">
    <div class="left">
      <div :class="['litem',listIndex == item.id ? 'active' : '']" v-for="(item,index) in list" :key="index" @click="listItemHandler(item)">
        {{item.name}}
      </div>
    </div>
    <div class="right">
      <div class="rightitem">
        <div class="righttitle">
          装修工
        </div>
        <div class="rightcontentwrap">
          <div :class="['rightcontent',contentIndex == index ? 'active' : '']" v-for="(item,index) in 10" :key="index" @click="contentHandler(index)">
              电视1
          </div>
        </div>
      </div>
    </div>
    <div class="fixedbtn">
      <van-button type="primary" color="#28ae3a" round block size="small" @click="needHandler">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'Selectwork',
  data(){
    return {
      listIndex:1,
      contentIndex:0,
      list:[
        {
          id:'1',
          name:'装修工'
        },
        {
          id:'2',
          name:'水泥工'
        },
        {
          id:'3',
          name:'搬运工'
        },
        {
          id:'4',
          name:'木工'
        },
        {
          id:'5',
          name:'其它'
        }
      ]
    }
  },
  methods:{
    needHandler(){

    },
    listItemHandler(item){
      this.listIndex = item.id
    },
    contentHandler(index){
      this.contentIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
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
      position: fixed;
      left:0;
      top:0;
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
      margin-left:180px;
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
