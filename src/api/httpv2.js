import axios from 'axios';
import router from '../router';
import { Toast,Dialog } from 'vant';

function directLogin() {
	Dialog.alert({
		title: '提示',
		message: '未登录或登录过期',
	}).then(() => {
		// on close
		router.push({
      path: '/login',
      query: {}
 	  })
	});

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
		config["baseURL"] = process.env.NODE_ENV === "development" ? "/v2" : process.env.BASE_API2;
		console.log(config["baseURL"]);
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
		config.headers['Authorization'] = localStorage.getItem('token') ? localStorage.getItem('token')  : ''
     // 让每个请求携带自定义token 请根据实际情况自行修改

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
			if (response.data.code === 401) {
        directLogin()
			}else if(response.data.code === 500){
        Toast(response.data.msg);
      }
			return response.data;
		}else{
      Toast.clear()
      return response.data;
    }
	},
	error => {
    directLogin()
		return Promise.reject(error);
	}
);

export default service;
