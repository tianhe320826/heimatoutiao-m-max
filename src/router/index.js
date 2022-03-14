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
  },
  {
  // day02-10-个人中心  layout的路由配置
    path: '/',
    // name: 'layout', // 如果父路由有默认的子路由,name他的 name 没有任何意义
    component: () => import('@/views/layout'),
    // 配置子路由
    children :[
      {
        path: '', // 为空的话则是默认子路由,且只能有一个
        name: 'home',
        component: () => import('@/views/home')
      },{
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      },
    ]

  }
]

const router = new VueRouter({
  routes
})

export default router
