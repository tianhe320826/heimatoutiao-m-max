<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <!--
      vant文档中有 -> route: 开启路由模式  
      路由模式
      标签栏支持路由模式，用于搭配 vue-router 使用。
      路由模式下会匹配页面路径和标签的 to 属性，并自动选中对应的标签。
     
     v-model="active"  可以手动控制,但激活了路由模式后就不需要了
     在开启了route模式之后就不需要了,因为已经成了路由路径的形式
     -->
    <van-tabbar class="layout-tabbar"  route>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text">{{ $store.state.user ? '我的' : '未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.layout-container {
    .layout-tabbar {
        i.toutiao {
            font-size: 40px;
        }
        span.text {
            font-size: 20px;
        }
    }
}
</style>