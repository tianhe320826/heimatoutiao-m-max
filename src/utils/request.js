/**
 * 基于axios封装的请求模块
 */
// 将axios加载进来
 import axios from "axios"

// 创建一个实例,来自定义对他的配置 axios的create方法
// 用request接收一下create方法的返回值
 const request = axios.create({
    //  配置一个baseURL 这是一个基准路径 
    //  好处是以后请求的时候不用再写这么长的路径,只需要写后面的内容即可
   baseURL: "http://toutiao.itheima.net" // 基础路径
 })
 
 // 导出请求对象request
 export default request