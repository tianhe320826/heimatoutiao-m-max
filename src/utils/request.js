/**
 * 基于axios封装的请求模块
 */
// 将axios加载进来
 import axios from "axios"

//  把容器store存放进来,里面存放着token 此处可以不用写index.js,因为默认找到的就是index.js
 import store from '@/store/index.js'

// 创建一个实例,来自定义对他的配置 axios的create方法
// 用request接收一下create方法的返回值
 const request = axios.create({
    //  配置一个baseURL 这是一个基准路径 
    //  好处是以后请求的时候不用再写这么长的路径,只需要写后面的内容即可
   baseURL: "http://toutiao.itheima.net" // 接口的基准路径
 })


//  请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起的时候会经过这里
  // config: (config属性是本次请求的请求配置对象)
  // console.log(config); // config属性中有请求方式,请求的url地址等
  // 将user解构出来
  const { user } = store.state
  // 做个判断,如果这个user是有效的,并且user中有token这个数据,那么此时我们添加这个token才有意义
  // 
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${ user.token }`
  }
// console.log(config);
  // 此处必须要返回 config这个配置对象,否则请求就会停在这里,一直出不去(其实就是个放行的标记)
  return config
}, function (error) {
  // 此处是 如果请求出错了(还没有发出去),则会进入到这里面
  return Promise.reject(error)
})

// 响应拦截器

 
 // 导出请求对象request
 export default request