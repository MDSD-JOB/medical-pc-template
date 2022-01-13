import request from '@/utils/request'

const api = {
  deletePatient: '/chestpain/PatientController/v1/deletePatient',
  queryPatient: '/chestpain/PatientController/v1/queryPatient',

  getFlowingWaterId: '/piat/RegistrationInfoController/v1/getFlowingWaterId',
  regDetails: '/piat/RegistrationInfoController/v1/regDetails',
  regSaveOrUpdate: '/piat/RegistrationInfoController/v1/regSaveOrUpdate',
  
  
  regExport: '/piat/RegistrationInfoController/v1/regExport',
  getCardInfo: '/piat/RegistrationInfoController/v1/getCardInfo',
  clinicTriageHelp: '/piat/TriageHelpController/v1/getTriageHelp',
  modSaveOrUpdate: '/piat/RegistrationInfoController/v1/modSaveOrUpdate',
  getTickertapePdfUrl: '/piat/RegistrationInfoController/v1/triageSlip',
  getDetailPdfUrl: '/piat/RegistrationInfoController/v1/TriageDetailed',
  getSpireLamellaList: '/piat/RegistrationInfoController/v1/getSpireLamellaList',
  getWristbandPdfUrl: '/piat/RegistrationInfoController/v1/printWristbands'
}

export default api
//获取流水号
export function getFlowingWaterId() {
  return request({
    url: api.getFlowingWaterId,
    method: 'get'
  })
}

//获取详情
export function regDetails(id, parameter) {
  return request({
    url: api.regDetails + '/' + id,
    method: 'get',
    params: parameter
  })
}
//新增or更新
export function regSaveOrUpdate(params) {
  return request({
    url: api.regSaveOrUpdate,
    method: 'post',
    data: params
  })
}
//删除
export function deletePatient(params) {
  return request({
    url: api.deletePatient,
    method: 'post',
    data: params
  })
}
//列表
export function queryPatient(params) {
  return request({
    url: api.queryPatient,
    method: 'post',
    data: params
  })
}
//导出
export function regExport(params) {
  return request({
    url: api.regExport,
    method: 'post',
    data: params
  })
}
//详情_患者信息
export function getCardInfo(params) {
  return request({
    url: api.getCardInfo,
    method: 'post',
    data: params
  })
}
// 获取体征辅助分诊
export function getClinicTriageHelp(parameter) {
  return request({
    url: api.clinicTriageHelp,
    method: 'get',
    params: parameter
  })
}
//修改分诊原因_新增or更新
export function modSaveOrUpdate(params) {
  return request({
    url: api.modSaveOrUpdate,
    method: 'post',
    data: params
  })
}

//获取PDF路径打印
export function getTickertapePdfUrl(params) {
  return request({
    url: api.getTickertapePdfUrl,
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

//获取PDF路径显示明细
export function getDetailPdfUrl(params) {
  return request({
    url: api.getDetailPdfUrl,
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

//获取PDF路径显示腕带
export function getWristbandPdfUrl(params) {
  return request({
    url: api.getWristbandPdfUrl,
    method: 'post',
    responseType: 'blob',
    data: params
  })
}

//获取腕带列表
export function getSpireLamellaList(params) {
  return request({
    url: api.getSpireLamellaList,
    method: 'post',
    data: params
  })
}
