import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/Login/userLogin',
    method: 'post',
    params: data
  })
}

export function getInfo(roleid) {
  return request({
    url: '/RoleManage/queryRoleMenuByRoleId',
    method: 'post',
    params: { roleid: roleid }
  })
}
export function getMenus(roleid) {
  return request({
    url: '/RoleManage/queryRoleMenuByRoleId',
    method: 'post',
    params: { roleid: roleid }
  })
}
export function queryMenus(params) {
  return request({
    url: '/RoleManage/QueryMenu',
    method: 'post',
    data: params
  })
}
// // 数组为参数是进行
// export function getMenus(roles) {
//   return request({
//     url: '/user/menus',
//     method: 'get',
//     params: { roles: roles },
//     paramsSerializer: params => {
//       return qs.stringify(params, { indices: false })
//     }
//   })
// }
export function logout(roleid) {
  return request({
    url: '/Login/removeUser',
    method: 'post',
    params: { roleid: roleid }
  })
}
