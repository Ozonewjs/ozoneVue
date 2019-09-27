import request from '@/utils/request'
export function fileDownload(params){
    return request({
        url: '/DocManage/fileDownLoad',
        method: 'post',
        data: params,
        responseType: 'blob'
      })
}