import axios from "axios";

// 创建一个 axios 实例
const instance = axios.create();

// 设置请求拦截器
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    // console.log('Request Interceptor:', config);
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 设置响应拦截器
instance.interceptors.response.use((response) => {
    // 对响应数据做点什么
    console.log('Response Interceptor:', response);
    return response;
}, (error) => {
    // 对响应错误做点什么
    // console.log('响应错误:', error);
    localStorage.setItem('localMsg', error.response.data.message) // 用于消息提醒
    return Promise.reject(error);
});

export const request = (configs) => {
    return instance(configs);
}
