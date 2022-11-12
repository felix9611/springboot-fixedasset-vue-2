export interface IHeader {
  key: string
  label?: string
  test: string | string[]
}

export interface ChartSet {
  labels: any[]
  datasets: SeriesData[]
}

export interface SeriesData {
  name?: string
  type?: string
  data: any[]
  tooltip?: Tooltip
  // dashStyle?: any
}

export interface Tooltip {
  y: any[]
}

export interface ChartOptions {
  stacked: boolean
  dataLabels: boolean
  nameLabels: boolean
  enabledOnSeries?: any
  strokeCurve: 'smooth' | 'stepline' | 'straight' | null
  tooltip?: Tooltip
  colors?: any
}

export interface AxisSetting {
  type?: 'datetime' | 'category'
}

export interface ChartDataSets {
  type: string
}