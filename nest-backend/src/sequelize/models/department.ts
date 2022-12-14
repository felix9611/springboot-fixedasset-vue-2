import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'department' })
export class Department extends Model {
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: 'Test',
    description: 'The department code'
  })
  @Column(DataType.STRING)
  deptCode: string

  @ApiProperty({
    example: 'Test',
    description: 'The department name'
  })
  @Column(DataType.STRING)
  deptName: string

  @ApiProperty({
    example: '',
    description: 'Remark',
    required: false
  })
  @Column(DataType.TEXT)
  remark: string

  @ApiProperty({
    example: {},
    description: 'The other information by json or array',
    required: false
  })
  @Column(DataType.STRING)
  flexData: any

  @ApiProperty({
    example: 1,
    description: 'This will default 0 or 1'
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
