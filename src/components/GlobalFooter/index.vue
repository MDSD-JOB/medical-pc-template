<template>
  <global-footer class="footer custom-render">
    <template v-slot:links> </template>
    <template v-slot:copyright>
      <div>
        copyright 2015-2022
        <a href="http://www.medicalsystem.com.cn/" target="_blank"> @苏州麦迪斯顿医疗科技股份有限公司 </a>
      </div>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter,
  },
}
</script>
