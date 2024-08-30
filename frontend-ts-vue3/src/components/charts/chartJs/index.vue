<template>
  <div>
    <component
    :is="chartType"
    :chartData="chartData"
    :chartOptions="customChartOptions"
    :width="width"
    :height="height"
  />
  </div>
</template>
<script lang="ts">
import LineChart from './LineChart'
import BarChart from './BarChart'
import LineChartWithLabel from './LineChartWithLabel'
import { COLORS, getRandomInt } from './interface'

export default {
  name: 'ChartJs',
  components: {
    LineChart,
    BarChart,
    LineChartWithLabel,
  },
  props: {
    width: { type: Number, default: 600 },
    height: { type: Number, default: 400 },
    type: { type: String, default: 'line' },
    data: { type: Array, default: () => [] },
    datasetKey: { type: String },
    label: { type: String },
    value: { type: String },
    colors: { type: String },
    title: { type: String, default: '' },
    xAxis: { type: [String, Array] },
    yAxis: { type: [String, Array] },
    pluginsOption: { type: Object },
    chartOptions: { type: Object }
  },
  data() {
    return {
      categoriesKey: [],
      dataSets: [],
      chartType: '',
      chartData: {},
      datasets: [],
      customChartOptions: {}
    }
  },
  created() {
    this.categoriesKey = this.getCategoriesKey()
    this.dataSets = this.getDataSets()
    this.chartType = this.getChartType()
    this.datasets = this.getDatasets()
    this.chartData = this.getChartData()
    this.customChartOptions = this.getCustomChartOptions()
  },
  methods: {
    getCategoriesKey() {
      const map = this.data.map(r => r[this.datasetKey])
      return map
    },
    getDataSets() {
      const dac: any = []
      this.data.forEach( re => {
        dac.push(re[this.value])
      })
      return dac
    },
    getChartType() {
      switch(this.type){
        case 'line': {
          return 'LineChart'
        }
        case 'lineWithLabel': {
          return 'LineChartWithLabel'
        }
        case 'bar': {
          return 'BarChart'
        }
      }
    },
    getDatasets() {
      const sets: any = []
      let setContent: any = {}

      setContent['label'] = this.label
      setContent['data'] = this.dataSets
      switch (this.type) {
        case 'bar': {
          setContent = {
            ...setContent,
            backgroundColor: this.colors ? `${this.colors}50`: `${COLORS[getRandomInt()]}50`,
            borderColor: this.colors ? this.colors : COLORS[getRandomInt()],
            borderWidth: 1
          }
        }
        case 'line': {
          setContent = {
            ...setContent,
            fill: false,
            borderColor: this.colors ? this.colors : COLORS[getRandomInt()]
          }
        }
        case 'lineWithLabel': {
          setContent = {
            ...setContent,
            fill: false,
            borderColor: this.colors ? this.colors : COLORS[getRandomInt()]
          }
        }
      }
      sets.push(setContent)

      return sets
    },
    getChartData() {
      return {
        labels: this.categoriesKey,
        datasets: this.datasets
      }
    },
    getCustomChartOptions() {
      return {
        ...this.chartOptions,
        maintainAspectRatio:false,
        plugins: {
          ...this.pluginsOption
        },
        scales: {}
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  height: 100%;
  position: relative;
}
</style>