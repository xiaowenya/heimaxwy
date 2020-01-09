// 导入Vue
import Vue from 'vue'
// 导入时间格式的moment.js
import moment from 'moment'

// 创建全局过滤器
// 时间格式
Vue.filter('formatTime', function (value) {
  return moment(value).format('YYYY-MM-DD')
})