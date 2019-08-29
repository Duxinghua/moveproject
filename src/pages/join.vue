<template>
  <div class="join">
    <span class="joinspan">{{detail.post_title}}</span>
    <img src="../assets/images/joinad.png" alt="" />
    <!-- class="joininfo" -->
    <div style="font-size: initial;" v-html="detail.post_content">
    </div>
    <Footer />
  </div>
</template>

<script>
import {articleAboutus} from '@/api'
import Footer from '../components/footer.vue'
export default {
  data () {
    return {
      type: 3,
      detail: {}
    }
  },
  components: {
    Footer
  },
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
  }

}
</script>

<style>

</style>
