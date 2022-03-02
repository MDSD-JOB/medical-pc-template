<template>
  <div class="med-pdf-wrapper">
    <div class="med-pdf-loading" v-show="loading">
      <a-spin size="large" />
    </div>
    <!-- <pdf
      ref="pdf"
      :src="src"
      style="display: inline-block; width: 100%"
      v-for="i in numPages"
      :key="i"
      :page="i" /> -->
    <!-- <iframe id="printIframe" :src="iframesrc" frameborder="0" style="display:none"></iframe> -->
    <div id="printContent">
      <img :src="src" class="med-pdf-img" />
    </div>
    <med-button id="printBtn" v-print="pdfObj" style="width: 0; height: 0; visibility: hidden">打印</med-button>
  </div>
</template>

<script>
import axios from 'axios'
import pdf from 'vue-pdf'
export default {
  name: 'MedPdf',
  components: {
    pdf,
  },
  data() {
    return {
      loading: true,
      src: '',
      iframesrc: '',
      numPages: 0,
    }
  },
  props: {
    url: {
      type: String,
      required: true,
    },
    pdfObj: {
      type: Object,
      default: () => ({
        id: 'printContent',
        popTitle: '&nbsp;',
      }),
    },
  },
  created() {
    this.getPdfCode()
  },
  methods: {
    print() {
      // document.getElementById('printIframe').contentWindow.print() //pdf
      document.getElementById('printBtn').click()
    },
    getPdfCode() {
      const downUrl = ['prod', 'production'].includes(process.env.NODE_ENV)
        ? window.GLOBAL_APP_API_BASE_URL + this.url
        : window.GLOBAL_APP_API_BASE_URL + 'api' + this.url
      axios({
        method: 'post',
        url: downUrl,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
        responseType: 'blob', //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
      })
        .then((response) => {
          const data = this.getObjectURL(response.data)
          this.src = data
          // pdf
          // this.iframesrc = data
          // this.src = pdf.createLoadingTask(data)
          // this.src.promise.then(pdf => {
          //   this.numPages = pdf.numPages
          // })
          this.loading = false
          this.$emit('loaded')
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    getObjectURL(file) {
      let url = null
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file)
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file)
        } catch (error) {}
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file)
        } catch (error) {}
      }
      return url
    },
  },
}
</script>

<style lang="less">
.med-pdf-wrapper {
  .med-pdf-loading {
    text-align: center;
    border-radius: 4px;
    margin-bottom: 20px;
    padding: 30px 50px;
    margin: 20px 0;
  }
  .med-pdf-img {
    width: 100%;
  }
}
</style>
