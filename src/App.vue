<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view v-if="isRouterAlive" />
    </div>
  </a-config-provider>
</template>

<script>
import Vue from 'vue'
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

export default {
  created() {
    Vue.prototype.$reload = this.reload
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    locale() {
      const { title } = this.$route.meta
      title && setDocumentTitle(`${i18nRender(title)} - ${domTitle}`)
      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>
