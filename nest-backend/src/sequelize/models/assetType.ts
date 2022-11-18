import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'asset_type' })
export class AssetType extends Model {

  @Column(DataType.STRING)
  typeCode: string

  @Column(DataType.STRING)
  typeName: string

  @Column(DataType.STRING)
  typeOtherName: any

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.BIGINT)
  status: string

  limit: number
  page: number
  dataValue: any
}
