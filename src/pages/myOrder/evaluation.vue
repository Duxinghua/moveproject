<template>
	<div class='evaluation'>
		<div class='card'>
			<div class='top_wrap'>
				<img :src="detail.custDriverInfoSimpleVo.avatarUrl"></img>
				<div class='carType' v-if="!detail.serverType=='HIRE_WORKER'">
					<span>{{detail.custDriverInfoSimpleVo.plateNumber}}</span>
					<span>{{detail.carType | carType}}</span>
				</div>
				<div class='name'>
					<span>{{detail.custDriverInfoSimpleVo.name || detail.custDriverInfoSimpleVo.nickName}}</span>
					<div class="rate">
						<div v-for="(item,index) in num" :key="index" :class="{'selected' :index <=detail.custDriverInfoSimpleVo.score-1}"
						 class='li'></div>
					</div>
					<span style='margin-left:10px'>{{detail.custDriverInfoSimpleVo.score}}分</span>
				</div>
			</div>
			<div class='bottom_wrap'>
				<div class='word' v-if="detail.serverType=='HIRE_WORKER'">评价一下劳务工吧</div><div class='word' v-else>评价一下司机吧</div>
				<div class="rate">
					<div class='ul'>
						<div class='li' v-for="(item,index) in num" :key="index" @click="changStar(index)" :class="{'selected':index <=values}"></div>
					</div>
				</div>
				<div class='content' v-if='values==4'>非常满意,无可挑剔！</div>
			</div>
		</div>
		<div class='text'>
			<textarea maxlength="200" v-model="notedata" placeholder="夸夸司机吧" placeholder-style="color:#999;font-size:14px" class="textarea" />

			</div>
			<div class='btn' @click='goEvaluate'>
				<span>立即评价</span>
			</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				num: 5,
				seqId:'',
				sheetId:'',
				detail:{
          custDriverInfoSimpleVo:{
            avatarUrl:''
          }
        },
				values:-1,
				notedata:''
			}
		},
		mounted(){
			this.seqId=this.$route.query.seqId;
			this.sheetId=this.$route.query.sheetId;
			this.getOrderDetail(this.$route.query.seqId)
		},
		filters:{
			carType(value) {
			  switch (value) {
			    case 'MINI_JEEP':
			      return '小面包车';
			      break;
			    case 'MIDDLE_JEEP':
			      return '中面包车';
			      break;
			    case 'KYW_JEEP':
			      return '依维科';
			      break;
			    case 'SMALL_CAR':
			      return '小货车';
			      break;
			    case 'MIDDLE_CAR':
			      return '中货车';
			      break;
			    case 'FIVE_METER_CAR':
			      return '5米2';
			      break;
			    case 'SIX_METER_CAR':
			      return '6米8';
			      break;
			    case 'SEVEN_METER_CAR':
			      return '7米6';
			      break;
			    case 'NINE_METER_CAR':
			      return '9米6';
			      break;
			    case 'THIRTEEN_METER_CAR':
			      return '13米';
			      break;
			    case 'SEVENTEEN_METER_CAR':
			      return '17米5';
			      break;
			  }
			}
		},
		methods: {
			changStar(index) {
				this.values = index
			},
			getOrderDetail(id){
				this.$api.orderSheet({
					seqId:id
				}).then(res => {
					if(res.code==200){
						this.detail = res.data;
					}
				})
			},
			goEvaluate(){
				if(!this.notedata){
          this.$toast('请输入评价内容')
					return false
				}
				if(this.values<0){
          this.$toast('请进行评分')
					return false
				}
        var payload = JSON.parse(localStorage.getItem("payload"));
				let userId = payload.userId
				this.$api.orderEvaluate({
					userId: userId,
					evaluateType : 'P',
					remarks: this.notedata,
					content :this.content ,
					level :this.values*1+1,
					seqId :this.seqId ,
					sheetId:this.sheetId
				}).then(res => {
					if(res.code==200){
            this.$router.push({path:'/myorder'})
					}
				})
			}
		}
	}
</script>

<style lang='scss'>
	.evaluation {
		background-color: #f3f3f3;
		height: 100vh;
		padding-top: 110px;

		.card {
			background-color: #fff;
			margin: 0 24px;
			border-radius: 18px;

			.top_wrap {
				text-align: center;
				padding-bottom: 50px;

				&>img {
					width: 80px;
					height: 80px;
					border-radius: 50%;
					margin-top: -30px;
				}

				.carType {
					margin-top:15px;
					span:first-child {
						font-weight: 600;
						font-size: 15px;
					}

					span:last-child {
						background-color: #e9eaeb;
						padding: 2px 16px;
						border-radius: 30px;
						color: #7d7e7e;
						margin-left: 10px;
						font-size: 13px;
					}
				}

				.name {
					display: flex;
					margin-top: 9px;
					justify-content: center;

					&>span {
						font-size: 12px;
					}

					.rate {
						margin-left: 7px;
						display: flex;
						align-items: center;
						.li {
							width: 23px;
							height: 22px;
							background: url('https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604296122378bc6n.png') no-repeat;
							background-size: cover;
							margin-right: 10px;
						}

						.selected {
							background: url('https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604295577891vxth.png');
							background-size: cover;
						}
					}
				}
			}

			.bottom_wrap {
				padding: 50px 0;
				text-align: center;
				 border: 1px solid #f7f7f7;
				.rate {
					margin-left: 7px;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-top: 30px;
					.ul{
						display: flex;
						align-items: center;
					}
					.li {
						width: 38px;
						    height: 38px;
						    background: url(https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604296122378bc6n.png) no-repeat;
						    background-size: cover;
						    margin-right: 30px;
					}

					.selected {
						background: url('https://editspring.oss-cn-hangzhou.aliyuncs.com/images/20201102/app_1604295577891vxth.png');
						background-size: cover;
					}
				}
				.word{
					font-size:13px;
					color:#9b9b9b;
				}
				.content{
					font-size: 13px;
					margin-top: 10px;
					color:#ff7952;
				}
			}
		}
		.text{
			margin:0 24px;
			margin-top:20px;
			padding-bottom:20px;
			background:rgba(255,255,255,1);
			border-radius:18px;
			position: relative;
      height: 130px;
			textarea {
				padding:10px 10px 10px 10px;
        box-sizing: border-box;
				width: 100%;
        position: absolute;
        left:0;
        top:0;
        border:none
			}
				.textarea{
					font-size: 28px;
					font-family: PingFang SC;
					color: rgba(102, 102, 102, 1);
					line-height: 40px;
					height: 130px;
          border:none;
				}
		}
		.btn{
			position: fixed;
			 bottom: 0;
			display: flex;
			flex-direction: column;
			justify-content: center;
			box-sizing: border-box;
			padding:30px 30px 20px 30px;
			z-index: 2;
			width: 100%;
			span{
				background-color: #28ae3a;
				height: 76px;
				border-radius: 40px;
        font-size: 38px;
				line-height: 76px;
				text-align: center;
				color:#fff;
			}
		}
	}
</style>
