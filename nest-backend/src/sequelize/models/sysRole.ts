import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'sys_role' })
export class SysRole extends Model {
  @Column(DataType.STRING)
  code: string

  @Column(DataType.STRING)
  name: string

  @Column(DataType.JSON)
  pages: any

  @Column(DataType.TEXT)
  remark: string

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
