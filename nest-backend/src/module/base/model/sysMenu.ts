import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'sys_menu' })
export class SysMenu extends Model<SysMenu> {
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

  @Column(DataType.INTEGER)
  orderNum: number

  @Column(DataType.INTEGER)
  status: number
}