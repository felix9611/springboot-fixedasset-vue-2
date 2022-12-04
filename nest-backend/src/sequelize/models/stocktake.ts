import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'stocktake' })
export class StockTake extends Model {

  @Column(DataType.STRING)
  actionName: string

  @Column(DataType.INTEGER)
  actionPlace: number

  @Column(DataType.DATE)
  finishTime: string

  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number
}
