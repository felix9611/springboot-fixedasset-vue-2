import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'asset_list_file' })
export class AssetListFiles extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: 'Test',
    description: 'The id of asset PK',
  })
  @Column(DataType.INTEGER)
  assetId: number

  @ApiProperty({
    example: 'Test.png',
    description: 'The file name',
  })
  @Column(DataType.STRING)
  fileName: string

  @ApiProperty({
    example: 'Agedgs656ad5fs6===',
    description: 'base64 Content',
  })
  @Column(DataType.TEXT)
  base64: string

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
}
