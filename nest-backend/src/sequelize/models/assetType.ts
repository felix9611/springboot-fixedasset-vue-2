import { Table, Column, Model, DataType, Sequelize } from 'sequelize-typescript'
import { AssetList } from './assetList'
import { sequelize  } from 'src/sequelize/config/database.providers'

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
/*
AssetList.init({

}, {
  sequelize,
  modelName: 'asset_type'
})


AssetType.belongsTo(AssetList)


export default AssetType
*/
