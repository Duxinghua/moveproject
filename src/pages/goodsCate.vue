<template>
  <div class="container">
    <div class="left">

        <div :class="['categoryItem', activeIndex == item.gc_id ? 'active' : '']"  @click="cateTap(item.gc_id)"  v-for="(item,index) in menuList" :key="index" >
          {{item.gc_name}}
        </div>

    </div>
    <div class="right">
        <div class="cateitem" v-for="(item,index) in subList" :key="index" v-if="activeIndex == -1">
          <span class="catetitle">{{item.gc_name}}</span>
          <div class="catewrap" :style="{'display': item.list.length ? 'flex' : 'none'}">
                <div class="catesub" @click="subCateClist(sitem)" v-for="(sitem,index) in item.list" :key="index" :item="sitem">
                  <img   :src="sitem.image_text" />
                  <span>{{sitem.gc_name}}</span>
                </div>
          </div>
        </div>
        <div class="cateitem" v-for="(item,index) in subList" :key="index" v-if="activeIndex != -1">
          <span class="catetitle">{{item.gc_name}}</span>
          <div class="catewrap">
                <div class="catesub" @click="subCateClist(item)">
                  <img   :src="item.image_text" />
                  <span>{{item.gc_name}}</span>
                </div>
          </div>
        </div>
    </div>
    <Footer :fl="true" />
  </div>
</template>

<script>
import Footer from '@/components/footer.vue'
export default {
  name: 'GoodsCate',
  data () {
    return {
      menuList: [
        {
          gc_id: -1,
          gc_name: '全部分类'
        }
      ],
      changeList: [],
      subList: [],
      activeIndex: -1,
      paddingTop: 300,
      type: 'store'
    }
  },
  mounted () {
    this.goodsCates()
  },
  methods: {
    cateTap (e) {
      this.activeIndex = e
      this.menuList.map((item) => {
        if (this.activeIndex == item.gc_id) {
          if (this.activeIndex != -1) {
            if (item.list) {
              this.subList = item.list
            } else {
              this.subList = []
            }
          } else {
            var result = Object.assign([], this.changeList)
            this.subList = result
          }
        }
      })
    },
    subCateClist (item) {
      this.$router.push({
        path: '/searchGoods',
        query: {id: item.gc_id, name: item.gc_name}
      })
    },
    goodsCates () {
      const param = {
      }
      this.$toast.loading({
        duration: 0,
        forbidClick: true
      })
      this.$api.goodsCates(param).then((res) => {
        this.$toast.clear()
        this.menuList = this.menuList.concat(res.data)
        this.changeList = res.data
        this.subList = res.data
      })
    }
  },
  components: {
    Footer
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar{
  display:none
}
.container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width:750px;
  background:#FBF7F4;
  min-height: 100vh;
  padding-bottom: 200px;
  .left{
    width:174px;
    font-size:26px;
    color:#333;
    .categoryItem{
      width:100%;
      height:97px;
      background:white;
      line-height: 97px;
      text-align: center;
    }
    .active{
      position: relative;
      background:#FBF7F4;
      color:#CDAA79;
    }
    .active::after{
      position: absolute;
      content:'';
      width:6px;
      height:26px;
      background:#CDAA79;
      border-radius:2px 3px 3px 3px;
      left:0;
      top:50%;
      transform: translateY(-50%);
    }
  }
  .right{
    display: flex;
    flex-direction: column;
    .cateitem{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width:540px;
      margin-top:30px;
      margin-right:20px;
      .catetitle{
        font-size: 24px;
        color:#6D8160;
        display: flex;
        width:100%;
      }
      .catewrap{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width:100%;
        background: white;
        border-radius: 20px;
        padding:0 24px 24px 24px;
        box-sizing: border-box;
        margin-top:30px;
        .catesub{
          width:124px;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right:60px;
          margin-bottom: 12px;
          margin-top:24px;
          img{
            width:62px;
            height:62px;
            margin-bottom: 10px;
          }
          span{
            font-size: 24px;
            color:#333;
            width:100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            text-align: center;
          }
        }
        .catesub:nth-child(3n){
         margin-right: 0;
        }
      }
    }
  }
  .rightfix{
    margin:0 auto;
  }
}

</style>
