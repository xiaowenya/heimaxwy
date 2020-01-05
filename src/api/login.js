
import axios from 'axios'

//定义一个登录的方法,并暴露出去
export function login(data) {
  return axios({
    url:process.env.VUE_APP_BASEURL+'/login',
    method: 'post',
    withCredentials: true,
    data
  })
}