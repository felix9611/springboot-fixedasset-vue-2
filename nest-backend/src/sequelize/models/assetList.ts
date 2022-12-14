import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'asset_list' })
export class AssetList extends Model {

  @ApiProperty({
    example: 1,
    description: 'The Asset id PK number'
  })
  id: number

  @ApiProperty({
    example: '000001',
    description: 'The Asset code'
  })
  @Column(DataType.STRING)
  assetCode: string

  @ApiProperty({
    example: 'ABC',
    description: 'The Asset name'
  })
  @Column(DataType.STRING)
  assetName: string

  @ApiProperty({
    example: 1,
    description: 'The Asset type id number'
  })
  @Column(DataType.INTEGER)
  typeId: number

  @ApiProperty({
    example: 'Box',
    description: 'This asset item how to unit term'
  })
  @Column(DataType.STRING)
  unit: string

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'This asset buy at the date and time',
    required: false
  })
  @Column(DataType.DATE)
  buyDate: string

  @ApiProperty({
    example: 'This is for test',
    description: 'This asset detail',
    required: false
  })
  @Column(DataType.TEXT)
  description: string

  @ApiProperty({
    example: 0,
    description: 'This sponsor type number'
  })
  @Column(DataType.INTEGER)
  sponsor: number

  @ApiProperty({
    example: 'Tom',
    description: 'This sponsor name',
    required: false
  })
  @Column(DataType.STRING)
  sponsorName: string

  @ApiProperty({
    example: '300',
    description: 'This asset buy cost',
    required: false
  })
  @Column(DataType.STRING)
  cost: string

  @ApiProperty({
    example: '17516987',
    description: 'This asset Serial Number'
  })
  @Column(DataType.STRING)
  serialNumber: string

  @ApiProperty({
    example: 'T00001',
    description: 'Buy Invoice Sheet Number',
    required: false
  })
  @Column(DataType.STRING)
  invoiceNo: string

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'Buy Invoice Sheet Iussed Date and time',
    required: false
  })
  @Column(DataType.DATE)
  invoiceDate: string

  @ApiProperty({
    example: 5,
    description: 'The asset store on where the place id number'
  })
  @Column(DataType.INTEGER)
  placeId: number

  @ApiProperty({
    example: 1,
    description: 'The asset by which the department id number'
  })
  @Column(DataType.INTEGER)
  deptId: number

  @ApiProperty({
    example: 'A001',
    description: 'The operation staff UUID',
    required: false
   })
  @Column(DataType.STRING)
  staffId: String

  @ApiProperty({
    example: 2,
    description: 'The asset vendor code',
    required: false
  })
  @Column(DataType.INTEGER)
  vendorId: number

  @ApiProperty({
    example: 'Testing',
    description: 'The asset other information remark',
    required: false
  })
  @Column(DataType.TEXT)
  remark: string

  @ApiProperty({
    example: {},
    description: 'The asset other information by json or array',
    required: false
  })
  @Column(DataType.STRING)
  flexData: any

  @ApiProperty({
    example: 1,
    description: 'This will default 0 or 1'
   })
  @Column(DataType.INTEGER)
  status: number

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'This will auto save'
  })
  updatedAt: Date

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'This will auto save'
  })
  createdAt: Date


  limit: number
  page: number

}



// AssetList.belongsTo(AssetType)

/*
AssetList.init()
AssetList.belongsTo(Department)
AssetList.belongsTo(AssetType)
AssetList.belongsTo(Location) */
