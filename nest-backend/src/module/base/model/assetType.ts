import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'asset_type' })
export class AssetType extends Model {
  @Column(DataType.STRING(100))
  typeCode: string

  @Column(DataType.STRING)
  typeName: string

  @Column(DataType.JSON)
  typeOtherName: any

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.INTEGER)
  status: number
}