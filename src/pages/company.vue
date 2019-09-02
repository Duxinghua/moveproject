<template>
  <div class="mycompany">
    <div class="mycomheader">
      <span class="company">{{detail.post_title}}</span>
      <!-- <img class="comimg" src="../assets/images/com.png" /> -->

      <div class="mycomContent" style="font-size:initial" v-html="detail.post_content">

      </div>
    </div>
    <!-- <Footer :xbr="true" :me="false" :sale="false" :home="false" /> -->
  </div>
</template>

<script>
import Footer from '@/components/footer'
import {articleAboutus} from '@/api'
export default {
  components: {
    Footer
  },
  data () {
    return {
      detail: {
        post_title: null
      },
      type: 1
    }
  },
  mounted () {
    this.articleAboutusApi()
  },
  methods: {
    async articleAboutusApi () {
      const data = {
        type: this.type
      }
      const result = await articleAboutus(data)
      console.log(result)
      if (result.code === 1) {
        this.detail = result.data
      }
    }
  }
}
</script>

<style scoped>
.mycomContent img{
  width:100% !important;
  height:auto !important;
}

</style>
