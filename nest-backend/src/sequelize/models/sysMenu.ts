import { Table, Column, Model, DataType } from 'sequelize-typescript'

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

}