import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'sys_user_role' })
export class SysUserRole extends Model{
  @Column(DataType.STRING)
  userId: string

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
