import server from '@/api'
export default {
  data() {
    return {
      orderDetail: {},
      orderId: '',
      isFromConfirm: false
    }
  },
  mounted(){
    console.log(server)
    this.orderId = this.$query.id;
    this.getOrderDetail();
    if(option.from == 'confirm'){ //如果来自下单页面，显示确认按钮
      this.isFromConfirm = true;
    }
  },
  methods: {
    //获取订单详情
    async getOrderDetail(){
      let data = await this.$api.orderSheet({seqId: this.orderId});
      if(data.code == 200){
        console.log(data.data)
        this.orderDetail = data.data;
      }
    },
    goOrder(){
      uni.redirectTo({
        url: '/myOrder/index'
      });
    }
  },
  filters: {
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
    },
    orderStatus(value) {
      switch (value) {
        case 'NOPAY':
          return '待支付';
          break;
        case 'DRIVER_REC':
          return '司机已接单';
          break;
        case 'WAIT_REC':
          return '等待接单';
          break;
        case 'DRIVER_COME':
          return '司机到达';
        case 'DRIVER_WORKING':
          return '司机工作中';
          break;
        case 'DRIVER_FINISH':
          return '司机完成工作';
          break;
        case 'NOPAY2':
          return '付尾款';
          break;
        case 'FINISH':
          return '已完成';
        case 'EVALUATE':
          return '已评价';
          break;
        case 'CANCEL_APPLY':
          return '取消申请';
          break;
        case 'CANCEL':
          return '已取消';
          break;
        case 'RETURN':
          return '退款';
          break;
      }
	},
	orderStatus_worker(value) {
	  switch (value) {
	    case 'NOPAY':
	      return '待支付';
	      break;
	    case 'DRIVER_REC':
	      return '劳务工已接单';
	      break;
	    case 'WAIT_REC':
	      return '等待接单';
	      break;
	    case 'DRIVER_COME':
	      return '劳务工到达';
	    case 'DRIVER_WORKING':
	      return '劳务工工作中';
	      break;
	    case 'DRIVER_FINISH':
	      return '劳务工完成工作';
	      break;
	    case 'NOPAY2':
	      return '付尾款';
	      break;
	    case 'FINISH':
	      return '已完成';
	    case 'EVALUATE':
	      return '已评价';
	      break;
	    case 'CANCEL_APPLY':
	      return '取消申请';
	      break;
	    case 'CANCEL':
	      return '已取消';
	      break;
	    case 'RETURN':
	      return '退款';
	      break;
	  }
	}
  }
}
