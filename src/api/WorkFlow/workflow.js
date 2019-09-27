import request from '@/utils/request'
export function queryOpinionByObjectno(params){
    return request({
        url: '/WorkFlow/QueryOpinionByObjectno',
        method: 'get',
        params
      })
}