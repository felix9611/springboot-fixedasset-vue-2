<template>
  <div>
    <component
    :is="chartType"
    :chart-data="datasets"
    :options="chartOptions"
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
import _ from 'lodash'
import chroma from 'chroma-js'
import { ChartData, ChartOptions, ChartDataSets, ChartPluginsOptions } from 'chart.js'

export default {
  components: {
    LineChart,
    BarChart,
    LineChartWithLabel,
  },
  props: {
    width: { type: Number, default: 600 },
    height: { type: Number, default: 250 },
    type: { type: String, default: 'line' },
    data: { type: Array, default: () => [] },
    datasetKey: { type: String },
    datasetKey2: { type: String },
    label: { type: String },
    value: { type: String },
    colors: { type: String },
    title: { type: String, default: '' },
    xAxis: { type: [String, Array] },
    yAxis: { type: [String, Array] },
    pluginsOption:  { type: Object },
    customChartOptions: { type: Object },
    customChartPlugins: { type: Object },
    alwaysMultipleDatasets: { type: Boolean },
    headers: { type: Array, default: () => [] },
    specials: { type: Array, default: () => [] },
    fillBgLevel: { type: String },
    labelData: { type: String },
    fill: { type: Boolean, default: false }
  },
  data() {
    return {
      chartType: '',
      categoriesKey: [],
      hasMultipleDatasets: false,
      datasetKeys: [],
      datasetsp: []
    }
  },
  created() {
    this.chartType = this.getChartType()
    this.categoriesKey = this.getCategoriesKey()
    this.hasMultipleDatasets = this.getHasMultipleDatasets()
    this.datasetKeys = this.getDatasetKeys()
    this.datasetsp = this.getDatasetsp()
  },
  methods: {
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
    getCategoriesKey() {
      const map = this.data.map(r => r[this.datasetKey])
      return map
    },

    getHasMultipleDatasets() {
      if (!this.datasetKey) return false
      if (this.alwaysMultipleDatasets === true) return true
      return _.uniq(this.data.map(r => r[this.datasetKey]).filter(v => !!v)).length > 1
    },
    getDatasetKeys() {
      if (this.hasMultipleDatasets) {
          return this.data.reduce((k, r) => {
            if (k.indexOf(r[this.datasetKey]) === -1) k.push(r[this.datasetKey])
            return k
          }, [])
        }
        else {
          return ['others']
      }
    },
    
    getDatasetsp() {
      if (this.hasMultipleDatasets) {
          return _.groupBy(this.data, r => {
            const key = r[this.datasetKey] || 'others'
            return key
          })
        }
        else {
          return { others: this.data }
        }
    }
  },
  computed: {
    datasets: {
      get: function() {
        const data: any = {
          labels: this.headers.map(({ key, label = key }) => {
            return label
          }),
          datasets: this.datasetKeys.map((key, i) => {
            const dataset: any = {
              data: this.headers.map(({ key: key2, test }) => {
                if (Array.isArray(test)) test = test.join('\n')
                const func = new Function('row', 'index', test)
                const row = this.datasetsp[key].find((r, j) => func(r, j)) || {}
                return row[key2] || 0
              })
            }
            if (this.hasMultipleDatasets) { dataset.label = key } else {  dataset.label = this.labelData }

            const color = this.colors? this.colors[key] : COLORS[i]
            const fill = this.fill
            switch (this.type) {
              case 'bar': {
                return {
                  ...dataset,
                  backgroundColor: chroma(color).alpha(this.fillBgLevel ? Number(this.fillBgLevel) : 0.6).css(),
                  borderColor: color,
                  fill,
                  pointBackgroundColor: chroma(color).alpha(this.fillBgLevel ? Number(this.fillBgLevel) : 0.6).css(),
                  borderWidth: 1,
                  // stack: this.specials.indexOf('stacked') > -1 ? 'default' : undefined
                }
              }
              case 'line': {
                return {
                  ...dataset,
                  backgroundColor: fill ? chroma(color).alpha(this.fillBgLevel ? Number(this.fillBgLevel) : 0.6).css() : null,
                  borderColor: color,
                  fill,
                  pointBackgroundColor: chroma(color).alpha(this.fillBgLevel ? Number(this.fillBgLevel) : 0.6).css(),
                  borderWidth: 2,
                  // stack: this.specials.indexOf('stacked') > -1 ? 'default' : undefined
                }
              }
            }
            return dataset
          })
        } 
        return data
      }
    },

    chartOptions: {
      get: function() {
        return {
          ...this.customChartOptions,
          plugins: {
            ...this.customChartPlugins
          }      
        }
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
