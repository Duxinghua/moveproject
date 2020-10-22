import axios from 'axios';
// 创建 axios 实例
const service = axios.create({
	timeout: 600000 // 请求超时时间
});

// request 拦截器
service.interceptors.request.use(
	config => {
        console.log(process);
		config["baseURL"] ="/v2";// process.env.NODE_ENV === "development" ? "/v2" : process.env.BASE_API;
		console.log(config["baseURL"]);
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
		config.headers['Authorization'] = localStorage.getItem('token')
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
