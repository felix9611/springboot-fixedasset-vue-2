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
import { Component, Mixins, Prop, Watch, Vue } from 'vue-property-decorator'
import LineChart from './LineChart'
import BarChart from './BarChart'
import LineChartWithLabel from './LineChartWithLabel'
import { COLORS, getRandomInt } from './interface'

@Component({
  components: {
    LineChart,
    BarChart,
    LineChartWithLabel,
  }
})
export default class ChartJs extends Vue {
  @Prop({ type: Number, default: 600 })
  width: number
  @Prop({ type: Number, default: 400 })
  height: number
  @Prop({ type: String, default: 'line' })
  type: string
  @Prop({ type: Array, default: () => [] })
  data: any
  @Prop({ type: String })
  datasetKey: string
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
  chartOptions: any
  

  get categoriesKey() {
    const map = this.data.map(r => r[this.datasetKey])
    return map
  }

  get dataSets() {
    const dac: any = []
    this.data.forEach( re => {
      dac.push(re[this.value])
    })
    return dac
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

  get datasets() {
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
  }

  get chartData() {
    return {
      labels: this.categoriesKey,
      datasets: this.datasets
    }
  }

  get customChartOptions() {
    return {
      ...this.chartOptions,
      maintainAspectRatio:false,
      plugins: {
        ...this.pluginsOption
      },
      scales: {}
    }
  }

  created() {
    console.log(this.datasets)
  }
}
</script>
<style lang="scss" scoped>
.chart-wrapper {
  height: 100%;
  position: relative;
}
</style>