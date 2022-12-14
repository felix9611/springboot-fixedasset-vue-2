import { Table, Column, Model, DataType, Sequelize } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
@Table({ tableName: 'asset_type' })
export class AssetType extends Model {

  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: 'Test',
    description: 'The asset type code',
  })
  @Column(DataType.STRING)
  typeCode: string

  @ApiProperty({
    example: 'Testing',
    description: 'The asset type name',
  })
  @Column(DataType.STRING)
  typeName: string

  @ApiProperty({
    example: {},
    description: 'The asset type other name by json',
    required: false
  })
  @Column(DataType.STRING)
  typeOtherName: any

  @ApiProperty({
    example: 'Testing',
    description: 'The asset type other remark',
    required: false
  })
  @Column(DataType.TEXT)
  remark: string

  @ApiProperty({
    example: 1,
    description: 'The status in 1 (Active) or 0 (Void)',
    required: false
  })
  @Column(DataType.INTEGER)
  status: number

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'This will auto save',
    required: false
  })
  createdAt: Date

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'This will auto save',
    required: false
  })
  updatedAt: Date

  limit: number
  page: number
}
