import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'sys_role_menu' })
export class SysRoleMenu extends Model{
  @Column(DataType.INTEGER)
  roleId: number

  @Column(DataType.INTEGER)
  menuId: number

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
