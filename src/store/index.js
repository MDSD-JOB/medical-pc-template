import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// import permission from './modules/permission'

import permission from './modules/async-router'
import getters from './getters'
import preExamScore from './modules/pre-exam-score'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    preExamScore
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
