import request from '@/utils/request'

const api = {
  queryByCodeList: '/dic/base/dictionary/queryByCodeList',
  queryScoreList: '/dic/base/ratingscaleItem/queryList'
}

//字典表参数请求
export function queryByCodeList(params) {
  return request({
    url: api.queryByCodeList,
    method: 'post',
    data: params
  })
}

//字典表参数请求(score/modal)
export function queryScoreList(params) {
  return request({
    url: api.queryScoreList,
    method: 'post',
    data: params
  })
}
