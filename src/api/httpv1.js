import axios from 'axios';
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
			if (!(response.data.status === 200)) {
				//ly_alert(response.data.message, "warning");
			}
			return response.data;
		}
	},
	error => {
		return Promise.reject(error);
	}
);

export default service;
