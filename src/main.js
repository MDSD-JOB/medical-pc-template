import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import themePluginConfig from '../config/themePluginConfig'
import MedicalUI from 'medical-ui'
import bootstrap from './core/bootstrap'
import './core/use'
import './utils/filter'
import './assets/styles/global.less'
import './assets/iconfonts/iconfont.css'
import 'medical-ui/lib/medical-ui.css'
import './permission'

Vue.use(MedicalUI)
Vue.use(VueAxios)
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

window.umi_plugin_ant_themeVar = themePluginConfig.theme

new Vue({
  router,
  store,
  i18n,
  created: bootstrap,
  render: (h) => h(App),
}).$mount('#app')
