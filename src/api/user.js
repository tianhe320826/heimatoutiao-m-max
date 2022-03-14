// 用户相关的请求模块

// 因为要开始发请求了,所以开始加载之前封装的utils中的request请求模块
// 这个才是真正用来发请求的
import request from '@/utils/request'
import store from '@/store'

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

// 发送验证码部分
// ps: 这个接口每分钟只能发1次
// 导出一个叫sendSms的方法 ->  这是发送验证码部分的
export const sendSms = mobile => {
    // 把具体的请求配置到这个login()方法中
    return request({
        // method的请类型为'GET'
        method: 'GET',
        // 请求登录的接口地址,不需要写全,因为在utils中的request中配置了baseURL 
        // 参数要放在url中作为参数传过去,所以此处的mobile要进行拼接
        url: `/v1_0/sms/codes/${mobile}`
    })
}

/**
 * day02 - 第16个视频 - 获取用户自己的信息
 */
 export const getUserInfo = () => {
    return request({
      method: 'GET',
      url: '/v1_0/user',
      // 发送请求头数据
      headers: {
        // 注意：该接口需要授权才能访问
        // token的数据格式：Bearer token数据，注意 Bearer 后面有个空格
        Authorization: `Bearer ${store.state.user.token}`
      }
    })
  }