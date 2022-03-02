import storage from 'store'
import { access, login, getUserBackMenu, logout } from '@/api/login'
import { JWT_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    jwt_token: '',
    name: '',
    avatar: '',
    roles: [],
    info: {},
  },

  mutations: {
    SET_JWT_TOKEN: (state, token) => {
      state.jwt_token = token
    },
    SET_NAME: (state, { name }) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise(async (resolve, reject) => {
        const params = {
          ...userInfo,
          grant_type: process.env.VUE_APP_GRANT_TYPE,
          client_id: process.env.VUE_APP_CLIENT_ID,
          client_secret: process.env.VUE_APP_CLIENT_SECRET,
        }
        const tokenRes = await access(params)
        const jwt_token = tokenRes.result.jwt_token
        storage.set(JWT_TOKEN, jwt_token, 7 * 24 * 60 * 60 * 1000)
        commit('SET_JWT_TOKEN', jwt_token)
        login(userInfo)
          .then((response) => {
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserBackMenu()
          .then((response) => {
            const roles = response.result.permissions
            const user = response.result.user
            commit('SET_ROLES', roles)
            commit('SET_INFO', user)
            commit('SET_PERMISSIONS', roles)
            resolve(roles)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 登出
    Logout({ commit, state }) {
      return new Promise((resolve) => {
        commit('SET_JWT_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_PERMISSIONS', [])
        storage.remove(JWT_TOKEN)
        resolve()
      })
    },
  },
}

export default user
