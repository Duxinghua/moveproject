import axios from 'axios';
import router from '../router'
import { Toast } from 'vant';

function directLogin() {
  router.push({
      path: '/login',
      query: {}
  })
}
// 创建 axios 实例
const service = axios.create({
	timeout: 600000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(
	config => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
    });
		config["baseURL"] = process.env.NODE_ENV === "development" ? "/v1" : process.env.BASE_API;
    console.log(config["baseURL"]);
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers['Authorization'] = localStorage.getItem('token') ? localStorage.getItem('token')  : ''
		return config;
	},
	error => {
		Promise.reject(error);
	}
);

// response 拦截器
service.interceptors.response.use(
	response => {

		if (response.status === 200) {
      Toast.clear()
      console.log(response)
			if (response.data.code === 401) {
				directLogin()
			}else if(response.data.code === 500){
        // if(response.config.url != '/v1/orderHead/calcPrice' || response.config.url != '/v1/custlogin/getOfficeOpenId'){
        //   Toast(response.data.msg);
        // }
      }
			return response.data;
		}else{
      Toast.clear()

      return response.data;
    }
	},
	error => {
		return Promise.reject(error);
	}
);

export default service;
