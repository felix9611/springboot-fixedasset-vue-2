import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'department' })
export class Department extends Model {
  @Column(DataType.STRING)
  deptCode: string

  @Column(DataType.STRING)
  deptName: string

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
