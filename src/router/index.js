// 导入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login/login'
import index from '../views/index/index'
// 注册路由
Vue(VueRouter)
// 
let router =new VueRouter({
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
export default router


