import request from '@/utils/request'
export function queryUserTodoList(){
    return request({
        url: '/Daily/QueryUserTodoList',
        method: 'get',
      })
}
export function queryBusinessMenu(params){
    return request({
        url: '/MenuManage/QueryBusinessMenu',
        method: 'get',
        params: params
      })
}