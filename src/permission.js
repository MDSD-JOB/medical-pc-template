import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress'
import '@/components/NProgress/nprogress.less'
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { SET_JWT_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

NProgress.configure({ showSpinner: false })

const allowList = ['login', 'register', '403', '404']
const loginRoutePath = '/user/login'
const defaultRoutePath = '/'

router.beforeEach((to, from, next) => {
  NProgress.start()
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)
  if (
    store.getters.permissions.length === 0 &&
    storage.get(SET_JWT_TOKEN) &&
    allowList.includes(to.name) &&
    to.path === '/403'
  ) {
    if (to.path === '/403') next()
    else next({ path: '/403' })
  } else if (storage.get(SET_JWT_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
    } else {
      if (store.getters.permissions.length === 0) {
        store
          .dispatch('GetInfo')
          .then((res) => {
            store.dispatch('GenerateRoutes', res).then(() => {
              store.getters.addRouters.forEach((r) => {
                router.addRoute(r)
              })
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (res && res.length === 0) {
                next({ path: '/403' })
              } else if (to.path === redirect) {
                next({ ...to, replace: true })
              } else {
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试',
            })
            store.dispatch('Logout').then(() => {
              next({ path: loginRoutePath, query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (allowList.includes(to.name)) next()
    else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
