import axios from 'axios'
import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { SET_JWT_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: window.GLOBAL_APP_API_BASE_URL || process.env.VUE_APP_API_BASE_URL,
  timeout: 6000, // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    const data = error.response.data
    // 从 localstorage 获取 token
    const token = storage.get(SET_JWT_TOKEN)
    if (error.response.status === 403 || error.response.status === 500) {
      notification.error({
        message: 'Forbidden',
        description: data.message,
      })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed',
      })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

request.interceptors.request.use((config) => {
  const jwt_token = storage.get(SET_JWT_TOKEN)
  if (jwt_token) {
    config.headers['jwt-token'] = jwt_token
  }
  config.headers['Content-SHA-256'] = true
  if (config.url.startsWith('/dic')) {
    config.baseURL = window.GLOBAL_APP_API_DIC_URL
  }

  return config
}, errorHandler)

request.interceptors.response.use((response) => {
  return response.data
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  },
}

export default request

export { installer as VueAxios, request as axios }
