import request from '@/utils/request'
export function queryInverstigationComment(params){
    return request({
        url: '/LoanInvestigate/queryInvestigationComment',
        method: 'post',
        params
      })
}
export function saveInverstigationComment(params){
    return request({
        url: '/LoanInvestigate/saveInvestigationComment',
        method: 'post',
        data: params
      })
}
