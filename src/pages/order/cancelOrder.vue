<template>
  <div class="submit">
             <TopNav :menu="menutext" />
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
           <van-uploader v-model="fileList" multiple  :max-count="4" :after-read="afterRead" :before-delete="beforedelete"  />
		    </div>
			</div>
			<div class="btn-wrap">
				<button type="primary" class="btn"   @click="testSubmit">确认取消</button>
			</div>
	</div>
</template>
<script>
import TopNav from "@/components/topnav.vue";
export default {
  data() {
    return {
      notedata: "",
      fileList: [],
      seqId: "",
      sheetId: "",
      menutext:'取消订单'
    };
  },
  components:{
    TopNav
  },
  mounted() {
    this.seqId = this.$route.query.seqId;
    this.sheetId = this.$route.query.sheetId;
  },
  methods: {
    afterRead(e,detail){
      console.log(detail)
      var data = new FormData();
      data.append('file', e.file)
      this.$api.appealimgUpload(data).then((result) => {
        if(result.code == 200){
          this.fileList[detail.index].viewUrl = result.data.viewUrl
          // localStorage.setItem('fileList',JSON.stringify(this.fileList))
        }else{
          return this.$toast(result.msg)
        }
      })
    },
    beforedelete(e,detail){
      var index = detail.index
      this.fileList.splice(index,1)
    },
    chooseImage(e) {

    },
    predivImage(e) {

    },
    deletImg(index) {
      this.fileList.splice(index, 1);
    },
    testSubmit(e) {
      let _this = this;
      let imgList = _this.fileList;
      if (!this.notedata) {
        this.$toast("请输入取消原因")
        return false;
      }
      if (this.fileList.length == 0) {
        this.$toast("请上传图片")
        return false;
      }
      var imglist = []
      this.fileList.map((item,index)=>{
        var obj = {
          picUrl:item.viewUrl,
					sort:index,
					picType:2,
					sheetId:_this.sheetId
        }
        imglist.push(obj)
      })
      var data = {
        		headSeqId: _this.seqId,
						orderPicList:imglist,
						remarks:_this.notedata,
					  evaluateType:'P'
      }
          new Promise((resolve) => {
            this.$dialog.confirm({
            title: '你正在取消订单',
            message: '取消后，将不可修改',
          })
      .then(() => {
        // on confirm
    //notedata
        _this.$api.cancelStatusUser(data).then((result)=>{
            					if (result.code == 200) {
                              _this.$router.push({path:'/myorder'})
											}
        })
      })
      .catch(() => {
        // on cancel
        _this.$router.push({path:'/myorder'})
      });
          })
    }
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
    margin: 20px;
    padding-bottom: 20px;
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    position: relative;
    height: 200px;
    textarea {
      padding: 28px;
      box-sizing: border-box;
      border: none;
      width: 100%;
    }
    .textarea {
      font-size: 28px;
      font-family: PingFang SC;
      color: rgba(102, 102, 102, 1);
      line-height: 40px;
    }
    & > img {
      width: 30px;
      height: 32px;
      position: absolute;
      top: 30px;
      margin-right: 20px;
    }
  }
  .tip {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 0 28px;
    font-size: 18px;
    span {
      color: #fe6535;
      font-size: 13px;
      margin-left: 10px;
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
    width: 216px;
    height: 216px;
    margin-left: 10px;
    margin-bottom: 10px;
    float: left;
  }
  .weui-uploader__input-box:nth-of-type(3n + 1) {
    margin-left: 0px;
  }
  .picture {
    width: 216px;
    height: 216px;
    border-radius: 8px;
    margin-left: 20px;
    margin-bottom: 20px;
    float: left;
    .weui-uploader__file {
      width: 216px;
      height: 216px;
      border-radius: 8px;
      // overflow: hidden;
      .weui-uploader__img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
      }
    }
  }
  .picture:nth-of-type(3n + 1) {
    margin-left: 0px;
  }
  .weui-uploader__input {
    width: 216px;
    height: 216px;
    background: #fcfcfc;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 12px;
    font-size: 14px;
    & > img {
      width: 90px;
      height: 65px;
    }
  }
  .weui-uploader__bd {
    margin: 0 28px;
  }
  .posi-rela {
    position: relative;
    overflow: visible;
  }
  .weui-uploader__file:nth-child(4n) {
    margin-right: 0;
  }
  .btn-wrap {
    padding: 0 28px;
    height: 130px;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    align-items: flex-end;
    margin-bottom: 20px;
  }
  button {
    width: 100%;
    height: 90px;
    line-height: 90px;
    font-size: 32px;
  }
  button[type="primary"] {
    background: #28ae3a;
    border-radius: 45px;
    border: none;
    color:white;
  }

  button:after {
    border: none;
  }
}
</style>
