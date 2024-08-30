import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
import ChartDataLabels from 'chartjs-plugin-datalabels'

// Chart.plugins.unregister(ChartDataLabels) // add datalabels plugin

export default {
  extends: Line,
  mixins: [reactiveProp],
  props: ['options'],
  mounted () {
    // this.addPlugin(ChartDataLabels)
    this.renderChart(this.chartData, this.options)
  }
}
