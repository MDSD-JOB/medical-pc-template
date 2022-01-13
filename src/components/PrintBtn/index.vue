<template>
  <div @click="handleShowModal">
    <slot>打印</slot>
    <med-modal
      v-model="modalVisible"
      @ok="handlePrint"
      ok-text="打印"
      :ok-button-props="{ props: { icon: 'icon_dayin' } }"
      width="max-content"
      centered
    >
      <template #title>
        <a-row type="flex" :gutter="24" class="modal-title-box">
          <a-col class="modal-title">
            {{ modalTitle + (tabMode ? ' - ' + tabList[activeTabKey - 1].tab : '') }}
          </a-col>
          <a-col v-if="tabMode">
            <a-row class="user-info" type="flex" :gutter="6">
              <a-col flex="auto" class="user-name">
                {{ patientInfo.name }}
              </a-col>
              <a-col flex="auto">
                {{ patientInfo.gender }}
              </a-col>
              <a-col flex="auto">{{ patientInfo.regAge }}岁</a-col>
              <a-col flex="auto" :class="'level-' + cNum(patientInfo.resetLevel[0])">{{
                patientInfo.resetLevel
              }}</a-col>
              <a-col flex="auto">/</a-col>
              <a-col flex="auto">{{ patientInfo.turnResult }}</a-col>
            </a-row>
          </a-col>
        </a-row>
      </template>
      <med-card
        v-if="tabMode"
        size="small"
        :activeTabKey="activeTabKey"
        :tabList="tabList"
        @tabChange="handleTabChange"
      >
        <div v-for="(tab, idx) in tabList" :key="tab.key" v-show="activeTabKey === tab.key">
          <iframe class="review-box" ref="iframe" :src="srcList[idx]" :width="tab.width" :height="tab.height"></iframe>
        </div>
      </med-card>
      <iframe
        v-else
        class="review-box"
        ref="iframe"
        :src="srcList[0]"
        :width="width"
        :height="height"></iframe>
    </med-modal>
  </div>
</template>
<script>
import logo from '@/assets/layouts/logo.png'
import { covertSingleChineseNum } from '@/utils/util'
import { regRemove, regList, getWristbandPdfUrl, getTickertapePdfUrl } from '@/api/preExam/basic'

export default {
  name: 'PrintBtn',
  props: {
    patientInfo: {
      type: Object,
      default: () => ({ resetLevel: '' })
    },
    modalTitle: {
      type: String,
      default: '打印'
    },
    tabMode: {
      type: Boolean,
      default: true
    },
    tabList: {
      type: Array,
      default: () => [
        { key: '1', tab: '分诊凭条', width: 500, height: 626 },
        { key: '2', tab: '腕带', width: 500, height: 310 },
        { key: '3', tab: '文书', width: 500, height: 310 }
      ]
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 626
    },
    source: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      activeTabKey: '1',
      modalVisible: false,
      srcList: []
    }
  },
  methods: {
    cNum: covertSingleChineseNum,
    async handleTabChange(tab) {
      this.activeTabKey = tab
      if (this.srcList[tab - 1]) {
        return
      }
      let src = ''
      switch (tab) {
        case '1':
          src = await this.getTickertapeSrc()
          break
        case '2':
          src = await this.getWristBandSrc()
          break
        case '3':
          src = await this.getFileSrc()
          break
        default:
          break
      }
      this.$set(this.srcList, tab - 1, src)
    },
    async handleShowModal() {
      this.modalVisible = true
      if (this.tabMode) {
        this.handleTabChange('1')
      } else {
        const src = await this.source(this.patientInfo)
        if (src) this.$set(this.srcList, 0, src)
      }
    },
    async getTickertapeSrc() {
      let src = ''
      const { regId } = this.patientInfo
      const res = await getTickertapePdfUrl({ regId })
      if (res) {
        const blob = new Blob([res], { type: 'application/pdf;chartset=UTF-8' })
        src = URL.createObjectURL(blob)
      }
      return src
    },
    async getWristBandSrc() {
      let src = ''
      const { regId } = this.patientInfo
      const res = await getWristbandPdfUrl({ regId })
      if (res) {
        const blob = new Blob([res], { type: 'application/pdf;chartset=UTF-8' })
        src = URL.createObjectURL(blob)
      }
      return src
    },
    async getFileSrc() {
      return logo
    },
    handlePrint() {
      if (this.tabMode) {
        this.$refs.iframe[this.activeTabKey - 1]?.contentWindow?.print()
      } else {
        this.$refs.iframe?.contentWindow?.print()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.review-box {
  border: 0;
}
/deep/ .ant-btn .anticon {
  font-size: 18px;
  margin-right: 0;
  + span {
    margin-left: 4px;
  }
}
/deep/ .ant-modal-body {
  padding: 0;
  min-width: 300px;
  min-height: 100px;
}
// /deep/.ant-card-body{
//   padding:10px 20px;
// }
/deep/ .ant-modal-content .ant-modal-header {
  padding: 0 10px;
  height: 50px;
}
.modal-title-box {
  line-height: 50px;

  .user-info {
    margin-top: 7px;
    flex-wrap: nowrap;
    line-height: 36px;
    padding: 0 15px;
    background-color: #fff;
    border-radius: 36px;
    color: #333;

    .user-name {
      font-size: 16px;
    }
  }
}
</style>
