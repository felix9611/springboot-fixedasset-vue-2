import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'invrecord' })
export class InvRecord extends Model {
  @Column(DataType.STRING)
  assetCode?: string

  @Column(DataType.INTEGER)
  placeFrom?: number

  @Column(DataType.INTEGER)
  placeTo?: number

  @Column(DataType.INTEGER)
  status?: string

  limit?: number
  page?: number
}
