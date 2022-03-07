<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录"/>

    <!-- 导航栏 -->
    <!-- 登录的表单 -->
    <van-form @submit="onSubmit">
  <van-field
  v-model="user.mobile"
    name="手机号"
    placeholder="请输入手机号"
  >
  <!-- 此处是加入手机的字体图标,使用方式为class="toutiao toutiao-icon的名字 -->
  <i slot="left-icon" class="toutiao toutiao-shouji"></i>
   </van-field>
  <van-field
  v-model="user.code"
    name="验证码"
    placeholder="请输入验证码"
  >
  <!-- 此处是加入手机的字体图标,使用方式为class="toutiao toutiao-icon的名字 -->
  <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
  <template #button>
    <!-- size是button的大小,type是button的类型 -->
    <van-button class="send-sms-btn" round size="small" type="default">发送验证码</van-button>
  </template>
  </van-field>
  <div class="login-btn-wrap">
    <van-button  class="login-btn" block type="info" native-type="submit">
      登录
    </van-button>
  </div>
</van-form>
  </div>
</template>

<script>
// 在此处按需加载login 
import { login } from '@/api/user'
export default {
  name: "LoginIndex",
  components: {},
  props: {},
  data() {
    return {
      // 
      // 1.声明一个user对象,对象中有一个mobile
      // 2.通过v-model将user对象中的数据绑定到对应的输入框中,
      // 此处绑定在两个<van-field> 双标签中
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // async..await..是为了简化异步操作调用的代码
      async onSubmit () {
      // day01 - 第15个视频
      // 1.15.1. 获取表单数据
        const user = this.user
        // 1.15.1.(1).声明一个user对象,对象中有一个mobile
        // 1.15.1.(2).通过v-model将user对象中的数据绑定到对应的输入框中,此处绑定在两个<van-field> 双标签中

        
      // 1.15.2. 表单验证
      // 1.15.3. 提交表单请求登录
      //  (1)此处会发生异常,所以用try..catch来捕获异常
      try {
        // 调用一下请求 login 传入user对象
        const res = await login(user)
        console.log('登录成功', res);
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误');
        } else {
          console.log('登陆失败,请稍后重试', err);
        }
        console.log('登陆失败', err);
      }
      // 1.15.4. 根据请求响应结果处理后续操作
    }
  }
};
</script>
  
<style scoped lang="less">
  .login-container {
    .toutiao {
      font-size: 37px;
    }

    .send-sms-btn {
      width: 156px;
      height: 46px;
      line-height: 46px;
      font-size: 22px;
      background-color: #ededed;
      color: #666;
    }

    .login-btn-wrap {
      padding: 53px 33px;
      .login-btn {
        background-color: #6db4fb;
        border: none
      }
    }
  }
</style>
