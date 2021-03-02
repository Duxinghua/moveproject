<template>
	<div class="submit">
		<scroll-view scroll-y class="class-list-wrap">
			<div class="job">
				<textarea maxlength="200" v-model="notedata" placeholder="填写订单备注需求" placeholder-style="color:#999;font-size:14px"
				 class="textarea" />
				</div>
				<h4>上传搬家物品照片</h4>
		    <div class="weui-uploader__bd th-backwhite">
		      <div class="weui-uploader__files" id="uploaderFiles">
		        <div v-for="(item,index) in fileList" :key="index" class="picture">
		          <div class="weui-uploader__file posi-rela" :id="item.path">
					 <image class="th-icon-cancel" src="../static/del.png" @click="deletImg(index)"></image>
		            <image class="weui-uploader__img" :src="item.path"  mode="aspectFill"  @click="predivImage"/>
		          </div>
		        </div>
		        <div class="weui-uploader__input-box">
		          <div class="weui-uploader__input" @click="chooseImage">
				  <image src='../static/camrea.png'></image>
		          </div>
		        </div>
		      </div>
		    </div>
			</scroll-view>
			<view class="btn-wrap">
				<button type="primary" :loading="loading"  @click="testSubmit">确定</button>
			</view>
	</div>
</template>
<script>
	import { UPLOAD_API} from '@/api'
	export default{
		data(){
			return{
				notedata: '',
				fileList: [],
				seqId:'',
				merchantShopId:'',
				skuSeqId:''
			}
		},
		onLoad(){
			if(uni.getStorageSync('fileList').length>0){
				let array=uni.getStorageSync('fileList')
				let picList=[],obj={}
				array.forEach(item=>{
					obj={
						path:item.picUrl
					}
					picList.push(obj)
				})
				this.fileList=picList
				console.log(this.fileList)
			}else{
				this.fileList=[]
			}
			if(uni.getStorageSync('notedata')){
				this.notedata=uni.getStorageSync('notedata')
			}else{
				this.notedata=''
			}
		},
		 methods: {
		      chooseImage(e) {
				  uni.chooseImage({
					count:4-this.fileList.length,
				  	success: e => {
						if(this.fileList.length<=3){
							this.fileList = [...this.fileList, ...e.tempFiles]
						}else{
							uni.showToast({
								title: '最多上传4张搬家物品照片',
								icon: 'none'
								})
						}
				  		
				  	}
				  });
		      },
		      predivImage(e) {
		        let arr = []
		        this.fileList.forEach(item => {
		          arr.push(item.path)
		        })
		        uni.previewImage({
		          current: e.currentTarget.id, // 当前显示图片的http链接
		          urls:arr // 需要预览的图片http链接列表
		        })
		      },
			  deletImg(index) {
			    this.fileList.splice(index, 1)
			  },
		      testSubmit(e) {
				  if(!this.notedata){
					  uni.showToast({
					  	title: '请输入订单备注需求',
					  	icon: 'none'
					  	})
					  return false
				  }
				  if(this.fileList.length<1){
					  uni.showToast({
					  	title: '请上传搬家物品照片',
					  	icon: 'none'
					  	})
					  return false
				  }
						let _this = this;
						let imgList = _this.fileList;
						let picture = [];
						new Promise(resolve => {
							uni.showModal({
								title: '你正在提交订单备注',
								success: function(res) {
									if (res.confirm) {
										resolve(true)
									} else if (res.cancel) {
										return false
									}
								}
							})
						}).then(res => {
								let i = 0;
								let picture = [];
								upLoadImg();
								function upLoadImg() {
									if (i < imgList.length) {
										if(imgList[i].path.indexOf('https')>-1){
											let imgUrl = {
												picUrl:imgList[i].path
											}
											picture.push(imgUrl)
											if (imgList.length === picture.length) {
												var pages = getCurrentPages();
												var prevPage = pages[pages.length - 2]; //上一个页面
												prevPage.$vm.orderPicList =picture
												prevPage.$vm.orderDescribe =_this.notedata
												uni.setStorageSync('fileList', picture);
												uni.setStorageSync('notedata', _this.notedata);
												uni.navigateBack()
											} else{
												i++;
												upLoadImg()
											}
										}else{
											uni.uploadFile({
												url: UPLOAD_API,
												filePath: imgList[i].path,
												name: 'file',
												success(res) {
													let obj = JSON.parse(res.data);
													let {
														data
													} = obj;
													if (data) {
														let imgUrl = {
															picUrl:data.viewUrl
														}
														picture.push(imgUrl)
													}
												},
												complete() {
													if (imgList.length === picture.length) {
														var pages = getCurrentPages();
														var prevPage = pages[pages.length - 2]; //上一个页面
														prevPage.$vm.orderPicList =picture
														prevPage.$vm.orderDescribe =_this.notedata
														uni.setStorageSync('fileList', picture);
														uni.setStorageSync('notedata', _this.notedata);
														uni.navigateBack()
													} else{
														i++;
														upLoadImg()
													}
												}
											})
										}
										
									}
								}
							
							
						})
		      }
		    }
	}
</script>

<style lang="scss">
	.submit{
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #f3f3f3;
		 .job {
			margin:20upx 24upx 28upx 24upx;
			 padding-bottom:20px;
		     background:rgba(255,255,255,1);
		     border-radius:6px;
			 position: relative;
		     textarea {
		       padding:10px 10px 0 5px;
			   width: 90%;
		      }
			  .textarea{
				  font-size: 28upx;
				  font-family: PingFang SC;
				  color: rgba(102, 102, 102, 1);
				  line-height: 40upx;
				  height: 114px;
				  margin-left:22upx;
			  }
			  &>image{
				  width:30rpx;
				  height:32rpx;
				  position: absolute;
				  top: 30rpx;
				margin-right:20rpx;
			  }
		    } 
			h4{
				margin-left: 24rpx;
				    color: #454545;
				    margin-bottom: 24rpx;
				}
			
			.class-list-wrap{
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
		      width: 200upx;
		      height: 216upx;
		      margin-left: 10px;
		      margin-bottom: 10px;
		      float: left;
		    }
		    .weui-uploader__input-box:nth-of-type(3n + 1) {
		      margin-left: 0px;
		    }
		    .picture {
		     width: 200upx;
		     height: 200upx;
		      border-radius: 8px;
		      margin-left: 36upx;
		      margin-bottom: 30upx;
		      float: left;
		      .weui-uploader__file {
		       width: 200upx;
		       height: 200upx;
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
		      width: 200upx;
		      height: 200upx;
		      background: #fcfcfc;
		      display: flex;
		      justify-content: center;
			 flex-direction: column;
		      align-items: center;
			  font-size:14px;
			   border-radius: 16rpx;
			  &>image{
				  width: 90rpx;
				  height:73rpx;
				  margin-bottom:18upx;
			  }
		    }
		    .weui-uploader__bd {
		     margin:0 28upx;
		    }
		    .posi-rela {
		      position: relative;
		      overflow: visible;
		    }
		    .weui-uploader__file:nth-child(4n) {
		      margin-right: 0;
		    }
			.btn-wrap {
				padding:0 28upx;
				height: 130upx;
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 100%;
				box-sizing: border-box;
				align-items: flex-end;
				margin-bottom:20upx;
			}
			button{
				 width:90%;
				 height: 76rpx;
				 line-height: 76rpx;
				 font-size: 32upx;
			}
			button[type=primary] {
				background-color: #28ae3a;
				
				border-radius: 45Upx;
			}
						
			button:after {
				border: none;
			}		
			
	}
</style>
