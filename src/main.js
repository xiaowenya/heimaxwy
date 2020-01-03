import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router/index'
// 导入Element-ui库
import ElementUi from 'element-ui'
// 导入Element-ui的css
import 'element-ui/lib/theme-chalk/index.css'
// 导入自己的css样式
import './style/base.css'
// 注册element-ui
Vue.use(ElementUi)
// 设置全局axios
import axios from 'axios'
Vue.prototype.$axios=axios
// 设置基地址
axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public/'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
