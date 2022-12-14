import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table
export class Test extends Model {
  @Column(DataType.STRING)
  code: string

  @Column(DataType.STRING)
  testOne: string

  @Column(DataType.BIGINT)
  testTwo: number

  @Column(DataType.JSON)
  testJson: number

  @ApiProperty({
    example: 1,
    description: 'This will default 0 (Void) or 1 (Active)'
  })
  @Column(DataType.INTEGER)
  status: number

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
