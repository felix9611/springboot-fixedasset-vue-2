import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table
export class Test extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number
  
  @ApiProperty({
    example: 'ABC',
    description: 'Testing for CODE',
    required: false
  })
  @Column(DataType.STRING)
  code: string

  @ApiProperty({
    example: 'ABC',
    description: 'Testing for string',
    required: false
  })
  @Column(DataType.STRING)
  testOne: string

  @ApiProperty({
    example: 1,
    description: 'Testing for number',
    required: false
  })
  @Column(DataType.BIGINT)
  testTwo: number

  @ApiProperty({
    example: {},
    description: 'Testing JSON/Array',
    required: false
  })
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
