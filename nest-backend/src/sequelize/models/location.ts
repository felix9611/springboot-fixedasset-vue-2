import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'location' })
export class Location extends Model {
  @Column(DataType.STRING)
  placeCode: string

  @Column(DataType.STRING)
  placeName: string

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.STRING)
  flexData: any

  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number
  active: number
}
