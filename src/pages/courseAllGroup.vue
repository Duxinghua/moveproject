<template>
    <div class="all-group">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :immediate-check="false"
            @load="onLoad"
        >
            <div class="group-list">
                <GroupItem v-for="(item, index) in groupList" :key="index" :groupData="item" :groupTime="groupTime"/>
            </div>
        </van-list>
    </div>
</template>

<script>
import GroupItem from '@/components/cource/groupItem'

export default {
  data () {
    return {
      groupList: [],
      loading: false,
      finished: false,
      current: 1,
      total: 10,
      groupTime: 0,
      course_id: null

    }
  },
  components: {
    GroupItem
  },
  mounted () {
    this.course_id = this.$route.query.courseId
    this.goodsTuanLists()
  },
  methods: {
    onLoad () {
      if (this.groupList.length < this.total) {
        this.current++
        this.goodsTuanLists()
      }
    },
    goodsTuanLists () {
      const param = {
        page: this.current,
        pageSize: 10,
        course_id: this.course_id
      }
      this.$api.courseTuanList(param).then((res) => {
        if (res.code == 1) {
          this.loading = false
          if (this.groupList.length == 0) {
            // 第一次加载
            this.groupList = res.data.data || []
            this.total = res.data.total
          } else if (this.groupList.length < this.total) {
            // 加载更多
            this.groupList = this.groupList.concat(res.data.data)
          }
          if (this.groupList.length >= this.total) {
            // 全部加载完成
            this.finished = true
          }
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.all-group{
    width: 100%;
    min-height: 100vh;
    background: #FBF8F5;
    .group-list{
        padding: 30px;
    }

}
</style>
