import enterpriseRequest from '../utils/request'

// 抽取接口方法
// 获取列表
export function enterpriseList(params) {
  return enterpriseRequest({
    url: '/enterprise/list',
    method: 'get',
    params
  })
}
// 添加企业
export function enterpriseAdd(data) {
  return enterpriseRequest({
    url: '/enterprise/add',
    method: 'post',
    data
  })
}
// 状态修改
export function enterpriseStatus(data) {
  return enterpriseRequest({
    url: '/enterprise/status',
    method: 'post',
    data
  })
}
// 删除企业
export function enterpriseRemove(data) {
  return enterpriseRequest({
    url: '/enterprise/remove',
    method: 'post',
    data
  })
}
// 编辑企业
export function enterpriseEdit(data) {
  return enterpriseRequest({
    url: '/enterprise/edit',
    method: 'post',
    data
  })
}