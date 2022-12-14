import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'location' })
export class Location extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number
  
  @Column(DataType.STRING)
  placeCode: string

  @Column(DataType.STRING)
  placeName: string

  @Column(DataType.TEXT)
  remark: string

  @Column(DataType.STRING)
  flexData: any

  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number
  active: number

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
