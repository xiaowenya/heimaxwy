// 导入axios
import axios from 'axios'
// 导入token抽取函数
import {
  getToken
} from '../utils/token'

// 创建新的请求对象
const request = axios.create({
  baseURL: process.env.VUE_APP_BASEURL
})

// 拦截器
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    config.headers.token = getToken()
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
request.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default request