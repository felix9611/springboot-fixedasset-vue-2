import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'code_type' })
export class CodeType extends Model {

  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: 'Test',
    description: 'The type for category'
  })
  @Column(DataType.STRING)
  type: string

  @ApiProperty({
    example: 'TestD',
    description: 'The value code'
  })
  @Column(DataType.STRING)
  valueCode: string

  @ApiProperty({
    example: 'Test Da',
    description: 'The value name'
  })
  @Column(DataType.STRING)
  valueName: string

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
  updatedAt: Date

  @ApiProperty({
    example: '2022-12-11T01:49:14.286Z',
    description: 'This will auto save',
    required: false
  })
  createdAt: Date

  limit: number
  page: number
}
