<template>
  <a-row class="ant-input age-input">
    <a-col span="6">
      <a-input size="small" :value="years" @change="handleAgeChange" />
    </a-col>
    <a-col span="2" class="grey-text">岁</a-col>
    <a-col span="6">
      <a-input size="small" :value="months" @change="handleMonthChange" />
    </a-col>
    <a-col span="2" class="grey-text">月</a-col>
    <a-col span="6">
      <a-input size="small" :value="days" @change="handleDayChange" />
    </a-col>
    <a-col span="2" class="grey-text">日</a-col>
  </a-row>
</template>

<script>
import moment from 'moment'
export default {
  name: 'AgeInput',
  props: {
    value: {
      type: [String, Number],
      default: 0
    },
    input: {
      type: [String, Object],
      default: ''
    },
    startDay: {
      type: [String, Object],
      default: ''
    },
    endDay: {
      type: [String, Object],
      default: ''
    }
  },
  data() {
    return {
      years: '',
      months: '',
      days: ''
    }
  },
  computed: {
    range() {
      return { startDay: this.shortStartDay, endDay: this.shortEndDay }
    },
    shortStartDay() {
      // 剪短日期,避免时间干扰
      return this.startDay ? moment(this.startDay).format('YYYY-MM-DD') : ''
    },
    shortEndDay() {
      // 剪短日期,避免时间干扰
      return this.endDay ? moment(this.endDay).format('YYYY-MM-DD') : ''
    }
  },
  methods: {
    trimmNum(num) {
      // 剪短小数尾数,无需过高精度
      return parseFloat(num.toFixed(4))
    },
    handleAgeChange(e) {
      const { value } = e.target
      const num = parseInt(value)
      if (!isNaN(num) && num >= 0) {
        this.years = num
        this.triggerEmit()
      }
    },
    handleMonthChange(e) {
      const { value } = e.target
      const num = parseInt(value)
      if (!isNaN(num) && num >= 0 && num < 12) {
        this.months = num
        this.triggerEmit()
      }
    },
    handleDayChange(e) {
      const { value } = e.target
      const num = parseInt(value)
      if (!isNaN(num) && num >= 0 && num < 31) {
        this.days = num
        this.triggerEmit()
      }
    },
    triggerEmit() {
      // 触发v-model
      const newVal = moment(
        moment(this.shortStartDay).add({
          years: this.years,
          months: this.months,
          days: this.days
        })
      ).diff(moment(this.shortStartDay), 'year', true)

      this.$emit('input', this.trimmNum(newVal))
    }
  },
  watch: {
    value(val) {
      // val是浮点数,这里依据生日换算出月份和天数
      const startDay = moment(this.shortStartDay)
      const years = Math.floor(val)
      let months = 0
      let days = 0
      if (years < 2 && years < val) {
        const endDay = startDay.clone()
        do {
          endDay.add(1, 'day')
        } while (parseFloat(endDay.diff(startDay, 'year', true).toFixed(4)) < val)
        months = endDay.diff(startDay.add({ year: years }), 'month')
        days = endDay.diff(startDay.add({ month: months }), 'day')
      }
      this.years = years
      this.months = months
      this.days = days
    },
    range(newRange) {
      const { startDay, endDay } = newRange
      if (startDay && endDay) {
        const years = moment(endDay).diff(moment(startDay), 'year')
        const months = moment(endDay).diff(moment(startDay).add(years, 'Y'), 'month')
        const days = moment(endDay).diff(moment(startDay).add({ years, months }), 'days')
        this.years = years
        this.months = this.years >= 2 ? 0 : months
        this.days = this.years >= 1 ? 0 : days
        const trimmedNum = this.trimmNum(moment(endDay).diff(moment(startDay), 'year', years < 2))
        // 转为浮点形式存储
        this.$emit('input', trimmedNum)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.age-input {
  display: flex;
  line-height: 32px;
  padding: 0 6px 0 0;
  margin: 4px 0;
  .grey-text {
    color: #aaa;
  }
  /deep/ input.ant-input {
    border: none;
    padding: 0;
    width: calc(100% - 6px);
    height: 30px;
    margin-top: -4px;
    line-height: 32px;
    text-align: right;
    background-color: transparent;
  }
}
</style>
