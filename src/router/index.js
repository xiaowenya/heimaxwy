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
// 暴露路由
export default router


