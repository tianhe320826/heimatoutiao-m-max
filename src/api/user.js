// 用户相关的请求模块

// 因为要开始发请求了,所以开始加载之前封装的utils中的request请求模块
// 这个才是真正用来发请求的
import request from '@/utils/request'

// 导出一个叫login的方法
export const login = data => {
    // 把具体的请求配置到这个login()方法中
    return request({
        // method的请类型为'POST'
        method: 'POST',
        // 请求登录的接口地址,不需要写全,因为在utils中的request中配置了baseURL 
        url: '/v1_0/authorizations',
        // 此处为data: data 可以简写为data
        // 把接收到的参数直接传递到具体的请求的位置data
        data
    })
}