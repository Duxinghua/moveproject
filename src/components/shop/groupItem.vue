<template>
    <div class="group-item">
        <div class="group-img">
            <div class="img-box">
                <div class="img" v-for="(item, index) in groupData.users" :key="index">
                    <img src="../../assets/images/img1.png" alt="">
                </div>
                <div class="img active" v-for="(item, index) in (3 - groupData.users.length)" :key="'active' + index">
                    <img src="../../assets/images/doubt.png" alt="">
                </div>
            </div>
            <span><van-icon name="ellipsis" /></span>
        </div>
        <div class="group-info">
            <div class="lack">还差<em>{{groupData.user_number - groupData.current_number}}人</em>拼成</div>
            <div class="time">剩余<van-count-down :time="time" /></div>
        </div>
        <div class="group-btn" @click="onLook">查看</div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      time: 30 * 60 * 60 * 1000
    }
  },
  props: {
    groupData: {
      type: Object,
      default: {}
    }
  },
  methods: {
    onLook () {
      this.$router.push({
        path: '/groupDetails',
        query: {
          id: this.groupData.t_id
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.group-item{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0px;
    border-bottom: 1Px solid #F4F0EA;
    &:last-child{
        border-bottom: none;
    }
    .group-img{
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 90px;
        .img-box{
            position: relative;
            width: 220px;
            height: 90px;
            .img{
                width: 90px;
                height: 90px;
                border-radius: 50%;
                overflow: hidden;
                position: absolute;
                &:nth-child(2){
                    left: 60px;
                    z-index: 2;
                }
                &:nth-child(3){
                    left: 130px;
                    z-index: 3;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .active{
                border: 1Px dotted #DCDCDC;
                background: #fff;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                img{
                    width: 26px;
                    height: 42px;
                }
            }

        }
        span{
            margin-left: 20px;
            display: flex;
            align-items: center;
            i{
                font-size: 40px;
                color: #BDBDBD;
            }
        }
    }
    .group-info{
        .lack{
            color: #666666;
            font-size: 24px;
            em{
                font-style: normal;
                color: #995258;
            }
        }
        .time{
            color: #333333;
            font-size: 24px;
            margin-top: 10px;
            display: flex;
            align-items: center;
        }
    }
    .group-btn{
        width: 170px;
        height: 60px;
        background: url('../../assets/images/group-bg.png') 100%/100% no-repeat;
        text-align: center;
        line-height: 60px;
        color: #FFFFFF;
        font-size: 28px;
    }
}
</style>
