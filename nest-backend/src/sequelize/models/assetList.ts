import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { AssetType } from './assetType'

@Table({ tableName: 'asset_list' })
export class AssetList extends Model {

  @Column(DataType.STRING)
  assetCode: string

  @Column(DataType.STRING)
  assetName: string

  @Column(DataType.INTEGER)
  typeId: number

  @Column(DataType.STRING)
  unit: string

  @Column(DataType.DATE)
  buyDate: string

  @Column(DataType.TEXT)
  description: string

  @Column(DataType.INTEGER)
  sponsor: number

  @Column(DataType.STRING)
  sponsorName: string

  @Column(DataType.STRING)
  cost: string

  @Column(DataType.STRING)
  serialNumber: string

  @Column(DataType.STRING)
  invoiceNo: string

  @Column(DataType.DATE)
  invoiceDate: string

  @Column(DataType.INTEGER)
  placeId: number

  @Column(DataType.INTEGER)
  deptId: number

  @Column(DataType.INTEGER)
  staffId: number

  @Column(DataType.INTEGER)
  vendorId: number

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.STRING)
  flexData: any

  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number

}



// AssetList.belongsTo(AssetType)

/*
AssetList.init()
AssetList.belongsTo(Department)
AssetList.belongsTo(AssetType)
AssetList.belongsTo(Location) */
