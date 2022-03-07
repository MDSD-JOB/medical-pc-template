<template>
  <a-result status="403" title="403" sub-title="抱歉，您暂无访问权限，请联系管理员！">
    <template #extra>
      <a-button type="primary" @click="toHome"> 返回首页 </a-button>
    </template>
  </a-result>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Exception403',
  methods: {
    ...mapActions(['Logout']),
    toHome() {
      this.Logout().then(() => {
        this.$router.push({ path: '/user/login' })
      })
    },
  },
}
</script>
