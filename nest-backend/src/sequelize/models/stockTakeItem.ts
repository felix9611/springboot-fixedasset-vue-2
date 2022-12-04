import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'stocktake_item' })
export class StockTakeItem extends Model {
  @Column(DataType.INTEGER)
  stocktakeId: number

  @Column(DataType.INTEGER)
  assetId: number

  @Column(DataType.STRING)
  assetCode: string

  @Column(DataType.INTEGER)
  placeId: number

  @Column(DataType.STRING)
  status: string

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.DATE)
  checkTime: string

  limit: number
  page: number
}
