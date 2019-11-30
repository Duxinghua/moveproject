<template>
  <div class="teacherdetail">
    <TeacherMsg :msgItem="msgItem"></TeacherMsg>
    <div class="teacherdetail-content">
      <p>{{msgItem.description}}</p>
      <img src="../assets/images/teacherdetail.png" alt="">
    </div>
    <div class="teacherdetail-works">
      <div class="teacherdetail-works-title">
        <img src="../assets/images/workslleft.png" alt="">
        <span>作品</span>
        <img src="../assets/images/worksright.png" alt="">
      </div>
      <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
        >
        <div class="teacher-works">
          <TeacherWorks v-for="(item,index) in teacherWorks" :data="index" :key="item.id" :item="item"  @click.native="teacherInfo(imagePreview,index)"></TeacherWorks>
        </div>
      </van-list>
      <!-- <NoData v-if="teacherWorks.length == 0"/> -->

    </div>
        <van-image-preview
            v-model="imageShow"
            :images="imagePreview"
            :startPosition="startPosition"
        >
        </van-image-preview>
  </div>
</template>

<script>
import TeacherMsg from '@/components/teacherMsg.vue'
import TeacherWorks from '@/components/teacherWorks.vue'
import NoData from '@/components/nodata'

export default {
  name: 'Teacher',
  data () {
    return {
      id: '',
      current: 1,
      total: 0,
      finished: false,
      loading: false,
      msgItem: {},
      teacherWorks: [],
      imageShow: false,
      imagePreview: [],
      startPosition: 0
    }
  },
  mounted () {
    this.id = this.$route.query.index;
    this.getDetail()
  },
  methods: {
    teacherInfo(data,index) {
            this.imagePreview = data;
            this.startPosition = index;
            this.imageShow = true;
    },
    getDetail () {
      const param ={
        id: this.id
      }
      this.$api.teacherDetail(param).then((res) => {
        if (res.code === 1) {
          console.log(res.data);
          this.msgItem = res.data
          this.getWorksList()
        }
      })
    },
    getWorksList () {
      const param = {
        page: this.current,
        pageSize: 10,
        admin_id: this.id
      }
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      this.$api.teacherWorksList(param).then((res) => {
        this.$toast.clear()
        if (res.code == 1) {
          this.loading = false
          console.log(res.data)
          if (this.teacherWorks.length == 0) {
            // 第一次加载
            this.teacherWorks = res.data.data || []
            var list = []
            res.data.data.map((item)=>{
              if(item.image){
                list.push(item.image[0])
              }
            })
            this.imagePreview = list || []
            this.total = res.data.total
          } else if (this.teacherWorks.length < this.total) {
            // 加载更多
            this.teacherWorks = this.teacherWorks.concat(res.data.data)
            var list = []
            res.data.data.map((item)=>{
              if(item.image){
                list.push(item.image[0])
              }
            })
            this.imagePreview = this.imagePreview.concat(list)
          }
          if (this.teacherWorks.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    },
    onLoad () {
      if (this.teacherWorks.length < this.total) {
        this.current++
        this.getWorksList()
      }
    }
  },
  components: {
    TeacherMsg,
    TeacherWorks,
    NoData
  }
}
</script>

<style lang="scss" scoped>
.teacherdetail{
  display: flex;
  flex-direction: column;
  width:100%;
  min-height: 100vh;
  padding-top: 38px;
  background:#FBF8F4;
  &-content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 30px 50px 35px;
    p{
      font-size: 26px;
      color: #333333;
      line-height: 38px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      margin-bottom: 29px;
    }
    img{
      width: 652px;
      height: 52px;
    }
  }
  &-works{
    display: flex;
    flex-direction: column;
    padding-bottom: 85px;
    &-title{
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img{
        width: 26px;
        height: 39px;
      }
      span{
        font-size: 36px;
        color: #333333;
        line-height: 36px;
        margin: 0 9px;
      }
    }
    .teacher-works{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
        padding-top: 35px;
        padding-left: 24px;
        padding-right: 24px;
      }
  }
}
.offdetail-teacher-msg{
  padding-left: 50px !important;
  padding-right: 45px !important;
}

</style>
