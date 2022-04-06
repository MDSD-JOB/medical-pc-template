import request from '@utils/http/request'

const userApi = {
  Access: '/oauth2/password',
  Login: '/authority/me',
  GetUserBackMenu: '/resource/resources_by_user',
  GetAllSource: 'authority/clientresourcelist',
}

export function access(parameter) {
  return request({
    url: userApi.Access,
    method: 'post',
    params: parameter,
  })
}

export function login(parameter) {
  return request({
    url: userApi.Login,
    method: 'get',
    data: parameter,
  })
}

export function getUserBackMenu() {
  return request({
    url: userApi.GetUserBackMenu,
    method: 'get',
  })
}

export function getAllSource() {
  return request({
    url: userApi.GetAllSource,
    method: 'get',
  })
}
