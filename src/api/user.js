import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
  console.log(data)
  return request({
    url: '/user/login',
    method: 'post',
    params: data
  })
}

export function getInfo(username) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { username: username }
  })
}
// 数组为参数是进行
export function getMenus(roles) {
  return request({
    url: '/user/menus',
    method: 'get',
    params: { roles: roles },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
