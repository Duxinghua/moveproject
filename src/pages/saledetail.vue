<template>
  <div class="saledetail">
    <div class="saledheader">
      <img :src="detail.head_image" />
      <div class="saledright">
        <p>{{detail.user_name}}</p>
        <p>{{detail.description}}</p>
        <!-- <p class="saledrs"><span>{{detail.likes}} 关注</span><span>{{detail.funs}} 粉丝</span></p> -->
        <p class="saledrs">{{detail.excerpt}}</p>
      </div>
    </div>
    <div class="saledcontent">
        <div class="saledes">
          <span class="saledsp">详情</span>
        </div>
        <div class="saledescing">
        <!-- <div class="clickimg">
          <img :src="autoimg" :style="autostyle"/>
        </div> -->
        <div id="saledec"  @click="addComment($event)" class="saledec sdetail" style="font-size:initial" v-html="detail.content">
        </div>
        </div>
    </div>
    <div class="viewimg" :style="autostyle" v-if="autoDisplay" @click="closeview">
      <img :src="autoimg" class="autoPos"/>
    </div>
  </div>
</template>

<script>
import {celebrityDetail} from '@/api'
export default {
  data () {
    return {
      detail: {

      },
      autoimg:'',
      autostyle:{},
      autoDisplay:false
    }
  },
  mounted () {
    this.celebrityDetailApi()
    this.$nextTick(() => {
      let bodycolors = document.documentElement || document.body
      bodycolors.style.background = '#ffffff';
    })
  },
  methods: {
    closeview(e){
      this.autoDisplay = false
    },
    addComment(event){
      const list = []
      const source = document.getElementById('saledec').getElementsByTagName('img')
      // console.log(source.getElementsByTagName('img')[0].src)
      for(var i=0,l=source.length;i<l;i++){
        // console.log(source[i])
        list.push(source[i].src)
      }
      console.log(list)
      if(event.target.nodeName === 'IMG'){
        const currentsrc = event.target.src
        WeixinJSBridge.invoke("imagePreview", {
                "urls": list,
                "current": currentsrc
        });


        // var mobileWidth = document.body.clientWidth
        // var mobileHeight = document.body.clientHeight
        // this.autostyle={
        //   width:mobileWidth+'px',
        //   height:mobileHeight+'px'
        // }
        // var src = event.target.src
        // this.autoimg = src
        // var height = event.target.naturalHeight
        // var width = event.target.naturalWidth
        // var parent = event.target.parentNode.classList.add('clickimg')
        // event.target.style.width=width+'px'
        // event.target.style.maxWidth='none'
        // event.target.style.height=height+'px'
        // this.autoDisplay = !this.autoDisplay
      }

    },
    async celebrityDetailApi () {
      let formdata = {celebrity_id: this.$route.query.id}
      console.log(formdata, 'data')
      const result = await celebrityDetail(formdata)
      if (result.code === 1) {
        this.detail = result.data
      }
    }
  }
}
</script>

<style scoped>
.viewimg{
  position: fixed;
  left:0;
  top:0;
  background: black;
  z-index: 1200

}
.autoPos{
  position: fixed;
  left:0;
  top:50%;
  width:750px;
  transform: translateY(-50%);
  z-index: 1300
}
.saledetail{
  background:white;
  display: flex;
  flex-direction: column;
}
.saledheader{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding:44px;
  background:linear-gradient(169deg,rgba(151,62,147,1),rgba(62,38,139,1));
}
.saledheader img{
  width:134px;
  height:134px;
  border-radius: 50%;
  margin-right:33px;
}
.saledright{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color:#FFFFFF;

}
.saledright p:nth-child(1){
  font-size: 30px;
  margin-bottom: 14px;
}
.saledright p:nth-child(2){
  font-size: 26px;
  margin-bottom: 16px;
}
.saledrs{
  display: flex;
  flex-direction: row;
  color:white;
  font-size: 26px;
}
.saledrs span{
  width:190px;
  height:48px;
  background:rgba(255,255,255,0);
  border:1px solid white;
  opacity:0.28;
  border-radius:24px;
  color:white;
  font-size: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right:15px;
}
.saledcontent{
  padding-left:32px;
  padding-right:32px;
}
.saledescing{
  position: relative;

}
.clickimg{
  width:100%;
  overflow: hidden;
  overflow-x: auto;
}
.saledec{
  /* font-size: 26px;
  color:#333; */
  font-size: initial;
}
.saledec img{
  width: 100% !important;
  height:auto !important;
}

</style>
