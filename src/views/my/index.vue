<template>
  <div class="my-container">
        <!-- 
      创建header节点,在前面已经创建过一次了,
     user-info这个类名是单独的样式设置
     -->
<!-- 已登录头部 -->
<!-- 如果用户有效,则显示登录,走v-if  否则走下面的v-else -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image
            class="avatar"
            :src="userInfo.photo"
            round
            fit="cover"
          />
          <!-- fit="cover" 是为了让其不拉伸,在vant库中有 -->
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
<!-- 已登录头部 -->

    <!-- 未登录头部 -->
    <div v-else class="header not-login">
      <!-- 点击这个的登录注册按钮跳转到登录页 -->
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>


    <!-- 导航 -->
    <!-- clickable是点击反馈 增强交互 -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <!-- 此处必须加入具名插槽(也就是slot="text"),否则就是默认插槽,会覆盖所有内容,不论写了什么 -->
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link />
    <van-cell
      v-if="user"
      class="logout-cell"
      clickable
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
// 使用容器中的mapState方法,将容器中的数据映射到当前的组建中,方便获取数据
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: "MyIndex",
  components: {},
  props: {},
  data() {
    return {
      userInfo: {} // 用户信息 
    }
  },
  computed: {
// 使用容器中的mapState方法,将容器中的数据映射到当前的组建中,方便获取数据
    ...mapState(['user'])
  },
  watch: {},
  created() {
    // 如果用户登录了,则请求加载用户的信息数据
    if (this.user) { // this.user是从容器中映射出来的user数据
      this.loadUserInfo()
    }
  },
  mounted() {},
  methods: {
    onLogout() {
      // 退出提示
      // 如果确认退出,则清除登录状态(容器中的user数据 和 本地存储中的user数据)
      // 在组件中需要使用 this.$dialog 来调用弹出框组件
      this.$dialog
        .confirm({
          title: "确认退出吗?"
      })
        .then(() => {
          // on confirm
          // console.log('确认执行这里');
          // 只需要清除VueX这个容器中的user,不需要清除本地存储的,
          // 因为容器数据会更新到本地存储,所以此时的数据也是被清除的状态
          this.$store.commit('setUser', null)
        })
          .catch(() => {
          // on cancel
            console.log('取消执行这里');
        });
    },
    
    async loadUserInfo() {
      try {
        // 解构await
        const { data } = await getUserInfo()
        this.userInfo = data.data
        // console.log(data);
      } catch (err) {
        // 如果报错了,则获取数据失败了 
        this.$toast('获取数据失败,请稍后重试')
      }
    }
  },
};
</script>

<style scoped lang="less">
.my-container {
  .header {
    height: 361px;
    // 带@是直接到src路径,但css中使用的语法是为~@  在@前面加一个~
    background: url("~@/assets/banner.png");
    background-size: cover;
  }

  .not-login {
    // 水平垂直居中
    display: flex;
    // 水平居中
    justify-content: center;
    // 垂直居中
    align-items: center;
    .login-btn {
      // 水平垂直居中
      display: flex;
      flex-direction: column;
      // 垂直排列
      justify-content: center;
      // 垂直居中
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }

  .user-info {
    .base-info {
      height: 231px;
      // background-color: pink;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      // 两边撑开,各自占一边
      justify-content: space-between;
      // 垂直居中
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
    .logout-cell {
    text-align: center;
    color: #d86262;
  }
    .mb-9 {
    margin-bottom: 9px;
  }
}
</style>