import axios from 'axios'

//定义一个登录的方法,并暴露出去
export function login(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + '/login',
    method: 'post',
    withCredentials: true,
    data
  })
}
// 定义一个 获取短信的 方法 并暴露出去
export function sendsms(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/sendsms",
    method: "post",
    // 跨域 是否携带 cookie
    withCredentials: true,
    data // data: data
  });
}
// 定义一个 用户注册 方法 并暴露出去
export function register(data) {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/register",
    method: "post",
    // 跨域 是否携带 cookie
    withCredentials: true,
    data // data: data
  });
}
// 定义一个 获取用户信息 方法 并暴露出去
export function info() {
  return axios({
    url: process.env.VUE_APP_BASEURL + "/info",
    method: "get",
    // 跨域 是否携带 cookie
    withCredentials: true,
    headers: {
      token: window.sessionStorage.token
    }
  });
}