import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'write_off' })
export class WriteOff extends Model {
  @Column(DataType.INTEGER)
  assetId: number

  @Column(DataType.STRING)
  lastPlaceId: number

  @Column(DataType.STRING)
  reason: string

  @Column(DataType.DATE)
  lastDay: string

  limit: number
  page: number
}
