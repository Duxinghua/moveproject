import axios from 'axios';
import router from '../router'

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
		config["baseURL"] = "/v1" ;//process.env.NODE_ENV === "development" ? "/v1" : process.env.BASE_API2;
    console.log(config["baseURL"]);
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers['Authorization'] = localStorage.getItem('token')
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
      console.log(response)
			if (response.data.code === 401) {
				directLogin()
			}
			return response.data;
		}
	},
	error => {
		return Promise.reject(error);
	}
);

export default service;
