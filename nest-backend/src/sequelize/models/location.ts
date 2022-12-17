import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'location' })
export class Location extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: 'MY',
    description: 'The Location Code'
  })
  @Column(DataType.STRING)
  placeCode: string

  @ApiProperty({
    example: 'My Room',
    description: 'The Location Name'
  })
  @Column(DataType.STRING)
  placeName: string

  @ApiProperty({
    example: '',
    description: 'Remark',
    required: false
  })
  @Column(DataType.TEXT)
  remark: string

  @ApiProperty({
    description: 'Add information',
    required: false
  })
  @Column(DataType.STRING)
  flexData: any

  @ApiProperty({
    example: 1,
    description: 'The status in 1 (Active) or 0 (Void)',
    required: false
  })
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
