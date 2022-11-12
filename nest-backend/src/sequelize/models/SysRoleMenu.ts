import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({ tableName: 'sys_role_menu' })
export class SysRoleMenu extends Model{
  @Column(DataType.INTEGER)
  roleId: number

  @Column(DataType.INTEGER)
  menuId: number
}