import request from '@/utils/request'

const userApi = {
  Access: '/oauth2/password',
  Login: '/stroke/up/login',
  GetCurrentUserNav: '/stroke/resource/resources_by_user',

  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  UserInfo: '/user/info',
  UserMenu: '/user/nav',
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

export function getInfo() {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}

export function getCurrentUserNav() {
  return request({
    url: userApi.UserMenu,
    method: 'get',
  })
}

export function logout() {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  })
}
