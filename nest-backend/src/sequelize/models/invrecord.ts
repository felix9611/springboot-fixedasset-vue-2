import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'invrecord' })
export class InvRecord extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: '000001',
    description: 'The Asset Code'
  })
  @Column(DataType.STRING)
  assetCode?: string

  @ApiProperty({
    example: 3,
    description: 'The Place from of loction PK Id'
  })
  @Column(DataType.INTEGER)
  placeFrom?: number


  @ApiProperty({
    example: 2,
    description: 'The Place to of loction PK Id'
  })
  @Column(DataType.INTEGER)
  placeTo?: number

  @ApiProperty({
    example: 1,
    description: 'This will default 0 or 1'
  })
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
