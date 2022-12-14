import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

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

    @ApiProperty({
      description: 'This will auto save',
      required: false
    })
    updatedAt: Date

    @ApiProperty({
      description: 'This will auto save',
      required: false
    })
    createdAt: Date
}
