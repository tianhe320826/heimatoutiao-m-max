import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    // 直接配置路由懒加载,指向views中的login中的index.vue
    // 但因为加载的是index.vue的时候自动加载,所以可以不写index.vue
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  routes
})

export default router
