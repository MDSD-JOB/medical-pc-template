import Vue from 'vue'

// base library
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'

// ext library
import MultiTab from '@/components/MultiTab'
import PageLoading from '@/components/PageLoading'
// import '@/components/use'
import './directives/action'

Vue.use(Antd)
Vue.use(Viser)
Vue.use(MultiTab)
Vue.use(PageLoading)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] WARNING: Antd now use fulled imported.')
