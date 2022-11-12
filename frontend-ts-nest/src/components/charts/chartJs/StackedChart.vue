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
import { Component, Mixins, Prop, Watch, Vue } from 'vue-property-decorator'
import LineChart from './LineChart'
import BarChart from './BarChart'
import LineChartWithLabel from './LineChartWithLabel'
import { COLORS, getRandomInt } from './interface'
import _ from 'lodash'
import chroma from 'chroma-js'
import { ChartData, ChartOptions, ChartDataSets, ChartPluginsOptions } from 'chart.js'

@Component({
  components: {
    LineChart,
    BarChart,
    LineChartWithLabel,
  }
})
export default class ChartJsStackedChart extends Vue {
  @Prop({ type: Number, default: 600 })
  width: number
  @Prop({ type: Number, default: 250 })
  height: number
  @Prop({ type: String, default: 'line' })
  type: string
  @Prop({ type: Array, default: () => [] })
  data: any
  @Prop({ type: String })
  datasetKey: string
  @Prop({ type: String })
  datasetKey2: string
  @Prop({ type: String })
  label: string
  @Prop({ type: String })
  value: string
  @Prop({ type: String })
  colors: string | string[]
  @Prop({ type: String, default: '' })
  title: string
  @Prop({ type: [String, Array] })
  xAxis: string | string[]
  @Prop({ type: [String, Array] })
  yAxis: string | string[]
  @Prop({ type: Object })
  pluginsOption: any
  @Prop({ type: Object })
  customChartOptions: ChartOptions
  @Prop({ type: Object })
  customChartPlugins: any
  @Prop({ type: Boolean })
  alwaysMultipleDatasets: boolean
  @Prop({ type: Array, default: () => [] })
  headers: any
  @Prop({ type: Array, default: () => [] })
  specials: string[]
  @Prop({ type: String })
  fillBgLevel: string
  @Prop({ type: String })
  labelData: string
  @Prop({ type: Boolean, default: false })
  fill: boolean

  get categoriesKey() {
    const map = this.data.map(r => r[this.datasetKey])
    return map
  }

  get hasMultipleDatasets() {
    if (!this.datasetKey) return false
    if (this.alwaysMultipleDatasets === true) return true
    return _.uniq(this.data.map(r => r[this.datasetKey]).filter(v => !!v)).length > 1
  }

  get datasetKeys() {
    if (this.hasMultipleDatasets) {
      return this.data.reduce((k, r) => {
        if (k.indexOf(r[this.datasetKey]) === -1) k.push(r[this.datasetKey])
        return k
      }, [])
    }
    else {
      return ['others']
    }
  }

  get chartType() {
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
  }

  get datasetsp() {
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

  get datasets(): ChartData {
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

  get chartOptions(): ChartOptions {
    return {
      ...this.customChartOptions,
      plugins: {
        ...this.customChartPlugins
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
