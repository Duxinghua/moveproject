<template>
    <div class="group-item" @click="onLinkDetails(goodsData.course_id)">
       <div class="goods-img">
            <van-image :src="goodsData.image[0]">
                <template v-slot:loading>
                    <van-loading type="spinner" size="20" />
                </template>
            </van-image>
        </div>
      <div class="goods-content">
            <div class="goods-title">{{goodsData.title}}</div>
            <div class="goods-subtitle">{{goodsData.description}}</div>
            <div class="goods-price">
              <div class="goods-tuan">{{goodsData.user_number}}人团</div>
              <div>¥{{goodsData.price_tuan}}</div>
              <div class="goods-grap">
                单买 ¥{{goodsData.price}}
              </div>
            </div>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  props: {
    goodsData: {
      type: Object,
      default: {}
    },
    types: {
      type: String,
      default: 'tuan'
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
    },
    onLinkDetails (id) {
      if (this.goodsData.type == 2) {
        this.$router.push({
          path: '/onlineCourseDetail?type=' + this.types,
          query: {
            id
          }
        })
      } else if (this.goodsData.type == 3) {
        this.$router.push({
          path: '/offCourseDetail?type=' + this.types,
          query: {
            id
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.group-item{
width:100%;
display: flex;
flex-direction: row;
padding-top:20px;
box-sizing: border-box;
border-bottom: 1px solid #ececec;
      .goods-img{
        width: 240px;
        height: 180px;
        overflow: hidden;
        border-radius: 5px;
        margin-right:25px;
        margin-bottom: 20px;
        .van-image{
            width: 100%;
            height: 100%;
        }
        img{
            width: 100%;
            height: 100%;
        }
    }
        .goods-content{
          display: flex;
          flex-direction: column;
          width:445px;
          .goods-title{
              color: #333333;
              font-size: 32px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              width:100%;
          }
          .goods-subtitle{
              color: #999999;
              width: 100%;
              font-size: 26px;
              margin-top: 10px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
          }
          .goods-price{
              display: flex;
              flex-direction: row;
              align-items: center;
              margin-top:25px;
              .goods-tuan{
                width:fit-content;
                padding:5px 10px;
                border-radius: 20px;
                background:#697c5c;
                display: flex;
                font-size: 16px;
                color:#f3d995;
                margin-right:15px;
              }
              div{
                color: #995258;
                font-size: 30px;
              }
              .goods-grap{
                margin-left:15px;
                color:#999;
                font-size: 24px;
              }
          }
        .shopping{
            position: absolute;
            bottom: 0px;
            right: 0px;
            width: 70px;
            height: 70px;
            .bg{
                width: 70px;
                height: 70px;
                position: absolute;
            }
            .shop{
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
                z-index: 1;
                width: 32px;
                height: 30px;
            }
        }
    }
}
</style>
