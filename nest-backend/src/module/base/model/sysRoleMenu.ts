import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, Default } from 'sequelize-typescript'

@Table({ tableName: 'sys_role_menu' })
export class SysRoleMenu extends Model<SysRoleMenu>{
  @Column(DataType.INTEGER)
  roleId: number

  @Column(DataType.INTEGER)
  menuId: number
}