// 导入Vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入组件
import login from '../views/login/login'
import index from '../views/index/index'
import user from '../views/index/user/user'
import chart from '../views/index/chart/chart'
import enterprise from '../views/index/enterprise/enterprise'
import subject from '../views/index/subject/subject'
import question from '../views/index/question/question'

// 注册路由
Vue.use(VueRouter)
// 实例化路由(创建路由对象)
let router = new VueRouter({
  // 配置路由
  routes: [{
      path: "/login",
      component: login
    },
    {
      path: "/index",
      component: index,
      children: [{
          path: 'chart',
          component: chart
        },
        {
          path: 'user',
          component: user
        },
        {
          path: 'question',
          component: question
        },
        {
          path: 'enterprise',
          component: enterprise
        },
        {
          path: 'subject',
          component: subject
        },
      ]
    },
  ]
})

// 挂载路由导航守卫
// router.beforeEach((to,from,next)=>{
//   // to 将来访问的路径
//   // from 代表从哪个路径跳转而来
//   // next()放行
//   // next('/login)强制跳转
//   if(to.path==='/login') return next()
//   // 获取token
//   const tokenStr=window.sessionStorage.token
//   if(!tokenStr) return next('/login')
//   next()
// })
// 暴露路由
export default router