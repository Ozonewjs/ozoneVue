import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}
export function getUserList(params) {
  return request({
    url: '/UserManageQuery/QueryUserInfoByTeam',
    method: 'post',
    data: params ,
  })
}
export function getTeamList(params) {
  return request({
    url: '/TeamQuery/QueryAllTeams',
    method: 'post',
    data: params ,
  })
}
export function getRoleList(params) {
  return request({
    url: '/UserManage/QueryRoles',
    method: 'post',
    data: params ,
  })
}
export function roleUpdate(params) {
  return request({
    url: '/RoleManage/roleUpdate',
    method: 'post',
    data: params ,
  })
}
export function saveUserMenu(params) {
  return request({
    url: '/RoleManage/SaveUserMenu',
    method: 'post',
    data:  params,
  })
}