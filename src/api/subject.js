// 导入axios
import axios from 'axios'

// 导入token
import {
  getToken
} from '../utils/token'

// 创建一个 学科页面 请求对象
const subjectRequest = axios.create({
  // 环境变量---基地址
  baseURL: process.env.VUE_APP_BASEURL
})

// 拦截器
// 添加请求拦截器
subjectRequest.interceptors.request.use(
  function (config) {
    // 在发送之前做的事
    // 设置请求头,携带token
    config.headers.token = getToken()
    return config
  },
  function (error) {
    // 在请求错误的时候做一些事
    return Promise.reject(error)
  }
)
// 添加响应拦截器
subjectRequest.interceptors.response.use(
  function (response) {
    // 对响应的数据做一些事
    return response.data
  },
  function (error) {
    // 响应错误的时候做一些事
    return Promise.reject(error)
  }
)

// 抽取接口方法
// 获取列表
export function subjectList(params) {
  return subjectRequest({
    url: '/subject/list',
    method: 'get',
    params
  })
}
// 添加学科
export function subjectAdd(data) {
  return subjectRequest({
    url: '/subject/add',
    method: 'post',
    data
  })
}
// 状态修改
export function subjectStatus(data) {
  return subjectRequest({
    url: '/subject/status',
    method: 'post',
    data
  })
}
// 删除学科
export function subjectRemove(data) {
  return subjectRequest({
    url: '/subject/remove',
    method: 'post',
    data
  })
}
// 编辑学科
export function subjectEdit(data) {
  return subjectRequest({
    url: '/subject/edit',
    method: 'post',
    data
  })
}