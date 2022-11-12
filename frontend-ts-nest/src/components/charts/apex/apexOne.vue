<template>
  <div>
    <div>
      <apexchart 
      :width="width" 
      :type="type" 
      :options="options" 
      :series="series"
      :height="height"
      ></apexchart>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import VueApexCharts from 'vue-apexcharts'
import {
  IHeader
} from './interface'

@Component({
  components: {
    VueApexCharts
  }
})
export default class ApexChartOne extends Vue {
  @Prop({ type: Number, default: 600 })
  width: number

  @Prop({ type: String, default: 'line' })
  type: string

  @Prop({ type: Number, default: 400 })
  height: number

  @Prop({ type: Array, default: () => [] })
  headers: Array<IHeader>

  @Prop({ type: Array, default: () => [] })
  data: any

  @Prop({ type: String })
  datasetKey: string

  @Prop({ type: Boolean })
  alwaysMultipleDatasets: boolean

  @Prop({ type: Object, default: () => {} })
  chartOptions: any

  @Prop({ type: String })
  label: string | string[]

  @Prop({ type: String })
  value: string
  

  get categoriesKey() {
    const map = this.data.map(r => r[this.datasetKey])
    return map
  }

  get chartData() {
    const dac: any = []
    this.data.forEach( re => {
      dac.push(re[this.value])
    })
    return dac
  }
  get options() {
    return {
      chart: {
        width: '100%',
      },
      xaxis: {
          type: 'category',
          categories: this.categoriesKey,
          ...this.chartOptions.xaxis
      },
      ...this.chartOptions
    }
  }

  get series() {
    return [{
      name: this.label,
      data: this.chartData
    }]
  }
}
</script>
