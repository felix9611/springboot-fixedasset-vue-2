import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'sys_user_role' })
export class SysUserRole extends Model{
  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: 'uu9999-8885-saDAD',
    description: 'The USER UUID'
  })
  @Column(DataType.STRING)
  userId: string

  @ApiProperty({
    example: 1,
    description: 'The ROLE PK ID'
  })
  @Column(DataType.INTEGER)
  roleId: string

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
