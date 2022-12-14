import { Table, Column, Model, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'sys_menu' })
export class SysMenu extends Model {
  @Column(DataType.INTEGER)
  parentId: number

  @Column(DataType.STRING)
  name: string

  @Column(DataType.STRING)
  path: string

  @Column(DataType.STRING)
  perms: string

  @Column(DataType.STRING)
  component: string

  @Column(DataType.INTEGER)
  type: number

  @Column(DataType.STRING)
  icon: string

  @Column(DataType.STRING)
  redirect: string

  @Column(DataType.STRING)
  meta: any

  @Column(DataType.INTEGER)
  orderNum: number

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
