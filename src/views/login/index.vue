<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />

    <!-- 导航栏 -->
    <!-- 登录的表单 -->
    <!-- 一.大功能 - 表单验证 
    1. 给van-field 组件配置 rules 验证规则
       参考文档: 在Rule数据结构的位置
       地址: https://vant-contrib.gitee.io/vant/v2/#/zh-CN/form#rule-shu-ju-jie-gou#rule-shu-ju-jie-gou
    2. 当表单提交的时候会自动触发表单验证
       如果验证通过,则触发submit事件
       如果验证失败, 则不会触发 submit事件
    3. 补充内容:
       如果想要限制输入类型或者限制长度,直接在标签中写上
       type="number"   maxlength="11"  这是浏览器自带的功能 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <!-- required 代表的是必填项 不能为空  message错误提示消息,验证失败的时候会显示在输入框下面-->
        <!-- 此处是加入手机的字体图标,使用方式为class="toutiao toutiao-icon的名字 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <!-- 此处是加入手机的字体图标,使用方式为class="toutiao toutiao-icon的名字 -->
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- size是button的大小,type是button的类型 -->
          <!-- 倒计时  time属性是设置时间的  format是时间的格式 ss是秒的格式,s是字符s,用于拼接的-->
          <!-- 此处里面的v-if和下面的v-else是为了控制data中的 isCountDownShow: false,
                主要用于控制状态, -->
          <van-count-down 
          v-if="isCountDownShow"
          :time="1000 * 1" 
          format="ss s" 
          @finish="isCountDownShow = false"

          />

          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 在此处按需加载login
// 发送验证码部分 -> 此处直接调用onSendSms
import { login, sendSms } from "@/api/user";
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
        mobile: "", // 手机号
        code: "", // 验证码
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: "手机号格式错误",
          },
        ], // 手机号
        code: [
          {
            required: true,
            message: "请填写验证码",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码格式错误",
          },
        ], // 验证码
      },
      // 这个属性是控制倒计时的显示和隐藏.默认为false(是否展示倒计时)
      isCountDownShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    // async..await..是为了简化异步操作调用的代码
    async onSubmit() {
      // day01 - 第15个视频
      // 1.15.1. 获取表单数据
      const user = this.user;
      // 1.15.1.(1).声明一个user对象,对象中有一个mobile
      // 1.15.1.(2).通过v-model将user对象中的数据绑定到对应的输入框中,此处绑定在两个<van-field> 双标签中

      // 1.15.2. 表单验证
      // 在组件中必须要通过 this.$toast 来调用Toast 组件
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true, //禁用背景点击
        duration: 0, // 持续时间默认是2000,所以改为0则为持续展示
        // 如果需要暂停,则需要成功或者失败来让这个登陆中的加载提示停止
      });
      // 1.15.3. 提交表单请求登录
      //  (1)此处会发生异常,所以用try..catch来捕获异常
      try {
        // 调用一下请求 login 传入user对象
        // 此处需要给data进行解构
        const { data } = await login(this.user);
        // console.log("登录成功", res);
        // 解构data之后,也就是直接访问到了这个setUser对象(这个是在VueX中定义的),并且更新到VueX这个容器当中
        // 但此时VueX也只是做到了在运行过程中存储数据,不存在持久性,一刷新就会消失,所以此时需要加入本地存储
        this.$store.commit('setUser', data.data)
        // 引入登录成功的提示
        // 登陆成功则覆盖了前一个的加载中提示,原因是: toast具备让一个覆盖另一个提示的功能
        this.$toast.success("登陆成功");
      } catch (err) {
        if (err.response.status === 400) {
          console.log("手机号或验证码错误");
          this.$toast.fail("手机号或验证码错误");
        } else {
          console.log("登陆失败,请稍后重试", err);
          this.$toast.fail("登陆失败,请稍后重试");
        }
        console.log("登陆失败", err);
      }
      // 1.15.4. 根据请求响应结果处理后续操作
    },

    // day02 - 视频3 - 发送验证码功能
    async onSendSms() {
      console.log("onSendSms");
      // 1. 校验手机号码是否正确
      // 步骤: 如果验证成功,则运行try中的代码,try中的代码执行完毕之后会继续往后执行
      // 如果验证失败则进入catch,做一个日志输出
      try {
        await this.$refs.loginForm.validate("mobile");

        console.log("验证通过");
      } catch (err) {
        console.log("验证失败", err);
        // return的目的是: 当代码验证失败之后让代码不要继续往后执行了
        // 但单独写一个return不可以,所以直接让其和log连写即可
        return console.log("验证失败", err);
      }
      // 不传参验证所有,传参则只验证传入的

      // 2. 验证通过, 显示倒计时 (当点击的验证通过之后显示倒计时)
      this.isCountDownShow = true
      // 3. 请求发送验证码,只需要调用真正的接口,就可以把验证码发送到对方的手机上
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          // 因为一分钟只能发送一次,如果频繁发送会返回429提示
          this.$toast('发送太频繁了,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
        
      }
    },
  },
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
      border: none;
    }
  }
}
</style>
