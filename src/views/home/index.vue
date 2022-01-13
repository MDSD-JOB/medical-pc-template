<template>
  <div>
    Hello, World!
    <med-button type="primary">我是按钮</med-button>
    <med-theme />
  </div>
</template>

<script>
import { queryByCodeList } from '@/api' // 接口

export default {
  name: 'Home',
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {},
}
</script>

<style lang="less" scoped></style>
