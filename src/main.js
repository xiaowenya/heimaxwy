import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index'
// 导入Element-ui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 注册element-ui
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
