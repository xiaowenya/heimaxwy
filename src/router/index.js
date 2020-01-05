// 导入Vue
import Vue from 'vue'
// 导入路由
import VueRouter from 'vue-router'
// 导入组件
import login from '../views/login/login'
import index from '../views/index/index'
// 注册路由
Vue.use(VueRouter)
// 实例化路由(创建路由对象)
let router =new VueRouter({
  // 配置路由
  routes:[
    {
      path:"/login",
      component:login
    },
    {
      path:"/index",
      component:index
    },
  ]
})

// 挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  // to 将来访问的路径
  // from 代表从哪个路径跳转而来
  // next()放行
  // next('/login)强制跳转
  if(to.path==='/login') return next()
  // 获取token
  const tokenStr=window.sessionStorage.token
  if(!tokenStr) return next('/login')
  next()
})
// 暴露路由
export default router


