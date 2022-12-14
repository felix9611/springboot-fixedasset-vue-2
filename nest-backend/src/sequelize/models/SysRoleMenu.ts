import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'sys_role_menu' })
export class SysRoleMenu extends Model{

  @ApiProperty({
    example: 1,
    description: 'The id PK number'
  })
  id: number

  @ApiProperty({
    example: 1,
    description: 'The ROLE PK ID'
  })
  @Column(DataType.INTEGER)
  roleId: number

  @ApiProperty({
    example: 1,
    description: 'The Menu PK ID'
  })
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
