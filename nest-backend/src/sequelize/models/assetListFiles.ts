import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'asset_list_file' })
export class AssetListFiles extends Model {
  @Column(DataType.INTEGER)
  assetId: number

  @Column(DataType.STRING)
  fileName: string

  @Column(DataType.TEXT)
  base64: string

  @Column(DataType.INTEGER)
  status: number

  @ApiProperty()
  updatedAt: Date

  @ApiProperty()
  createdAt: Date
}
