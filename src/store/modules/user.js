import storage from 'store'
import { access, login, getUserBackMenu, getAllSource } from '@/api/login'
import { SET_JWT_TOKEN, SET_ALL_SOURCE, SET_USER_SOURCE, SET_PERMISSIONS, SET_INFO } from '@/store/mutation-types'

const user = {
  state: {
    jwt_token: '',
    allSource: [],
    userSource: [],
    permissions: [],
    info: {},
  },
  mutations: {
    [SET_JWT_TOKEN]: (state, jwt_token) => {
      storage.set(SET_JWT_TOKEN, jwt_token, 7 * 24 * 60 * 60 * 1000)
      state.jwt_token = jwt_token
    },
    [SET_ALL_SOURCE]: (state, allSource) => {
      state.allSource = allSource
    },
    [SET_USER_SOURCE]: (state, userSource) => {
      state.userSource = userSource
    },
    [SET_PERMISSIONS]: (state, permission) => {
      state.permissions = permission
    },
    [SET_INFO]: (state, info) => {
      state.info = info
    },
  },
  actions: {
    Login({ commit }, userInfo) {
      return new Promise(async (resolve, reject) => {
        try {
          const params = {
            ...userInfo,
            grant_type: process.env.VUE_APP_GRANT_TYPE,
            client_id: process.env.VUE_APP_CLIENT_ID,
            client_secret: process.env.VUE_APP_CLIENT_SECRET,
          }
          const tokenRes = await access(params)
          const jwt_token = tokenRes.result.jwt_token
          commit(SET_JWT_TOKEN, jwt_token)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },

    GetInfo({ commit }) {
      return new Promise(async (resolve, reject) => {
        getAllSource()
          .then((response) => {
            if (response.code === '0') {
              commit(SET_ALL_SOURCE, response.result)
            }
          })
          .catch((error) => {
            reject(error)
          })
        getUserBackMenu()
          .then((response) => {
            commit(SET_USER_SOURCE, response.result)
          })
          .catch((error) => {
            reject(error)
          })
        await login()
          .then((response) => {
            if (response.code === '0') {
              const permissions = response.result.permissions
              const user = response.result.user
              commit(SET_PERMISSIONS, permissions)
              commit(SET_INFO, user)
              resolve(permissions)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit }) {
      return new Promise((resolve) => {
        commit(SET_JWT_TOKEN, '')
        commit(SET_PERMISSIONS, [])
        commit(SET_ALL_SOURCE, [])
        commit(SET_USER_SOURCE, [])
        commit(SET_INFO, null)
        storage.remove(SET_JWT_TOKEN)
        resolve()
      })
    },
  },
}

export default user
