<template>
  <div class="submit">
    <div
      scroll-y
      class="class-list-wrap"
    >
      <div class="job">
        <textarea
          maxlength="200"
          v-model="notedata"
          placeholder="取消订单原因"
          placeholder-style="color:#999;font-size:14px"
          class="textarea"
        />
        </div>
			<div class='tip'>
				上传照片 <span>*每张图片大小不超过2M</span>
			</div>
		    <div class="weui-uploader__bd th-backwhite">
		      <div class="weui-uploader__files" id="uploaderFiles">
		        <div v-for="(item,index) in fileList" :key="index" class="picture">
		          <div class="weui-uploader__file posi-rela"  :id="item.path">
					   <img class="th-icon-cancel" src="../../assets/img/del.png" @click="deletImg(index)"></img>
		            <img class="weui-uploader__img" :src="item.path"  mode="aspectFill" @click="predivImage" />
		          </div>
		        </div>
		        <div class="weui-uploader__input-box">
		          <div class="weui-uploader__input" @click="chooseImage">
				  <img src='../../assets/img/camrea.png'></img>
		          </div>
		        </div>
		      </div>
		    </div>
			</div>
			<view class="btn-wrap">
				<button type="primary" :loading="loading"  @click="testSubmit">确认取消</button>
			</view>
	</div>
</template>
<script>
// appealimgUpload
import { UPLOAD_API, cancelStatusUser } from "@/api";
export default {
  data() {
    return {
      notedata: "",
      fileList: [],
      seqId: "",
      sheetId: "",
    };
  },
  mounted() {
    this.seqId = this.$router.query.seqId;
    this.sheetId = this.$router.query.sheetId;
  },
  methods: {
    chooseImage(e) {

    },
    predivImage(e) {

    },
    deletImg(index) {
      this.fileList.splice(index, 1);
    },
    testSubmit(e) {
      if (!this.notedata) {
        uni.showToast({
          title: "请输入取消原因",
          icon: "none",
        });
        return false;
      }
      if (this.fileList.length == 0) {
        uni.showToast({
          title: "请上传图片",
          icon: "none",
        });
        return false;
      }
      let _this = this;
      let imgList = _this.fileList;
      let picture = [];
      new Promise((resolve) => {
        uni.showModal({
          title: "你正在取消订单",
          content: "取消后，将不可修改",
          success: function(res) {
            if (res.confirm) {
              resolve(true);
            } else if (res.cancel) {
              return false;
            }
          },
        });
      }).then((res) => {
        if (imgList.length > 0) {
          let i = 0;
          let picture = [];
          upLoadImg();
          function upLoadImg() {
            if (i < imgList.length) {
              uni.uploadFile({
                url: UPLOAD_API,
                filePath: imgList[i].path,
                name: "file",
                success(res) {
                  let obj = JSON.parse(res.data);
                  let { data } = obj;
                  if (data) {
                    let imgUrl = {
                      picUrl: data.viewUrl,
                      sort: i,
                      picType: 2,
                      sheetId: _this.sheetId,
                    };
                    picture.push(imgUrl);
                  }
                },
                complete() {
                  if (imgList.length == picture.length) {
                    this.$api
                      .cancelStatusUser({
                        headSeqId: _this.seqId,
                        orderPicList: picture,
                        remarks: _this.notedata,
                        evaluateType: "P",
                      })
                      .then((res) => {
                        if (res.code == 200) {
                          uni.redirectTo({
                            url: "/myOrder/index",
                          });
                        }
                      });
                  } else {
                    i++;
                    upLoadImg();
                  }
                },
              });
            }
          }
        }
      });
    },
  },
};
</script>
<style lang="scss">
.submit {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3f3f3;
  .job {
    margin: 20upx 28upx 28upx 28upx;
    padding-bottom: 20px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    position: relative;
    textarea {
      padding: 16px 10px 0 10px;
      width: 90%;
    }
    .textarea {
      font-size: 28upx;
      font-family: PingFang SC;
      color: rgba(102, 102, 102, 1);
      line-height: 40upx;
      margin-left: 22upx;
    }
    & > img {
      width: 30rpx;
      height: 32rpx;
      position: absolute;
      top: 30rpx;
      margin-right: 20rpx;
    }
  }
  .tip {
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    padding: 0 28rpx;
    span {
      color: #fe6535;
      font-size: 13px;
      margin-left: 10rpx;
    }
  }
  .class-list-wrap {
    flex: 1;
    overflow: hidden;
    box-sizing: border-box;
  }
  .th-icon-cancel {
    position: absolute;
    right: -8px;
    top: -8px;
    width: 20px;
    height: 20px;
  }
  .weui-uploader__input-box {
    width: 216upx;
    height: 216upx;
    margin-left: 10px;
    margin-bottom: 10px;
    float: left;
  }
  .weui-uploader__input-box:nth-of-type(3n + 1) {
    margin-left: 0px;
  }
  .picture {
    width: 216upx;
    height: 216upx;
    border-radius: 8px;
    margin-left: 20upx;
    margin-bottom: 20upx;
    float: left;
    .weui-uploader__file {
      width: 216upx;
      height: 216upx;
      border-radius: 8px;
      // overflow: hidden;
      .weui-uploader__img {
        width: 100%;
        height: 100%;
        border-radius: 12rpx;
      }
    }
  }
  .picture:nth-of-type(3n + 1) {
    margin-left: 0px;
  }
  .weui-uploader__input {
    width: 216upx;
    height: 216upx;
    background: #fcfcfc;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 12rpx;
    font-size: 14px;
    & > img {
      width: 90rpx;
      height: 65rpx;
    }
  }
  .weui-uploader__bd {
    margin: 0 28upx;
  }
  .posi-rela {
    position: relative;
    overflow: visible;
  }
  .weui-uploader__file:nth-child(4n) {
    margin-right: 0;
  }
  .btn-wrap {
    padding: 0 28upx;
    height: 130upx;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    align-items: flex-end;
    margin-bottom: 20upx;
  }
  button {
    width: 100%;
    height: 90rpx;
    line-height: 90rpx;
    font-size: 32upx;
  }
  button[type="primary"] {
    // background: #acacac;
    border-radius: 45upx;
  }

  button:after {
    border: none;
  }
}
</style>
