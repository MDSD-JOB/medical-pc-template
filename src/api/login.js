import request from '@/utils/request'

const userApi = {
  Access: '/oauth2/password',
  Login: '/up/login',
  GetUserBackMenu: '/resource/resources_by_user',
}

export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter,
  })
}

export function access(parameter) {
  return request({
    url: userApi.Access,
    method: 'post',
    params: parameter,
  })
}

export function getUserBackMenu() {
  return request({
    url: userApi.GetUserBackMenu,
    method: 'get',
  })
}
