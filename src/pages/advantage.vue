<template>
  <div class="advantage">
    <div class="advhe">
      <span class="advhes">{{detail.post_title}}</span>
      <div class="advcontent">
        <div class="advitem">
          <img src="../assets/images/yypz.png" />
          <span>成熟的运营经验</span>
        </div>
        <div class="advitem">
          <img src="../assets/images/td.png" />
          <span>高质量优质团队</span>
        </div>
        <div class="advitem">
          <img src="../assets/images/sm.png" />
          <span>宝瑞营销系统</span>
        </div>
      </div>
    </div>
    <div class="advantage-content" style="font-size:initial" v-html="detail.post_content">
      <!-- <span class="advch">高校合作顶部企业</span>
      <div class="advcc">
        武汉新宝瑞文化传媒有限公司 是一家专注于企业定 制场景营销、网红营销、短视频营销代运营、社群营销、 新媒体营销一体化的成长性服
      </div> -->
    </div>
  </div>
</template>

<script>
import {articleAboutus} from '@/api'
export default {
  methods: {
    async articleAboutusApi () {
      const data = {type: this.type}
      const result = await articleAboutus(data)
      if (result.code === 1) {
        this.detail = result.data
      }
    }
  },
  mounted () {
    this.articleAboutusApi()
  },
  data () {
    return {
      detail: {},
      type: 2
    }
  }
}
</script>

<style scoped>
  .advcontent{
    display: flex;
    flex-direction: row;
    width:100%;
  }
  .advantage{
    padding-left:32px;
    padding-right:32px;
  }
  .advitem{
  width:33.33%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.advitem img{
  width:120px;
  height:120px;
  margin-bottom: 30px;
}
.advitem span{
  color:#333333;
  font-size:26px;
}
.advantage-content img{
  width:100% !important;
  height:auto !important;
}
</style>
