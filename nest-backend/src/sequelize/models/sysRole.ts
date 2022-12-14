import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'sys_role' })
export class SysRole extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: 'A',
    description: 'The role code'
  })
  @Column(DataType.STRING)
  code: string

  @ApiProperty({
    example: 'A',
    description: 'The role page'
  })
  @Column(DataType.STRING)
  name: string

  @ApiProperty({
    example: [2, 3, 5],
    description: 'The role page of menu PK ids'
  })
  @Column(DataType.JSON)
  pages: any

  @ApiProperty({
    example: '',
    description: 'The role remark',
    required: false
  })
  @Column(DataType.TEXT)
  remark: string

  @ApiProperty({
    example: 1,
    description: 'This will default 0 or 1'
   })
  @Column(DataType.INTEGER)
  status: number

  limit: number
  page: number

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
